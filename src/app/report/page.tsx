"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import ReportHazardForm from "@/components/report/ReportHazardForm";


export default function ReportPage() {
  const { t } = useLanguage();

  return (
    <main className="report-page">
      <header className="report-page-header">
        <div>
          <span className="section-eyebrow">
            {t.report.eyebrow}
          </span>

          <h1>{t.report.title}</h1>

          <p>{t.report.description}</p>
        </div>

        <div className="live-system-badge">
          <span />
          {t.report.liveSystem}
        </div>
      </header>

      <ReportHazardForm />
    </main>
  );
}