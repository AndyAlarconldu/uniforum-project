from fastapi import FastAPI
from app.routes import router
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
Base.metadata.create_all(bind=engine)

app = FastAPI(title="UniForum - History Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin (restrict in production)
    allow_credentials=True,  # Permits cookies and authentication headers
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all request headers
)
app.include_router(router, prefix="/history", tags=["History"])
