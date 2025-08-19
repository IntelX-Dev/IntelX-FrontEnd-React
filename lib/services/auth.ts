import { apiFetch } from "../api";

export interface LoginResponse {
  access_token?: string;
  [key: string]: unknown;
}

export async function login(email: string, password: string): Promise<any> {
  const res = await apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errorMessage = "Login failed. Please try again.";
    
    try {
      const errorData = await res.json();
      const message = errorData.message || errorData.error || "";
      
      // Handle specific error cases
      if (res.status === 401) {
        if (message.toLowerCase().includes('password')) {
          errorMessage = "Incorrect password. Please try again.";
        } else if (message.toLowerCase().includes('email') || message.toLowerCase().includes('user')) {
          errorMessage = "No account found with this email address.";
        } else {
          errorMessage = "Invalid email or password. Please check your credentials.";
        }
      } else if (res.status === 400) {
        if (message.toLowerCase().includes('email')) {
          errorMessage = "Please enter a valid email address.";
        } else if (message.toLowerCase().includes('validation')) {
          errorMessage = "Please check your email and password format.";
        } else {
          errorMessage = "Invalid input. Please check your email and password.";
        }
      } else if (res.status === 404) {
        errorMessage = "No account found with this email address.";
      } else if (res.status === 429) {
        errorMessage = "Too many login attempts. Please try again later.";
      } else if (res.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }
    } catch (e) {
      // If we can't parse the error response, use status-based messages
      if (res.status === 401) {
        errorMessage = "Invalid email or password. Please check your credentials.";
      } else if (res.status === 400) {
        errorMessage = "Invalid input. Please check your email and password.";
      } else if (res.status === 404) {
        errorMessage = "No account found with this email address.";
      }
    }
    
    throw new Error(errorMessage);
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
    let errorMessage = "Registration failed. Please try again.";
    
    try {
      const errorData = await res.json();
      const message = errorData.message || errorData.error || "";
      
      // Handle specific error cases
      if (res.status === 400) {
        if (message.toLowerCase().includes('email') && message.toLowerCase().includes('exists')) {
          errorMessage = "An account with this email already exists. Please try logging in instead.";
        } else if (message.toLowerCase().includes('email') && message.toLowerCase().includes('invalid')) {
          errorMessage = "Please enter a valid email address.";
        } else if (message.toLowerCase().includes('password')) {
          errorMessage = "Password must be at least 8 characters long and contain letters and numbers.";
        } else if (message.toLowerCase().includes('validation')) {
          errorMessage = "Please check all fields are filled correctly.";
        } else {
          errorMessage = "Invalid input. Please check all fields.";
        }
      } else if (res.status === 409) {
        errorMessage = "An account with this email already exists. Please try logging in instead.";
      } else if (res.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }
    } catch (e) {
      // If we can't parse the error response, use status-based messages
      if (res.status === 400) {
        errorMessage = "Invalid input. Please check all fields.";
      } else if (res.status === 409) {
        errorMessage = "An account with this email already exists.";
      }
    }
    
    throw new Error(errorMessage);
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

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to get user info with status ${res.status}`);
  }

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

