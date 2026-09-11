from fastapi import FastAPI

from backend.app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    description="Backend API for the StitchLink marketplace",
    version=settings.app_version,
)


@app.get("/")
def root():
    return {
        "message": "Welcome to StitchLink API",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.app_name,
    }