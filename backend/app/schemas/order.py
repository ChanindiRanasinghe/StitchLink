from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.order import OrderStatus, GarmentCategory

class OrderBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: GarmentCategory = GarmentCategory.SHIRTS
    quantity: int
    target_budget_lkr: float
    deadline: Optional[datetime] = None
    fabric_provided: Optional[str] = "SHOP_PROVIDES"
    location_district: Optional[str] = "Colombo"

class OrderCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    category: GarmentCategory
    quantity: int = Field(..., ge=1, le=10000)
    target_budget_lkr: float = Field(..., ge=100.0)
    deadline: Optional[datetime] = None
    fabric_provided: Optional[str] = "SHOP_PROVIDES"
    location_district: Optional[str] = "Colombo"

class OrderUpdate(BaseModel):
title: Optional[str] = Field(None, min_length=3, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    quantity: Optional[int] = Field(None, ge=1, le=10000)
    target_budget_lkr: Optional[float] = Field(None, ge=100.0)
    status: Optional[OrderStatus] = None

class OrderShopBrief(BaseModel):
    id: int
    full_name: str
    phone_number: Optional[str] = None

    class Config:
        from_attributes = True

class OrderRead(OrderBase):
    id: int
    shop_id: int
    status: OrderStatus
    created_at: Optional[datetime] = None
    shop: Optional[OrderShopBrief] = None
    bids_count: Optional[int] = 0

    class Config:
        from_attributes = True
