"use client";

import {
  ArrowRight,
  Clock3,
  Map,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AlternateRouteCard() {
  const { t } = useLanguage();

  return (
    <section className="alternate-route-card">
      <div className="alternate-route-header">
        <div>
          <span className="section-eyebrow">
            {t.route.alternate.eyebrow}
          </span>

          <h2>
            {t.route.alternate.title}
          </h2>
        </div>

        <div className="alternate-route-icon">
          <Map size={19} />
        </div>
      </div>

      <div className="alternate-route-path">
        <div className="route-point">
          <span className="route-dot start" />

          <div>
            <strong>Guwahati</strong>
            <span>
              {t.route.alternate.origin}
            </span>
          </div>
        </div>

        <ArrowRight size={18} />

        <div className="route-point">
          <span className="route-dot end" />

          <div>
            <strong>Nongpoh</strong>
            <span>
              {t.route.alternate.safeCorridor}
            </span>
          </div>
        </div>

        <ArrowRight size={18} />

        <div className="route-point">
          <span className="route-dot end" />

          <div>
            <strong>Shillong</strong>
            <span>
              {t.route.alternate.destination}
            </span>
          </div>
        </div>
      </div>

      <div className="alternate-route-stats">
        <div>
          <ShieldCheck size={16} />
          <span>
            {t.route.alternate.lowRisk}
          </span>
        </div>

        <div>
          <Map size={16} />
          <span>+18 km</span>
        </div>

        <div>
          <Clock3 size={16} />
          <span>+25 min</span>
        </div>
      </div>

      <button
        type="button"
        className="alternate-route-button"
      >
        {t.route.alternate.select}
        <ArrowRight size={16} />
      </button>
    </section>
  );
}