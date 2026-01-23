import { tokenStorage } from './storage';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type Json = Record<string, any>;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.get();

  const headers: HeadersInit = {
    ...(options.headers ?? {}),
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 204) return undefined as T;

  const data = (await res.json().catch(() => ({}))) as any;

  if (!res.ok) {
    const msg = data?.message ?? `HTTP_${res.status}`;
    throw new Error(msg);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: Json) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: Json) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: Json) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
