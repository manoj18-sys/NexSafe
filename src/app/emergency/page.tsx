"use client";

import EmergencyOverview from "@/components/emergency/EmergencyOverview";
import ActiveIncidents from "@/components/emergency/ActiveIncidents";
import ResponseStatus from "@/components/emergency/ResponseStatus";
import EmergencyContacts from "@/components/emergency/EmergencyContacts";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmergencyPage() {
  const { t } = useLanguage();

  return (
    <main className="emergency-page">
      <header className="emergency-page-header">
        <div>
          <span className="section-eyebrow">
            {t.emergency.header.eyebrow}
          </span>

          <h1>{t.emergency.header.title}</h1>

          <p>{t.emergency.header.description}</p>
        </div>

        <div className="live-system-badge">
          <span />
          {t.emergency.header.live}
        </div>
      </header>

      <EmergencyOverview />

      <div className="emergency-main-grid">
        <ActiveIncidents />
        <ResponseStatus />
      </div>

      <EmergencyContacts />
    </main>
  );
}