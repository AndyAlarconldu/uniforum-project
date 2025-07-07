# Import FastAPI components
from fastapi import APIRouter, Depends  # Router and dependency injection
from sqlalchemy.orm import Session  # Database session type
from app.database import SessionLocal  # Database session factory
from app.schemas import CommentCreate, CommentOut  # Pydantic schemas
from app.crud import create_comment, get_comments_by_post  # Database operations

# Create API router instance
router = APIRouter()

def get_db():
    """
    Dependency that provides a database session.
    Ensures the session is properly closed after request completion.
    """
    db = SessionLocal()  # Create new session
    try:
        yield db  # Provide session to route handler
    finally:
        db.close()  # Always close session after use

@router.post("/", response_model=CommentOut)
def create(data: CommentCreate, db: Session = Depends(get_db)):
    """
    Create a new comment.
    
    Args:
        data: Validated comment data (CommentCreate schema)
        db: Database session (injected dependency)
        
    Returns:
        The created comment (validated against CommentOut schema)
    """
    return create_comment(db, data)

@router.get("/post/{post_id}", response_model=list[CommentOut])
def get_by_post(post_id: str, db: Session = Depends(get_db)):
    """
    Get all comments for a specific post.
    
    Args:
        post_id: ID of the post to get comments for
        db: Database session (injected dependency)
        
    Returns:
        List of comments (validated against CommentOut schema)
    """
    return get_comments_by_post(db, post_id)