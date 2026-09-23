"use client";

import {
  Route,
  ShieldCheck,
  TriangleAlert,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KPIGrid() {
  const { t } = useLanguage();

  const metrics = [
    {
      label: t.dashboard.kpi.activeRoutes,
      value: "24",
      change: "+8.4%",
      description: t.dashboard.kpi.fromLastHour,
      icon: Route,
      status: "normal",
    },
    {
      label: t.dashboard.kpi.safeCorridors,
      value: "07",
      change: t.dashboard.kpi.stable,
      description: t.dashboard.kpi.corridorsMonitored,
      icon: ShieldCheck,
      status: "normal",
    },
    {
      label: t.dashboard.kpi.criticalHazards,
      value: "03",
      change: `2 ${t.dashboard.kpi.new}`,
      description: t.dashboard.kpi.requiringAttention,
      icon: TriangleAlert,
      status: "danger",
    },
    {
      label: t.dashboard.kpi.vehiclesTracked,
      value: "18",
      change: "+3",
      description: t.dashboard.kpi.activeVehicles,
      icon: Truck,
      status: "normal",
    },
  ];

  return (
    <section className="kpi-grid">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className={`kpi-card ${
              metric.status === "danger"
                ? "kpi-card-danger"
                : ""
            }`}
          >
            <div className="kpi-card-top">
              <div className="kpi-icon">
                <Icon size={17} />
              </div>

              <span className="kpi-label">
                {metric.label}
              </span>
            </div>

            <div className="kpi-value">
              {metric.value}
            </div>

            <div className="kpi-bottom">
              <span className="kpi-change">
                {metric.change}
              </span>

              <span className="kpi-description">
                {metric.description}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}