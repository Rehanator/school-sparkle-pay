import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter(prefix="/api/payments", tags=["payments"])


@router.get("/digital", response_model=list[schemas.PaymentOut])
def digital_feed(limit: int = 20, db: Session = Depends(get_db)):
    """Live UPI/Card feed — auto-approved digital payments."""
    return (
        db.query(models.Payment)
        .filter(models.Payment.method.in_(["UPI", "Card"]))
        .order_by(models.Payment.paid_at.desc())
        .limit(limit)
        .all()
    )


@router.get("/offline", response_model=list[schemas.PaymentOut])
def offline_queue(status: str = "pending", db: Session = Depends(get_db)):
    """Cash/Cheque payments awaiting reconciliation."""
    return (
        db.query(models.Payment)
        .filter(models.Payment.method.in_(["Cash", "Cheque"]))
        .filter(models.Payment.status == status)
        .all()
    )


@router.post("", response_model=schemas.PaymentOut, status_code=201)
def record_payment(payload: schemas.PaymentCreate, db: Session = Depends(get_db)):
    receipt_number = f"R-{uuid.uuid4().hex[:6].upper()}"

    # Digital methods auto-approve (simulated); offline methods stay pending
    status = "auto_approved" if payload.method in ("UPI", "Card") else "pending"

    payment = models.Payment(
        **payload.dict(),
        receipt_number=receipt_number,
        status=status,
    )
    db.add(payment)

    if status == "auto_approved":
        _apply_payment_to_record(payload.fee_record_id, payload.amount, db)

    db.commit()
    db.refresh(payment)
    return payment


@router.patch("/{payment_id}/decision", response_model=schemas.PaymentOut)
def decide_offline_payment(payment_id: int, decision: schemas.PaymentDecision, db: Session = Depends(get_db)):
    """Approve or reject a cash/cheque payment (Payments > Offline tab)."""
    payment = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(404, "Payment not found")

    payment.status = decision.status
    if decision.status == "rejected":
        payment.rejection_reason = decision.rejection_reason
    elif decision.status == "approved":
        _apply_payment_to_record(payment.fee_record_id, payment.amount, db)

    db.commit()
    db.refresh(payment)
    return payment


def _apply_payment_to_record(fee_record_id: int, amount, db: Session):
    record = db.query(models.FeeRecord).filter(models.FeeRecord.id == fee_record_id).first()
    if not record:
        return
    record.amount_paid = float(record.amount_paid) + float(amount)
    if record.amount_paid >= float(record.amount_due):
        record.status = "paid"
    elif record.amount_paid > 0:
        record.status = "partial"
