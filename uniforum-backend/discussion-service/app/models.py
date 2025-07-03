# Importing necessary SQLAlchemy components
from sqlalchemy import Column, String, Text, DateTime  # Column types for database schema
from sqlalchemy.sql import func  # SQL functions (for default datetime)
from app.database import Base  # Base class for declarative model definition

# Database model for Post table
class Post(Base):
    # Specify the table name in the database
    __tablename__ = "post"

    # Columns definition:
    
    # Primary key column with string type
    # index=True creates an index for faster lookups
    id_post = Column(String, primary_key=True, index=True)
    
    # Title column with maximum length of 255 characters
    # nullable=False means this field is required
    title = Column(String(255), nullable=False)
    
    # Content column with Text type (for longer text content)
    # nullable=False means this field is required
    content = Column(Text, nullable=False)
    
    # Post date column with DateTime type TESTEo
    # server_default=func.now() sets the default to current timestamp
    # (automatically set by the database when record is created)
    post_date = Column(DateTime, server_default=func.now())
    
    # Student ID column (foreign key reference to student table)
    # nullable=False means this field is required
    student_id = Column(String, nullable=False)