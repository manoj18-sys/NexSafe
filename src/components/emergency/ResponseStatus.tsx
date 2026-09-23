"use client";

import {
  Activity,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ResponseStatus() {
  const { t } = useLanguage();

  const responseItems = [
    {
      label: t.emergency.response.teams.label,
      value: "08",
      description:
        t.emergency.response.teams.description,
      icon: Activity,
    },
    {
      label: t.emergency.response.average.label,
      value: "18 min",
      description:
        t.emergency.response.average.description,
      icon: Clock3,
    },
    {
      label: t.emergency.response.locations.label,
      value: "04",
      description:
        t.emergency.response.locations.description,
      icon: MapPin,
    },
    {
      label: t.emergency.response.system.label,
      value: t.emergency.response.system.value,
      description:
        t.emergency.response.system.description,
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="response-status-card">
      <div className="response-status-header">
        <div>
          <span className="section-eyebrow">
            {t.emergency.response.eyebrow}
          </span>

          <h2>{t.emergency.response.title}</h2>

          <p>{t.emergency.response.description}</p>
        </div>
      </div>

      <div className="response-status-list">
        {responseItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="response-status-item"
              key={item.label}
            >
              <div className="response-status-icon">
                <Icon size={17} />
              </div>

              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="response-status-footer">
        <span className="status-indicator" />
        {t.emergency.response.operational}
      </div>
    </section>
  );
}