# Append to backend/app/api/v1/endpoints/orders.py

import os
import shutil
from pydantic import BaseModel
from fastapi import UploadFile, File

# Pydantic Schema for updating status
class OrderStatusUpdate(BaseModel):
    new_status: OrderStatus

# Transition rules for status machine
VALID_TRANSITIONS = {
    OrderStatus.OPEN: [OrderStatus.ASSIGNED, OrderStatus.CANCELLED],
    OrderStatus.ASSIGNED: [OrderStatus.IN_PRODUCTION, OrderStatus.CANCELLED],
    OrderStatus.IN_PRODUCTION: [OrderStatus.COMPLETED],
    OrderStatus.COMPLETED: [OrderStatus.DELIVERED],
}

@router.patch("/{order_id}/status", response_model=OrderRead)
def update_order_status(
    order_id: int,
    status_update: OrderStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Only shop owner or assigned dressmaker can advance the status
    if current_user.id not in [order.shop_id, order.dressmaker_id] and current_user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Not authorized to change status for this order")

    allowed_next_states = VALID_TRANSITIONS.get(order.status, [])
    if status_update.new_status not in allowed_next_states:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot transition order status from {order.status.value} to {status_update.new_status.value}"
        )

    order.status = status_update.new_status
    db.commit()
    db.refresh(order)
    order.bids_count = db.query(Bid).filter(Bid.order_id == order.id).count()
    return order


@router.post("/{order_id}/upload-image")
def upload_order_image(
    order_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_shop_user),
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.shop_id != current_user.id and current_user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Not authorized to upload images for this order")

    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/order_{order_id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    order.image_url = f"/{file_path}"
    db.commit()
    return {"image_url": order.image_url}