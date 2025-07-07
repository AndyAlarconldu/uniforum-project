# Importing necessary modules
from fastapi import APIRouter, Depends  # APIRouter for routing, Depends for dependency injection
from sqlalchemy.orm import Session      # SQLAlchemy Session for database operations
from app.database import SessionLocal   # Local database session factory
from app.schemas import PostCreate, PostOut  # Pydantic schemas for request/response
from app.crud import create_post, get_posts  # CRUD operations for posts

# Create an APIRouter instance to define routes
router = APIRouter()

# Dependency function to get a database session
def get_db():
    # Create a new database session
    db = SessionLocal()
    try:
        # Yield the session for use in the route
        yield db
    finally:
        # Ensure the session is closed after use
        db.close()

# Route for creating a new post (POST request)
@router.post("/", response_model=PostOut)  # Response will be validated against PostOut schema
def create(data: PostCreate, db: Session = Depends(get_db)):
    # Delegate post creation to the CRUD function
    return create_post(db, data)

# Route for listing all posts (GET request)
@router.get("/", response_model=list[PostOut])  # Response will be a list of PostOut objects
def list_all(db: Session = Depends(get_db)):
    # Delegate post retrieval to the CRUD function
    return get_posts(db)