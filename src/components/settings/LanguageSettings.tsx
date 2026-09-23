"use client";

import { Languages, Check } from "lucide-react";

import { supportedLanguages } from "@/data/settings";

export default function LanguageSettings() {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <div className="settings-section-icon">
          <Languages size={19} />
        </div>

        <div>
          <h2>Language</h2>

          <p>
            Choose the language used throughout the NER-SAFE
            interface.
          </p>
        </div>
      </div>

      <div className="settings-language-grid">
        {supportedLanguages.map((language, index) => (
          <button
            type="button"
            className={`settings-language-option ${
              index === 0 ? "selected" : ""
            }`}
            key={language.code}
          >
            <div>
              <strong>{language.nativeName}</strong>
              <span>{language.name}</span>
            </div>

            {index === 0 && <Check size={17} />}
          </button>
        ))}
      </div>

      <div className="settings-note">
        Language changes will apply across navigation,
        dashboards, alerts, and operational screens.
      </div>
    </section>
  );
}