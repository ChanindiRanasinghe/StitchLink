export type UserRole = "SHOP" | "DRESSMAKER" | "ADMIN";

export interface ShopProfile {
  id: number;
  business_name: string;
  business_registration_number?: string;
  address?: string;
  city?: string;
}

export interface DressmakerProfile {
  id: number;
  display_name: string;
  experience_years: number;
  bio?: string;
  city?: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number?: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  shop_profile?: ShopProfile;
  dressmaker_profile?: DressmakerProfile;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  role: UserRole;
  user_id: number;
  full_name: string;
}

export type OrderStatus = "DRAFT" | "OPEN" | "ASSIGNED" | "IN_PRODUCTION" | "COMPLETED" | "CANCELLED";

export type GarmentCategory =
  | "SHIRTS"
  | "FROCKS_DRESSES"
  | "TROUSERS_PANTS"
  | "BLOUSES"
  | "SCHOOL_UNIFORMS"
  | "BATIK_WEAR"
  | "TRADITIONAL_SAREES"
  | "CHILDRENS_WEAR"
  | "OTHER";

export interface Order {
  id: number;
  shop_id: number;
  title: string;
  description?: string;
  category: GarmentCategory;
  quantity: number;
  target_budget_lkr: number;
  deadline?: string;
  fabric_provided?: string;
  location_district?: string;
  status: OrderStatus;
  created_at?: string;
  bids_count?: number;
  shop?: {
    id: number;
    full_name: string;
    phone_number?: string;
  };
}

export type BidStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";

export interface Bid {
  id: number;
  order_id: number;
  dressmaker_id: number;
  bid_amount_lkr: number;
  delivery_days: number;
  sample_offered?: string;
  proposal_notes?: string;
  status: BidStatus;
  created_at?: string;
  dressmaker?: {
    id: number;
    full_name: string;
    phone_number?: string;
  };
}
