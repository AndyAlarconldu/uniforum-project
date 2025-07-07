from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import VoteCreate, VoteOut
from app.crud import create_vote, get_post_score, get_votes_by_student

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=VoteOut)
def vote(data: VoteCreate, db: Session = Depends(get_db)):
    return create_vote(db, data)

@router.get("/post/{post_id}")
def post_score(post_id: str, db: Session = Depends(get_db)):
    return get_post_score(db, post_id)

@router.get("/student/{student_id}", response_model=list[VoteOut])
def votes_by_student(student_id: str, db: Session = Depends(get_db)):
    return get_votes_by_student(db, student_id)
