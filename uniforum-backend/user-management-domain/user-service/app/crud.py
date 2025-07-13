from sqlalchemy.orm import Session
from . import models

def get_all_students(db: Session):
    return db.query(models.Student).all()

def get_student_by_id(db: Session, student_id: str):
    return db.query(models.Student).filter(models.Student.id_student == student_id).first()
