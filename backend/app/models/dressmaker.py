from sqlalchemy import Column, Integer, String, Float, Boolean, JSON
from app.db.session import Base

class DressmakerProfile(Base):
    __tablename__ = "dressmakers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    district = Column(String, index=True, nullable=False)
    distance_km = Column(Float, default=0.0)
    skills = Column(JSON, default=[])       # e.g., ["Pattern Cutting", "Embroidery"]
    categories = Column(JSON, default=[])   # e.g., ["Frock", "Saree"]
    rating = Column(Float, default=5.0)
    completed_orders = Column(Integer, default=0)
    verified = Column(Boolean, default=True)
    ai_match_score = Column(Integer, default=90)
