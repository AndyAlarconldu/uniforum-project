from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import HistoryCreate, HistoryOut
from app.crud import create_history, get_history_by_post

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=HistoryOut)
def save_edit(data: HistoryCreate, db: Session = Depends(get_db)):
    return create_history(db, data)

@router.get("/post/{post_id}", response_model=list[HistoryOut])
def get_edits(post_id: str, db: Session = Depends(get_db)):
    return get_history_by_post(db, post_id)
