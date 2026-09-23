"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map as MLMap,
  Marker,
  NavigationControl,
  Popup,
  type StyleSpecification,
} from "maplibre-gl";

type MapMode = "operations" | "safe-zones" | "clean";

type RiskLevel = "stable" | "watch" | "critical";

interface Vehicle {
  id: string;
  name: string;
  coordinates: [number, number];
  status: RiskLevel;
}

interface Hazard {
  id: string;
  name: string;
  coordinates: [number, number];
  severity: RiskLevel;
}

interface SafeZone {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  status: "available" | "limited" | "full";
  occupancy: string;
  elevation: string;
}

interface NERSafeMapProps {
  mode?: MapMode;
  height?: number;
  vehicles?: Vehicle[];
  hazards?: Hazard[];
  safeZones?: SafeZone[];
}

const RISK_COLORS: Record<RiskLevel, string> = {
  stable: "#22c55e",
  watch: "#f59e0b",
  critical: "#ef4444",
};

const SAFE_ZONE_COLORS = {
  available: "#22c55e",
  limited: "#f59e0b",
  full: "#ef4444",
};

const SATELLITE_STYLE: StyleSpecification = {
  version: 8,

  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Esri, Maxar, Earthstar Geographics",
    },

    labels: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
    },
  },

  layers: [
    {
      id: "satellite-layer",
      type: "raster",
      source: "satellite",
    },

    {
      id: "labels-layer",
      type: "raster",
      source: "labels",
    },
  ],
};

const DEFAULT_VEHICLES: Vehicle[] = [
  {
    id: "vehicle-1",
    name: "NER-TRK-018",
    coordinates: [91.7362, 26.1445],
    status: "stable",
  },
  {
    id: "vehicle-2",
    name: "NER-TRK-024",
    coordinates: [91.8933, 25.5788],
    status: "watch",
  },
  {
    id: "vehicle-3",
    name: "NER-TRK-031",
    coordinates: [92.7789, 24.8333],
    status: "stable",
  },
  {
    id: "vehicle-4",
    name: "NER-TRK-042",
    coordinates: [92.7176, 23.7271],
    status: "critical",
  },
];

const DEFAULT_HAZARDS: Hazard[] = [
  {
    id: "hazard-1",
    name: "Landslide detected",
    coordinates: [91.82, 25.83],
    severity: "critical",
  },
  {
    id: "hazard-2",
    name: "Road blockage",
    coordinates: [91.76, 25.95],
    severity: "watch",
  },
  {
    id: "hazard-3",
    name: "Heavy rainfall",
    coordinates: [92.45, 25.1],
    severity: "watch",
  },
];

const DEFAULT_SAFE_ZONES: SafeZone[] = [
  {
    id: "zone-1",
    name: "Nongpoh Emergency Safe Zone",
    location: "Nongpoh",
    coordinates: [91.88, 25.9],
    status: "available",
    occupancy: "32 / 80",
    elevation: "485 m",
  },
  {
    id: "zone-2",
    name: "Shillong Relief Zone",
    location: "Shillong",
    coordinates: [91.8933, 25.5788],
    status: "limited",
    occupancy: "68 / 80",
    elevation: "1496 m",
  },
  {
    id: "zone-3",
    name: "Silchar Emergency Hub",
    location: "Silchar",
    coordinates: [92.7789, 24.8333],
    status: "available",
    occupancy: "21 / 60",
    elevation: "22 m",
  },
  {
    id: "zone-4",
    name: "Aizawl Safe Harbor",
    location: "Aizawl",
    coordinates: [92.7176, 23.7271],
    status: "full",
    occupancy: "100 / 100",
    elevation: "1132m",
  },
];

function createMarkerElement(
  color: string,
  type: "vehicle" | "hazard" | "safe-zone"
) {
  const wrapper = document.createElement("div");

  wrapper.style.position = "relative";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";

  if (type === "vehicle") {
    wrapper.style.width = "18px";
    wrapper.style.height = "18px";
    wrapper.style.borderRadius = "50%";
    wrapper.style.background = color;
    wrapper.style.border = "3px solid white";
    wrapper.style.boxShadow = `0 0 14px ${color}`;
  }

  if (type === "hazard") {
    wrapper.style.width = "22px";
    wrapper.style.height = "22px";
    wrapper.style.borderRadius = "50%";
    wrapper.style.background = color;
    wrapper.style.border = "3px solid white";
    wrapper.style.boxShadow = `0 0 16px ${color}`;

    const inner = document.createElement("div");

    inner.innerText = "!";
    inner.style.color = "white";
    inner.style.fontWeight = "800";
    inner.style.fontSize = "12px";

    wrapper.appendChild(inner);
  }

  if (type === "safe-zone") {
    wrapper.style.width = "32px";
    wrapper.style.height = "32px";
    wrapper.style.borderRadius = "50%";
    wrapper.style.background = "rgba(15, 23, 42, 0.9)";
    wrapper.style.border = `2px solid ${color}`;
    wrapper.style.boxShadow = `0 0 18px ${color}`;

    const inner = document.createElement("div");

    inner.innerText = "✓";
    inner.style.color = color;
    inner.style.fontWeight = "900";
    inner.style.fontSize = "16px";

    wrapper.appendChild(inner);
  }

  return wrapper;
}

