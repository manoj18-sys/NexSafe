import {
  LayoutDashboard,
  Route,
  TriangleAlert,
  Shield,
  ShieldAlert,
  Truck,
  Radio,
  History,
  FileWarning,
  TowerControl,
} from "lucide-react";

export type UserRole =
  | "citizen"
  | "driver"
  | "authority";

export const roleNavigation = {
  citizen: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Route Intelligence",
      href: "/route",
      icon: Route,
    },
    {
      name: "Hazard Monitor",
      href: "/hazards",
      icon: TriangleAlert,
    },
    {
      name: "Report Hazard",
      href: "/report",
      icon: FileWarning,
    },
    {
      name: "Safe Zones",
      href: "/safe-zones",
      icon: Shield,
    },
    {
      name: "Emergency",
      href: "/emergency",
      icon: ShieldAlert,
    },
    {
      name: "History",
      href: "/history",
      icon: History,
    },
  ],

  driver: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Route Intelligence",
      href: "/route",
      icon: Route,
    },
    {
      name: "Hazard Monitor",
      href: "/hazards",
      icon: TriangleAlert,
    },
    {
      name: "Report Hazard",
      href: "/report",
      icon: FileWarning,
    },
    {
      name: "Safe Zones",
      href: "/safe-zones",
      icon: Shield,
    },
    {
      name: "Shipments",
      href: "/shipments",
      icon: Truck,
    },
    {
      name: "Emergency",
      href: "/emergency",
      icon: ShieldAlert,
    },
    {
      name: "History",
      href: "/history",
      icon: History,
    },
  ],

  authority: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Route Intelligence",
      href: "/route",
      icon: Route,
    },
    {
      name: "Hazard Monitor",
      href: "/hazards",
      icon: TriangleAlert,
    },
    {
      name: "Emergency",
      href: "/emergency",
      icon: ShieldAlert,
    },
    {
      name: "Safe Zones",
      href: "/safe-zones",
      icon: Shield,
    },
    {
      name: "Shipments",
      href: "/shipments",
      icon: Truck,
    },
    {
      name: "Control Tower",
      href: "/control-tower",
      icon: TowerControl,
    },
    {
      name: "Simulation",
      href: "/simulation",
      icon: Radio,
    },
    {
      name: "History",
      href: "/history",
      icon: History,
    },
  ],
} as const;