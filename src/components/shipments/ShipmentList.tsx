"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MapPin,
  Truck,
} from "lucide-react";

import { shipments } from "@/data/shipments";

export default function ShipmentList() {
  return (
    <section className="shipment-list-card">

      <div className="shipment-list-header">

        <div>
          <span className="section-eyebrow">
            ACTIVE FLEET
          </span>

          <h2>Shipment activity</h2>

          <p>
            Current movement and delivery status across monitored corridors.
          </p>
        </div>

        <span className="shipment-count">
          {shipments.length} TRACKED
        </span>

      </div>

      <div className="shipment-list">

        {shipments.map((shipment) => (

          <div
            className={`shipment-item shipment-item-${shipment.risk}`}
            key={shipment.id}
          >

            {/* ICON */}
            <div className="shipment-item-icon">

              {shipment.risk === "critical" ? (
                <AlertTriangle size={18} />
              ) : shipment.status === "DELIVERED" ? (
                <CheckCircle2 size={18} />
              ) : (
                <Truck size={18} />
              )}

            </div>

            {/* MAIN INFO */}
            <div className="shipment-item-content">

              <div className="shipment-item-top">

                <strong>
                  {shipment.id}
                </strong>

                <span
                  className={`shipment-status shipment-status-${shipment.risk}`}
                >
                  {shipment.status}
                </span>

              </div>

              <div className="shipment-route">

                <span>
                  {shipment.origin}
                </span>

                <span className="shipment-route-arrow">
                  →
                </span>

                <span>
                  {shipment.destination}
                </span>

              </div>

              <div className="shipment-item-meta">

                <span>
                  <Truck size={13} />
                  {shipment.vehicle}
                </span>

                <span>
                  <MapPin size={13} />
                  {shipment.currentLocation}
                </span>

                <span>
                  <Clock3 size={13} />
                  {shipment.lastUpdate}
                </span>

              </div>

            </div>

            {/* PROGRESS */}
            <div className="shipment-progress-wrapper">

              <div className="shipment-progress-label">
                <span>PROGRESS</span>
                <strong>{shipment.progress}%</strong>
              </div>

              <div className="shipment-progress-track">

                <div
                  className={`shipment-progress-fill shipment-progress-${shipment.risk}`}
                  style={{
                    width: `${shipment.progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}