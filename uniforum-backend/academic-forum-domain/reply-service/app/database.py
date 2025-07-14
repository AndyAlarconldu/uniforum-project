# Import required SQLAlchemy components
from sqlalchemy import create_engine  # For database connection pooling
from sqlalchemy.orm import sessionmaker, declarative_base  # For session and model management
import os  # For accessing environment variables
from dotenv import load_dotenv  # For loading .env file configurations

# Load environment variables from .env file (if exists)
load_dotenv()

# Database connection configuration:
# 1. First tries to get DATABASE_URL from environment variables
# 2. Falls back to default PostgreSQL connection if not found
# Default configuration contains:
# - Username: uniforum_user
# - Password: uniforum123 
# - Host: 172.31.4.157 (private IP)
# - Port: 5432 (default PostgreSQL port)
# - Database name: uniforum
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://uniforum_user:1234@107.20.72.252:5432/uniforum"
)

# Create database engine:
# - Handles connection pooling
# - Manages database connections
# - Converts Python objects to SQL statements
engine = create_engine(DATABASE_URL)

# Configure session factory:
# - autocommit=False: Requires explicit transaction commits
# - autoflush=False: Gives more control over when changes are sent to DB
# - bind=engine: Associates sessions with our connection pool
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False, 
    bind=engine
)

# Create declarative base class:
# - All SQLAlchemy models will inherit from this
# - Provides metaclass that registers models
# - Enables ORM functionality for model classes
Base = declarative_base()