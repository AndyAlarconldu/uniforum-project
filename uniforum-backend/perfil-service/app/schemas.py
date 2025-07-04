from pydantic import BaseModel
from datetime import datetime

class University(BaseModel):
    id_university: str
    name: str
    city: str
    type: str

    model_config = {
        "from_attributes": True
    }

class StudentPerfil(BaseModel):
    id_student: str
    first_name: str
    last_name: str
    email: str
    registration_date: datetime
    university: University

    model_config = {
        "from_attributes": True
    }

class PerfilEditable(BaseModel):
    first_name: str
    last_name: str
    email: str
