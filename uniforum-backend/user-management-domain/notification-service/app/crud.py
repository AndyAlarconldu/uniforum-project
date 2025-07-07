from sqlalchemy.orm import Session
from app.models import Notification
from app.schemas import NotificationCreate

def create_notification(db: Session, data: NotificationCreate):
    notif = Notification(**data.dict())
    db.add(notif)
    db.commit()
    db.refresh(notif)
    return notif

def get_notifications(db: Session):
    return db.query(Notification).order_by(Notification.timestamp.desc()).all()
