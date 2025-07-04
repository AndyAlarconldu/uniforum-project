from fastapi import FastAPI
from app.routes import router
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="UniForum - Enrollment Service")
app.include_router(router, prefix="/enrollments", tags=["Enrollments"])
