from sqlalchemy.orm import Session
from app.models import Post
from app.schemas import PostCreate
import requests
import os

# function in charge of creating publications
def create_post(db: Session, data: PostCreate):
    post = Post(**data.dict())
    db.add(post)
    db.commit()
    db.refresh(post)

    # Llamar a ranking-service para actualizar stats
    try:
        RANKING_SERVICE_URL = os.getenv("RANKING_SERVICE_URL", "http://host.docker.internal:8019")
        requests.post(
            f"{RANKING_SERVICE_URL}/update/{post.student_id}",
            json={
                "post_count": 1,         # suma 1 publicación
                "reply_count": 0,        # 0 porque es un post, no una respuesta
                "likes_received": 0,     # no se ha votado aún
                "reputation": 0          # puedes calcularla después
            },
            timeout=3
        )
    except Exception as e:
        print(f"⚠️ Error al actualizar ranking-service: {e}")

    return post
# Function in charge of obtaining publications
def get_posts(db: Session):
    return db.query(Post).order_by(Post.post_date.desc()).all()
