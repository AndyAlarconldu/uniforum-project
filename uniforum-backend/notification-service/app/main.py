from fastapi import FastAPI
from app.routes import notification

app = FastAPI(title="UniForum - Notification Service")

app.include_router(notification.router, prefix="/notifications", tags=["Notifications"])
