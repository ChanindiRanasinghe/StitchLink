from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.user import UserRole

class ShopProfileRead(BaseModel):
    id: int
    business_name: str
    business_registration_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None

    class Config:
        from_attributes = True

class DressmakerProfileRead(BaseModel):
    id: int
    display_name: str
    experience_years: int = 0
    bio: Optional[str] = None
    city: Optional[str] = None

    class Config:
        from_attributes = True

class UserRead(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    phone_number: Optional[str] = None
    role: UserRole
    is_active: bool
    is_verified: bool
    created_at: Optional[datetime] = None
    shop_profile: Optional[ShopProfileRead] = None
    dressmaker_profile: Optional[DressmakerProfileRead] = None

    class Config:
        from_attributes = True
