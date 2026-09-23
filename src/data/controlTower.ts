export type CorridorStatus = "STABLE" | "WATCH" | "CRITICAL";

export type VehicleStatus =
  | "MOVING"
  | "STOPPED"
  | "RESPONDING"
  | "IDLE";

export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface Corridor {
  id: string;
  name: string;
  region: string;
  status: CorridorStatus;
  vehicles: number;
  shipments: number;
  risk: number;
}

export interface ControlVehicle {
  id: string;
  type: string;
  location: string;
  status: VehicleStatus;
  corridor: string;
  eta: string;
}

export interface ResponseIncident {
  id: string;
  title: string;
  location: string;
  type: string;
  priority: Priority;
  reported: string;
  action: string;
}

export const corridors: Corridor[] = [
  {
    id: "COR-01",
    name: "NH-10 · Sikkim Corridor",
    region: "Sikkim",
    status: "CRITICAL",
    vehicles: 7,
    shipments: 4,
    risk: 82,
  },
  {
    id: "COR-02",
    name: "NH-6 · Meghalaya Corridor",
    region: "Meghalaya",
    status: "WATCH",
    vehicles: 11,
    shipments: 8,
    risk: 46,
  },
  {
    id: "COR-03",
    name: "NH-6 · Mizoram Corridor",
    region: "Mizoram",
    status: "WATCH",
    vehicles: 6,
    shipments: 5,
    risk: 39,
  },
  {
    id: "COR-04",
    name: "NH-2 · Manipur Corridor",
    region: "Manipur",
    status: "STABLE",
    vehicles: 9,
    shipments: 7,
    risk: 18,
  },
];

export const controlVehicles: ControlVehicle[] = [
  {
    id: "TRK-042",
    type: "Cargo Truck",
    location: "Nongpoh",
    status: "MOVING",
    corridor: "NH-6",
    eta: "16:40",
  },
  {
    id: "TRK-117",
    type: "Cargo Truck",
    location: "Rangpo",
    status: "RESPONDING",
    corridor: "NH-10",
    eta: "18:20",
  },
  {
    id: "AMB-014",
    type: "Ambulance",
    location: "Gangtok",
    status: "RESPONDING",
    corridor: "NH-10",
    eta: "08 min",
  },
  {
    id: "RES-009",
    type: "Rescue Vehicle",
    location: "Shillong",
    status: "MOVING",
    corridor: "NH-6",
    eta: "21 min",
  },
  {
    id: "TRK-083",
    type: "Cargo Truck",
    location: "Silchar",
    status: "MOVING",
    corridor: "NH-6",
    eta: "09:10",
  },
  {
    id: "TRK-031",
    type: "Cargo Truck",
    location: "Guwahati",
    status: "IDLE",
    corridor: "NH-6",
    eta: "--",
  },
];

export const responseIncidents: ResponseIncident[] = [
  {
    id: "INC-204",
    title: "Landslide detected",
    location: "NH-10 · Sikkim Corridor",
    type: "LANDSLIDE",
    priority: "HIGH",
    reported: "8 min ago",
    action: "Reroute traffic",
  },
  {
    id: "INC-205",
    title: "Road blockage",
    location: "Guwahati · Shillong Route",
    type: "BLOCKAGE",
    priority: "HIGH",
    reported: "21 min ago",
    action: "Dispatch response",
  },
  {
    id: "INC-206",
    title: "Heavy rainfall",
    location: "East Khasi Hills",
    type: "WEATHER",
    priority: "MEDIUM",
    reported: "28 min ago",
    action: "Monitor corridor",
  },
  {
    id: "INC-207",
    title: "Traffic slowdown",
    location: "NH-2 · Manipur Corridor",
    type: "TRAFFIC",
    priority: "LOW",
    reported: "41 min ago",
    action: "Monitor traffic",
  },
];