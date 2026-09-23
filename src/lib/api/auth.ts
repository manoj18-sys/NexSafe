import { apiFetch } from "./client";

export interface LoginRequest {
  name: string;
  phone: string;
  place: string;
}

export interface LoginResponse {
  user_id: number;
  name: string;
  phone: string;
  place: string;
  role: string;
}

export function loginUser(data: LoginRequest) {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}