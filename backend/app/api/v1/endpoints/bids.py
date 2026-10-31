from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.models.order import Order, OrderStatus
from app.models.bid import Bid, BidStatus
from app.schemas.bid import BidCreate, BidRead, BidUpdateStatus
from app.api.deps import get_current_user, get_current_dressmaker_user

router = APIRouter()

@router.post("/", response_model=BidRead, status_code=status.HTTP_201_CREATED)
def place_bid(
    bid_in: BidCreate,
    current_user: User = Depends(get_current_dressmaker_user),
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == bid_in.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Garment order not found")
    if order.status != OrderStatus.OPEN:
        raise HTTPException(status_code=400, detail="This order is no longer accepting bids")

    # Check for existing bid
    existing_bid = db.query(Bid).filter(
        Bid.order_id == bid_in.order_id,
        Bid.dressmaker_id == current_user.id
    ).first()
    if existing_bid:
        raise HTTPException(status_code=400, detail="You have already submitted a bid for this order")

    bid = Bid(
        order_id=bid_in.order_id,
        dressmaker_id=current_user.id,
        bid_amount_lkr=bid_in.bid_amount_lkr,
        delivery_days=bid_in.delivery_days,
        sample_offered=bid_in.sample_offered,
        proposal_notes=bid_in.proposal_notes,
        status=BidStatus.PENDING,
    )
    db.add(bid)
    db.commit()
    db.refresh(bid)
    return bid

@router.get("/order/{order_id}", response_model=List[BidRead])
def list_bids_for_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # If user is shop owner, they can see all bids. If dressmaker, they see their own.
    if current_user.id == order.shop_id or current_user.role == "ADMIN":
        bids = db.query(Bid).filter(Bid.order_id == order_id).order_by(Bid.created_at.asc()).all()
    else:
        bids = db.query(Bid).filter(
            Bid.order_id == order_id,
            Bid.dressmaker_id == current_user.id
        ).all()
    return bids

@router.get("/my-bids", response_model=List[BidRead])
def get_my_bids(
    current_user: User = Depends(get_current_dressmaker_user),
    db: Session = Depends(get_db),
):
    bids = db.query(Bid).filter(Bid.dressmaker_id == current_user.id).order_by(Bid.created_at.desc()).all()
    return bids

@router.patch("/{bid_id}/accept", response_model=BidRead)
def accept_bid(
    bid_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    bid = db.query(Bid).filter(Bid.id == bid_id).first()
    if not bid:
        raise HTTPException(status_code=404, detail="Bid not found")
    
    order = db.query(Order).filter(Order.id == bid.order_id).first()
    if order.shop_id != current_user.id and current_user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Only the shop owner can accept a bid")

    bid.status = BidStatus.ACCEPTED
    order.status = OrderStatus.ASSIGNED

    # Mark other bids for this order as REJECTED
    db.query(Bid).filter(
        Bid.order_id == order.id,
        Bid.id != bid.id,
        Bid.status == BidStatus.PENDING
    ).update({"status": BidStatus.REJECTED})

    db.commit()
    db.refresh(bid)
    return bid
