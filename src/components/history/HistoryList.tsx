"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Route,
  Search,
  Siren,
} from "lucide-react";

import { historyRecords } from "@/data/history";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = {
  REROUTE: Route,
  HAZARD: AlertTriangle,
  SHIPMENT: Package,
  REPORT: Search,
  EMERGENCY: Siren,
  ROUTE: Route,
};

export default function HistoryList() {
  const { t } = useLanguage();

  return (
    <section className="history-list-card">
      <div className="history-list-header">
        <div>
          <span className="section-eyebrow">
            {t.history.list.eyebrow}
          </span>

          <h2>{t.history.list.title}</h2>

          <p>{t.history.list.description}</p>
        </div>

        <span className="history-record-count">
          {historyRecords.length} {t.history.list.records}
        </span>
      </div>

      <div className="history-list">
        {historyRecords.map((record) => {
          const Icon =
            icons[record.type as keyof typeof icons];

          return (
            <div
              className="history-item"
              key={record.id}
            >
              <div className="history-item-icon">
                <Icon size={18} />
              </div>

              <div className="history-item-content">
                <div className="history-item-title">
                  <strong>{record.title}</strong>

                  <span
                    className={`history-type history-type-${record.type.toLowerCase()}`}
                  >
                    {getTranslatedType(
                      record.type,
                      t.history.types
                    )}
                  </span>
                </div>

                <p>{record.description}</p>

                <div className="history-item-meta">
                  <span>
                    <MapPin size={13} />
                    {record.location}
                  </span>

                  <span>
                    <Clock3 size={13} />
                    {record.date} · {record.time}
                  </span>

                  <span>
                    ID: {record.reference}
                  </span>
                </div>
              </div>

              <div className="history-item-right">
                <span
                  className={`history-status history-status-${record.status.toLowerCase()}`}
                >
                  {record.status === "RESOLVED" && (
                    <CheckCircle2 size={12} />
                  )}

                  {getTranslatedStatus(
                    record.status,
                    t.history.status
                  )}
                </span>

                <button
                  type="button"
                  aria-label={`${t.history.list.view} ${record.title}`}
                  className="history-view-button"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getTranslatedType(
  type: string,
  translations: Record<string, string>
) {
  return translations[type] ?? type;
}

function getTranslatedStatus(
  status: string,
  translations: Record<string, string>
) {
  return translations[status] ?? status;
}