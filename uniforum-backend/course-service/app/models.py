from sqlalchemy import Column, String
from app.database import Base

class Course(Base):
    __tablename__ = "course"

    id_course = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    university_id = Column(String, nullable=False)
