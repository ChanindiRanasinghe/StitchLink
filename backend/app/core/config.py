from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "StitchLink API"
    app_version: str = "1.0.0"
    database_url: str = ""
    jwt_secret: str = ""

    class Config:
        env_file = "backend/.env"


settings = Settings()