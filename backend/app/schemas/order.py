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

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[GarmentCategory] = None
    quantity: Optional[int] = None
    target_budget_lkr: Optional[float] = None
    deadline: Optional[datetime] = None
    fabric_provided: Optional[str] = None
    location_district: Optional[str] = None
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
