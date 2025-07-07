from pydantic import BaseModel
from datetime import datetime

class VoteCreate(BaseModel):
    id_vote: str
    student_id: str
    post_id: str
    vote_type: str  # 'upvote' o 'downvote'

class VoteOut(VoteCreate):
    vote_date: datetime

    model_config = {
        "from_attributes": True
    }
