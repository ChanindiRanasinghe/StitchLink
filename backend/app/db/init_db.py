from app.db.session import engine, Base
# Import all models so SQLAlchemy registers them before create_all
from app.models import User, UserRole, ShopProfile, DressmakerProfile  # noqa: F401
from app.models import Order, OrderStatus, GarmentCategory              # noqa: F401
from app.models import Bid, BidStatus                                    # noqa: F401
from app.models import Review                                            # noqa: F401


def init_db() -> None:
    """Create all database tables if they do not exist."""
    Base.metadata.create_all(bind=engine)
