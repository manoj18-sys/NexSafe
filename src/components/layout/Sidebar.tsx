"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import {
  roleNavigation,
  UserRole,
} from "@/config/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const [role, setRole] = useState<UserRole>("citizen");

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(
        "ner-safe-profile"
      );

      if (!savedProfile) {
        return;
      }

      const profile = JSON.parse(savedProfile);

      if (
        profile.role === "citizen" ||
        profile.role === "driver" ||
        profile.role === "authority"
      ) {
        setRole(profile.role);
      }
    } catch {
      setRole("citizen");
    }
  }, []);

  const navigation = roleNavigation[role];

  const roleLabel =
    role === "authority"
      ? "COMMAND CENTRE"
      : role === "driver"
        ? "DRIVER OPERATIONS"
        : "CITIZEN SAFETY";

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <Shield size={19} />
        </div>

        <div>
          <div className="sidebar-brand-name">
            NER-SAFE
          </div>

          <div className="sidebar-brand-subtitle">
            {roleLabel}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-navigation">
        <div className="sidebar-section-label">
          OPERATIONS
        </div>

        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${
                isActive
                  ? "sidebar-link-active"
                  : ""
              }`}
            >
              <Icon size={17} />

              <span>{item.name}</span>

              {isActive && (
                <span className="sidebar-active-indicator" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <Link
          href="/settings"
          className={`sidebar-link ${
            pathname.startsWith("/settings")
              ? "sidebar-link-active"
              : ""
          }`}
        >
          <Settings size={17} />

          <span>Settings</span>
        </Link>

        <div className="sidebar-system">
          <div className="sidebar-system-dot" />

          <div>
            <div className="sidebar-system-title">
              SYSTEM OPERATIONAL
            </div>

            <div className="sidebar-system-subtitle">
              Offline-ready
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}