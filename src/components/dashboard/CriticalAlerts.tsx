"use client";

import {
  AlertTriangle,
  Clock3,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CriticalAlerts() {
  const { t } = useLanguage();

  const alerts = [
    {
      type: "critical",
      title: t.dashboard.alerts.landslideDetected,
      location: "NH-10 · Sikkim Corridor",
      time: `8 min ${t.dashboard.alerts.ago}`,
    },
    {
      type: "warning",
      title: t.dashboard.alerts.roadBlockage,
      location: "Guwahati · Shillong Route",
      time: `21 min ${t.dashboard.alerts.ago}`,
    },
    {
      type: "safe",
      title: t.dashboard.alerts.routeRestored,
      location: "Shillong · Guwahati Corridor",
      time: `34 min ${t.dashboard.alerts.ago}`,
    },
  ];

  return (
    <section className="alerts-card">
      <div className="alerts-header">
        <div>
          <div className="alerts-title">
            {t.dashboard.alerts.title}
          </div>

          <p>
            {t.dashboard.alerts.description}
          </p>
        </div>

        <span className="alerts-count">
          03
        </span>
      </div>

      <div className="alerts-list">
        {alerts.map((alert) => {
          const isCritical =
            alert.type === "critical";

          const isWarning =
            alert.type === "warning";

          return (
            <div
              className={`alert-item alert-${alert.type}`}
              key={alert.title}
            >
              <div className="alert-icon">
                {isCritical && (
                  <AlertTriangle size={15} />
                )}

                {isWarning && (
                  <AlertTriangle size={15} />
                )}

                {!isCritical &&
                  !isWarning && (
                    <CheckCircle2 size={15} />
                  )}
              </div>

              <div className="alert-content">
                <strong>
                  {alert.title}
                </strong>

                <div className="alert-location">
                  <MapPin size={10} />
                  {alert.location}
                </div>

                <div className="alert-time">
                  <Clock3 size={10} />
                  {alert.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="alerts-view-button">
        {t.dashboard.alerts.viewAllHazards}
      </button>
    </section>
  );
}