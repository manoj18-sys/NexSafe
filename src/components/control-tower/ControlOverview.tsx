"use client";

import {
  AlertTriangle,
  Route,
  Truck,
  Package,
} from "lucide-react";

const overview = [
  {
    label: "Active incidents",
    value: "07",
    icon: AlertTriangle,
    type: "critical",
  },
  {
    label: "Critical routes",
    value: "02",
    icon: Route,
    type: "critical",
  },
  {
    label: "Vehicles active",
    value: "33",
    icon: Truck,
    type: "safe",
  },
  {
    label: "Shipments monitored",
    value: "24",
    icon: Package,
    type: "safe",
  },
];

export default function ControlOverview() {
  return (
    <div className="control-overview">

      {overview.map((item) => {
        const Icon = item.icon;

        return (
          <div
            className={`control-stat control-stat-${item.type}`}
            key={item.label}
          >
            <div className="control-stat-icon">
              <Icon size={20} />
            </div>

            <div className="control-stat-content">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        );
      })}

    </div>
  );
}