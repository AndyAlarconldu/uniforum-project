# Import required SQLAlchemy components
from sqlalchemy import create_engine  # Database engine for connection pooling
from sqlalchemy.orm import sessionmaker, declarative_base  # Session management and base model class
import os  # For accessing environment variables
from dotenv import load_dotenv  # For loading .env file

# Load environment variables from .env file
load_dotenv()

# Database connection configuration:
# Get DATABASE_URL from environment variables with a fallback default value
# Default configuration uses PostgreSQL with:
# - Username: uniforum_user
# - Password: uniforum123
# - Host: 172.31.4.157 (private IP address)
# - Port: 5432 (default PostgreSQL port)
# - Database name: uniforum
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://uniforum_user:1234@172.31.4.157:5432/uniforum")

# Create the database engine:
# - Manages connection pooling
# - Serves as the entry point for database operations
# - Uses the configured DATABASE_URL
engine = create_engine(DATABASE_URL)

# Configure session factory:
# - autocommit=False: Requires explicit commits (better transaction control)
# - autoflush=False: Requires explicit flushes (better performance control)
# - bind=engine: Associates sessions with our engine
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Create declarative base class:
# - All database models will inherit from this
# - Provides metaclass that registers models
# - Enables SQLAlchemy ORM functionality
Base = declarative_base()