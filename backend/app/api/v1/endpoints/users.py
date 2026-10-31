# backend/app/api/v1/endpoints/users.py
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.models.user import User, UserRole, DressmakerProfile
from app.models.order import Order
from app.models.review import Review
from app.schemas.user import UserRead
from app.schemas.review import ReviewCreate, ReviewRead
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/dressmakers", response_model=List[UserRead])
def list_dressmakers(
    city: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(User).filter(User.role == UserRole.DRESSMAKER, User.is_active == True)
    if city:
        query = query.join(DressmakerProfile).filter(DressmakerProfile.city.ilike(f"%{city}%"))
    return query.all()

@router.get("/dressmakers/{user_id}", response_model=UserRead)
def get_dressmaker_profile(
    user_id: int,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id, User.role == UserRole.DRESSMAKER).first()
    if not user:
        raise HTTPException(status_code=404, detail="Dressmaker not found")
    return user

@router.post("/reviews", response_model=ReviewRead, status_code=status.HTTP_201_CREATED)
def create_review(
    review_in: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == review_in.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    existing_review = db.query(Review).filter(Review.order_id == review_in.order_id).first()
    if existing_review:
        raise HTTPException(status_code=400, detail="A review has already been submitted for this order")

    # Determine dressmaker target ID dynamically if not passed directly
    reviewee_id = review_in.reviewee_id or getattr(order, "dressmaker_id", None)
    if not reviewee_id:
        raise HTTPException(status_code=400, detail="No assigned dressmaker found for this order to review")

    # Map overall rating to quality and timeliness if specific sub-ratings aren't provided
    quality_score = review_in.stitching_quality_rating or review_in.rating
    timeliness_score = review_in.timeliness_rating or review_in.rating

    review = Review(
        order_id=review_in.order_id,
        reviewer_id=current_user.id,
        reviewee_id=review