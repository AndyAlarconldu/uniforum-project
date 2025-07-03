from sqlalchemy import Column, String, DateTime, ForeignKey, CheckConstraint
from sqlalchemy.sql import func
from app.database import Base

class PostVote(Base):
    __tablename__ = "post_vote"

    id_vote = Column(String, primary_key=True, index=True)
    student_id = Column(String, nullable=False)
    post_id = Column(String, nullable=False)
    vote_type = Column(String, nullable=False)
    vote_date = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("vote_type IN ('upvote', 'downvote')", name="check_vote_type"),
    )
