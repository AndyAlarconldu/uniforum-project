from sqlalchemy import Column, String, Table, ForeignKey
from app.database import Base

class Tag(Base):
    __tablename__ = "tag"
    id_tag = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

class PostTag(Base):
    __tablename__ = "post_tag"
    id_post = Column(String, primary_key=True)
    id_tag = Column(String, primary_key=True)
