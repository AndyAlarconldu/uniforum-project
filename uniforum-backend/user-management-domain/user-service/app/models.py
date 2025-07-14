from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from .database import Base

class Student(Base):
    __tablename__ = "student"

    id_student = Column(String, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    registration_date = Column(TIMESTAMP)
    university_id = Column(String, ForeignKey("university.id_university"))
