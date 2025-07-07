from sqlalchemy.orm import Session
from app.models import Enrollment
from app.schemas import EnrollmentCreate
from fastapi import HTTPException

def create_enrollment(db: Session, data: EnrollmentCreate):
    existing = db.query(Enrollment).filter_by(student_id=data.student_id, course_id=data.course_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Estudiante ya inscrito en este curso")
    enrollment = Enrollment(**data.dict())
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment

def get_enrollments_by_student(db: Session, student_id: str):
    return db.query(Enrollment).filter_by(student_id=student_id).all()

def get_all_enrollments(db: Session):
    return db.query(Enrollment).all()
