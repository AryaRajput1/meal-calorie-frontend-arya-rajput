import { useAuthStore } from "@/stores/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${BASE_URL}/api/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 403) {
    useAuthStore.getState().logout();
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    throw {
      message: data.message || "Something went wrong",
      status: res.status,
      retryAfter: data.retryAfter,
    };
  }

  return data;
}

// APIs
export const registerUser = (body: any) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const loginUser = (body: any) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getCalories = (body: any) =>
  apiFetch("/get-calories", {
    method: "POST",
    body: JSON.stringify(body),
  });