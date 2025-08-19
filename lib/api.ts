export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "";

// Simple wrapper around fetch that prefixes the base URL
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  if (!API_BASE_URL) {
    if (typeof window !== "undefined") {
      // Surface a clear error in the browser console
      // eslint-disable-next-line no-console
      console.warn("NEXT_PUBLIC_API_BASE_URL is not set. Requests may fail.");
    }
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;

  // If the body is FormData, do not set Content-Type so the browser sets the boundary.
  const isFormData = typeof init?.body !== "undefined" && typeof FormData !== "undefined" && init?.body instanceof FormData;
  const headers: HeadersInit = {
    ...(init?.headers || {}),
  };

  const finalInit: RequestInit = {
    ...init,
    headers,
  };

  // Ensure JSON content-type if body is a string and header not provided
  if (!isFormData && typeof finalInit.body === "string") {
    const h = new Headers(headers as HeadersInit);
    if (!h.has("Content-Type")) {
      h.set("Content-Type", "application/json");
    }
    finalInit.headers = h as unknown as HeadersInit;
  }

  return fetch(url, finalInit);
}
