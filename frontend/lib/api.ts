import type { UserRole, User, Order, Message, ReviewSubmission } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const AUTH_STORAGE_KEY = "stitchlink-auth";

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

function toApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const isAbsoluteUrl = /^https?:\/\//i.test(normalizedPath);

  if (isAbsoluteUrl) {
    return normalizedPath;
  }

  return `${API_URL}/api/v1${normalizedPath}`;
}

export function getAuthToken(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("stitchlink-token") ?? "";
}

export function setAuthToken(token: string, role: UserRole, name: string): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("stitchlink-token", token);
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token,
      role,
      name,
    })
  );
}

export function getStoredUser(): { name: string; role: UserRole } {
  if (typeof window === "undefined") {
    return { name: "", role: "SHOP" };
  }

  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return { name: "", role: "SHOP" };
    }

    const parsed = JSON.parse(raw) as { name?: string; role?: UserRole };
    return { name: parsed.name ?? "", role: parsed.role ?? "SHOP" };
  } catch {
    return { name: "", role: "SHOP" };
  }
}

export function logout(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("stitchlink-token");
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.location.href = "/login";
}

export async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  const token = getAuthToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(toApiUrl(path), {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = "Request failed";

    try {
      const payload = await response.json();
      if (payload && typeof payload.detail === "string") {
        message = payload.detail;
      } else if (payload && typeof payload.message === "string") {
        message = payload.message;
      } else if (payload && typeof payload.error === "string") {
        message = payload.error;
      }
    } catch {
      message = `Request failed (${response.status})`;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

export async function getOrderDetails(orderId: string): Promise<Order> {
  return fetchApi<Order>(`/orders/${orderId}`);
}

export async function updateOrderStatus(orderId: number, status: string): Promise<Order> {
  return fetchApi<Order>(`/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function getOrderMessages(orderId: string): Promise<Message[]> {
  return fetchApi<Message[]>(`/messages/order/${orderId}`);
}

export async function sendMessage(orderId: number, content: string): Promise<Message> {
  return fetchApi<Message>(`/messages/order/${orderId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function submitReview(payload: ReviewSubmission): Promise<void> {
  await fetchApi(`/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function checkBackendHealth() {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) {
    throw new Error("Backend health check failed");
  }
  return response.json();
}

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

export type { User, Order, Message, ReviewSubmission, Bid, UserRole } from "@/lib/types";
