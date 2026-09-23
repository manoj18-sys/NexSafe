"use client";

import {
  ArrowRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SafeHarborCard() {
  const { t } = useLanguage();

  return (
    <section className="safe-harbor-card">
      <div className="safe-harbor-icon">
        <ShieldCheck size={22} />
      </div>

      <div className="safe-harbor-content">
        <span className="section-eyebrow">
          {t.route.safeHarbor.eyebrow}
        </span>

        <h2>
          {t.route.safeHarbor.title}
        </h2>

        <p>
          {t.route.safeHarbor.description}
        </p>

        <div className="safe-harbor-location">
          <MapPin size={16} />

          <span>
            {t.route.safeHarbor.location}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="safe-harbor-button"
      >
        {t.route.safeHarbor.viewZone}
        <ArrowRight size={16} />
      </button>
    </section>
  );
}