from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import NotificationCreate, NotificationOut
from app.crud import create_notification, get_notifications

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=NotificationOut)
def send_notification(payload: NotificationCreate, db: Session = Depends(get_db)):
    return create_notification(db, payload)

@router.get("/", response_model=list[NotificationOut])
def list_notifications(db: Session = Depends(get_db)):
    return get_notifications(db)
