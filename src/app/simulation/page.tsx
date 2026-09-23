"use client";

import SimulationOverview from "@/components/simulation/SimulationOverview";
import SimulationControls from "@/components/simulation/SimulationControls";
import SimulationMap from "@/components/simulation/SimulationMap";
import SimulationResults from "@/components/simulation/SimulationResults";
import SimulationTimeline from "@/components/simulation/SimulationTimeline";

export default function SimulationPage() {
  return (
    <main className="simulation-page">

      {/* HEADER */}
      <header className="simulation-page-header">
        <div>
          <span className="section-eyebrow">
            NER-SAFE / SIMULATION ENGINE
          </span>

          <h1>What-If Simulation</h1>

          <p>
            Model disruptions, evaluate route impacts,
            and test emergency rerouting strategies.
          </p>
        </div>

        <div className="simulation-live-badge">
          <span />
          DIGITAL TWIN
        </div>
      </header>

      {/* KPI */}
      <SimulationOverview />

      {/* CONTROLS */}
      <SimulationControls />

      {/* MAP + RESULTS */}
      <div className="simulation-main-grid">
        <SimulationMap />
        <SimulationResults />
      </div>

      {/* TIMELINE */}
      <SimulationTimeline />

    </main>
  );
}