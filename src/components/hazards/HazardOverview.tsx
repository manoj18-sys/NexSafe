"use client";

import {
  AlertTriangle,
  CloudRain,
  Mountain,
  ShieldAlert,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const overview = [
  {
    key: "activeHazards",
    value: "03",
    icon: AlertTriangle,
    type: "critical",
  },
  {
    key: "landslideZones",
    value: "02",
    icon: Mountain,
    type: "warning",
  },
  {
    key: "weatherAlerts",
    value: "01",
    icon: CloudRain,
    type: "warning",
  },
  {
    key: "routesAffected",
    value: "04",
    icon: ShieldAlert,
    type: "critical",
  },
] as const;

export default function HazardOverview() {
  const { t } = useLanguage();

  return (
    <div className="hazard-overview">
      {overview.map((item) => {
        const Icon = item.icon;

        return (
          <div
            className={`hazard-stat hazard-${item.type}`}
            key={item.key}
          >
            <div className="hazard-stat-icon">
              <Icon size={20} />
            </div>

            <div>
              <span>
                {t.hazards.overview[item.key]}
              </span>

              <strong>{item.value}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}