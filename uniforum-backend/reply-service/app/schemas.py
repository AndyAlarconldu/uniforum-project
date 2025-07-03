from pydantic import BaseModel
from datetime import datetime

class CommentCreate(BaseModel):
    """
    Schema for creating new comments.
    Used for API request validation when submitting comments.
    
    Fields:
        id_comment: Unique identifier for the comment (should be generated)
        content: The text content of the comment
        post_id: ID of the post this comment belongs to
        student_id: ID of the student making the comment
    """
    id_comment: str  # Should use UUID or other unique identifier
    content: str  # Main comment text (consider length limits in production)
    post_id: str  # Reference to the parent post
    student_id: str  # Reference to comment author

class CommentOut(CommentCreate):
    """
    Complete comment schema for API responses.
    Extends CommentCreate with additional database-managed fields.
    
    Fields:
        Inherits all CommentCreate fields
        comment_date: Automatic timestamp when comment was created
    """
    comment_date: datetime  # Automatically set by database on creation

    # Configuration for ORM compatibility
    model_config = {
        "from_attributes": True  # Allows conversion from SQLAlchemy models
    }