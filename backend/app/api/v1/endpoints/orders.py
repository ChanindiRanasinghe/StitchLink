from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.models.order import Order, OrderStatus, GarmentCategory
from app.models.bid import Bid
from app.schemas.order import OrderCreate, OrderRead, OrderUpdate
from app.api.deps import get_current_user, get_current_shop_user

router = APIRouter()

@router.get("/", response_model=List[OrderRead])
def list_orders(
    category: Optional[GarmentCategory] = None,
    district: Optional[str] = None,
    status_filter: Optional[OrderStatus] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(Order)
    if category:
        query = query.filter(Order.category == category)
    if district:
        query = query.filter(Order.location_district.ilike(f"%{district}%"))
    if status_filter:
        query = query.filter(Order.status == status_filter)
    else:
        # By default in open marketplace show open orders
        query = query.filter(Order.status == OrderStatus.OPEN)

    orders = query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()
    
    # attach bids_count
    for o in orders:
        o.bids_count = db.query(Bid).filter(Bid.order_id == o.id).count()
    return orders

@router.post("/", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def create_order(
    order_in: OrderCreate,
    current_user: User = Depends(get_current_shop_user),
    db: Session = Depends(get_db),
):
    order = Order(
        shop_id=current_user.id,
        title=order_in.title,
        description=order_in.description,
        category=order_in.category,
        quantity=order_in.quantity,
        target_budget_lkr=order_in.target_budget_lkr,
        deadline=order_in.deadline,
        fabric_provided=order_in.fabric_provided,
        location_district=order_in.location_district,
        status=OrderStatus.OPEN,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    order.bids_count = 0
    return order

@router.get("/my-orders", response_model=List[OrderRead])
def get_my_shop_orders(
    current_user: User = Depends(get_current_shop_user),
    db: Session = Depends(get_db),
):
    orders = db.query(Order).filter(Order.shop_id == current_user.id).order_by(Order.created_at.desc()).all()
    for o in orders:
        o.bids_count = db.query(Bid).filter(Bid.order_id == o.id).count()
    return orders

@router.get("/{order_id}", response_model=OrderRead)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.bids_count = db.query(Bid).filter(Bid.order_id == order.id).count()
    return order

@router.patch("/{order_id}", response_model=OrderRead)
def update_order(
    order_id: int,
    order_update: OrderUpdate,
    current_user: User = Depends(get_current_shop_user),
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.shop_id != current_user.id and current_user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Not authorized to update this order")

    update_data = order_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(order, field, value)

    db.commit()
    db.refresh(order)
    order.bids_count = db.query(Bid).filter(Bid.order_id == order.id).count()
    return order
