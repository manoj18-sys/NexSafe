"use client";

import {
  Truck,
  Package,
  Route,
  Clock3,
} from "lucide-react";

import { simulationStats } from "@/data/simulations";

const stats = [
  {
    label: "Affected vehicles",
    value: simulationStats.affectedVehicles,
    icon: Truck,
  },
  {
    label: "Affected shipments",
    value: simulationStats.affectedShipments,
    icon: Package,
  },
  {
    label: "Corridors impacted",
    value: simulationStats.affectedCorridors,
    icon: Route,
  },
  {
    label: "Estimated delay",
    value: simulationStats.estimatedDelay,
    icon: Clock3,
  },
];

export default function SimulationOverview() {
  return (
    <div className="simulation-overview">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="simulation-stat" key={stat.label}>
            <div className="simulation-stat-icon">
              <Icon size={20} />
            </div>

            <div className="simulation-stat-content">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}