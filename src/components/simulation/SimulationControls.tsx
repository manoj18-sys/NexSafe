"use client";

import {
  Play,
  RotateCcw,
  Zap,
} from "lucide-react";

import { simulationScenarios } from "@/data/simulations";

export default function SimulationControls() {
  return (
    <section className="simulation-controls-card">
      <div className="simulation-card-header">
        <div>
          <span className="section-eyebrow">
            SCENARIO ENGINE
          </span>

          <h2>Configure disruption</h2>

          <p>
            Select a real-world hazard scenario and simulate
            its operational impact.
          </p>
        </div>

        <div className="simulation-engine-badge">
          <Zap size={14} />
          SIMULATION
        </div>
      </div>

      <div className="simulation-form">
        <div className="simulation-field">
          <label htmlFor="scenario">
            Disruption scenario
          </label>

          <select id="scenario" defaultValue="landslide-nh10">
            {simulationScenarios.map((scenario) => (
              <option
                value={scenario.id}
                key={scenario.id}
              >
                {scenario.title} · {scenario.location}
              </option>
            ))}
          </select>
        </div>

        <div className="simulation-field">
          <label htmlFor="severity">
            Severity level
          </label>

          <select id="severity" defaultValue="critical">
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </div>

        <div className="simulation-actions">
          <button
            type="button"
            className="simulation-run-button"
          >
            <Play size={16} />
            Run simulation
          </button>

          <button
            type="button"
            className="simulation-reset-button"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}