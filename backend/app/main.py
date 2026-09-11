from fastapi import FastAPI

app = FastAPI(
    title="StitchLink API",
    description="Backend API for the StitchLink marketplace",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to StitchLink API",
        "status": "running"
    }