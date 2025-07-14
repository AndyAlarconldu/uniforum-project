from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
class FollowCreate(BaseModel):
    follower_id: str
    followee_id: str

class FollowOut(BaseModel):
    id: UUID
    follower_id: UUID
    followee_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            UUID: lambda u: str(u)
        }
