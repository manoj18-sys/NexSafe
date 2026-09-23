"use client";

import {
  Bell,
  Search,
  Wifi,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  UserRole,
} from "@/config/navigation";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface UserProfile {
  role: UserRole;
  name: string;
  phone: string;
  location: string;
}

export default function Navbar() {
  const { t } = useLanguage();

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(
        "ner-safe-profile"
      );

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch {
      setProfile(null);
    }
  }, []);

  const roleLabel =
    profile?.role === "authority"
      ? "Command Centre"
      : profile?.role === "driver"
        ? "Driver Operations"
        : "Citizen Safety";

  return (
    <header className="dashboard-navbar">
      {/* Search */}
      <div className="navbar-search">
        <Search size={16} />

        <input
          type="text"
          placeholder="Search routes, hazards, shipments..."
        />

        <span className="search-shortcut">
          /
        </span>
      </div>

      {/* Right side */}
      <div className="navbar-actions">
         <LanguageSwitcher variant="navbar" />

         <div className="navbar-status">
         <Wifi size={14} />
         <span>ONLINE</span>
       </div>

        {/* Notifications */}
        <button
          type="button"
          className="navbar-icon-button notification-button"
          aria-label="Notifications"
        >
          <Bell size={17} />

          <span className="notification-dot" />
        </button>

        {/* User */}
        <div className="navbar-user">
          <div className="navbar-user-avatar">
            <User size={15} />
          </div>

          <div className="navbar-user-info">
            <span className="navbar-user-name">
              {profile?.name || "User"}
            </span>

            <span className="navbar-user-role">
              {roleLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}