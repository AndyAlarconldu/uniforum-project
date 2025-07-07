from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import PostVote
from app.schemas import VoteCreate
from fastapi import HTTPException

def create_vote(db: Session, data: VoteCreate):
    existing_vote = db.query(PostVote).filter_by(student_id=data.student_id, post_id=data.post_id).first()
    if existing_vote:
        raise HTTPException(status_code=400, detail="El estudiante ya votó sobre este post.")
    vote = PostVote(**data.dict())
    db.add(vote)
    db.commit()
    db.refresh(vote)
    return vote

def get_post_score(db: Session, post_id: str):
    upvotes = db.query(func.count()).filter(PostVote.post_id == post_id, PostVote.vote_type == "upvote").scalar()
    downvotes = db.query(func.count()).filter(PostVote.post_id == post_id, PostVote.vote_type == "downvote").scalar()
    return {
        "post_id": post_id,
        "score": upvotes - downvotes,
        "upvotes": upvotes,
        "downvotes": downvotes
    }

def get_votes_by_student(db: Session, student_id: str):
    return db.query(PostVote).filter_by(student_id=student_id).all()
