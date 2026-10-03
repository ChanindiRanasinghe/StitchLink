const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ==========================================
// 1. TypeScript Data Models (Interfaces)
// ==========================================

export interface Dressmaker {
  id: number;
  name: string;
  district: string;
  distance_km: number;
  skills: string[];
  categories: string[];
  rating: number;
  completed_orders: number;
  verified: boolean;
  ai_match_score: number;
}

export interface CategoryValidationRequest {
  title: string;
  selected_category: string;
  description?: string;
}

export interface CategoryValidationResponse {
  status: string;
  mismatch_detected: boolean;
  selected_category: string;
  suggested_category: string;
  warning_message: string;
  confidence_score: number;
}

export interface PricingAssistantRequest {
  category: string;
  quantity: number;
  deadline_days: number;
}

export interface PricingAssistantResponse {
  status: string;
  category: string;
  quantity: number;
  suggested_price_min_lkr: number;
  suggested_price_max_lkr: number;
  currency: string;
  explanation: string;
}

export interface ProductionRiskResponse {
  status: string;
  order_id: string;
  risk_level: string;
  delay_probability: number;
  risk_factors: string[];
  recommended_action: string;
}

// ==========================================
// 2. API Helper Functions
// ==========================================

/**
 * Checks backend server health status
 */
export async function checkBackendHealth() {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) {
    throw new Error("Backend health check failed");
  }
  return response.json();
}

/**
 * Fetches dressmakers list from backend with optional filters
 */
export async function fetchDressmakers(
  district?: string,
  category?: string,
  maxDistanceKm: number = 50
): Promise<{ status: string; count: number; data: Dressmaker[] }> {
  const params = new URLSearchParams();
  if (district) params.append("district", district);
  if (category) params.append("category", category);
  if (maxDistanceKm) params.append("max_distance_km", maxDistanceKm.toString());

  const response = await fetch(`${API_URL}/api/v1/dressmakers?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch dressmakers");
  }
  return response.json();
}

/**
 * Validates selected garment category against title and description using AI
 */
export async function validateCategory(
  data: CategoryValidationRequest
): Promise<CategoryValidationResponse> {
  const response = await fetch(`${API_URL}/api/v1/ai/validate-category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to validate category");
  }
  return response.json();
}

/**
 * Gets AI pricing recommendations based on category, volume, and urgency
 */
export async function getSuggestedPricing(
  data: PricingAssistantRequest
): Promise<PricingAssistantResponse> {
  const response = await fetch(`${API_URL}/api/v1/ai/pricing-assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch pricing suggestion");
  }
  return response.json();
}

/**
 * Evaluates production delay risk for an order
 */
export async function checkProductionRisk(
  orderId: string
): Promise<ProductionRiskResponse> {
  const response = await fetch(
    `${API_URL}/api/v1/ai/production-risk?order_id=${encodeURIComponent(orderId)}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to check production risk");
  }
  return response.json();
}
