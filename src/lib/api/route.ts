import { apiFetch } from "./client";

export interface RouteAnalysis {
  origin: string;
  destination: string;

  path: string[];

  distance_km: number;
  estimated_minutes: number;

  risk_level: string;
  route_status: string;

  alternate_available: boolean;
  recommended_action: string;
}

export async function analyzeRoute(
  origin: string,
  destination: string
): Promise<RouteAnalysis> {
  const data = await apiFetch<RouteAnalysis>(
    "/route/analyze",
    {
      method: "POST",
      body: JSON.stringify({
        origin,
        destination,
      }),
    }
  );

  return data;
}