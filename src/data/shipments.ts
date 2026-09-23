export type ShipmentStatus =
  | "IN TRANSIT"
  | "AT RISK"
  | "DELIVERED"
  | "DELAYED";

export type ShipmentRisk =
  | "safe"
  | "watch"
  | "critical";

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  vehicle: string;
  driver: string;
  route: string;
  eta: string;
  status: ShipmentStatus;
  risk: ShipmentRisk;
  progress: number;
  currentLocation: string;
  cargo: string;
  distanceRemaining: string;
  lastUpdate: string;
}

export const shipments: Shipment[] = [
  {
    id: "NRS-2048",
    origin: "Guwahati",
    destination: "Shillong",
    vehicle: "TRK-042",
    driver: "Arjun Das",
    route: "NH-6 · Meghalaya Corridor",
    eta: "Today · 16:40",
    status: "IN TRANSIT",
    risk: "safe",
    progress: 72,
    currentLocation: "Nongpoh",
    cargo: "Medical Supplies",
    distanceRemaining: "68 km",
    lastUpdate: "2 min ago",
  },

  {
    id: "NRS-2051",
    origin: "Siliguri",
    destination: "Gangtok",
    vehicle: "TRK-117",
    driver: "Rahul Sharma",
    route: "NH-10 · Sikkim Corridor",
    eta: "Today · 18:20",
    status: "AT RISK",
    risk: "critical",
    progress: 48,
    currentLocation: "Rangpo",
    cargo: "Food & Essentials",
    distanceRemaining: "92 km",
    lastUpdate: "4 min ago",
  },

  {
    id: "NRS-2057",
    origin: "Guwahati",
    destination: "Aizawl",
    vehicle: "TRK-083",
    driver: "David Lalrem",
    route: "NH-6 · Mizoram Corridor",
    eta: "Tomorrow · 09:10",
    status: "IN TRANSIT",
    risk: "watch",
    progress: 39,
    currentLocation: "Silchar",
    cargo: "Construction Materials",
    distanceRemaining: "284 km",
    lastUpdate: "7 min ago",
  },

  {
    id: "NRS-2060",
    origin: "Shillong",
    destination: "Guwahati",
    vehicle: "TRK-031",
    driver: "Bikash Roy",
    route: "NH-6 · Assam Corridor",
    eta: "Delivered",
    status: "DELIVERED",
    risk: "safe",
    progress: 100,
    currentLocation: "Guwahati",
    cargo: "Electronics",
    distanceRemaining: "0 km",
    lastUpdate: "18 min ago",
  },

  {
    id: "NRS-2064",
    origin: "Imphal",
    destination: "Dimapur",
    vehicle: "TRK-092",
    driver: "Thomas Haokip",
    route: "NH-2 · Manipur Corridor",
    eta: "Today · 21:30",
    status: "DELAYED",
    risk: "watch",
    progress: 61,
    currentLocation: "Mao",
    cargo: "Agricultural Supplies",
    distanceRemaining: "121 km",
    lastUpdate: "11 min ago",
  },
];