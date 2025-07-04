from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.auth import get_current_user
from app.schemas import StudentPerfil
from app.crud import get_student_by_id

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/me", response_model=StudentPerfil)
def get_my_profile(user=Depends(get_current_user), db: Session = Depends(get_db)):
    student = get_student_by_id(db, user["id"])
    if not student:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    return student
