from pydantic import BaseModel

class CourseCreate(BaseModel):
    id_course: str
    name: str
    description: str
    university_id: str

class CourseOut(CourseCreate):
    model_config = {
        "from_attributes": True
    }
