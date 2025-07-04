from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Enrollment(Base):
    __tablename__ = "enrollment"

    id_enrollment = Column(String, primary_key=True, index=True)
    student_id = Column(String, nullable=False)
    course_id = Column(String, nullable=False)
    enrollment_date = Column(DateTime(timezone=True), server_default=func.now())
