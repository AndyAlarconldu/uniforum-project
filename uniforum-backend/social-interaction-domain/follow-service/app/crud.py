from sqlalchemy.orm import Session
from . import models, schemas

def create_follow(db: Session, follow: schemas.FollowCreate):
    db_follow = models.Follow(**follow.dict())
    db.add(db_follow)
    db.commit()
    db.refresh(db_follow)
    return db_follow

def unfollow(db: Session, follower_id, followee_id):
    follow = db.query(models.Follow).filter_by(follower_id=follower_id, followee_id=followee_id).first()
    if follow:
        db.delete(follow)
        db.commit()

def get_followers(db: Session, user_id):
    return db.query(models.Follow).filter_by(followee_id=user_id).all()

def get_following(db: Session, user_id):
    return db.query(models.Follow).filter_by(follower_id=user_id).all()
