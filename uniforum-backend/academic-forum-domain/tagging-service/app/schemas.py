from pydantic import BaseModel

class TagCreate(BaseModel):
    id_tag: str
    name: str

class TagOut(TagCreate):
    model_config = {
        "from_attributes": True
    }

class PostTagCreate(BaseModel):
    id_post: str
    id_tag: str
