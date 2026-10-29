const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

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
