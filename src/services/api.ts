
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  if (!API_BASE_URL) {
    if (typeof window !== "undefined") {
      console.warn("NEXT_PUBLIC_API_BASE is not set. Requests may fail.");
    }
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;

  const isFormData = typeof init?.body !== "undefined" && typeof FormData !== "undefined" && init?.body instanceof FormData;
  const headers: HeadersInit = {
    ...(init?.headers || {}),
  };

  const finalInit: RequestInit = {
    ...init,
    headers,
  };

  if (!isFormData && typeof finalInit.body === "string") {
    const h = new Headers(headers as HeadersInit);
    if (!h.has("Content-Type")) {
      h.set("Content-Type", "application/json");
    }
    finalInit.headers = h as unknown as HeadersInit;
  }

  return fetch(url, finalInit);
}

export async function apiRequest<T = any>(
  path: string, 
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await apiFetch(path, options);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  return response.json();
}
