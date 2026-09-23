"use client";

import { corridors } from "@/data/controlTower";
import NERSafeMap from "@/components/map/NERSafeMap";

export default function ControlMap() {
  return (
    <section className="control-map-card">

      {/* MAP HEADER */}
      <div className="control-map-header">

        <div>
          <span className="section-eyebrow">
            LIVE NETWORK
          </span>

          <h2>Regional operations map</h2>

          <p>
            Satellite view of the Northeast India logistics network.
          </p>
        </div>

        <span className="control-map-status">
          <span />
          LIVE
        </span>

      </div>

      {/* SATELLITE MAP */}
      <div className="control-map">

        <NERSafeMap
          mode="clean"
          height={500}
        />

      </div>

      {/* CORRIDOR STATUS */}
      <div className="corridor-status-list">

        {corridors.map((corridor) => (
          <div
            className="corridor-status-item"
            key={corridor.id}
          >

            <div className="corridor-status-main">

              <span
                className={`corridor-status-dot corridor-${corridor.status.toLowerCase()}`}
              />

              <div>
                <strong>{corridor.name}</strong>
                <span>{corridor.region}</span>
              </div>

            </div>

            <div className="corridor-status-meta">

              <span>
                {corridor.vehicles} vehicles
              </span>

              <span>
                {corridor.shipments} shipments
              </span>

              <strong>
                {corridor.risk}% risk
              </strong>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}