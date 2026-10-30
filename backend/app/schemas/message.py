# backend/app/schemas/message.py
from pydantic import BaseModel
from datetime import datetime

class MessageCreate(BaseModel):
    content: str

class MessageRead(BaseModel):
    id: int
    order_id: int
    sender_id: int
    sender_name: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True