from pydantic import BaseModel
from datetime import datetime

class EnrollmentCreate(BaseModel):
    id_enrollment: str
    student_id: str
    course_id: str

class EnrollmentOut(EnrollmentCreate):
    enrollment_date: datetime

    model_config = {
        "from_attributes": True
    }
