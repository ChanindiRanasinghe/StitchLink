# backend/app/api/v1/endpoints/messages.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.models.order import Order
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageRead
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/order/{order_id}", response_model=List[MessageRead])
def get_order_messages(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Authorize: Only order participants can view chat
    if current_user.id not in [order.shop_id, order.dressmaker_id] and current_user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Not authorized to access messages for this order")

    messages = (
        db.query(Message)
        .filter(Message.order_id == order_id)
        .order_by(Message.created_at.asc())
        .all()
    )

    # Attach sender_name dynamically
    result = []
    for m in messages:
        read_msg = MessageRead(
            id=m.id,
            order_id=m.order_id,
            sender_id=m.sender_id,
            sender_name=m.sender.full_name if hasattr(m.sender, 'full_name') else f"User #{m.sender_id}",
            content=m.content,
            created_at=m.created_at
        )
        result.append(read_msg)

    return result

@router.post("/order/{order_id}", response_model=MessageRead, status_code=status.HTTP_201_CREATED)
def send_message(
    order_id: int,
    message_in: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if current_user.id not in [order.shop_id, order.dressmaker_id] and current_user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Not authorized to message on this order")

    new_msg = Message(
        order_id=order_id,
        sender_id=current_user.id,
        content=message_in.content
    )
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)

    return MessageRead(
        id=new_msg.id,
        order_id=new_msg.order_id,
        sender_id=new_msg.sender_id,
        sender_name=current_user.full_name if hasattr(current_user, 'full_name') else "You",
        content=new_msg.content,
        created_at=new_msg.created_at
    )