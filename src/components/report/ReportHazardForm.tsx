"use client";

import {
  Camera,
  CheckCircle2,
  ImagePlus,
  MapPin,
  Mic,
  Navigation,
  Send,
  ShieldAlert,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type HazardType =
  | "landslide"
  | "blockage"
  | "accident"
  | "weather"
  | "roadDamage"
  | "other";

type Severity =
  | "low"
  | "moderate"
  | "high"
  | "critical";

export default function ReportHazardForm() {
  const { t } = useLanguage();

  const [hazardType, setHazardType] =
    useState<HazardType>("landslide");

  const [severity, setSeverity] =
    useState<Severity>("high");

  const [location, setLocation] =
    useState("Current location");

  const [description, setDescription] =
    useState("");

  const [photoName, setPhotoName] =
    useState("");

  const [isRecording, setIsRecording] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setPhotoName(file.name);
    }
  };

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setSubmitted(true);

    window.setTimeout(() => {
      setSubmitted(false);
    }, 3500);
  };

  return (
    <form
      className="report-hazard-form"
      onSubmit={handleSubmit}
    >
      <div className="report-form-grid">
        {/* LEFT COLUMN */}
        <div className="report-form-main">
          <section className="report-form-card">
            <div className="report-form-card-header">
              <div>
                <span className="section-eyebrow">
                  {t.report.incident.eyebrow}
                </span>

                <h2>
                  {t.report.incident.title}
                </h2>

                <p>
                  {t.report.incident.description}
                </p>
              </div>

              <div className="report-form-icon">
                <ShieldAlert size={19} />
              </div>
            </div>

            {/* HAZARD TYPE */}
            <div className="report-field">
              <label>
                {t.report.fields.hazardType}
              </label>

              <div className="report-option-grid">
                {(
                  Object.keys(
                    t.report.hazardTypes
                  ) as HazardType[]
                ).map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`report-option ${
                      hazardType === type
                        ? "report-option-active"
                        : ""
                    }`}
                    onClick={() =>
                      setHazardType(type)
                    }
                  >
                    {t.report.hazardTypes[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* SEVERITY */}
            <div className="report-field">
              <label>
                {t.report.fields.severity}
              </label>

              <div className="report-severity-grid">
                {(
                  Object.keys(
                    t.report.severity
                  ) as Severity[]
                ).map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`report-severity report-severity-${level} ${
                      severity === level
                        ? "report-severity-active"
                        : ""
                    }`}
                    onClick={() =>
                      setSeverity(level)
                    }
                  >
                    <span />

                    {t.report.severity[level]}
                  </button>
                ))}
              </div>
            </div>

            {/* LOCATION */}
            <div className="report-field">
              <label>
                {t.report.fields.location}
              </label>

              <div className="report-location-box">
                <div className="report-location-icon">
                  <MapPin size={17} />
                </div>

                <div className="report-location-text">
                  <strong>{location}</strong>

                  <span>
                    {t.report.location.detected}
                  </span>
                </div>

                <button
                  type="button"
                  className="report-location-button"
                  onClick={() =>
                    setLocation(
                      "GPS location detected"
                    )
                  }
                >
                  <Navigation size={15} />
                  {t.report.location.useGps}
                </button>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="report-field">
              <div className="report-label-row">
                <label>
                  {t.report.fields.description}
                </label>

                <span>
                  {t.report.fields.optional}
                </span>
              </div>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                placeholder={
                  t.report.fields.descriptionPlaceholder
                }
                rows={5}
              />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="report-form-side">
          {/* MEDIA */}
          <section className="report-form-card">
            <div className="report-side-header">
              <div>
                <span className="section-eyebrow">
                  {t.report.media.eyebrow}
                </span>

                <h2>
                  {t.report.media.title}
                </h2>
              </div>

              <Camera size={19} />
            </div>

            <label className="report-upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                hidden
              />

              {photoName ? (
                <>
                  <CheckCircle2 size={25} />

                  <strong>{photoName}</strong>

                  <span>
                    {t.report.media.photoAdded}
                  </span>
                </>
              ) : (
                <>
                  <ImagePlus size={25} />

                  <strong>
                    {t.report.media.addPhoto}
                  </strong>

                  <span>
                    {t.report.media.photoHint}
                  </span>
                </>
              )}

              <div className="report-upload-action">
                <Upload size={14} />
                {t.report.media.choosePhoto}
              </div>
            </label>

            <button
              type="button"
              className={`report-voice-button ${
                isRecording
                  ? "report-voice-recording"
                  : ""
              }`}
              onClick={() =>
                setIsRecording(
                  (current) => !current
                )
              }
            >
              <Mic size={17} />

              <span>
                {isRecording
                  ? t.report.media.stopRecording
                  : t.report.media.voiceReport}
              </span>

              <span className="report-voice-status">
                {isRecording
                  ? t.report.media.recording
                  : t.report.media.optional}
              </span>
            </button>
          </section>

          {/* SAFETY NOTE */}
          <section className="report-safety-card">
            <div className="report-safety-icon">
              <ShieldAlert size={18} />
            </div>

            <div>
              <strong>
                {t.report.safety.title}
              </strong>

              <p>
                {t.report.safety.description}
              </p>
            </div>
          </section>

          {/* SUBMIT */}
          <button
            type="submit"
            className="report-submit-button"
          >
            <Send size={17} />

            {t.report.actions.submit}
          </button>

          <div className="report-offline-status">
            <span />

            {t.report.offline}
          </div>
        </div>
      </div>

      {submitted && (
        <div className="report-success">
          <CheckCircle2 size={19} />

          <div>
            <strong>
              {t.report.success.title}
            </strong>

            <span>
              {t.report.success.description}
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              setSubmitted(false)
            }
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </form>
  );
}