"use client";

import {
  AlertTriangle,
  ArrowRight,
  Clock3,
  MapPin,
} from "lucide-react";

import { responseIncidents } from "@/data/controlTower";

export default function ResponseQueue() {
  return (
    <section className="response-queue-card">

      <div className="response-queue-header">

        <div>
          <span className="section-eyebrow">
            RESPONSE QUEUE
          </span>

          <h2>Priority incidents</h2>

          <p>
            Incidents requiring operational attention.
          </p>
        </div>

        <span className="response-count">
          {responseIncidents.length} ACTIVE
        </span>

      </div>

      <div className="response-list">

        {responseIncidents.map((incident) => (

          <div
            className={`response-item response-${incident.priority.toLowerCase()}`}
            key={incident.id}
          >

            <div className="response-icon">
              <AlertTriangle size={17} />
            </div>

            <div className="response-content">

              <div className="response-title-row">

                <strong>
                  {incident.title}
                </strong>

                <span className="response-priority">
                  {incident.priority}
                </span>

              </div>

              <div className="response-location">

                <MapPin size={12} />

                {incident.location}

              </div>

              <div className="response-meta">

                <span>
                  <Clock3 size={12} />
                  {incident.reported}
                </span>

                <span>
                  {incident.type}
                </span>

              </div>

            </div>

            <button
              type="button"
              className="response-action"
            >
              <ArrowRight size={15} />
            </button>

          </div>

        ))}

      </div>

      <button
        type="button"
        className="view-all-incidents"
      >
        View all incidents
        <ArrowRight size={14} />
      </button>

    </section>
  );
}