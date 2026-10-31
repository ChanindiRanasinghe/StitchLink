from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.bid import BidStatus

class BidBase(BaseModel):
    bid_amount_lkr: float
    delivery_days: int
    sample_offered: Optional[str] = None
    proposal_notes: Optional[str] = None

class BidCreate(BidBase):
    order_id: int

class BidUpdateStatus(BaseModel):
    status: BidStatus

class DressmakerBrief(BaseModel):
    id: int
    full_name: str
    phone_number: Optional[str] = None

    class Config:
        from_attributes = True

class BidRead(BidBase):
    id: int
    order_id: int
    dressmaker_id: int
    status: BidStatus
    created_at: Optional[datetime] = None
    dressmaker: Optional[DressmakerBrief] = None

    class Config:
        from_attributes = True
