import enum
from sqlalchemy import Column, Integer, String, Float, Text, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class OrderStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    OPEN = "OPEN"                 # Accepting bids from dressmakers
    ASSIGNED = "ASSIGNED"         # Bid awarded, sample/production starting
    IN_PRODUCTION = "IN_PRODUCTION" # Sewing under way
    COMPLETED = "COMPLETED"       # Batch delivered and verified
    CANCELLED = "CANCELLED"

class GarmentCategory(str, enum.Enum):
    SHIRTS = "SHIRTS"
    FROCKS_DRESSES = "FROCKS_DRESSES"
    TROUSERS_PANTS = "TROUSERS_PANTS"
    BLOUSES = "BLOUSES"
    SCHOOL_UNIFORMS = "SCHOOL_UNIFORMS"
    BATIK_WEAR = "BATIK_WEAR"
    TRADITIONAL_SAREES = "TRADITIONAL_SAREES"
    CHILDRENS_WEAR = "CHILDRENS_WEAR"
    OTHER = "OTHER"

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    shop_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(Enum(GarmentCategory), default=GarmentCategory.SHIRTS, nullable=False)
    quantity = Column(Integer, nullable=False)
    target_budget_lkr = Column(Float, nullable=False)
    deadline = Column(DateTime, nullable=True)
    fabric_provided = Column(String(100), default="SHOP_PROVIDES") # SHOP_PROVIDES / DRESSMAKER_SOURCES
    location_district = Column(String(100), default="Colombo")
    status = Column(Enum(OrderStatus), default=OrderStatus.OPEN, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    shop = relationship("User", backref="orders_created")
    bids = relationship("Bid", back_populates="order", cascade="all, delete-orphan")
