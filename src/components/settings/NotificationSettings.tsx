"use client";

import { Bell } from "lucide-react";

import { notificationSettings } from "@/data/settings";

export default function NotificationSettings() {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <div className="settings-section-icon">
          <Bell size={19} />
        </div>

        <div>
          <h2>Notifications</h2>

          <p>
            Control operational alerts and system notifications.
          </p>
        </div>
      </div>

      <div className="settings-toggle-list">
        {notificationSettings.map((setting) => (
          <div
            className="settings-toggle-row"
            key={setting.id}
          >
            <div>
              <strong>{setting.title}</strong>

              <p>{setting.description}</p>
            </div>

            <button
              type="button"
              className={`settings-toggle ${
                setting.enabled ? "active" : ""
              }`}
              aria-label={`Toggle ${setting.title}`}
            >
              <span />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}