# Import required SQLAlchemy components
from sqlalchemy import Column, String, Text, DateTime, ForeignKey  # Column types
from sqlalchemy.sql import func  # SQL functions (for default timestamps)
from app.database import Base  # Base class for declarative models

class Comment(Base):
    """
    Database model representing comments on forum posts.
    Tracks comment content, authorship, and timing.
    """
    
    # Database table name
    __tablename__ = "comment"

    # Primary key - unique identifier for each comment
    id_comment = Column(String, primary_key=True, index=True)  # index=True improves query performance
    
    # Comment content (Text type allows unlimited length)
    content = Column(Text, nullable=False)  # nullable=False enforces required field
    
    # Automatic timestamp when comment is created
    # Uses server_default with func.now() to set timestamp on database server
    # timezone=True ensures timezone awareness
    comment_date = Column(DateTime(timezone=True), server_default=func.now())
    
    # ID of the post this comment belongs to
    post_id = Column(String, nullable=False)  # Should reference posts.id_post
    
    # ID of the student who created the comment
    student_id = Column(String, nullable=False)  # Should reference users.student_id