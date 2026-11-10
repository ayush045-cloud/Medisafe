import { supabase } from './supabase';

const API_URL = (process.env.EXPO_PUBLIC_API_URL || '').replace(/\/$/, '');
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_URL) throw new Error('Set EXPO_PUBLIC_API_URL to your deployed Flask API URL.');
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Your session expired. Please sign in again.');
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}`, ...(init.headers || {}) },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error || `Request failed (${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
