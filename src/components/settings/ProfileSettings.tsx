"use client";

import { UserRound, Phone, MapPin, Briefcase } from "lucide-react";

import { profileSettings } from "@/data/settings";

export default function ProfileSettings() {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <div className="settings-section-icon">
          <UserRound size={19} />
        </div>

        <div>
          <h2>Profile</h2>

          <p>
            Manage the operator information associated
            with this NER-SAFE session.
          </p>
        </div>
      </div>

      <div className="settings-profile">
        <div className="settings-avatar">
          {profileSettings.name.charAt(0)}
        </div>

        <div className="settings-profile-info">
          <strong>{profileSettings.name}</strong>
          <span>{profileSettings.role}</span>
        </div>
      </div>

      <div className="settings-info-grid">
        <div className="settings-info-item">
          <Phone size={16} />

          <div>
            <span>PHONE NUMBER</span>
            <strong>{profileSettings.phone}</strong>
          </div>
        </div>

        <div className="settings-info-item">
          <MapPin size={16} />

          <div>
            <span>LOCATION</span>
            <strong>{profileSettings.location}</strong>
          </div>
        </div>

        <div className="settings-info-item">
          <Briefcase size={16} />

          <div>
            <span>ROLE</span>
            <strong>{profileSettings.role}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}