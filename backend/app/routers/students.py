from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter(prefix="/api/students", tags=["students"])


@router.get("", response_model=list[schemas.StudentOut])
def list_students(grade: str | None = None, db: Session = Depends(get_db)):
    q = db.query(models.Student)
    if grade:
        q = q.filter(models.Student.grade == grade)
    return q.all()


@router.get("/{student_id}", response_model=schemas.StudentOut)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(404, "Student not found")
    return student


@router.post("", response_model=schemas.StudentOut, status_code=201)
def create_student(payload: schemas.StudentCreate, db: Session = Depends(get_db)):
    student = models.Student(**payload.dict())
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


@router.get("/family/{family_id}", response_model=list[schemas.StudentOut])
def get_family_students(family_id: int, db: Session = Depends(get_db)):
    """Sibling/family linking — combined family view."""
    return db.query(models.Student).filter(models.Student.family_id == family_id).all()
