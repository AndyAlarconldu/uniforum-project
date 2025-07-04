from fastapi import FastAPI
from app.routes import perfil

app = FastAPI(title="UniForum - Gestión de Perfiles")

app.include_router(perfil.router, prefix="/perfil", tags=["Perfiles"])
