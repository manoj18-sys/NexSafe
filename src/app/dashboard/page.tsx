"use client";

import KPIGrid from "@/components/dashboard/KPIGrid";
import LiveRouteMap from "@/components/dashboard/LiveRouteMap";
import CriticalAlerts from "@/components/dashboard/CriticalAlerts";
import { useLanguage } from "@/contexts/LanguageContext";
import NERSafeMap from "@/components/map/NERSafeMap";

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div>
          <div className="dashboard-eyebrow">
            {t.dashboard.eyebrow}
          </div>

          <h1>{t.dashboard.title}</h1>

          <p>
            {t.dashboard.description}
          </p>
        </div>

        <div className="dashboard-live">
          <span className="dashboard-live-dot" />
          {t.dashboard.liveSystem}
        </div>
      </div>

      <KPIGrid />

      <div className="dashboard-intelligence">
        <NERSafeMap mode="operations" height={480} />
        <CriticalAlerts />
      </div>
    </div>
  );
}