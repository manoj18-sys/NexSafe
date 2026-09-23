"use client";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function HistoryFilters() {
  const { t } = useLanguage();

  return (
    <section className="history-filters-card">
      <div className="history-search">
        <Search size={17} />

        <input
          type="text"
          placeholder={t.history.filters.searchPlaceholder}
          aria-label={t.history.filters.searchPlaceholder}
        />
      </div>

      <div className="history-filter-group">
        <SlidersHorizontal size={16} />

        <select
          defaultValue="ALL"
          aria-label={t.history.filters.eventType}
        >
          <option value="ALL">
            {t.history.filters.allEvents}
          </option>

          <option value="REROUTE">
            {t.history.filters.reroutes}
          </option>

          <option value="HAZARD">
            {t.history.filters.hazards}
          </option>

          <option value="SHIPMENT">
            {t.history.filters.shipments}
          </option>

          <option value="REPORT">
            {t.history.filters.reports}
          </option>

          <option value="EMERGENCY">
            {t.history.filters.emergency}
          </option>

          <option value="ROUTE">
            {t.history.filters.routeAnalysis}
          </option>
        </select>

        <select
          defaultValue="ALL_TIME"
          aria-label={t.history.filters.timePeriod}
        >
          <option value="ALL_TIME">
            {t.history.filters.allTime}
          </option>

          <option value="TODAY">
            {t.history.filters.today}
          </option>

          <option value="WEEK">
            {t.history.filters.last7Days}
          </option>

          <option value="MONTH">
            {t.history.filters.last30Days}
          </option>
        </select>
      </div>
    </section>
  );
}