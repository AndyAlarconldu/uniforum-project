from sqlalchemy.orm import Session
from app.models import ModerationReport
from app.schemas import ReportCreate, ReportResolve
from datetime import datetime

def create_report(db: Session, data: ReportCreate):
    """
    Creates a new moderation report in the database.
    
    Args:
        db: SQLAlchemy database session
        data: ReportCreate schema containing report data
        
    Returns:
        The newly created ModerationReport object
    """
    # Convert Pydantic model to dict and unpack into ModerationReport
    report = ModerationReport(**data.dict())
    db.add(report)
    db.commit()
    db.refresh(report)  # Refresh to get updated values from DB
    return report

def get_all_reports(db: Session):
    """
    Retrieves all moderation reports from the database.
    
    Args:
        db: SQLAlchemy database session
        
    Returns:
        List of all ModerationReport objects
    """
    return db.query(ModerationReport).all()

def get_pending_reports(db: Session):
    """
    Retrieves only pending moderation reports (status = 'PENDING').
    
    Args:
        db: SQLAlchemy database session
        
    Returns:
        List of pending ModerationReport objects
    """
    return db.query(ModerationReport).filter(ModerationReport.status == "PENDING").all()

def resolve_report(db: Session, report_id: str, data: ReportResolve):
    """
    Updates a report's status to either approved or rejected.
    
    Args:
        db: SQLAlchemy database session
        report_id: ID of the report to resolve
        data: ReportResolve schema containing resolution data
        
    Returns:
        The updated ModerationReport object or None if not found
    """
    # Find the report by ID
    report = db.query(ModerationReport).filter_by(id_report=report_id).first()
    
    if report:
        # Update report fields
        report.status = data.status
        report.reviewed_by = data.reviewed_by
        report.resolution_date = datetime.utcnow()  # Set current UTC time
        
        db.commit()
        db.refresh(report)
        
    return report