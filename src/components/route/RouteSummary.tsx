"use client";

import {
  CheckCircle2,
  Clock3,
  Route,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type RouteSummaryProps = {
  from: string;
  to: string;
};

export default function RouteSummary({
  from,
  to,
}: RouteSummaryProps) {
  const { t } = useLanguage();

  return (
    <section className="route-summary-card">
      <div className="route-summary-top">
        <div>
          <span className="section-eyebrow">
            {t.route.summary.eyebrow}
          </span>

          <h2>
            {from} → {to}
          </h2>
        </div>

        <div className="safe-status-badge">
          <CheckCircle2 size={15} />
          {t.route.summary.safeRoute}
        </div>
      </div>

      <div className="route-summary-grid">
        <div className="route-summary-stat">
          <Route size={18} />

          <div>
            <span>
              {t.route.summary.distance}
            </span>

            <strong>98 km</strong>
          </div>
        </div>

        <div className="route-summary-stat">
          <Clock3 size={18} />

          <div>
            <span>
              {t.route.summary.estimatedTime}
            </span>

            <strong>3h 15m</strong>
          </div>
        </div>

        <div className="route-summary-stat">
          <ShieldCheck size={18} />

          <div>
            <span>
              {t.route.summary.riskLevel}
            </span>

            <strong className="risk-low">
              {t.route.summary.low}
            </strong>
          </div>
        </div>
      </div>

      <div className="route-summary-footer">
        <div>
          <span>
            {t.route.summary.corridorHealth}
          </span>

          <strong>
            {t.route.summary.stable}
          </strong>
        </div>

        <button type="button">
          {t.route.summary.useThisRoute}
        </button>
      </div>
    </section>
  );
}