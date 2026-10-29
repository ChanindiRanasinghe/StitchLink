from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.config import settings
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User, UserRole, ShopProfile, DressmakerProfile
from app.schemas.auth import (
    LoginRequest,
    ShopRegisterRequest,
    DressmakerRegisterRequest,
    Token,
)
from app.schemas.user import UserRead
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/register/shop", response_model=Token, status_code=status.HTTP_201_CREATED)
def register_shop(data: ShopRegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    user = User(
        email=data.email,
        hashed_password=get_password_hash(data.password),
        full_name=data.full_name,
        phone_number=data.phone_number,
        role=UserRole.SHOP,
        is_active=True,
    )
    db.add(user)
    db.flush()

    shop_profile = ShopProfile(
        user_id=user.id,
        business_name=data.business_name,
        business_registration_number=data.business_registration_number,
        address=data.address,
        city=data.city,
    )
    db.add(shop_profile)
    db.commit()
    db.refresh(user)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(subject=user.id, expires_delta=access_token_expires)

    return Token(
        access_token=token,
        token_type="bearer",
        role=user.role.value,
        user_id=user.id,
        full_name=user.full_name,
    )

@router.post("/register/dressmaker", response_model=Token, status_code=status.HTTP_201_CREATED)
def register_dressmaker(data: DressmakerRegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    user = User(
        email=data.email,
        hashed_password=get_password_hash(data.password),
        full_name=data.full_name,
        phone_number=data.phone_number,
        role=UserRole.DRESSMAKER,
        is_active=True,
    )
    db.add(user)
    db.flush()

    dm_profile = DressmakerProfile(
        user_id=user.id,
        display_name=data.display_name,
        experience_years=data.experience_years,
        bio=data.bio,
        city=data.city,
    )
    db.add(dm_profile)
    db.commit()
    db.refresh(user)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(subject=user.id, expires_delta=access_token_expires)

    return Token(
        access_token=token,
        token_type="bearer",
        role=user.role.value,
        user_id=user.id,
        full_name=user.full_name,
    )

@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Account is deactivated")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(subject=user.id, expires_delta=access_token_expires)

    return Token(
        access_token=token,
        token_type="bearer",
        role=user.role.value,
        user_id=user.id,
        full_name=user.full_name,
    )

@router.get("/me", response_model=UserRead)
def read_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user
