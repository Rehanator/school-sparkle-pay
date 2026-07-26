import hashlib
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter(prefix="/api/audit", tags=["audit"])


def log_action(db: Session, admin_id: str, admin_name: str, action: str, ip_address: str = "unknown"):
    """Call this from any router after a sensitive action (waiver, payment decision, etc.)."""
    last_entry = db.query(models.AuditLog).order_by(models.AuditLog.id.desc()).first()
    prev_hash = last_entry.entry_hash if last_entry else "0" * 64

    raw = f"{prev_hash}{admin_id}{action}{ip_address}"
    entry_hash = hashlib.sha256(raw.encode()).hexdigest()

    entry = models.AuditLog(
        admin_id=admin_id,
        admin_name=admin_name,
        action=action,
        ip_address=ip_address,
        prev_hash=prev_hash,
        entry_hash=entry_hash,
    )
    db.add(entry)
    db.commit()
    return entry


@router.get("", response_model=list[schemas.AuditLogOut])
def get_audit_log(limit: int = 50, db: Session = Depends(get_db)):
    return (
        db.query(models.AuditLog)
        .order_by(models.AuditLog.created_at.desc())
        .limit(limit)
        .all()
    )


@router.post("", response_model=schemas.AuditLogOut, status_code=201)
def create_audit_entry(
    admin_id: str,
    admin_name: str,
    action: str,
    request: Request,
    db: Session = Depends(get_db),
):
    client_ip = request.client.host if request.client else "unknown"
    return log_action(db, admin_id, admin_name, action, client_ip)


@router.get("/verify")
def verify_chain(db: Session = Depends(get_db)):
    """Walk the hash chain and confirm no entry has been tampered with."""
    entries = db.query(models.AuditLog).order_by(models.AuditLog.id.asc()).all()
    prev_hash = "0" * 64
    for entry in entries:
        raw = f"{prev_hash}{entry.admin_id}{entry.action}{entry.ip_address}"
        expected_hash = hashlib.sha256(raw.encode()).hexdigest()
        if expected_hash != entry.entry_hash:
            return {"valid": False, "broken_at_entry_id": entry.id}
        prev_hash = entry.entry_hash
    return {"valid": True, "entries_checked": len(entries)}
