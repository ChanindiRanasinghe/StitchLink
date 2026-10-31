from datetime import datetime, timedelta
from app.db.session import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.user import User, UserRole, ShopProfile, DressmakerProfile
from app.models.order import Order, OrderStatus, GarmentCategory
from app.models.bid import Bid, BidStatus
from app.models.review import Review

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(User).count() > 0:
        print("Database already contains data, skipping seed.")
        db.close()
        return

    print("Seeding StitchLink marketplace data...")

    # 1. Create Shops
    shop1 = User(
        email="colombo_threads@stitchlink.lk",
        hashed_password=get_password_hash("password123"),
        full_name="Niroshan Perera",
        phone_number="+94 77 123 4567",
        role=UserRole.SHOP,
        is_active=True,
        is_verified=True,
    )
    db.add(shop1)
    db.flush()

    shop1_profile = ShopProfile(
        user_id=shop1.id,
        business_name="Colombo Boutique Threads",
        business_registration_number="PV102938",
        address="45 Galle Road, Bambalapitiya",
        city="Colombo",
    )
    db.add(shop1_profile)

    shop2 = User(
        email="kandy_cottons@stitchlink.lk",
        hashed_password=get_password_hash("password123"),
        full_name="Kavinda Jayasuriya",
        phone_number="+94 81 222 3344",
        role=UserRole.SHOP,
        is_active=True,
        is_verified=True,
    )
    db.add(shop2)
    db.flush()

    shop2_profile = ShopProfile(
        user_id=shop2.id,
        business_name="Hill Country Apparel",
        business_registration_number="PV556677",
        address="12 Dalada Veediya",
        city="Kandy",
    )
    db.add(shop2_profile)

    # 2. Create Dressmakers
    dm1 = User(
        email="shanthi.tailor@stitchlink.lk",
        hashed_password=get_password_hash("password123"),
        full_name="Shanthi Menike",
        phone_number="+94 71 555 1212",
        role=UserRole.DRESSMAKER,
        is_active=True,
        is_verified=True,
    )
    db.add(dm1)
    db.flush()

    dm1_profile = DressmakerProfile(
        user_id=dm1.id,
        display_name="Shanthi Tailoring & Finishing",
        experience_years=12,
        bio="Specialist in ladies linen frocks, modern batik blouses, and intricate overlock stitching. Equipped with Juki high-speed and 4-thread overlock machines.",
        city="Maharagama",
    )
    db.add(dm1_profile)

    dm2 = User(
        email="ruwan.apparel@stitchlink.lk",
        hashed_password=get_password_hash("password123"),
        full_name="Ruwan Kumara",
        phone_number="+94 76 888 9900",
        role=UserRole.DRESSMAKER,
        is_active=True,
        is_verified=True,
    )
    db.add(dm2)
    db.flush()

    dm2_profile = DressmakerProfile(
        user_id=dm2.id,
        display_name="Ruwan Garment Works",
        experience_years=8,
        bio="Expert in men's formal shirts, collar bonding, and uniform tailoring. Capacity for 100-250 pieces per week.",
        city="Kurunegala",
    )
    db.add(dm2_profile)

    db.commit()

    # 3. Create Orders
    order1 = Order(
        shop_id=shop1.id,
        title="50 Pieces Pure Linen Summer Frocks",
        description="Premium linen summer dresses with pocket detailing and mother-of-pearl buttons. Fabric and patterns pre-cut and provided in Colombo.",
        category=GarmentCategory.FROCKS_DRESSES,
        quantity=50,
        target_budget_lkr=42500.0,
        deadline=datetime.utcnow() + timedelta(days=14),
        fabric_provided="SHOP_PROVIDES",
        location_district="Colombo",
        status=OrderStatus.OPEN,
    )
    db.add(order1)

    order2 = Order(
        shop_id=shop1.id,
        title="120 Men's Casual Mandarin Collar Shirts",
        description="Lightweight breathable cotton mandarin collar shirts in 4 sizes (S, M, L, XL). Roll of fabric provided with tech packs.",
        category=GarmentCategory.SHIRTS,
        quantity=120,
        target_budget_lkr=96000.0,
        deadline=datetime.utcnow() + timedelta(days=21),
        fabric_provided="SHOP_PROVIDES",
        location_district="Colombo",
        status=OrderStatus.OPEN,
    )
    db.add(order2)

    order3 = Order(
        shop_id=shop2.id,
        title="80 Hand-Dyed Batik Wrap Skirts & Crop Tops",
        description="Authentic Ceylon hand-waxed batik fabric sets. Needs neat blind hem and seamless waistbands.",
        category=GarmentCategory.BATIK_WEAR,
        quantity=80,
        target_budget_lkr=76000.0,
        deadline=datetime.utcnow() + timedelta(days=18),
        fabric_provided="SHOP_PROVIDES",
        location_district="Kandy",
        status=OrderStatus.OPEN,
    )
    db.add(order3)

    db.commit()

    # 4. Create Bids
    bid1 = Bid(
        order_id=order1.id,
        dressmaker_id=dm1.id,
        bid_amount_lkr=40000.0,
        delivery_days=10,
        sample_offered="I can stitch 1 sample dress within 24 hours for pattern fit inspection.",
        proposal_notes="Using Juki industrial machine. Guaranteed clean inner lining and French seams.",
        status=BidStatus.PENDING,
    )
    db.add(bid1)

    bid2 = Bid(
        order_id=order2.id,
        dressmaker_id=dm2.id,
        bid_amount_lkr=92000.0,
        delivery_days=16,
        sample_offered="Sample shirt ready in 48 hours.",
        proposal_notes="Experience with retail brands in Colombo. Button-holing and pressing included.",
        status=BidStatus.PENDING,
    )
    db.add(bid2)

    db.commit()
    print("Seed completed successfully!")
    db.close()

if __name__ == "__main__":
    seed()
