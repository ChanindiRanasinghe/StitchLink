// frontend/lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// ---------------------------------------------------------------------------
// Auth Helpers & Base Fetcher
// ---------------------------------------------------------------------------

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("stitchlink_token");
}

export function setAuthToken(token: string, role: string, name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("stitchlink_token", token);
  localStorage.setItem("stitchlink_role", role);
  localStorage.setItem("stitchlink_name", name);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("stitchlink_token");
  localStorage.removeItem("stitchlink_role");
  localStorage.removeItem("stitchlink_name");
}

export function getStoredUser(): { token: string | null; role: string | null; name: string | null } {
  if (typeof window === "undefined") {
    return { token: null, role: null, name: null };
  }
  return {
    token: localStorage.getItem("stitchlink_token"),
    role: localStorage.getItem("stitchlink_role"),
    name: localStorage.getItem("stitchlink_name"),
  };
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = `HTTP Error: ${res.status}`;
    try {
      const errorData = await res.json();
      errorMsg = errorData.detail || errorMsg;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Order Models & Operations
// ---------------------------------------------------------------------------

export interface Order {
  id: number;
  shop_id: number;
  dressmaker_id?: number;
  title: string;
  description?: string;
  category: string;
  quantity: number;
  target_budget_lkr: number;
  deadline?: string;
  fabric_provided?: string;
  location_district?: string;
  image_url?: string;
  status: 'DRAFT' | 'OPEN' | 'ASSIGNED' | 'IN_PRODUCTION' | 'COMPLETED' | 'DELIVERED' | 'CANCELLED';
  bids_count?: number;
  created_at: string;
}

export async function getOrderDetails(orderId: string | number): Promise<Order> {
  return fetchApi<Order>(`/orders/${orderId}`);
}

export async function updateOrderStatus(orderId: number, newStatus: string): Promise<Order> {
  return fetchApi<Order>(`/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ new_status: newStatus }),
  });
}

export async function uploadOrderImage(orderId: number, file: File): Promise<{ image_url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  return fetchApi<{ image_url: string }>(`/orders/${orderId}/upload-image`, {
    method: 'POST',
    body: formData,
  });
}

// ---------------------------------------------------------------------------
// Messaging Models & Operations
// ---------------------------------------------------------------------------

export interface Message {
  id: number;
  order_id: number;
  sender_id: number;
  sender_name: string;
  content: string;
  created_at: string;
}

export async function getOrderMessages(orderId: string | number): Promise<Message[]> {
  return fetchApi<Message[]>(`/messages/order/${orderId}`);
}

export async function sendMessage(orderId: string | number, content: string): Promise<Message> {
  return fetchApi<Message>(`/messages/order/${orderId}`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

// ---------------------------------------------------------------------------
// Review Models & Operations
// ---------------------------------------------------------------------------

export interface Review {
  id: number;
  order_id: number;
  reviewer_id: number;
  reviewee_id: number;
  rating: number;
  stitching_quality_rating?: number;
  timeliness_rating?: number;
  comment?: string;
  created_at: string;
}

export async function submitReview(data: {
  order_id: number;
  reviewee_id?: number;
  rating: number;
  stitching_quality_rating?: number;
  timeliness_rating?: number;
  comment?: string;
}): Promise<Review> {
  return fetchApi<Review>('/users/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}