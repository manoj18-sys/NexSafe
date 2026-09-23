"use client";

import ProfileSettings from "@/components/settings/ProfileSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import VoiceSettings from "@/components/settings/VoiceSettings";
import EmergencySettings from "@/components/settings/EmergencySettings";
import ConnectivitySettings from "@/components/settings/ConnectivitySettings";

export default function SettingsPage() {
  return (
    <main className="settings-page">

      <header className="settings-page-header">
        <div>
          <span className="section-eyebrow">
            NER-SAFE / SYSTEM SETTINGS
          </span>

          <h1>Settings</h1>

          <p>
            Configure your NER-SAFE profile, language,
            notifications, voice assistant, and connectivity.
          </p>
        </div>

        <div className="settings-system-badge">
          <span />
          SYSTEM READY
        </div>
      </header>

      <div className="settings-layout">

        <div className="settings-column">

          <ProfileSettings />

          <LanguageSettings />

          <AppearanceSettings />

          <NotificationSettings />

        </div>

        <div className="settings-column">

          <VoiceSettings />

          <EmergencySettings />

          <ConnectivitySettings />

        </div>

      </div>

    </main>
  );
}