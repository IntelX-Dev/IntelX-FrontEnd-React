import { apiFetch } from "../api";

export interface LoginResponse {
  access_token?: string;
  [key: string]: unknown;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Login failed with status ${res.status}`);
  }

  return res.json();
}

export interface RegisterResponse {
  access_token?: string;
  refresh_token?: string;
  user?: unknown;
  [key: string]: unknown;
}

export async function register(email: string, password: string, firstName: string, lastName: string): Promise<RegisterResponse> {
  const payload = {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
  };

  const res = await apiFetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = await res.text().catch(() => "");
    if (!msg) msg = `Registration failed with status ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

// Logout function (POST /api/auth/logout)
export async function logout(accessToken: string, refreshToken?: string): Promise<any> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  };
  const body = refreshToken ? JSON.stringify({ refresh_token: refreshToken }) : undefined;
  const res = await apiFetch("/api/auth/logout", {
    method: "POST",
    headers,
    ...(body ? { body } : {}),
  });
  return res.json();
}

// Get current user info (GET /api/auth/me)
export async function getCurrentUser(accessToken: string): Promise<any> {
  const headers = {
    "Authorization": `Bearer ${accessToken}`,
  };
  const res = await apiFetch("/api/auth/me", {
    method: "GET",
    headers,
  });
  return res.json();
}

// Refresh access token (POST /api/auth/refresh)
export async function refreshAccessToken(refreshToken: string): Promise<any> {
  const res = await apiFetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  return res.json();
}

