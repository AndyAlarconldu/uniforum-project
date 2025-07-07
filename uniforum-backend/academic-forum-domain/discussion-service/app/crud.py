from sqlalchemy.orm import Session
from app.models import Post
from app.schemas import PostCreate
# function in charge of creating publications
def create_post(db: Session, data: PostCreate):
    post = Post(**data.dict())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post
# Function in charge of obtaining publications
def get_posts(db: Session):
    return db.query(Post).order_by(Post.post_date.desc()).all()
