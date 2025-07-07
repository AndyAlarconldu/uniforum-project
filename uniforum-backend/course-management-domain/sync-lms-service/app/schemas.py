from pydantic import BaseModel
from datetime import datetime

class SyncCreate(BaseModel):
    lms_name: str
    status: str
    details: str = None

class SyncOut(SyncCreate):
    id: int
    synced_at: datetime

    class Config:
        orm_mode = True
