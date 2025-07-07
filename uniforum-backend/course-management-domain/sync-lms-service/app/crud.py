from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import models, schemas

async def create_sync_record(db: AsyncSession, sync: schemas.SyncCreate):
    record = models.SyncRecord(**sync.dict())
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return record

async def get_all_syncs(db: AsyncSession):
    result = await db.execute(select(models.SyncRecord).order_by(models.SyncRecord.synced_at.desc()))
    return result.scalars().all()
