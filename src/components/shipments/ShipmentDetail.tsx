"use client";

import {
  ArrowRight,
  Clock3,
  MapPin,
  Navigation,
  Package,
  ShieldAlert,
  Truck,
  User,
} from "lucide-react";

import { shipments } from "@/data/shipments";

const shipment = shipments[1];

export default function ShipmentDetail() {
  return (
    <section className="shipment-detail-card">

      {/* HEADER */}
      <div className="shipment-detail-header">

        <div>
          <span className="section-eyebrow">
            SELECTED SHIPMENT
          </span>

          <h2>{shipment.id}</h2>

          <p>
            Live shipment tracking and route intelligence.
          </p>
        </div>

        <div className="shipment-risk-badge">
          <ShieldAlert size={15} />
          AT RISK
        </div>

      </div>

      {/* ROUTE VISUAL */}
      <div className="shipment-route-visual">

        <div className="shipment-route-grid" />

        <div className="shipment-route-path">

          <div className="shipment-route-point shipment-start">
            <span />
          </div>

          <div className="shipment-route-line">
            <div className="shipment-route-progress" />
          </div>

          <div className="shipment-route-point shipment-current">
            <Truck size={16} />
          </div>

          <div className="shipment-route-line shipment-route-line-final" />

          <div className="shipment-route-point shipment-end">
            <MapPin size={16} />
          </div>

        </div>

        <div className="shipment-route-label shipment-route-start-label">
          {shipment.origin}
        </div>

        <div className="shipment-route-label shipment-route-current-label">
          {shipment.currentLocation}
        </div>

        <div className="shipment-route-label shipment-route-end-label">
          {shipment.destination}
        </div>

      </div>

      {/* SHIPMENT INFO */}
      <div className="shipment-detail-info">

        <div>
          <span>
            <Navigation size={13} />
            ROUTE
          </span>

          <strong>
            {shipment.route}
          </strong>
        </div>

        <div>
          <span>
            <Clock3 size={13} />
            ETA
          </span>

          <strong>
            {shipment.eta}
          </strong>
        </div>

        <div>
          <span>
            <Truck size={13} />
            VEHICLE
          </span>

          <strong>
            {shipment.vehicle}
          </strong>
        </div>

        <div>
          <span>
            <User size={13} />
            DRIVER
          </span>

          <strong>
            {shipment.driver}
          </strong>
        </div>

        <div>
          <span>
            <Package size={13} />
            CARGO
          </span>

          <strong>
            {shipment.cargo}
          </strong>
        </div>

        <div>
          <span>
            <MapPin size={13} />
            REMAINING
          </span>

          <strong>
            {shipment.distanceRemaining}
          </strong>
        </div>

      </div>

      {/* WARNING */}
      <div className="shipment-warning">

        <ShieldAlert size={17} />

        <div>
          <strong>
            Route risk detected
          </strong>

          <p>
            Active hazard reported along the NH-10
            corridor. Alternate routing is recommended.
          </p>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="shipment-detail-actions">

        <button type="button">

          <Navigation size={16} />

          Track shipment

          <ArrowRight size={16} />

        </button>

        <button
          type="button"
          className="shipment-secondary-button"
        >

          Analyze route

        </button>

      </div>

    </section>
  );
}