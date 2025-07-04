from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class FollowCreate(BaseModel):
    follower_id: UUID
    followee_id: UUID

class FollowOut(BaseModel):
    id: UUID
    follower_id: UUID
    followee_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
