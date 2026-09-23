"use client";

import {
  AlertTriangle,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ActiveIncidents() {
  const { t } = useLanguage();

  const incidents = [
    {
      title: t.emergency.incidents.roadBlockage.title,
      location: t.emergency.incidents.roadBlockage.location,
      time: t.emergency.incidents.roadBlockage.time,
      status: t.emergency.incidents.roadBlockage.status,
      description:
        t.emergency.incidents.roadBlockage.description,
      icon: AlertTriangle,
      level: "critical",
    },
    {
      title: t.emergency.incidents.landslide.title,
      location: t.emergency.incidents.landslide.location,
      time: t.emergency.incidents.landslide.time,
      status: t.emergency.incidents.landslide.status,
      description:
        t.emergency.incidents.landslide.description,
      icon: MapPin,
      level: "warning",
    },
    {
      title: t.emergency.incidents.vehicleAssistance.title,
      location:
        t.emergency.incidents.vehicleAssistance.location,
      time: t.emergency.incidents.vehicleAssistance.time,
      status: t.emergency.incidents.vehicleAssistance.status,
      description:
        t.emergency.incidents.vehicleAssistance.description,
      icon: Users,
      level: "stable",
    },
  ];

  return (
    <section className="active-incidents-card">
      <div className="active-incidents-header">
        <div>
          <span className="section-eyebrow">
            {t.emergency.incidents.eyebrow}
          </span>

          <h2>{t.emergency.incidents.title}</h2>

          <p>{t.emergency.incidents.description}</p>
        </div>

        <div className="incident-count">
          {incidents.length}
        </div>
      </div>

      <div className="incident-list">
        {incidents.map((incident) => {
          const Icon = incident.icon;

          return (
            <article
              className={`incident-item incident-${incident.level}`}
              key={incident.title}
            >
              <div className="incident-icon">
                <Icon size={18} />
              </div>

              <div className="incident-content">
                <div className="incident-title-row">
                  <strong>{incident.title}</strong>

                  <span className="incident-status">
                    {incident.status}
                  </span>
                </div>

                <div className="incident-location">
                  <MapPin size={13} />
                  {incident.location}
                </div>

                <p>{incident.description}</p>

                <div className="incident-time">
                  <Clock3 size={12} />
                  {incident.time}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        className="incidents-view-button"
      >
        {t.emergency.incidents.viewAll}
      </button>
    </section>
  );
}