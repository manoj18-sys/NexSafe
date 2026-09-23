"use client";

import ShipmentOverview from "@/components/shipments/ShipmentOverview";
import ShipmentList from "@/components/shipments/ShipmentList";
import ShipmentDetail from "@/components/shipments/ShipmentDetail";

export default function ShipmentsPage() {
  return (
    <main className="shipments-page">

      {/* PAGE HEADER */}
      <header className="shipments-page-header">
        <div>
          <span className="section-eyebrow">
            NER-SAFE / SHIPMENT OPERATIONS
          </span>

          <h1>Shipment Management</h1>

          <p>
            Monitor active shipments, vehicle movement,
            delivery progress, and route risk across the Northeast.
          </p>
        </div>

        <div className="shipment-live-badge">
          <span />
          LIVE OPERATIONS
        </div>
      </header>

      {/* OVERVIEW */}
      <ShipmentOverview />

      {/* MAIN CONTENT */}
      <div className="shipment-main-grid">

        <ShipmentList />

        <ShipmentDetail />

      </div>

    </main>
  );
}