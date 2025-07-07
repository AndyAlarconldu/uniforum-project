from sqlalchemy.orm import Session
from app.models import PostHistory
from app.schemas import HistoryCreate
from fastapi import HTTPException

def create_history(db: Session, data: HistoryCreate):
    history = PostHistory(**data.dict())
    db.add(history)
    db.commit()
    db.refresh(history)
    return history

def get_history_by_post(db: Session, post_id: str):
    return db.query(PostHistory).filter_by(post_id=post_id).order_by(PostHistory.edited_at.desc()).all()
