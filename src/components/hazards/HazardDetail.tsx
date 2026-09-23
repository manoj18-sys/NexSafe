"use client";

import {
  AlertTriangle,
  ArrowRight,
  MapPin,
  Navigation,
  ShieldAlert,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HazardDetail() {
  const { t } = useLanguage();

  return (
    <section className="hazard-detail-card">
      <div className="hazard-detail-header">
        <div>
          <span className="section-eyebrow">
            {t.hazards.detail.eyebrow}
          </span>

          <h2>{t.hazards.detail.title}</h2>

          <p>{t.hazards.detail.description}</p>
        </div>

        <div className="critical-badge">
          <AlertTriangle size={15} />
          {t.hazards.detail.critical}
        </div>
      </div>

      <div className="hazard-detail-map">
        <div className="hazard-grid" />

        <div className="hazard-location-marker">
          <MapPin size={18} />
        </div>

        <div className="hazard-map-label">
          NH-10 · Sikkim Corridor
        </div>

        <div className="hazard-radius" />
      </div>

      <div className="hazard-detail-info">
        <div>
          <span>{t.hazards.detail.info.location.label}</span>
          <strong>
            NH-10 · Sikkim Corridor
          </strong>
        </div>

        <div>
          <span>{t.hazards.detail.info.impact.label}</span>
          <strong>
            {t.hazards.detail.info.impact.value}
          </strong>
        </div>

        <div>
          <span>{t.hazards.detail.info.response.label}</span>
          <strong>
            {t.hazards.detail.info.response.value}
          </strong>
        </div>
      </div>

      <div className="hazard-detail-actions">
        <button type="button">
          <Navigation size={16} />
          {t.hazards.detail.actions.analyze}
          <ArrowRight size={16} />
        </button>

        <button type="button">
          <ShieldAlert size={16} />
          {t.hazards.detail.actions.resolve}
        </button>
      </div>
    </section>
  );
}