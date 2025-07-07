from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import CourseCreate, CourseOut
from app.crud import create_course, get_all_courses, get_courses_by_university

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=CourseOut)
def create(course: CourseCreate, db: Session = Depends(get_db)):
    return create_course(db, course)

@router.get("/", response_model=list[CourseOut])
def get_all(db: Session = Depends(get_db)):
    return get_all_courses(db)

@router.get("/university/{university_id}", response_model=list[CourseOut])
def get_by_university(university_id: str, db: Session = Depends(get_db)):
    return get_courses_by_university(db, university_id)
