from pydantic import BaseModel
from datetime import datetime

class HistoryCreate(BaseModel):
    id_history: str
    post_id: str
    title: str
    content: str
    edited_by: str

class HistoryOut(HistoryCreate):
    edited_at: datetime

    model_config = {
        "from_attributes": True
    }
