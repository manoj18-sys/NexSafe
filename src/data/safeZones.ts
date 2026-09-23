export type SafeZoneStatus = "available" | "limited" | "full";

export interface SafeZone {
  id: string;
  name: string;
  location: string;
  district: string;
  status: SafeZoneStatus;
  capacity: number;
  occupied: number;
  distance: string;
  services: string[];
  elevation: string;
}

export const safeZones: SafeZone[] = [
  {
    id: "SZ-001",
    name: "Guwahati Emergency Hub",
    location: "Guwahati",
    district: "Kamrup Metro",
    status: "available",
    capacity: 120,
    occupied: 42,
    distance: "12.4 km",
    services: ["Medical", "Fuel", "Food", "Communication"],
    elevation: "55 m",
  },
  {
    id: "SZ-002",
    name: "Shillong Relief Centre",
    location: "Shillong",
    district: "East Khasi Hills",
    status: "available",
    capacity: 80,
    occupied: 31,
    distance: "18.7 km",
    services: ["Medical", "Food", "Shelter"],
    elevation: "1496 m",
  },
  {
    id: "SZ-003",
    name: "Silchar Logistics Shelter",
    location: "Silchar",
    district: "Cachar",
    status: "limited",
    capacity: 60,
    occupied: 48,
    distance: "24.2 km",
    services: ["Shelter", "Fuel", "Communication"],
    elevation: "22 m",
  },
  {
    id: "SZ-004",
    name: "Gangtok Emergency Zone",
    location: "Gangtok",
    district: "East Sikkim",
    status: "available",
    capacity: 90,
    occupied: 28,
    distance: "31.5 km",
    services: ["Medical", "Shelter", "Food"],
    elevation: "1650 m",
  },
];