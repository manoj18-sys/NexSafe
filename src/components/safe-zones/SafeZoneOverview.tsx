"use client";

import {
  ShieldCheck,
  Map,
  AlertTriangle,
  Navigation,
} from "lucide-react";

import SafeZoneCard from "./SafeZoneCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

interface SafeZone {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  elevation: number;
  capacity: number;
  status: string;
}

export default function SafeZoneOverview() {
  const { t } = useLanguage();

  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/safe-zones`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch safe zones");
        }

        return response.json();
      })
      .then((data: SafeZone[]) => {
        setSafeZones(data);
      })
      .catch((err) => {
        console.error("Safe zones error:", err);
        setError("Unable to load live safe zones");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const availableZones = safeZones.filter(
    (zone) => zone.status === "available"
  ).length;

  const limitedZones = safeZones.filter(
    (zone) => zone.status === "limited"
  ).length;

  return (
    <div className="safe-zone-overview">

      {/* KPI CARDS */}
      <div className="safe-zone-kpis">

        <div className="safe-kpi">
          <ShieldCheck size={20} />

          <div>
            <span>
              {t.safeZones.kpi.active}
            </span>

            <strong>
              {safeZones.length}
            </strong>
          </div>
        </div>

        <div className="safe-kpi">
          <Map size={20} />

          <div>
            <span>
              {t.safeZones.kpi.available}
            </span>

            <strong>
              {availableZones}
            </strong>
          </div>
        </div>

        <div className="safe-kpi warning">
          <AlertTriangle size={20} />

          <div>
            <span>
              {t.safeZones.kpi.limited}
            </span>

            <strong>
              {limitedZones}
            </strong>
          </div>
        </div>

        <div className="safe-kpi">
          <Navigation size={20} />

          <div>
            <span>
              {t.safeZones.kpi.network}
            </span>

            <strong>
              {t.safeZones.kpi.online}
            </strong>
          </div>
        </div>

      </div>

      {/* SAFE ZONE LIST HEADER */}
      <div className="safe-zone-list-header">

        <div>
          <h2>
            {t.safeZones.list.title}
          </h2>

          <p>
            {t.safeZones.list.description}
          </p>
        </div>

      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="safe-zone-loading">
          Loading live safe zones...
        </div>
      )}

      {/* ERROR STATE */}
      {error && (
        <div className="safe-zone-error">
          {error}
        </div>
      )}

      {/* SAFE ZONE CARDS */}
      {!loading && !error && (
        <div className="safe-zone-grid">

          {safeZones.map((zone) => (
            <SafeZoneCard
              key={zone.id}
              zone={zone}
            />
          ))}

        </div>
      )}

    </div>
  );
}