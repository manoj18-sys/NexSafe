"use client";

import {
  AlertTriangle,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function EmergencyOverview() {
  const { t } = useLanguage();

  const overviewItems = [
    {
      label: t.emergency.overview.activeIncidents.label,
      value: "04",
      description:
        t.emergency.overview.activeIncidents.description,
      icon: AlertTriangle,
      level: "critical",
    },
    {
      label: t.emergency.overview.criticalEvents.label,
      value: "01",
      description:
        t.emergency.overview.criticalEvents.description,
      icon: AlertTriangle,
      level: "warning",
    },
    {
      label: t.emergency.overview.responseTeams.label,
      value: "08",
      description:
        t.emergency.overview.responseTeams.description,
      icon: Users,
      level: "stable",
    },
    {
      label: t.emergency.overview.safeZones.label,
      value: "12",
      description:
        t.emergency.overview.safeZones.description,
      icon: ShieldCheck,
      level: "stable",
    },
  ];

  return (
    <section className="emergency-overview">
      {overviewItems.map((item) => {
        const Icon = item.icon;

        return (
          <article
            className={`emergency-overview-card overview-${item.level}`}
            key={item.label}
          >
            <div className="emergency-overview-icon">
              <Icon size={19} />
            </div>

            <div className="emergency-overview-content">
              <span>{item.label}</span>

              <strong>{item.value}</strong>

              <p>{item.description}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}