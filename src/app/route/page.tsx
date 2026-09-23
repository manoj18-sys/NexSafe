"use client";

import { useState } from "react";

import RouteSearch from "@/components/route/RouteSearch";
import MapLibreMap from "@/components/map/MapLibreMap";
import RouteSummary from "@/components/route/RouteSummary";
import RiskBreakdown from "@/components/route/RiskBreakdown";
import AlternateRouteCard from "@/components/route/AlternateRouteCard";
import SafeHarborCard from "@/components/route/SafeHarborCard";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  analyzeRoute,
  RouteAnalysis,
} from "@/lib/api/route";


export default function RoutePage() {
  const { t } = useLanguage();

  const [from, setFrom] = useState("Guwahati");
  const [to, setTo] = useState("Shillong");

  const [analysis, setAnalysis] =
    useState<RouteAnalysis | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (
    origin: string,
    destination: string
  ) => {
    setFrom(origin);
    setTo(destination);
    setError("");
    setLoading(true);

    try {
      const result = await analyzeRoute(
        origin,
        destination
      );

      setAnalysis(result);
    } catch (err) {
      console.error("Route analysis failed:", err);
      setError("Unable to analyze route right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="route-page">
      <div className="route-page-header">
        <div>
          <span className="section-eyebrow">
            {t.route.eyebrow}
          </span>

          <h1>{t.route.title}</h1>

          <p>{t.route.description}</p>
        </div>

        <div className="live-system-badge">
          <span />
          {t.route.liveSystem}
        </div>
      </div>

      <RouteSearch onAnalyze={handleAnalyze} />

      <div className="route-map-card">
        <MapLibreMap
          path={analysis?.path ?? [from, to]}
          riskLevel={
            (analysis?.risk_level as
              | "stable"
              | "watch"
              | "critical") ?? "stable"
          }
          height={460}
        />
      </div>

      {loading && (
        <div className="route-loading">
          Analyzing route...
        </div>
      )}

      {error && (
        <div className="route-error">
          {error}
        </div>
      )}

      {analysis && (
        <div className="route-analysis-result">
          <div className="route-analysis-heading">
            <span>LIVE ROUTE ANALYSIS</span>

            <div className="route-risk-badge">
              <small>OVERALL RISK</small>
              <strong>
                {analysis.risk_level.toUpperCase()}
              </strong>
            </div>
          </div>

          <p>{analysis.recommended_action}</p>

          <div className="route-analysis-stats">
            <div>
              <span>Distance</span>
              <strong>
                {analysis.distance_km} km
              </strong>
            </div>

            <div>
              <span>Estimated Time</span>
              <strong>
                {analysis.estimated_minutes} min
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong>
                {analysis.route_status}
              </strong>
            </div>

            <div>
              <span>Alternate</span>
              <strong>
                {analysis.alternate_available
                  ? "Available"
                  : "Not Available"}
              </strong>
            </div>
          </div>
        </div>
      )}

      <div className="route-summary-layout">
        <RouteSummary from={from} to={to} />
        <RiskBreakdown />
      </div>

      <AlternateRouteCard />

      <SafeHarborCard />
    </main>
  );
}