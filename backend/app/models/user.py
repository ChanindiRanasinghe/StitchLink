from sqlalchemy import Column, Integer, String, Boolean, Enum
import enum
from app.db.session import Base

class UserRole(str, enum.Enum):
    SHOP = "shop"
    DRESSMAKER = "dressmaker"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_order=True, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, default=UserRole.SHOP.value)
    is_active = Column(Boolean, default=True)
