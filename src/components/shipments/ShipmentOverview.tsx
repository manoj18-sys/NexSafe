"use client";

import {
  Package,
  Truck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const overview = [
  {
    label: "Active shipments",
    value: "24",
    icon: Package,
    type: "safe",
  },
  {
    label: "In transit",
    value: "18",
    icon: Truck,
    type: "safe",
  },
  {
    label: "At risk",
    value: "03",
    icon: AlertTriangle,
    type: "critical",
  },
  {
    label: "Delivered today",
    value: "12",
    icon: CheckCircle2,
    type: "safe",
  },
];

export default function ShipmentOverview() {
  return (
    <div className="shipment-overview">

      {overview.map((item) => {
        const Icon = item.icon;

        return (
          <div
            className={`shipment-stat shipment-${item.type}`}
            key={item.label}
          >
            <div className="shipment-stat-icon">
              <Icon size={20} />
            </div>

            <div className="shipment-stat-content">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        );
      })}

    </div>
  );
}