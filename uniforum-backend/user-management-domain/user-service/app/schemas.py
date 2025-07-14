from pydantic import BaseModel, EmailStr
from datetime import datetime

class StudentOut(BaseModel):
    id_student: str
    first_name: str
    last_name: str
    email: EmailStr
    registration_date: datetime | None
    university_id: str | None

    class Config:
        orm_mode = True
