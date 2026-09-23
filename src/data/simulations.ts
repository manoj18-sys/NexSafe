export const simulationScenarios = [
  {
    id: "landslide-nh10",
    title: "NH-10 Landslide",
    location: "Sikkim Corridor",
    type: "LANDSLIDE",
    severity: "CRITICAL",
    description:
      "Simulate a major landslide blocking the NH-10 Sikkim corridor.",
  },
  {
    id: "blockage-shillong",
    title: "Road Blockage",
    location: "Guwahati · Shillong Route",
    type: "BLOCKAGE",
    severity: "HIGH",
    description:
      "Simulate a complete road blockage between Guwahati and Shillong.",
  },
  {
    id: "rainfall-meghalaya",
    title: "Heavy Rainfall",
    location: "East Khasi Hills",
    type: "WEATHER",
    severity: "MEDIUM",
    description:
      "Simulate heavy rainfall affecting route conditions in Meghalaya.",
  },
];

export const simulationStats = {
  affectedVehicles: 12,
  affectedShipments: 8,
  affectedCorridors: 2,
  estimatedDelay: "47 min",
};

export const simulationResults = [
  {
    label: "Original route",
    value: "NH-10 · Sikkim Corridor",
    status: "BLOCKED",
  },
  {
    label: "Alternate route",
    value: "NH-6 · Meghalaya Corridor",
    status: "AVAILABLE",
  },
  {
    label: "Additional distance",
    value: "+38 km",
    status: "CALCULATED",
  },
  {
    label: "Estimated delay",
    value: "47 min",
    status: "MODERATE",
  },
];

export const simulationTimeline = [
  {
    time: "00:00",
    title: "Hazard introduced",
    description: "Landslide blocks the primary corridor.",
    status: "critical",
  },
  {
    time: "00:08",
    title: "Route impact detected",
    description: "12 vehicles and 8 shipments are affected.",
    status: "warning",
  },
  {
    time: "00:15",
    title: "Alternate route calculated",
    description: "NER-SAFE identifies a viable alternate corridor.",
    status: "active",
  },
  {
    time: "00:21",
    title: "Fleet rerouting initiated",
    description: "Affected vehicles are assigned to the alternate route.",
    status: "safe",
  },
];