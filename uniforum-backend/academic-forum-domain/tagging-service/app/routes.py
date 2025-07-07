from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import TagCreate, TagOut, PostTagCreate
from app.crud import create_tag, assign_tag_to_post, get_tags_by_post, get_all_tags

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=TagOut)
def create(tag: TagCreate, db: Session = Depends(get_db)):
    return create_tag(db, tag)

@router.post("/assign")
def assign(data: PostTagCreate, db: Session = Depends(get_db)):
    return assign_tag_to_post(db, data)

@router.get("/post/{id_post}")
def tags_by_post(id_post: str, db: Session = Depends(get_db)):
    return get_tags_by_post(db, id_post)

@router.get("/", response_model=list[TagOut])
def all_tags(db: Session = Depends(get_db)):
    return get_all_tags(db)
