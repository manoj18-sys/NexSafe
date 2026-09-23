"use client";

import NERSafeMap from "@/components/map/NERSafeMap";
import SafeZoneOverview from "@/components/safe-zones/SafeZoneOverview";

export default function SafeZonesPage() {
  return (
    <div className="safe-zones-page">

      {/* PAGE HEADER */}
      <div className="safe-zones-heading">
        <div>
          <div className="safe-zones-eyebrow">
            NER-SAFE / EMERGENCY NETWORK
          </div>

          <h1>Safe Zones</h1>

          <p>
            Monitor emergency shelters, relief zones, and safe-harbor
            locations across Northeast India.
          </p>
        </div>

        <div className="safe-zones-status">
          <span className="safe-zones-status-dot" />
          NETWORK ONLINE
        </div>
      </div>

      {/* LIVE SAFE ZONE MAP */}
      <div className="safe-zones-map-section">
        <NERSafeMap
          mode="safe-zones"
          height={520}
        />
      </div>

      {/* SAFE ZONE CARDS */}
      <SafeZoneOverview />

    </div>
  );
}