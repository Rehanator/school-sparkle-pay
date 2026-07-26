from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter(prefix="/api/staff", tags=["staff"])


@router.get("", response_model=list[schemas.StaffOut])
def list_staff(db: Session = Depends(get_db)):
    return db.query(models.Staff).all()


@router.post("", response_model=schemas.StaffOut, status_code=201)
def create_staff(payload: schemas.StaffCreate, db: Session = Depends(get_db)):
    staff = models.Staff(**payload.dict())
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff
