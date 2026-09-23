export const historyRecords = [
  {
    id: "HIS-001",
    type: "REROUTE",
    title: "Emergency rerouting initiated",
    description:
      "Traffic redirected from the affected NH-10 Sikkim Corridor.",
    location: "NH-10 · Sikkim Corridor",
    date: "21 Sep 2026",
    time: "10:42 AM",
    status: "COMPLETED",
    reference: "RT-4821",
  },
  {
    id: "HIS-002",
    type: "HAZARD",
    title: "Landslide detected",
    description:
      "Critical landslide reported along the monitored corridor.",
    location: "NH-10 · Sikkim Corridor",
    date: "21 Sep 2026",
    time: "10:34 AM",
    status: "RESOLVED",
    reference: "HZ-1842",
  },
  {
    id: "HIS-003",
    type: "SHIPMENT",
    title: "Shipment route updated",
    description:
      "Shipment route automatically updated after corridor disruption.",
    location: "Guwahati → Gangtok",
    date: "21 Sep 2026",
    time: "10:18 AM",
    status: "COMPLETED",
    reference: "SHP-7291",
  },
  {
    id: "HIS-004",
    type: "REPORT",
    title: "Road blockage reported",
    description:
      "Driver submitted a field report regarding road blockage.",
    location: "Guwahati · Shillong Route",
    date: "21 Sep 2026",
    time: "09:56 AM",
    status: "REVIEWED",
    reference: "RPT-3902",
  },
  {
    id: "HIS-005",
    type: "ROUTE",
    title: "Route analysis completed",
    description:
      "Primary and alternate corridors evaluated successfully.",
    location: "Shillong · Meghalaya",
    date: "21 Sep 2026",
    time: "09:31 AM",
    status: "COMPLETED",
    reference: "RT-4817",
  },
  {
    id: "HIS-006",
    type: "EMERGENCY",
    title: "Emergency response dispatched",
    description:
      "Priority response vehicle assigned to an active incident.",
    location: "East Khasi Hills",
    date: "21 Sep 2026",
    time: "08:48 AM",
    status: "COMPLETED",
    reference: "EMS-2081",
  },
  {
    id: "HIS-007",
    type: "HAZARD",
    title: "Heavy rainfall alert",
    description:
      "Weather-related route risk detected in the monitored region.",
    location: "East Khasi Hills",
    date: "20 Sep 2026",
    time: "06:22 PM",
    status: "RESOLVED",
    reference: "HZ-1836",
  },
  {
    id: "HIS-008",
    type: "SHIPMENT",
    title: "Shipment delivered",
    description:
      "Shipment reached the designated destination successfully.",
    location: "Aizawl · Mizoram",
    date: "20 Sep 2026",
    time: "04:15 PM",
    status: "COMPLETED",
    reference: "SHP-7244",
  },
];

export const historyOverview = {
  totalEvents: 128,
  reroutes: 24,
  hazardsResolved: 31,
  emergencyResponses: 12,
};