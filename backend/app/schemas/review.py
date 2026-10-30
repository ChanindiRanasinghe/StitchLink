# backend/app/schemas/review.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ReviewCreate(BaseModel):
    order_id: int
    reviewee_id: Optional[int] = None
    rating: int = Field(..., ge=1, le=5)
    stitching_quality_rating: Optional[int] = Field(None, ge=1, le=5)
    timeliness_rating: Optional[int] = Field(None, ge=1, le=5)
    comment: Optional[str] = None

class ReviewRead(BaseModel):
    id: int
    order_id: int
    reviewer_id: int
    reviewee_id: int
    rating: int
    stitching_quality_rating: Optional[int] = None
    timeliness_rating: Optional[int] = None
    comment: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True