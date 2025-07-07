from sqlalchemy.orm import Session
from app.models import Comment  # SQLAlchemy Comment model
from app.schemas import CommentCreate  # Pydantic schema for comment creation

def create_comment(db: Session, data: CommentCreate):
    """
    Creates a new comment in the database.
    
    Args:
        db: SQLAlchemy database session
        data: Validated comment data (CommentCreate schema)
        
    Returns:
        The newly created Comment object with database-generated fields
        
    Process:
        1. Converts Pydantic model to dictionary
        2. Creates SQLAlchemy Comment instance
        3. Adds to session and commits transaction
        4. Refreshes to get database-generated values (like timestamps)
    """
    comment = Comment(**data.dict())  # Convert Pydantic model to ORM model
    db.add(comment)  # Add to current session
    db.commit()  # Persist to database
    db.refresh(comment)  # Refresh to load any database defaults/relationships
    return comment

def get_comments_by_post(db: Session, post_id: str):
    """
    Retrieves all comments for a specific post, ordered chronologically.
    
    Args:
        db: SQLAlchemy database session
        post_id: ID of the post to get comments for
        
    Returns:
        List of Comment objects ordered by creation date (oldest first)
        
    Notes:
        - Uses ascending order (oldest comments first)
        - Returns empty list if no comments exist
        - Includes all comment fields including relationships
    """
    return (
        db.query(Comment)
        .filter(Comment.post_id == post_id)  # Filter by post ID
        .order_by(Comment.comment_date.asc())  # Oldest comments first
        .all()  # Execute query and get all results
    )