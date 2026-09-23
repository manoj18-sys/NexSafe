"use client";

import {
  MapPin,
  ShieldCheck,
  Navigation,
  Users,
  Activity,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

interface SafeZone {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  elevation: number;
  capacity: number;
  status: string;

  // Optional frontend-only fields
  occupied?: number;
  district?: string;
  distance?: string;
  services?: string[];
}

interface SafeZoneCardProps {
  zone: SafeZone;
}

export default function SafeZoneCard({
  zone,
}: SafeZoneCardProps) {
  const { t } = useLanguage();

  const occupied = zone.occupied ?? 0;
  const services = zone.services ?? [];
  const district = zone.district ?? "";
  const distance = zone.distance ?? "—";

  const occupancy =
    zone.capacity > 0
      ? Math.round((occupied / zone.capacity) * 100)
      : 0;

  const statusLabel =
    zone.status === "available"
      ? t.safeZones.card.status.available
      : zone.status === "limited"
      ? t.safeZones.card.status.limited
      : t.safeZones.card.status.full;

  return (
    <div className="safe-zone-card">

      <div className="safe-zone-card-header">

        <div className="safe-zone-icon">
          <ShieldCheck size={20} />
        </div>

        <div
          className={`safe-zone-status ${zone.status}`}
        >
          <span />
          {statusLabel}
        </div>

      </div>

      <div className="safe-zone-card-body">

        <h3>{zone.name}</h3>

        <div className="safe-zone-location">
          <MapPin size={14} />

          <span>
            {zone.location}
            {district ? ` · ${district}` : ""}
          </span>
        </div>

        <div className="safe-zone-stats">

          <div>
            <span>
              {t.safeZones.card.distance}
            </span>

            <strong>
              {distance}
            </strong>
          </div>

          <div>
            <span>
              {t.safeZones.card.elevation}
            </span>

            <strong>
              {zone.elevation} m
            </strong>
          </div>

          <div>
            <span>
              {t.safeZones.card.occupancy}
            </span>

            <strong>
              {occupancy}%
            </strong>
          </div>

        </div>

        <div className="safe-zone-capacity">

          <div className="capacity-header">

            <span>
              <Users size={13} />
              {t.safeZones.card.capacity}
            </span>

            <strong>
              {occupied}/{zone.capacity}
            </strong>

          </div>

          <div className="capacity-bar">

            <div
              style={{
                width: `${occupancy}%`,
              }}
            />

          </div>

        </div>

        {services.length > 0 && (
          <div className="safe-zone-services">

            {services.map((service) => (
              <span key={service}>
                <Activity size={11} />
                {service}
              </span>
            ))}

          </div>
        )}

        <button
          type="button"
          className="safe-zone-button"
        >
          <Navigation size={15} />
          {t.safeZones.card.navigate}
        </button>

      </div>
    </div>
  );
}