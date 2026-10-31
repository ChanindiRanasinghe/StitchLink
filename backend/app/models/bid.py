import enum
from sqlalchemy import Column, Integer, Float, Text, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class BidStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    WITHDRAWN = "WITHDRAWN"

class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    dressmaker_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    bid_amount_lkr = Column(Float, nullable=False)
    delivery_days = Column(Integer, nullable=False) # Estimated production days
    sample_offered = Column(Text, nullable=True)     # "Will stitch 1 sample piece in 2 days"
    proposal_notes = Column(Text, nullable=True)     # Notes on sewing machinery / capacity
    status = Column(Enum(BidStatus), default=BidStatus.PENDING, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    order = relationship("Order", back_populates="bids")
    dressmaker = relationship("User", backref="bids_placed")
