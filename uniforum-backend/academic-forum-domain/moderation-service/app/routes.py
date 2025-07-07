# Import FastAPI components
from fastapi import APIRouter, Depends, HTTPException
# Database session handling
from sqlalchemy.orm import Session
# Local database session factory
from app.database import SessionLocal
# Pydantic schemas for request/response validation
from app.schemas import ReportCreate, ReportResolve, ReportOut
# Database operations
from app.crud import create_report, get_all_reports, get_pending_reports, resolve_report

# Create API router with default configuration
router = APIRouter()

# Database dependency - creates and manages database sessions
def get_db():
    """
    Generator function that provides database sessions.
    Ensures sessions are properly closed after request completion.
    """
    db = SessionLocal()
    try:
        yield db  # Provides session to route handlers
    finally:
        db.close()  # Always closes session after use

# Endpoint to create new reports
@router.post("/", response_model=ReportOut)
def create(data: ReportCreate, db: Session = Depends(get_db)):
    """
    Creates a new content moderation report.
    
    Args:
        data: ReportCreate schema with report details
        db: Active database session
        
    Returns:
        The created report (validated against ReportOut schema)
    """
    return create_report(db, data)

# Endpoint to get all reports
@router.get("/", response_model=list[ReportOut])
def all_reports(db: Session = Depends(get_db)):
    """
    Retrieves all moderation reports (pending and resolved).
    
    Args:
        db: Active database session
        
    Returns:
        List of all reports (validated against ReportOut schema)
    """
    return get_all_reports(db)

# Endpoint to get pending reports
@router.get("/pending", response_model=list[ReportOut])
def pending_reports(db: Session = Depends(get_db)):
    """
    Retrieves only pending moderation reports (status = 'PENDING').
    
    Args:
        db: Active database session
        
    Returns:
        List of pending reports (validated against ReportOut schema)
    """
    return get_pending_reports(db)

# Endpoint to resolve reports
@router.put("/{report_id}/resolve", response_model=ReportOut)
def resolve(report_id: str, data: ReportResolve, db: Session = Depends(get_db)):
    """
    Resolves a moderation report by approving or rejecting it.
    
    Args:
        report_id: ID of the report to resolve
        data: Resolution details (status and reviewer info)
        db: Active database session
        
    Returns:
        The resolved report (validated against ReportOut schema)
        
    Raises:
        HTTPException 404: If report is not found
    """
    result = resolve_report(db, report_id, data)
    if not result:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
            headers={"X-Error": "Invalid report ID"}
        )
    return result