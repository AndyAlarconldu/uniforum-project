# Import FastAPI core class
from fastapi import FastAPI

# Import the router from our routes module
from app.routes import router

# Import database Base and engine for metadata creation
from app.database import Base, engine

# Import CORS middleware for cross-origin requests
from fastapi.middleware.cors import CORSMiddleware

# Create all database tables based on the models
# This creates the tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application with a title
app = FastAPI(
    title="UniForum - Discussion Service"  
)

# Configure CORS (Cross-Origin Resource Sharing) middleware
# This allows frontend applications to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development)
    # For production, specify exact origins like ["http://localhost:5173"]
    allow_credentials=True,  # Allows cookies and authentication headers
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Include our router with:
# - Prefix "/discussions" for all routes
# - Tag "Discussions" for API documentation grouping
app.include_router(router, prefix="/discussions", tags=["Discussions"])