from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ReviewCreate(BaseModel):
    order_id: int
    reviewee_id: int
    rating: float = Field(..., ge=1.0, le=5.0)
    stitching_quality_rating: Optional[float] = Field(None, ge=1.0, le=5.0)
    timeliness_rating: Optional[float] = Field(None, ge=1.0, le=5.0)
    comment: Optional[str] = None

class ReviewRead(BaseModel):
    id: int
    order_id: int
    reviewer_id: int
    reviewee_id: int
    rating: float
    stitching_quality_rating: Optional[float] = None
    timeliness_rating: Optional[float] = None
    comment: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
