from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter(prefix="/api/fees", tags=["fees"])


# ── Fee Types (Fee Engine "Active Fee Heads" cards) ──
@router.get("/types", response_model=list[schemas.FeeTypeOut])
def list_fee_types(db: Session = Depends(get_db)):
    return db.query(models.FeeType).all()


@router.post("/types", response_model=schemas.FeeTypeOut, status_code=201)
def create_fee_type(payload: schemas.FeeTypeCreate, db: Session = Depends(get_db)):
    fee_type = models.FeeType(**payload.dict())
    db.add(fee_type)
    db.commit()
    db.refresh(fee_type)
    return fee_type


# ── Fee Records (per-student fee assignments) ──
@router.get("/records/student/{student_id}", response_model=list[schemas.FeeRecordOut])
def get_student_fee_records(student_id: int, db: Session = Depends(get_db)):
    return db.query(models.FeeRecord).filter(models.FeeRecord.student_id == student_id).all()


@router.post("/records", response_model=schemas.FeeRecordOut, status_code=201)
def create_fee_record(payload: schemas.FeeRecordCreate, db: Session = Depends(get_db)):
    record = models.FeeRecord(**payload.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


# ── Edu-EMI Smart Split ──
@router.post("/records/{fee_record_id}/split", response_model=list[schemas.FeeRecordOut])
def split_into_installments(fee_record_id: int, installments: int, db: Session = Depends(get_db)):
    """Break one fee record into N equal monthly installments."""
    original = db.query(models.FeeRecord).filter(models.FeeRecord.id == fee_record_id).first()
    if not original:
        raise HTTPException(404, "Fee record not found")
    if installments < 2 or installments > 12:
        raise HTTPException(400, "Installments must be between 2 and 12")

    per_installment = round(float(original.amount_due) / installments, 2)
    new_records = []
    for i in range(installments):
        rec = models.FeeRecord(
            student_id=original.student_id,
            fee_type_id=original.fee_type_id,
            amount_due=per_installment,
            due_date=original.due_date,  # NOTE: real logic should offset by month
            status="pending",
            installment_number=i + 1,
            total_installments=installments,
        )
        db.add(rec)
        new_records.append(rec)

    db.delete(original)
    db.commit()
    for rec in new_records:
        db.refresh(rec)
    return new_records


# ── Waivers & Penalties ──
@router.post("/waivers", response_model=schemas.WaiverOut, status_code=201)
def create_waiver(payload: schemas.WaiverCreate, db: Session = Depends(get_db)):
    waiver = models.Waiver(**payload.dict())
    db.add(waiver)
    db.commit()
    db.refresh(waiver)

    # Reflect on the fee record
    record = db.query(models.FeeRecord).filter(models.FeeRecord.id == payload.fee_record_id).first()
    if record and payload.type == "waiver":
        record.amount_due = max(0, float(record.amount_due) - float(payload.amount))
        if record.amount_due == 0:
            record.status = "waived"
        db.commit()

    return waiver


@router.get("/waivers/student/{student_id}", response_model=list[schemas.WaiverOut])
def get_student_waivers(student_id: int, db: Session = Depends(get_db)):
    return db.query(models.Waiver).filter(models.Waiver.student_id == student_id).all()
