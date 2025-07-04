from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="UniForum - Password Service")

app.include_router(router, prefix="/password", tags=["Password"])
