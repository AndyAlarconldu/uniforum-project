# Import FastAPI core components
from fastapi import FastAPI
# Import router from application routes
from app.routes import router
# Import database Base and engine for metadata operations
from app.database import Base, engine
# Import CORS middleware for cross-origin requests
from fastapi.middleware.cors import CORSMiddleware

# Create all database tables based on SQLAlchemy models
# This will generate tables if they don't exist in the database
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application with service title
app = FastAPI(title="UniForum - Moderation Service")

# Configure Cross-Origin Resource Sharing (CORS) middleware
# This allows frontend applications to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits requests from any origin (restrict in production)
    allow_credentials=True,  # Allows cookies and authentication headers
    allow_methods=["*"],  # Permits all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Permits all request headers
)

# Include the router with:
# - Prefix "/reports" for all endpoints
# - Tag "Moderation Reports" for API documentation grouping
app.include_router(
    router,
    prefix="/reports",  # All routes will be prefixed with /reports
    tags=["Moderation Reports"]  # Groups routes in API docs
)