from fastapi import FastAPI
from .routes import router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin (restrict in production)
    allow_credentials=True,  # Permits cookies and authentication headers
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all request headers
)
app.include_router(router)
