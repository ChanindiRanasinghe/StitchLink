from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.db.session import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, index=True, nullable=False)
    quantity = Column(Integer, nullable=False)
    budget_lkr = Column(Float, nullable=False)
    location = Column(String, nullable=False)
    status = Column(String, default="Pending") # Pending, Assigned, In Production, Completed
    created_at = Column(DateTime, default=datetime.utcnow)
