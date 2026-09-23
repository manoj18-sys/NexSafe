"use client";

import {
  CloudRain,
  Mountain,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RiskBreakdown() {
  const { t } = useLanguage();

  const risks = [
    {
      label: t.route.risk.weather,
      value: t.route.risk.low,
      description:
        t.route.risk.weatherDescription,
      level: "low",
      icon: CloudRain,
    },
    {
      label: t.route.risk.landslide,
      value: t.route.risk.moderate,
      description:
        t.route.risk.landslideDescription,
      level: "medium",
      icon: Mountain,
    },
    {
      label: t.route.risk.roadCondition,
      value: t.route.risk.low,
      description:
        t.route.risk.roadConditionDescription,
      level: "low",
      icon: ShieldCheck,
    },
    {
      label: t.route.risk.blockage,
      value: t.route.risk.high,
      description:
        t.route.risk.blockageDescription,
      level: "high",
      icon: TriangleAlert,
    },
  ];

  return (
    <section className="risk-breakdown-card">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">
            {t.route.risk.eyebrow}
          </span>

          <h2>{t.route.risk.title}</h2>
        </div>

        <span className="risk-score">
          72 / 100
        </span>
      </div>

      <div className="risk-list">
        {risks.map((risk) => {
          const Icon = risk.icon;

          return (
            <div
              className={`risk-row risk-${risk.level}`}
              key={risk.label}
            >
              <div className="risk-icon">
                <Icon size={18} />
              </div>

              <div className="risk-info">
                <strong>{risk.label}</strong>
                <span>{risk.description}</span>
              </div>

              <span className="risk-value">
                {risk.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}