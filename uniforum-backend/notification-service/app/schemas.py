from pydantic import BaseModel
from datetime import datetime

class NotificationCreate(BaseModel):
    recipient: str
    subject: str
    message: str

class NotificationOut(NotificationCreate):
    id: int
    timestamp: datetime

    model_config = {
        "from_attributes": True
    }
