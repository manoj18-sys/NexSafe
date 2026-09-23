"use client";

import {
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

export default function AppearanceSettings() {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <div className="settings-section-icon">
          <Moon size={19} />
        </div>

        <div>
          <h2>Appearance</h2>

          <p>
            Configure how the NER-SAFE interface appears.
          </p>
        </div>
      </div>

      <div className="settings-theme-options">
        <button
          type="button"
          className="settings-theme-option selected"
        >
          <Moon size={18} />

          <div>
            <strong>Dark</strong>
            <span>Low-light operational interface</span>
          </div>
        </button>

        <button
          type="button"
          className="settings-theme-option"
        >
          <Sun size={18} />

          <div>
            <strong>Light</strong>
            <span>Bright interface for daytime use</span>
          </div>
        </button>

        <button
          type="button"
          className="settings-theme-option"
        >
          <Monitor size={18} />

          <div>
            <strong>System</strong>
            <span>Follow device appearance</span>
          </div>
        </button>
      </div>
    </section>
  );
}