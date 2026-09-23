"use client";

import {
  Ambulance,
  Clock3,
  MapPin,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { controlVehicles } from "@/data/controlTower";

function VehicleIcon({ type }: { type: string }) {
  if (type === "Ambulance") {
    return <Ambulance size={17} />;
  }

  if (type === "Rescue Vehicle") {
    return <ShieldCheck size={17} />;
  }

  return <Truck size={17} />;
}

export default function FleetStatus() {
  return (
    <section className="fleet-status-card">

      <div className="fleet-status-header">

        <div>
          <span className="section-eyebrow">
            FLEET MONITOR
          </span>

          <h2>Vehicle operations</h2>

          <p>
            Live status of tracked logistics and emergency vehicles.
          </p>
        </div>

        <span className="fleet-total">
          {controlVehicles.length} TRACKED
        </span>

      </div>

      <div className="fleet-grid">

        {controlVehicles.map((vehicle) => (

          <div
            className="fleet-item"
            key={vehicle.id}
          >

            <div className="fleet-icon">
              <VehicleIcon type={vehicle.type} />
            </div>

            <div className="fleet-info">

              <div className="fleet-title">
                <strong>{vehicle.id}</strong>

                <span
                  className={`fleet-status fleet-status-${vehicle.status.toLowerCase()}`}
                >
                  {vehicle.status}
                </span>
              </div>

              <span className="fleet-type">
                {vehicle.type}
              </span>

              <div className="fleet-meta">

                <span>
                  <MapPin size={11} />
                  {vehicle.location}
                </span>

                <span>
                  {vehicle.corridor}
                </span>

                <span>
                  <Clock3 size={11} />
                  {vehicle.eta}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}