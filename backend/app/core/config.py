from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = 'StitchLink API'
    API_V1_STR: str = '/api/v1'
    SECRET_KEY: str = 'supersecretkey_change_in_production'
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    DATABASE_URL: str = 'postgresql+pg8000://postgres:postgres@localhost:5432/stitchlink_db'

    class Config:
        env_file = '.env'
        case_sensitive = True

settings = Settings()