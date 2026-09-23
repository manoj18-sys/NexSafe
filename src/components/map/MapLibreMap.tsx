"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map as MLMap,
  Marker,
  NavigationControl,
  Popup,
  type GeoJSONSource,
  type StyleSpecification,
} from "maplibre-gl";

import { pathToCoordinates } from "@/data/locations";

type RiskLevel = "stable" | "watch" | "critical";

type RouteMapProps = {
  path?: string[];
  riskLevel?: RiskLevel;
  height?: number;
};

const RISK_COLORS: Record<RiskLevel, string> = {
  stable: "#22c55e",
  watch: "#f59e0b",
  critical: "#ef4444",
};

const ROUTE_SOURCE_ID = "route-line-source";
const ROUTE_CASING_LAYER_ID = "route-line-casing";
const ROUTE_LAYER_ID = "route-line-layer";

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
    { id: "satellite-layer", type: "raster", source: "satellite" },
    { id: "labels-layer", type: "raster", source: "labels" },
  ],
};

export default function MapLibreMap({
  path = [],
  riskLevel = "stable",
  height = 480,
}: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MLMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MLMap({
      container: containerRef.current,
      style: SATELLITE_STYLE,
      center: [92.9376, 26.2006],
      zoom: 5.5,
    });

    map.addControl(new NavigationControl(), "top-right");

    const setupRouteLayers = () => {
      // Idempotent: safe even if 'load' fires more than once (StrictMode / re-mounts).
      if (!map.getSource(ROUTE_SOURCE_ID)) {
        map.addSource(ROUTE_SOURCE_ID, {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
      }

      if (!map.getLayer(ROUTE_CASING_LAYER_ID)) {
        map.addLayer({
          id: ROUTE_CASING_LAYER_ID,
          type: "line",
          source: ROUTE_SOURCE_ID,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#ffffff",
            "line-width": 8,
            "line-opacity": 0.9,
          },
        });
      }

      if (!map.getLayer(ROUTE_LAYER_ID)) {
        map.addLayer({
          id: ROUTE_LAYER_ID,
          type: "line",
          source: ROUTE_SOURCE_ID,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": RISK_COLORS[riskLevel],
            "line-width": 5,
          },
        });
      }

      mapRef.current = map;
      setReady(true);
    };

    map.on("load", setupRouteLayers);
    map.on("error", (e) => console.error("[MapLibreMap] map error:", e?.error ?? e));

    return () => {
      map.off("load", setupRouteLayers);
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const coords = pathToCoordinates(path);
    console.log("NER-SAFE PATH:", path);
console.log("NER-SAFE COORDINATES:", coords);

    if (coords.length < 2) {
      console.warn(
        "[MapLibreMap] fewer than 2 resolvable coordinates for path:",
        path
      );
    }

    const source = map.getSource(ROUTE_SOURCE_ID) as GeoJSONSource | undefined;
    if (source) {
      source.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: coords },
      });
    }

    if (map.getLayer(ROUTE_LAYER_ID)) {
      map.setPaintProperty(ROUTE_LAYER_ID, "line-color", RISK_COLORS[riskLevel]);
    }

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    path.forEach((stopName, index) => {
      const coord = coords[index];
      if (!coord) return;

      const isEndpoint = index === 0 || index === path.length - 1;
      const el = document.createElement("div");
      el.style.width = isEndpoint ? "18px" : "12px";
      el.style.height = isEndpoint ? "18px" : "12px";
      el.style.borderRadius = "50%";
      el.style.border = "3px solid #ffffff";
      el.style.boxShadow = "0 0 8px rgba(0,0,0,0.6)";
      el.style.background = isEndpoint
        ? index === 0
          ? "#0284c7"
          : "#111827"
        : RISK_COLORS[riskLevel];

      const marker = new Marker({ element: el })
        .setLngLat(coord)
        .setPopup(new Popup({ offset: 14 }).setText(stopName))
        .addTo(map);

      markersRef.current.push(marker);
    });

    if (coords.length > 1) {
      let minLng = coords[0][0], maxLng = coords[0][0];
      let minLat = coords[0][1], maxLat = coords[0][1];
      coords.forEach(([lng, lat]) => {
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      });
      map.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 80, duration: 800 });
    } else if (coords.length === 1) {
      map.flyTo({ center: coords[0], zoom: 7 });
    }
  }, [path, riskLevel, ready]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: `${height}px` }}
      className="rounded-2xl overflow-hidden"
    />
  );
}