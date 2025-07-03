# Importing necessary modules
from pydantic import BaseModel  # BaseModel for creating data models/schemas
from datetime import datetime   # datetime for handling date/time fields

# Define a schema/model for creating a post
class PostCreate(BaseModel):
    # Fields required when creating a post:
    id_post: str       # Unique identifier for the post
    title: str         # Title of the post
    content: str       # Main content/text of the post
    student_id: str    # ID of the student who created the post

# Define a schema/model for outputting post data (inherits from PostCreate)
class PostOut(PostCreate):
    # Adds an additional field to the inherited PostCreate fields
    post_date: datetime  # Date/time when the post was created

    # Configuration for the model
    model_config = {
        # Enables ORM mode (allows creating model from ORM objects/attributes)
        # Previously called 'orm_mode' in older Pydantic versions
        "from_attributes": True  
    }