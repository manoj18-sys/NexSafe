"use client";

import NERSafeMap from "@/components/map/NERSafeMap";

export default function SimulationMap() {
  return (
    <section className="simulation-map-card">

      {/* MAP HEADER */}
      <div className="simulation-card-header">

        <div>
          <span className="section-eyebrow">
            LIVE SIMULATION
          </span>

          <h2>Route impact model</h2>

          <p>
            Satellite view for visualizing the selected simulation area.
          </p>
        </div>

        <span className="simulation-map-status">
          <span />
          RUNNING
        </span>

      </div>

      {/* SATELLITE MAP */}
      <div className="simulation-map">

        <NERSafeMap
          mode="clean"
          height={500}
        />

      </div>

    </section>
  );
}