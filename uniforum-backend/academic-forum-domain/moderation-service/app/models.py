# Import required SQLAlchemy components
from sqlalchemy import Column, String, Text, DateTime  # Database column types
from sqlalchemy.sql import func  # SQL functions (for default timestamps)
from app.database import Base  # Base class for declarative models

class ModerationReport(Base):
    """
    Database model for moderation reports tracking system.
    Tracks user reports of inappropriate content with resolution workflow.
    """
    
    # Database table name
    __tablename__ = "moderation_report"

    # Primary key - Unique report identifier
    id_report = Column(String, primary_key=True, index=True)  # index=True improves query performance
    
    # Type of content being reported (post, comment, etc)
    content_type = Column(String, nullable=False)  # nullable=False enforces required field
    
    # ID of the content being reported (references posts/comments table)
    content_id = Column(String, nullable=False)
    
    # Detailed reason for the report
    reason = Column(Text, nullable=False)  # Text type allows longer content
    
    # Report status (PENDING/APPROVED/REJECTED)
    status = Column(String, default="PENDING")  # Default status when created
    
    # ID of user who submitted the report
    reported_by = Column(String, nullable=False)
    
    # ID of moderator who resolved the report (nullable until resolved)
    reviewed_by = Column(String, nullable=True)
    
    # Automatic timestamp when report is created (uses database server time)
    report_date = Column(DateTime(timezone=True), server_default=func.now())
    
    # Timestamp when report was resolved (null until action taken)
    resolution_date = Column(DateTime(timezone=True), nullable=True)