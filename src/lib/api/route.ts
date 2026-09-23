import { apiFetch } from "./client";

export interface RouteAnalysis {
  origin: string;
  destination: string;

  // Route path returned by the backend
  path: string[];

  distance_km: number;
  estimated_minutes: number;

  risk_level: string;
  route_status: string;

  alternate_available: boolean;
  recommended_action: string;
}

interface BackendRouteResponse {
  success: boolean;
  route?: string[];

  distance?: number;
  time?: number;
  risk?: number;

  error?: string;
}

function getRiskLevel(risk: number): string {
  if (risk >= 8) {
    return "critical";
  }

  if (risk >= 4) {
    return "watch";
  }

  return "stable";
}

export async function analyzeRoute(
  origin: string,
  destination: string
): Promise<RouteAnalysis> {
  const data = await apiFetch<BackendRouteResponse>(
    "/route/analyze",
    {
      method: "POST",
      body: JSON.stringify({
        origin,
        destination,
      }),
    }
  );

  if (!data.success || !data.route) {
    throw new Error(
      data.error || "Unable to analyze route"
    );
  }

  const distance = data.distance ?? 0;
  const time = data.time ?? 0;
  const risk = data.risk ?? 0;

  const riskLevel = getRiskLevel(risk);

  return {
    origin,
    destination,

    path: data.route,

    distance_km: distance,
    estimated_minutes: time,

    risk_level: riskLevel,

    route_status:
      riskLevel === "critical"
        ? "High risk"
        : riskLevel === "watch"
        ? "Proceed with caution"
        : "Route stable",

    alternate_available: false,

    recommended_action:
      riskLevel === "critical"
        ? "Consider an alternate route before departure."
        : riskLevel === "watch"
        ? "Proceed with caution and monitor route conditions."
        : "Route is currently stable.",
  };
}