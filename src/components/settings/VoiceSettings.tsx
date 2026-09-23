"use client";

import {
  Mic,
  Volume2,
  Languages,
} from "lucide-react";

export default function VoiceSettings() {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <div className="settings-section-icon">
          <Mic size={19} />
        </div>

        <div>
          <h2>AI Voice Assistant</h2>

          <p>
            Configure voice interaction for route and safety
            information.
          </p>
        </div>
      </div>

      <div className="settings-voice-status">
        <div className="settings-voice-icon">
          <Volume2 size={19} />
        </div>

        <div>
          <strong>Voice assistant enabled</strong>

          <span>
            Ready for voice-based interaction.
          </span>
        </div>

        <button
          type="button"
          className="settings-toggle active"
          aria-label="Toggle voice assistant"
        >
          <span />
        </button>
      </div>

      <div className="settings-select-field">
        <label htmlFor="voice-language">
          VOICE LANGUAGE
        </label>

        <div>
          <Languages size={15} />

          <select
            id="voice-language"
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="as">Assamese</option>
            <option value="bn">Bengali</option>
            <option value="kh">Khasi</option>
            <option value="lus">Mizo</option>
          </select>
        </div>
      </div>
    </section>
  );
}