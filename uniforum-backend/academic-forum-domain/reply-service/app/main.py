# Import core FastAPI components
from fastapi import FastAPI
# Import the router containing your API endpoints
from app.routes import router
# Import database Base class and engine for table creation
from app.database import Base, engine
# Import CORS middleware for cross-origin requests
from fastapi.middleware.cors import CORSMiddleware

# Create all database tables defined in your SQLAlchemy models
# This automatically generates tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application with service title
app = FastAPI(title="UniForum - Reply Service")

# Configure Cross-Origin Resource Sharing (CORS) middleware
# This allows frontend applications to interact with your API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin (restrict in production)
    allow_credentials=True,  # Permits cookies and authentication headers
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all request headers
)

# Include your API router with:
# - Prefix "/replies" for all endpoints
# - Tag "Replies" for OpenAPI/Swagger documentation grouping
app.include_router(
    router,
    prefix="/replies",  # All routes will be prefixed with /replies
    tags=["Replies"]  # Groups related endpoints in API docs
)