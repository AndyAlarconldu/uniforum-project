from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReportCreate(BaseModel):
    """
    Schema for creating new moderation reports.
    Used for API request validation when submitting new reports.
    """
    id_report: str  # Unique identifier for the report
    content_type: str  # Type of content being reported (post, comment, etc)
    content_id: str  # ID of the specific content being reported
    reason: str  # Detailed reason for the report
    reported_by: str  # ID of the user submitting the report

class ReportResolve(BaseModel):
    """
    Schema for resolving moderation reports.
    Used for API request validation when moderators take action.
    """
    status: str  # Resolution status (e.g., "APPROVED", "REJECTED")
    reviewed_by: str  # ID of the moderator resolving the report

class ReportOut(ReportCreate):
    """
    Complete report schema for API responses.
    Extends ReportCreate with additional fields added during processing.
    Includes Pydantic configuration for ORM compatibility.
    """
    status: str  # Current status of the report
    reviewed_by: Optional[str]  # Moderator ID (null until resolved)
    report_date: datetime  # When the report was created
    resolution_date: Optional[datetime]  # When resolved (null if pending)

    # Configuration for Pydantic model behavior
    model_config = {
        "from_attributes": True  # Allows creating model from ORM objects
    }