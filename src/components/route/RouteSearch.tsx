"use client";

import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Navigation,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type RouteSearchProps = {
  onAnalyze?: (from: string, to: string) => void;
};

export default function RouteSearch({
  onAnalyze,
}: RouteSearchProps) {
  const { t } = useLanguage();

  const [from, setFrom] = useState("Guwahati");
  const [to, setTo] = useState("Shillong");

  const handleAnalyze = () => {
    if (!from.trim() || !to.trim()) return;

    onAnalyze?.(from, to);
  };

  return (
    <section className="route-search-card">
      <div className="route-search-header">
        <div>
          <span className="section-eyebrow">
            {t.route.search.eyebrow}
          </span>

          <h2>{t.route.search.title}</h2>

          <p>
            {t.route.search.description}
          </p>
        </div>

        <div className="route-search-icon">
          <Navigation size={20} />
        </div>
      </div>

      <div className="route-search-form">
        <div className="route-input-group">
          <label htmlFor="route-from">
            {t.route.search.from}
          </label>

          <div className="route-input-wrapper">
            <MapPin size={17} />

            <input
              id="route-from"
              type="text"
              value={from}
              onChange={(event) =>
                setFrom(event.target.value)
              }
              placeholder={
                t.route.search.fromPlaceholder
              }
            />
          </div>
        </div>

        <div className="route-input-arrow">
          <ArrowRight size={18} />
        </div>

        <div className="route-input-group">
          <label htmlFor="route-to">
            {t.route.search.to}
          </label>

          <div className="route-input-wrapper">
            <MapPin size={17} />

            <input
              id="route-to"
              type="text"
              value={to}
              onChange={(event) =>
                setTo(event.target.value)
              }
              placeholder={
                t.route.search.toPlaceholder
              }
            />
          </div>
        </div>

        <button
          type="button"
          className="route-analyze-button"
          onClick={handleAnalyze}
        >
          {t.route.search.analyze}
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}