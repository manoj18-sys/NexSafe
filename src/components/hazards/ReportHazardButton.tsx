"use client";

import {
  Camera,
  Mic,
  Plus,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ReportHazardButton() {
  const { t } = useLanguage();

  return (
    <section className="report-hazard-card">
      <div className="report-hazard-icon">
        <Plus size={21} />
      </div>

      <div className="report-hazard-content">
        <span className="section-eyebrow">
          {t.hazards.reporting.eyebrow}
        </span>

        <h2>{t.hazards.reporting.title}</h2>

        <p>{t.hazards.reporting.description}</p>
      </div>

      <div className="report-hazard-actions">
        <button type="button">
          <Camera size={16} />
          {t.hazards.reporting.addPhoto}
        </button>

        <button type="button">
          <Mic size={16} />
          {t.hazards.reporting.voiceReport}
        </button>

        <button
          type="button"
          className="report-primary-button"
        >
          {t.hazards.reporting.reportHazard}
        </button>
      </div>
    </section>
  );
}