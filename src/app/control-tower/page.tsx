"use client";

import ControlOverview from "@/components/control-tower/ControlOverview";
import ControlMap from "@/components/control-tower/ControlMap";
import ResponseQueue from "@/components/control-tower/ResponseQueue";
import FleetStatus from "@/components/control-tower/FleetStatus";

export default function ControlTowerPage() {
  return (
    <main className="control-tower-page">

      {/* PAGE HEADER */}
      <header className="control-tower-header">
        <div>
          <span className="section-eyebrow">
            NER-SAFE / OPERATIONS COMMAND
          </span>

          <h1>Control Tower</h1>

          <p>
            Centralized monitoring of routes, vehicles,
            hazards, shipments, and emergency response.
          </p>
        </div>

        <div className="control-live-badge">
          <span />
          SYSTEM ONLINE
        </div>
      </header>

      {/* OVERVIEW */}
      <ControlOverview />

      {/* LIVE OPERATIONS */}
      <div className="control-main-grid">

        <ControlMap />

        <ResponseQueue />

      </div>

      {/* FLEET */}
      <FleetStatus />

    </main>
  );
}