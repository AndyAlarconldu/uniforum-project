from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from . import schemas, crud
from .database import get_db

router = APIRouter()

@router.post("/sync", response_model=schemas.SyncOut)
async def sync_lms(sync: schemas.SyncCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_sync_record(db, sync)

@router.get("/sync", response_model=list[schemas.SyncOut])
async def list_syncs(db: AsyncSession = Depends(get_db)):
    return await crud.get_all_syncs(db)
