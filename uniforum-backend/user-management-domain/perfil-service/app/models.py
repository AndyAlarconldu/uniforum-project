from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class University(Base):
    __tablename__ = "university"

    id_university = Column(String, primary_key=True)
    name = Column(String)
    city = Column(String)
    type = Column(String)

class Student(Base):
    __tablename__ = "student"

    id_student = Column(String, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    password = Column(String)
    registration_date = Column(TIMESTAMP)
    university_id = Column(String, ForeignKey("university.id_university"))

    university = relationship("University")
