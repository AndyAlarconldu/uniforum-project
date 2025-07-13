from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import PostCreate, PostOut
from app.crud import create_post, get_posts
import requests  # <-- usar requests en lugar de httpx para simplificar

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PostOut)
def create(data: PostCreate, db: Session = Depends(get_db)):
    created_post = create_post(db, data)
    try:
        payload = {
            "post_count": 1,
            "reply_count": 0,
            "likes_received": 0,
            "reputation": 0
        }
        # Puedes usar también una variable de entorno si deseas configurarlo dinámicamente
        RANKING_URL = f"http://host.docker.internal:8019/update/{created_post.student_id}"
        response = requests.post(RANKING_URL, json=payload)
        print(f"✅ Ranking service response: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"⚠️ Error al conectar con ranking-service: {e}")

    return created_post

@router.get("/", response_model=list[PostOut])
def list_all(db: Session = Depends(get_db)):
    return get_posts(db)
