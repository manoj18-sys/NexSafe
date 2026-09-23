"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Radio,
} from "lucide-react";

import { simulationTimeline } from "@/data/simulations";

export default function SimulationTimeline() {
  return (
    <section className="simulation-timeline-card">
      <div className="simulation-card-header">
        <div>
          <span className="section-eyebrow">
            RESPONSE TIMELINE
          </span>

          <h2>System response sequence</h2>

          <p>
            How NER-SAFE responds to the simulated disruption.
          </p>
        </div>
      </div>

      <div className="simulation-timeline">
        {simulationTimeline.map((item) => (
          <div
            className="simulation-timeline-item"
            key={item.time}
          >
            <div className="timeline-time">
              {item.time}
            </div>

            <div
              className={`timeline-icon timeline-${item.status}`}
            >
              {item.status === "critical" && (
                <AlertTriangle size={16} />
              )}

              {item.status === "warning" && (
                <Radio size={16} />
              )}

              {item.status === "active" && (
                <Radio size={16} />
              )}

              {item.status === "safe" && (
                <CheckCircle2 size={16} />
              )}
            </div>

            <div className="timeline-content">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}