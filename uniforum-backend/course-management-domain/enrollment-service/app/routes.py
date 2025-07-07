from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import EnrollmentCreate, EnrollmentOut
from app.crud import create_enrollment, get_enrollments_by_student, get_all_enrollments

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=EnrollmentOut)
def enroll(data: EnrollmentCreate, db: Session = Depends(get_db)):
    return create_enrollment(db, data)

@router.get("/", response_model=list[EnrollmentOut])
def get_all(db: Session = Depends(get_db)):
    return get_all_enrollments(db)

@router.get("/student/{student_id}", response_model=list[EnrollmentOut])
def get_by_student(student_id: str, db: Session = Depends(get_db)):
    return get_enrollments_by_student(db, student_id)
