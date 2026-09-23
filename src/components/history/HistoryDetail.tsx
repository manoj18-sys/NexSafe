"use client";

import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function HistoryDetail() {
  const { t } = useLanguage();

  return (
    <aside className="history-detail-card">
      <div className="history-detail-header">
        <div>
          <span className="section-eyebrow">
            {t.history.detail.eyebrow}
          </span>

          <h2>{t.history.detail.title}</h2>

          <p>{t.history.detail.description}</p>
        </div>

        <span className="history-detail-status">
          <CheckCircle2 size={14} />
          {t.history.status.COMPLETED}
        </span>
      </div>

      <div className="history-detail-summary">
        <div className="history-detail-icon">
          <RouteIcon />
        </div>

        <div>
          <span>{t.history.detail.referenceLabel}</span>
          <strong>RT-4821</strong>
        </div>
      </div>

      <div className="history-detail-info">
        <div>
          <span>{t.history.detail.locationLabel}</span>

          <strong>
            <MapPin size={14} />
            {t.history.detail.location}
          </strong>
        </div>

        <div>
          <span>{t.history.detail.actionLabel}</span>

          <strong>
            <Activity size={14} />
            {t.history.detail.action}
          </strong>
        </div>

        <div>
          <span>{t.history.detail.resultLabel}</span>

          <strong>
            <ShieldCheck size={14} />
            {t.history.detail.result}
          </strong>
        </div>
      </div>

      <div className="history-detail-footer">
        <span>{t.history.detail.date}</span>

        <button type="button">
          {t.history.detail.viewFullEvent}
          <ArrowUpRight size={14} />
        </button>
      </div>
    </aside>
  );
}

function RouteIcon() {
  return (
    <div className="history-route-icon">
      <Activity size={21} />
    </div>
  );
}