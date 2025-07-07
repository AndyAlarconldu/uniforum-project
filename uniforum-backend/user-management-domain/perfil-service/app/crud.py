from sqlalchemy.orm import Session
from app.models import Student

def get_student_by_id(db: Session, id_student: str):
    return db.query(Student).filter(Student.id_student == id_student).first()
