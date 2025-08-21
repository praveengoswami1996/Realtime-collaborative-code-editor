import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

/**
 * Server-side API call helper with authentication
 */
export async function serverApiCall(endpoint: string, options: RequestInit = {}) {
  const session = await getServerSession(authOptions);
  
  const baseUrl = process.env.BACKEND_URL || "http://localhost:5000";
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  
  // Add Authorization header if we have an access token
  if (session?.accessToken) {
    headers.Authorization = `Bearer ${session.accessToken}`;
  }
  
  return fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // Include cookies
  });
}

/**
 * Client-side API call helper with authentication
 */
export async function clientApiCall(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  
  // For client-side calls, we rely on cookies for authentication
  // but also include the session token if available for backward compatibility
  const session = await getSession();
  if (session?.accessToken) {
    headers.Authorization = `Bearer ${session.accessToken}`;
  }
  
  return fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // Include cookies
  });
}

/**
 * Simple API call helper that includes cookies (for login, register, etc.)
 */
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  
  return fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Include cookies
  });
}

/**
 * Type-safe API response handler
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  return response.json();
}
