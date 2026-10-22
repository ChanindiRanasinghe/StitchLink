import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class UserRole(str, enum.Enum):
    SHOP = "SHOP"
    DRESSMAKER = "DRESSMAKER"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_order=True, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    phone_number = Column(String(50), nullable=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.SHOP)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    shop_profile = relationship("ShopProfile", back_populates="user", uselist=False)
    dressmaker_profile = relationship("DressmakerProfile", back_populates="user", uselist=False)


class ShopProfile(Base):
    __tablename__ = "shop_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    business_name = Column(String(255), nullable=False)
    business_registration_number = Column(String(100), nullable=True)
    address = Column(String(500), nullable=True)
    city = Column(String(100), nullable=True)

    user = relationship("User", back_populates="shop_profile")


class DressmakerProfile(Base):
    __tablename__ = "dressmaker_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    display_name = Column(String(255), nullable=False)
    experience_years = Column(Integer, default=0)
    bio = Column(String(1000), nullable=True)
    city = Column(String(100), nullable=True)

    user = relationship("User", back_populates="dressmaker_profile")