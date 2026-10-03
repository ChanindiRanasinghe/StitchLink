from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from pydantic import BaseModel

app = FastAPI(
    title="StitchLink API",
    description="Backend B2B Garment Sourcing & AI Engine API for StitchLink Marketplace",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Schemas ---
class CategoryValidationRequest(BaseModel):
    title: str
    selected_category: str
    description: Optional[str] = None

class PricingAssistantRequest(BaseModel):
    category: str
    quantity: int
    deadline_days: int

class OrderRequestCreate(BaseModel):
    title: str
    category: str
    quantity: int
    budget: float
    location: str

# --- Mock Database Data ---
MOCK_DRESSMAKERS = [
    {
        "id": 1,
        "name": "Nisansala Ranasinghe",
        "district": "Kandy",
        "distance_km": 12,
        "skills": ["Pattern Cutting", "Silk Finishing", "Embroidery"],
        "categories": ["Frock", "Saree", "Blouse"],
        "rating": 4.9,
        "completed_orders": 34,
        "verified": True,
        "ai_match_score": 98,
    },
    {
        "id": 2,
        "name": "Kanthi Perera",
        "district": "Colombo",
        "distance_km": 4,
        "skills": ["Industrial Sewing", "Speed Stitching"],
        "categories": ["Uniform", "Trouser", "Shirt"],
        "rating": 4.8,
        "completed_orders": 52,
        "verified": True,
        "ai_match_score": 94,
    },
    {
        "id": 3,
        "name": "Fathima Rizwana",
        "district": "Galle",
        "distance_km": 8,
        "skills": ["Linen Resortwear", "Hand Stitching"],
        "categories": ["Frock", "Resortwear"],
        "rating": 4.9,
        "completed_orders": 28,
        "verified": True,
        "ai_match_score": 91,
    },
]

# --- Endpoints ---

@app.get("/")
def root():
    return {
        "message": "Welcome to StitchLink B2B Marketplace API",
        "status": "running",
        "version": "1.0.0",
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "StitchLink Backend API"}

@app.get("/api/v1/dressmakers")
def get_dressmakers(
    district: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    max_distance_km: Optional[int] = Query(50),
):
    results = MOCK_DRESSMAKERS
    if district:
        results = [d for d in results if d["district"].lower() == district.lower()]
    if category and category != "All":
        results = [d for d in results if category in d["categories"]]
    return {"status": "success", "count": len(results), "data": results}

@app.post("/api/v1/ai/validate-category")
def validate_category(req: CategoryValidationRequest):
    """
    AI Category Validation Engine: checks if title/description match selected garment category.
    """
    title_lower = req.title.lower()
    selected_lower = req.selected_category.lower()
    
    # Check mismatch example (e.g. title mentions 'trouser' but selected 'frock')
    mismatch_detected = False
    suggested_category = req.selected_category
    
    if selected_lower == "frock" and "trouser" in title_lower:
        mismatch_detected = True
        suggested_category = "Trouser"
    elif selected_lower == "shirt" and "frock" in title_lower:
        mismatch_detected = True
        suggested_category = "Frock"

    return {
        "status": "success",
        "mismatch_detected": mismatch_detected,
        "selected_category": req.selected_category,
        "suggested_category": suggested_category,
        "warning_message": (
            f"The title contains '{suggested_category}' but your selected category is '{req.selected_category}'."
            if mismatch_detected else "Category relevance validated cleanly."
        ),
        "confidence_score": 0.94 if mismatch_detected else 0.99,
    }

@app.post("/api/v1/ai/pricing-assistant")
def pricing_assistant(req: PricingAssistantRequest):
    """
    AI Pricing Assistant: calculates recommended LKR price range per unit based on volume & urgency.
    """
    base_price = 4000.0
    if req.category.lower() == "uniform":
        base_price = 2000.0
    elif req.category.lower() == "saree":
        base_price = 7500.0

    # Quantity discount calculation
    quantity_factor = 1.0 - min(req.quantity / 500.0, 0.25)
    estimated_min = round(base_price * quantity_factor, -2)
    estimated_max = round(estimated_min * 1.15, -2)

    return {
        "status": "success",
        "category": req.category,
        "quantity": req.quantity,
        "suggested_price_min_lkr": estimated_min,
        "suggested_price_max_lkr": estimated_max,
        "currency": "LKR",
        "explanation": f"Recommended for {req.quantity} units of {req.category} based on Sri Lanka market rates.",
    }

@app.post("/api/v1/ai/production-risk")
def production_risk_check(order_id: str):
    """
    AI Production Risk Analytics: predicts delay likelihood.
    """
    return {
        "status": "success",
        "order_id": order_id,
        "risk_level": "Medium Risk",
        "delay_probability": 0.28,
        "risk_factors": ["Workload bottleneck", "Local weather disruption"],
        "recommended_action": "Extend deadline by 2 days or split batch with a nearby dressmaker in Kandy.",
    }