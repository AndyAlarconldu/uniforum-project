from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models import Tag, PostTag
from app.schemas import TagCreate, PostTagCreate

def create_tag(db: Session, tag: TagCreate):
    db_tag = db.query(Tag).filter_by(name=tag.name).first()
    if db_tag:
        raise HTTPException(status_code=400, detail="Tag ya existe")
    new_tag = Tag(**tag.dict())
    db.add(new_tag)
    db.commit()
    db.refresh(new_tag)
    return new_tag

def assign_tag_to_post(db: Session, data: PostTagCreate):
    exists = db.query(PostTag).filter_by(id_post=data.id_post, id_tag=data.id_tag).first()
    if exists:
        raise HTTPException(status_code=400, detail="Etiqueta ya asignada al post")
    relation = PostTag(**data.dict())
    db.add(relation)
    db.commit()
    return relation

def get_tags_by_post(db: Session, id_post: str):
    return (
        db.query(Tag)
        .join(PostTag, Tag.id_tag == PostTag.id_tag)
        .filter(PostTag.id_post == id_post)
        .all()
    )

def get_all_tags(db: Session):
    return db.query(Tag).all()
