"use client";

import {
  Activity,
  Route,
  ShieldCheck,
  Siren,
} from "lucide-react";

import { historyOverview } from "@/data/history";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HistoryOverview() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t.history.overview.totalEvents,
      value: historyOverview.totalEvents,
      icon: Activity,
    },
    {
      label: t.history.overview.reroutes,
      value: historyOverview.reroutes,
      icon: Route,
    },
    {
      label: t.history.overview.hazardsResolved,
      value: historyOverview.hazardsResolved,
      icon: ShieldCheck,
    },
    {
      label: t.history.overview.emergencyResponses,
      value: historyOverview.emergencyResponses,
      icon: Siren,
    },
  ];

  return (
    <div className="history-overview">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            className="history-stat"
            key={stat.label}
          >
            <div className="history-stat-icon">
              <Icon size={20} />
            </div>

            <div className="history-stat-content">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}