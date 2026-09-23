"use client";

import HistoryOverview from "@/components/history/HistoryOverview";
import HistoryFilters from "@/components/history/HistoryFilters";
import HistoryList from "@/components/history/HistoryList";
import HistoryDetail from "@/components/history/HistoryDetail";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HistoryPage() {
  const { t } = useLanguage();

  return (
    <main className="history-page">
      <header className="history-page-header">
        <div>
          <span className="section-eyebrow">
            {t.history.header.eyebrow}
          </span>

          <h1>{t.history.header.title}</h1>

          <p>{t.history.header.description}</p>
        </div>

        <div className="history-system-badge">
          <span />
          {t.history.header.badge}
        </div>
      </header>

      <HistoryOverview />

      <HistoryFilters />

      <div className="history-main-grid">
        <HistoryList />
        <HistoryDetail />
      </div>
    </main>
  );
}