export default function NERSafeMap({
  mode = "operations",
  height = 480,
  vehicles = DEFAULT_VEHICLES,
  hazards = DEFAULT_HAZARDS,
  safeZones = DEFAULT_SAFE_ZONES,
}: NERSafeMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MLMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const [ready, setReady] = useState(false);

  /*
   * CREATE MAP
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MLMap({
      container: containerRef.current,
      style: SATELLITE_STYLE,

      // Northeast India
      center: [92.2, 25.2],
      zoom: 6,
    });

    /*
     * Navigation controls are useful on all map modes,
     * including the clean satellite map.
     */
    map.addControl(
      new NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      "top-right"
    );

    map.once("load", () => {
      mapRef.current = map;
      setReady(true);
    });

    map.on("error", (event) => {
      console.error(
        "[NER-SAFE MAP ERROR]",
        event?.error ?? event
      );
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());

      markersRef.current = [];

      map.remove();

      mapRef.current = null;
      setReady(false);
    };
  }, []);

  /*
   * MARKERS
   *
   * CLEAN MODE intentionally does nothing here.
   * This guarantees that Control Tower and Simulation
   * receive only the satellite map.
   */
  useEffect(() => {
    const map = mapRef.current;

    if (!map || !ready) return;

    markersRef.current.forEach((marker) => marker.remove());

    markersRef.current = [];

    /*
     * CLEAN MAP
     *
     * No vehicles.
     * No hazards.
     * No safe zones.
     * No popups.
     * No route overlays.
     */
    if (mode === "clean") {
      return;
    }

    /*
     * OPERATIONS MAP
     */
    if (mode === "operations") {
      vehicles.forEach((vehicle) => {
        const markerElement = createMarkerElement(
          RISK_COLORS[vehicle.status],
          "vehicle"
        );

        const popup = new Popup({
          offset: 14,
          closeButton: true,
        }).setHTML(`
          <div style="
            font-family: Arial, sans-serif;
            min-width: 150px;
            color: #111827;
          ">
            <strong>${vehicle.name}</strong>

            <div style="
              margin-top: 5px;
              font-size: 12px;
              text-transform: uppercase;
            ">
              STATUS: ${vehicle.status}
            </div>
          </div>
        `);

        const marker = new Marker({
          element: markerElement,
        })
          .setLngLat(vehicle.coordinates)
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });

      hazards.forEach((hazard) => {
        const markerElement = createMarkerElement(
          RISK_COLORS[hazard.severity],
          "hazard"
        );

        const popup = new Popup({
          offset: 14,
          closeButton: true,
        }).setHTML(`
          <div style="
            font-family: Arial, sans-serif;
            min-width: 170px;
            color: #111827;
          ">
            <strong>${hazard.name}</strong>

            <div style="
              margin-top: 5px;
              font-size: 12px;
              text-transform: uppercase;
            ">
              ${hazard.severity} HAZARD
            </div>
          </div>
        `);

        const marker = new Marker({
          element: markerElement,
        })
          .setLngLat(hazard.coordinates)
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }

    /*
     * SAFE ZONE MAP
     */
    if (mode === "safe-zones") {
      safeZones.forEach((zone) => {
        const markerElement = createMarkerElement(
          SAFE_ZONE_COLORS[zone.status],
          "safe-zone"
        );

        const popup = new Popup({
          offset: 18,
          closeButton: true,
        }).setHTML(`
          <div style="
            font-family: Arial, sans-serif;
            min-width: 200px;
            color: #111827;
          ">
            <strong>${zone.name}</strong>

            <div style="
              margin-top: 7px;
              font-size: 12px;
            ">
              ${zone.location}
            </div>

            <div style="
              margin-top: 7px;
              font-size: 12px;
            ">
              Occupancy: <strong>${zone.occupancy}</strong>
            </div>

            <div style="
              margin-top: 4px;
              font-size: 12px;
            ">
              Elevation: <strong>${zone.elevation}</strong>
            </div>
          </div>
        `);

        const marker = new Marker({
          element: markerElement,
        })
          .setLngLat(zone.coordinates)
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }
  }, [
    mode,
    vehicles,
    hazards,
    safeZones,
    ready,
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* 
        CLEAN MODE HAS NO UI OVERLAY.
        It is intentionally just the satellite map.
      */}

      {mode !== "clean" && (
        <>
          {/* MAP MODE LABEL */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              zIndex: 5,
              padding: "9px 13px",
              borderRadius: "999px",
              background: "rgba(5, 10, 18, 0.78)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            {mode === "operations"
              ? "LIVE GIS FEED"
              : "SAFE ZONE NETWORK"}
          </div>

          {/* OPERATIONS LEGEND */}
          {mode === "operations" && (
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                zIndex: 5,
                display: "flex",
                gap: "12px",
                padding: "9px 12px",
                borderRadius: "12px",
                background: "rgba(5, 10, 18, 0.78)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              <span>
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: RISK_COLORS.stable,
                    marginRight: 5,
                  }}
                />
                Stable
              </span>

              <span>
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: RISK_COLORS.watch,
                    marginRight: 5,
                  }}
                />
                Watch
              </span>

              <span>
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: RISK_COLORS.critical,
                    marginRight: 5,
                  }}
                />
                Critical
              </span>
            </div>
          )}

          {/* SAFE ZONE LEGEND */}
          {mode === "safe-zones" && (
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                zIndex: 5,
                display: "flex",
                gap: "12px",
                padding: "9px 12px",
                borderRadius: "12px",
                background: "rgba(5, 10, 18, 0.78)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              <span>
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: SAFE_ZONE_COLORS.available,
                    marginRight: 5,
                  }}
                />
                Available
              </span>

              <span>
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: SAFE_ZONE_COLORS.limited,
                    marginRight: 5,
                  }}
                />
                Limited
              </span>

              <span>
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: SAFE_ZONE_COLORS.full,
                    marginRight: 5,
                  }}
                />
                Full
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}