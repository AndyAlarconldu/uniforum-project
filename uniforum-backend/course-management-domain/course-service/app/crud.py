from sqlalchemy.orm import Session
from app.models import Course
from app.schemas import CourseCreate
from fastapi import HTTPException

def create_course(db: Session, course: CourseCreate):
    db_course = db.query(Course).filter_by(id_course=course.id_course).first()
    if db_course:
        raise HTTPException(status_code=400, detail="Curso ya existe")
    new_course = Course(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

def get_all_courses(db: Session):
    return db.query(Course).all()

def get_courses_by_university(db: Session, university_id: str):
    return db.query(Course).filter_by(university_id=university_id).all()
