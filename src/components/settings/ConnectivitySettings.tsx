"use client";

import {
  Wifi,
  Database,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export default function ConnectivitySettings() {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <div className="settings-section-icon">
          <Wifi size={19} />
        </div>

        <div>
          <h2>Connectivity & Offline Mode</h2>

          <p>
            Monitor network availability and local data
            synchronization.
          </p>
        </div>
      </div>

      <div className="settings-connectivity-status">
        <div className="connectivity-indicator">
          <span />
        </div>

        <div>
          <strong>Online</strong>
          <span>Network connection is available.</span>
        </div>

        <span className="connectivity-badge">
          CONNECTED
        </span>
      </div>

      <div className="settings-connectivity-grid">
        <div>
          <Database size={17} />

          <span>Local cache</span>

          <strong>Ready</strong>
        </div>

        <div>
          <RefreshCw size={17} />

          <span>Sync queue</span>

          <strong>0 pending</strong>
        </div>

        <div>
          <CheckCircle2 size={17} />

          <span>Last sync</span>

          <strong>Just now</strong>
        </div>
      </div>
    </section>
  );
}