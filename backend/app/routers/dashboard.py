from datetime import date
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/metrics", response_model=schemas.DashboardMetrics)
def get_metrics(db: Session = Depends(get_db)):
    total_revenue = db.query(func.sum(models.Payment.amount)).filter(
        models.Payment.status.in_(["approved", "auto_approved"])
    ).scalar() or 0

    pending_dues = db.query(
        func.sum(models.FeeRecord.amount_due - models.FeeRecord.amount_paid)
    ).filter(models.FeeRecord.status.in_(["pending", "partial", "overdue"])).scalar() or 0

    active_defaulters = db.query(models.FeeRecord).filter(
        models.FeeRecord.status == "overdue"
    ).count()

    upi_count = db.query(models.Payment).filter(models.Payment.method == "UPI").count()
    cash_count = db.query(models.Payment).filter(models.Payment.method == "Cash").count()
    total_count = upi_count + cash_count or 1

    return schemas.DashboardMetrics(
        total_revenue=float(total_revenue),
        pending_dues=float(pending_dues),
        active_defaulters=active_defaulters,
        upi_share_pct=round(upi_count / total_count * 100, 1),
        cash_share_pct=round(cash_count / total_count * 100, 1),
    )


@router.get("/defaulters", response_model=list[schemas.DefaulterOut])
def get_defaulters(db: Session = Depends(get_db)):
    """Prioritized defaulters — highest overdue balance first."""
    records = (
        db.query(models.FeeRecord)
        .filter(models.FeeRecord.status == "overdue")
        .join(models.Student)
        .all()
    )

    result = []
    for r in records:
        overdue_amt = float(r.amount_due) - float(r.amount_paid)
        days_late = (date.today() - r.due_date).days
        urgency = "high" if days_late > 30 else "med" if days_late > 15 else "low"
        result.append(
            schemas.DefaulterOut(
                student_id=r.student.id,
                student_code=r.student.student_code,
                name=r.student.full_name,
                grade=r.student.grade,
                overdue_amount=overdue_amt,
                days_late=days_late,
                urgency=urgency,
            )
        )

    return sorted(result, key=lambda d: d.overdue_amount, reverse=True)
