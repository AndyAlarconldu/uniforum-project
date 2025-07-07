from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, schemas, database
from uuid import UUID

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.FollowOut)
def follow_user(follow: schemas.FollowCreate, db: Session = Depends(get_db)):
    return crud.create_follow(db, follow)

@router.delete("/{followee_id}")
def unfollow_user(followee_id: UUID, follower_id: UUID, db: Session = Depends(get_db)):
    crud.unfollow(db, follower_id, followee_id)
    return {"detail": "Unfollowed"}

@router.get("/followers/{user_id}", response_model=list[schemas.FollowOut])
def get_followers(user_id: UUID, db: Session = Depends(get_db)):
    return crud.get_followers(db, user_id)

@router.get("/following/{user_id}", response_model=list[schemas.FollowOut])
def get_following(user_id: UUID, db: Session = Depends(get_db)):
    return crud.get_following(db, user_id)
