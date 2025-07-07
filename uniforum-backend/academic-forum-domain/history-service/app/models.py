from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base

class PostHistory(Base):
    __tablename__ = "post_history"

    id_history = Column(String, primary_key=True, index=True)
    post_id = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    edited_by = Column(String, nullable=False)
    edited_at = Column(DateTime(timezone=True), server_default=func.now())
