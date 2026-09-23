"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map as MapLibreMap,
  NavigationControl,
} from "maplibre-gl";

type Coordinate = [number, number];

type Corridor = {
  id: string;
  name: string;
  status: "stable" | "watch" | "critical";
  coordinates: Coordinate[];
};

type SafeZone = {
  id: string;
  name: string;
  elevation: number;
  coordinate: Coordinate;
};

type Truck = {
  truckId: string;
  status: string;
  speed: number;
  coordinate: Coordinate;
};

const corridorColors = {
  stable: "#22c55e",
  watch: "#f59e0b",
  critical: "#ef4444",
};

export default function LiveRouteMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  const drawOverlayRef = useRef<(() => void) | null>(null);
  const filterRef = useRef<string>("all");

  const [activeFilter, setActiveFilter] = useState("all");

  const corridorsRef = useRef<Corridor[]>([]);
  const safeZonesRef = useRef<SafeZone[]>([]);
  const trucksRef = useRef<Truck[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new MapLibreMap({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [92.5, 25.5],
      zoom: 5.5,
    });

    mapRef.current = map;

    map.addControl(new NavigationControl(), "top-right");

    const setDebug = (message: string, color: string) => {
      const debug = document.getElementById("gis-debug");

      if (debug) {
        debug.textContent = message;
        debug.style.background = color;
      }
    };

    /*
     * ============================================================
     * DRAW GIS OVERLAY
     * ============================================================
     */

    const drawOverlay = () => {
      const svg = overlayRef.current;

      if (!svg) return;

      const width = map.getContainer().clientWidth;
      const height = map.getContainer().clientHeight;

      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      svg.innerHTML = "";

      const active = filterRef.current;

      /*
       * ==========================================================
       * CORRIDORS
       * ==========================================================
       */

      corridorsRef.current.forEach((corridor) => {
        if (
          active !== "all" &&
          active !== corridor.status
        ) {
          return;
        }

        const points = corridor.coordinates
          .map((coordinate) => {
            const point = map.project(coordinate);

            return `${point.x},${point.y}`;
          })
          .join(" ");

        /*
         * White border
         */

        const border = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polyline"
        );

        border.setAttribute("points", points);
        border.setAttribute("fill", "none");
        border.setAttribute("stroke", "#ffffff");
        border.setAttribute("stroke-width", "13");
        border.setAttribute("stroke-linecap", "round");
        border.setAttribute("stroke-linejoin", "round");
        border.setAttribute("opacity", "0.9");

        svg.appendChild(border);

        /*
         * Colored route
         */

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polyline"
        );

        line.setAttribute("points", points);

        line.setAttribute(
          "stroke",
          corridorColors[corridor.status]
        );

        line.setAttribute(
          "stroke-width",
          active === corridor.status ? "10" : "7"
        );

        line.setAttribute("fill", "none");
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("stroke-linejoin", "round");

        svg.appendChild(line);

        /*
         * Route points
         */

        if (
          active === corridor.status ||
          active === "all"
        ) {
          corridor.coordinates.forEach((coordinate) => {
            const point = map.project(coordinate);

            const circle = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );

            circle.setAttribute("cx", String(point.x));
            circle.setAttribute("cy", String(point.y));
            circle.setAttribute(
              "r",
              active === corridor.status ? "6" : "4"
            );
            circle.setAttribute(
              "fill",
              corridorColors[corridor.status]
            );
            circle.setAttribute(
              "stroke",
              "#ffffff"
            );
            circle.setAttribute("stroke-width", "2");

            svg.appendChild(circle);
          });
        }

        /*
         * Corridor label
         */

        const firstCoordinate = corridor.coordinates[0];

        const labelPosition =
          map.project(firstCoordinate);

        const label = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );

        label.setAttribute(
          "x",
          String(labelPosition.x + 8)
        );

        label.setAttribute(
          "y",
          String(labelPosition.y - 10)
        );

        label.setAttribute("font-size", "12");
        label.setAttribute("font-weight", "800");
        label.setAttribute("fill", "#111827");

        label.setAttribute(
          "style",
          "paint-order:stroke;stroke:white;stroke-width:4px;"
        );

        label.textContent = corridor.id;

        svg.appendChild(label);
      });

      /*
       * ==========================================================
       * SAFE ZONES
       * ==========================================================
       */

      if (
        active === "all" ||
        active === "safe"
      ) {
        safeZonesRef.current.forEach((zone) => {
          const point = map.project(zone.coordinate);

          const outer = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

          outer.setAttribute(
            "cx",
            String(point.x)
          );

          outer.setAttribute(
            "cy",
            String(point.y)
          );

          outer.setAttribute("r", "17");
          outer.setAttribute("fill", "#16a34a");
          outer.setAttribute("fill-opacity", "0.25");
          outer.setAttribute("stroke", "#16a34a");
          outer.setAttribute("stroke-width", "3");

          svg.appendChild(outer);

          const center = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

          center.setAttribute(
            "cx",
            String(point.x)
          );

          center.setAttribute(
            "cy",
            String(point.y)
          );

          center.setAttribute("r", "8");
          center.setAttribute("fill", "#16a34a");
          center.setAttribute("stroke", "#ffffff");
          center.setAttribute("stroke-width", "2");

          svg.appendChild(center);

          const label = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );

          label.setAttribute(
            "x",
            String(point.x + 20)
          );

          label.setAttribute(
            "y",
            String(point.y + 4)
          );

          label.setAttribute("font-size", "11");
          label.setAttribute("font-weight", "800");
          label.setAttribute("fill", "#111827");

          label.setAttribute(
            "style",
            "paint-order:stroke;stroke:white;stroke-width:4px;"
          );

          label.textContent =
            `${zone.name} (${zone.elevation}m)`;

          svg.appendChild(label);
        });
      }

      /*
       * ==========================================================
       * TRUCKS
       * ==========================================================
       */

      if (
        active === "all" ||
        active === "truck"
      ) {
        trucksRef.current.forEach((truck) => {
          const point = map.project(
            truck.coordinate
          );

          const ring = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

          ring.setAttribute(
            "cx",
            String(point.x)
          );

          ring.setAttribute(
            "cy",
            String(point.y)
          );

          ring.setAttribute("r", "15");
          ring.setAttribute("fill", "#0ea5e9");
          ring.setAttribute("fill-opacity", "0.25");
          ring.setAttribute("stroke", "#0284c7");
          ring.setAttribute("stroke-width", "2");

          svg.appendChild(ring);

          const marker = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );

          marker.setAttribute(
            "cx",
            String(point.x)
          );

          marker.setAttribute(
            "cy",
            String(point.y)
          );

          marker.setAttribute("r", "8");
          marker.setAttribute("fill", "#0284c7");
          marker.setAttribute("stroke", "#ffffff");
          marker.setAttribute("stroke-width", "2");

          svg.appendChild(marker);

          const label = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );

          label.setAttribute(
            "x",
            String(point.x + 18)
          );

          label.setAttribute(
            "y",
            String(point.y - 8)
          );

          label.setAttribute("font-size", "11");
          label.setAttribute("font-weight", "800");
          label.setAttribute("fill", "#111827");

          label.setAttribute(
            "style",
            "paint-order:stroke;stroke:white;stroke-width:4px;"
          );

          label.textContent =
            `${truck.truckId} • ${truck.speed} km/h`;

          svg.appendChild(label);
        });
      }
    };

    drawOverlayRef.current = drawOverlay;

    /*
     * ============================================================
     * LOAD GIS DATA
     * ============================================================
     */

    const loadGIS = async () => {
      try {
        setDebug(
          "LOADING GIS DATA...",
          "#2563eb"
        );

        /*
         * Corridors
         */

        const corridorResponse = await fetch(
          "/data/corridors.geojson"
        );

        if (!corridorResponse.ok) {
          throw new Error(
            `Corridors request failed: ${corridorResponse.status}`
          );
        }

        const corridorData =
          await corridorResponse.json();

        corridorsRef.current =
          corridorData.features.map(
            (feature: any) => ({
              id: feature.properties.id,
              name: feature.properties.name,
              status: feature.properties.status,
              coordinates:
                feature.geometry.coordinates,
            })
          );

        /*
         * Safe zones
         */

        const safeResponse = await fetch(
          "/data/safe-zones.geojson"
        );

        if (!safeResponse.ok) {
          throw new Error(
            `Safe zones request failed: ${safeResponse.status}`
          );
        }

        const safeData =
          await safeResponse.json();

        safeZonesRef.current =
          safeData.features.map(
            (feature: any) => ({
              id: feature.properties.id,
              name: feature.properties.name,
              elevation:
                feature.properties.elevation,
              coordinate:
                feature.geometry.coordinates,
            })
          );

        /*
         * Trucks
         */

        const truckResponse = await fetch(
          "/data/trucks.geojson"
        );

        if (!truckResponse.ok) {
          throw new Error(
            `Trucks request failed: ${truckResponse.status}`
          );
        }

        const truckData =
          await truckResponse.json();

        trucksRef.current =
          truckData.features.map(
            (feature: any) => ({
              truckId:
                feature.properties.truckId,
              status:
                feature.properties.status,
              speed:
                feature.properties.speed,
              coordinate:
                feature.geometry.coordinates,
            })
          );

        /*
         * Fit complete map to corridors
         */

        if (corridorsRef.current.length > 0) {
          const first =
            corridorsRef.current[0]
              .coordinates[0];

          let minLng = first[0];
          let maxLng = first[0];
          let minLat = first[1];
          let maxLat = first[1];

          corridorsRef.current.forEach(
            (corridor) => {
              corridor.coordinates.forEach(
                ([lng, lat]) => {
                  minLng = Math.min(
                    minLng,
                    lng
                  );

                  maxLng = Math.max(
                    maxLng,
                    lng
                  );

                  minLat = Math.min(
                    minLat,
                    lat
                  );

                  maxLat = Math.max(
                    maxLat,
                    lat
                  );
                }
              );
            }
          );

          map.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat],
            ],
            {
              padding: 70,
              duration: 800,
            }
          );
        }

        map.once("idle", () => {
          drawOverlay();

          setDebug(
            `GIS COMPLETE: ${corridorsRef.current.length} CORRIDORS • ${safeZonesRef.current.length} SAFE ZONES • ${trucksRef.current.length} TRUCKS`,
            "#16a34a"
          );
        });
      } catch (error) {
        console.error(
          "GIS ERROR:",
          error
        );

        setDebug(
          `GIS ERROR: ${String(error)}`,
          "#dc2626"
        );
      }
    };

    /*
     * ============================================================
     * MAP LOAD
     * ============================================================
     */

    map.on("load", () => {
      /*
       * FULL SATELLITE BASEMAP
       */

      map.addSource("satellite", {
        type: "raster",
        tiles: [
          "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
        ],
        tileSize: 256,
      });

      map.addLayer({
        id: "satellite-layer",
        type: "raster",
        source: "satellite",
        layout: {
          visibility: "visible",
        },
        paint: {
          "raster-opacity": 1,
        },
      });

      loadGIS();
    });

    /*
     * Redraw GIS when map moves
     */

    map.on("move", drawOverlay);
    map.on("zoom", drawOverlay);
    map.on("resize", drawOverlay);
    map.on("rotate", drawOverlay);
    map.on("pitch", drawOverlay);

    return () => {
      map.remove();
    };
  }, []);

  /*
   * ============================================================
   * FILTER BUTTON
   * ============================================================
   */

  const selectFilter = (
    filter: string
  ) => {
    filterRef.current = filter;

    setActiveFilter(filter);

    /*
     * Redraw map
     */

    drawOverlayRef.current?.();

    const map = mapRef.current;

    if (!map) return;

    /*
     * ALL
     */

    if (filter === "all") {
      const allCoordinates: Coordinate[] = [];

      corridorsRef.current.forEach(
        (corridor) => {
          corridor.coordinates.forEach(
            (coordinate) => {
              allCoordinates.push(
                coordinate
              );
            }
          );
        }
      );

      if (allCoordinates.length > 0) {
        const first =
          allCoordinates[0];

        let minLng = first[0];
        let maxLng = first[0];
        let minLat = first[1];
        let maxLat = first[1];

        allCoordinates.forEach(
          ([lng, lat]) => {
            minLng = Math.min(
              minLng,
              lng
            );

            maxLng = Math.max(
              maxLng,
              lng
            );

            minLat = Math.min(
              minLat,
              lat
            );

            maxLat = Math.max(
              maxLat,
              lat
            );
          }
        );

        map.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: 80,
            duration: 700,
          }
        );
      }

      return;
    }

    /*
     * Selected corridor
     */

    if (
      filter === "stable" ||
      filter === "watch" ||
      filter === "critical"
    ) {
      const corridor =
        corridorsRef.current.find(
          (item) =>
            item.status === filter
        );

      if (corridor) {
        const first =
          corridor.coordinates[0];

        let minLng = first[0];
        let maxLng = first[0];
        let minLat = first[1];
        let maxLat = first[1];

        corridor.coordinates.forEach(
          ([lng, lat]) => {
            minLng = Math.min(
              minLng,
              lng
            );

            maxLng = Math.max(
              maxLng,
              lng
            );

            minLat = Math.min(
              minLat,
              lat
            );

            maxLat = Math.max(
              maxLat,
              lat
            );
          }
        );

        map.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: 100,
            duration: 900,
          }
        );
      }

      return;
    }

    /*
     * Safe Harbor
     */

    if (filter === "safe") {
      const coordinates =
        safeZonesRef.current.map(
          (zone) =>
            zone.coordinate
        );

      if (coordinates.length > 0) {
        map.fitBounds(
          [
            coordinates[0],
            coordinates[0],
          ],
          {
            padding: 150,
            duration: 700,
          }
        );
      }

      return;
    }

    /*
     * Trucks
     */

    if (filter === "truck") {
      const coordinates =
        trucksRef.current.map(
          (truck) =>
            truck.coordinate
        );

      if (coordinates.length > 0) {
        const first =
          coordinates[0];

        let minLng = first[0];
        let maxLng = first[0];
        let minLat = first[1];
        let maxLat = first[1];

        coordinates.forEach(
          ([lng, lat]) => {
            minLng = Math.min(
              minLng,
              lng
            );

            maxLng = Math.max(
              maxLng,
              lng
            );

            minLat = Math.min(
              minLat,
              lat
            );

            maxLat = Math.max(
              maxLat,
              lat
            );
          }
        );

        map.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: 120,
            duration: 700,
          }
        );
      }
    }
  };

  /*
   * ============================================================
   * BUTTON STYLE
   * ============================================================
   */

  const filterButtonStyle = (
    color: string,
    active: boolean
  ) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: active
      ? `2px solid ${color}`
      : "1px solid transparent",
    borderRadius: "6px",
    background: active
      ? `${color}18`
      : "transparent",
    color: "#111827",
    padding: "6px 7px",
    marginBottom: "4px",
    cursor: "pointer",
    textAlign: "left" as const,
    fontWeight: "700",
    fontSize: "12px",
  });

  return (
    <section className="route-map-card">
      <div className="route-map-header">
        <div>
          <div className="route-map-title">
            LIVE ROUTE INTELLIGENCE
          </div>

          <p>
            Northeast India safety corridor overview
          </p>
        </div>
      </div>

      <div
        className="route-map"
        style={{
          position: "relative",
          height: "560px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* ====================================================== */}
        {/* MAP MODE */}
        {/* ====================================================== */}

        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 10001,
            background: "#111827",
            color: "#ffffff",
            padding: "9px 13px",
            borderRadius: "8px",
            fontWeight: "800",
            fontSize: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.35)",
          }}
        >
          🛰️ SATELLITE VIEW
        </div>

        {/* ====================================================== */}
        {/* GIS STATUS */}
        {/* ====================================================== */}

        <div
          id="gis-debug"
          style={{
            position: "absolute",
            top: "12px",
            left: "155px",
            zIndex: 9999,
            background: "#f59e0b",
            color: "#ffffff",
            padding: "10px 14px",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          STARTING GIS...
        </div>

        {/* ====================================================== */}
        {/* SIDE FILTER BUTTONS */}
        {/* ====================================================== */}

        <div
          style={{
            position: "absolute",
            left: "12px",
            top: "65px",
            zIndex: 10000,
            width: "145px",
            background:
              "rgba(255,255,255,0.97)",
            padding: "10px",
            borderRadius: "10px",
            boxShadow:
              "0 3px 15px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              color: "#111827",
              fontWeight: "900",
              fontSize: "12px",
              marginBottom: "7px",
            }}
          >
            MAP FILTER
          </div>

          {/* ALL */}
          <button
            type="button"
            onClick={() =>
              selectFilter("all")
            }
            style={filterButtonStyle(
              "#111827",
              activeFilter === "all"
            )}
          >
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#111827",
                marginRight: "8px",
              }}
            />
            All Routes
          </button>

          {/* STABLE */}
          <button
            type="button"
            onClick={() =>
              selectFilter("stable")
            }
            style={filterButtonStyle(
              "#22c55e",
              activeFilter === "stable"
            )}
          >
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#22c55e",
                marginRight: "8px",
              }}
            />
            Stable
          </button>

          {/* WATCH */}
          <button
            type="button"
            onClick={() =>
              selectFilter("watch")
            }
            style={filterButtonStyle(
              "#f59e0b",
              activeFilter === "watch"
            )}
          >
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#f59e0b",
                marginRight: "8px",
              }}
            />
            Watch
          </button>

          {/* CRITICAL */}
          <button
            type="button"
            onClick={() =>
              selectFilter("critical")
            }
            style={filterButtonStyle(
              "#ef4444",
              activeFilter === "critical"
            )}
          >
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#ef4444",
                marginRight: "8px",
              }}
            />
            Critical
          </button>

          {/* SAFE */}
          <button
            type="button"
            onClick={() =>
              selectFilter("safe")
            }
            style={filterButtonStyle(
              "#16a34a",
              activeFilter === "safe"
            )}
          >
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#16a34a",
                marginRight: "8px",
              }}
            />
            Safe Harbor
          </button>

          {/* TRUCK */}
          <button
            type="button"
            onClick={() =>
              selectFilter("truck")
            }
            style={filterButtonStyle(
              "#0284c7",
              activeFilter === "truck"
            )}
          >
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#0284c7",
                marginRight: "8px",
              }}
            />
            Trucks
          </button>
        </div>

        {/* ====================================================== */}
        {/* ACTIVE FILTER POPUP */}
        {/* ====================================================== */}

        {activeFilter !== "all" && (
          <div
            style={{
              position: "absolute",
              left: "170px",
              top: "65px",
              zIndex: 10000,
              width: "235px",
              background: "#ffffff",
              color: "#111827",
              padding: "14px",
              borderRadius: "10px",
              boxShadow:
                "0 4px 18px rgba(0,0,0,0.3)",
              border:
                "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: "900",
                marginBottom: "7px",
              }}
            >
              {activeFilter === "stable" &&
                "🟢 Stable Routes"}

              {activeFilter === "watch" &&
                "🟠 Watch Routes"}

              {activeFilter === "critical" &&
                "🔴 Critical Routes"}

              {activeFilter === "safe" &&
                "🟢 Safe Harbor Points"}

              {activeFilter === "truck" &&
                "🔵 Active Truck Points"}
            </div>

            <div
              style={{
                fontSize: "12px",
                lineHeight: "1.5",
              }}
            >
              {activeFilter === "stable" &&
                "Showing stable corridors and their route points on the satellite map."}

              {activeFilter === "watch" &&
                "Showing watch corridors and their route points on the satellite map."}

              {activeFilter === "critical" &&
                "Showing critical corridors and their route points on the satellite map."}

              {activeFilter === "safe" &&
                "Showing designated safe-harbor locations on the map."}

              {activeFilter === "truck" &&
                "Showing active logistics trucks and their current positions."}
            </div>

            <button
              type="button"
              onClick={() =>
                selectFilter("all")
              }
              style={{
                marginTop: "10px",
                border: "none",
                borderRadius: "6px",
                background: "#111827",
                color: "#ffffff",
                padding: "7px 10px",
                fontSize: "11px",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              Show All
            </button>
          </div>
        )}

        {/* ====================================================== */}
        {/* MAP */}
        {/* ====================================================== */}

        <div
          ref={mapContainer}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* ====================================================== */}
        {/* GIS SVG OVERLAY */}
        {/* ====================================================== */}

        <svg
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}