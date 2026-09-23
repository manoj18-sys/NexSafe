"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getHazards, Hazard } from "@/lib/api/hazards";

export default function HazardList() {
  const { t } = useLanguage();

  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getHazards()
      .then((data) => {
        setHazards(data);
      })
      .catch((err) => {
        console.error("Failed to load hazards:", err);
        setError("Unable to load live hazards");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="hazard-list-card">
      <div className="hazard-list-header">
        <div>
          <span className="section-eyebrow">
            {t.hazards.list.eyebrow}
          </span>

          <h2>{t.hazards.list.title}</h2>

          <p>{t.hazards.list.description}</p>
        </div>

        <span className="hazard-live-indicator">
          <span />
          {t.hazards.list.live}
        </span>
      </div>

      <div className="hazard-list">
        {loading && (
          <div className="hazard-loading">
            Loading live hazards...
          </div>
        )}

        {!loading && error && (
          <div className="hazard-error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          hazards.map((hazard) => {
            const isCritical =
              hazard.severity === "critical";

            const isWarning =
              hazard.severity === "warning";

            const isSafe =
              hazard.severity === "safe";

            const hazardKey =
              hazard.hazard_type.toLowerCase();

            let translatedTitle =
              hazard.title;

            if (
              hazardKey === "landslide" &&
              t.hazards.items.landslide
            ) {
              translatedTitle =
                t.hazards.items.landslide.title;
            } else if (
              hazardKey === "blockage" &&
              t.hazards.items.blockage
            ) {
              translatedTitle =
                t.hazards.items.blockage.title;
            } else if (
              hazardKey === "rainfall" &&
              t.hazards.items.rainfall
            ) {
              translatedTitle =
                t.hazards.items.rainfall.title;
            } else if (
              hazardKey === "restored" &&
              t.hazards.items.restored
            ) {
              translatedTitle =
                t.hazards.items.restored.title;
            }

            return (
              <div
                className={`hazard-item hazard-item-${hazard.severity}`}
                key={hazard.id}
              >
                <div className="hazard-item-icon">
                  {isCritical && (
                    <AlertTriangle size={18} />
                  )}

                  {isWarning && (
                    <AlertTriangle size={18} />
                  )}

                  {isSafe && (
                    <CheckCircle2 size={18} />
                  )}

                  {!isCritical &&
                    !isWarning &&
                    !isSafe && (
                      <AlertTriangle size={18} />
                    )}
                </div>

                <div className="hazard-item-content">
                  <strong>
                    {translatedTitle}
                  </strong>

                  <div className="hazard-item-location">
                    <MapPin size={13} />
                    {hazard.location}
                  </div>

                  <div className="hazard-item-time">
                    <Clock3 size={13} />
                    {hazard.status}
                  </div>
                </div>

                <span className="hazard-severity">
                  {hazard.severity.toUpperCase()}
                </span>
              </div>
            );
          })}

        {!loading &&
          !error &&
          hazards.length === 0 && (
            <div className="hazard-empty">
              No active hazards reported.
            </div>
          )}
      </div>
    </section>
  );
}