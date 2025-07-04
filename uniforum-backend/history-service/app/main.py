from fastapi import FastAPI
from app.routes import router
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="UniForum - History Service")
app.include_router(router, prefix="/history", tags=["History"])
