from fastapi import APIRouter
from app.api.v1.endpoints import auth, orders, bids, users

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders"])
api_router.include_router(bids.router, prefix="/bids", tags=["Bids"])
api_router.include_router(users.router, prefix="/users", tags=["Users & Reviews"])
