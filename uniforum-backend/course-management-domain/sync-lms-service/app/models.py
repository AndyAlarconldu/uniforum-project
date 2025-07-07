from sqlalchemy import Column, String, Integer, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class SyncRecord(Base):
    __tablename__ = "sync_records"

    id = Column(Integer, primary_key=True, index=True)
    lms_name = Column(String, nullable=False)
    status = Column(String, nullable=False)  # success, failed
    synced_at = Column(DateTime(timezone=True), server_default=func.now())
    details = Column(String)
