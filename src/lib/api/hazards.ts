import { apiFetch } from "./client";

export interface Hazard {
  id: number;
  hazard_type: string;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  severity: "warning" | "critical" | "safe" | string;
  description: string;
  status: string;
}

export function getHazards() {
  return apiFetch<Hazard[]>("/hazards");
}