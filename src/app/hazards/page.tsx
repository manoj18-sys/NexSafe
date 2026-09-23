"use client";

import HazardOverview from "@/components/hazards/HazardOverview";
import HazardList from "@/components/hazards/HazardList";
import HazardDetail from "@/components/hazards/HazardDetail";
import ReportHazardButton from "@/components/hazards/ReportHazardButton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HazardsPage() {
  const { t } = useLanguage();

  return (
    <main className="hazards-page">
      <header className="hazards-page-header">
        <div>
          <span className="section-eyebrow">
            {t.hazards.eyebrow}
          </span>

          <h1>{t.hazards.title}</h1>

          <p>{t.hazards.description}</p>
        </div>

        <div className="live-system-badge">
          <span />
          {t.hazards.liveSystem}
        </div>
      </header>

      <HazardOverview />

      <div className="hazard-main-grid">
        <HazardList />
        <HazardDetail />
      </div>

      <ReportHazardButton />
    </main>
  );
}