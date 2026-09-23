"use client";

import {
  ShieldAlert,
  PhoneCall,
  Siren,
} from "lucide-react";

import { emergencyContacts } from "@/data/settings";

export default function EmergencySettings() {
  return (
    <section className="settings-card settings-emergency-card">
      <div className="settings-card-header">
        <div className="settings-section-icon emergency">
          <ShieldAlert size={19} />
        </div>

        <div>
          <h2>Emergency & SOS</h2>

          <p>
            Configure emergency response contacts and SOS
            behaviour.
          </p>
        </div>
      </div>

      <div className="settings-emergency-banner">
        <Siren size={19} />

        <div>
          <strong>SOS emergency access</strong>

          <span>
            Emergency calling remains available from every
            operational page.
          </span>
        </div>
      </div>

      <div className="settings-contact-list">
        {emergencyContacts.map((contact) => (
          <div
            className="settings-contact"
            key={contact.number}
          >
            <div>
              <span>{contact.label}</span>
              <strong>{contact.number}</strong>
            </div>

            <button type="button">
              <PhoneCall size={14} />
              Call
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}