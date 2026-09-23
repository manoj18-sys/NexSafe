"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import FloatingVoiceButton from "@/components/ai/FloatingVoiceButton";
import StartupLoader from "@/components/branding/StartupLoader";

interface AppShellProps {
  children: ReactNode;
}

const publicRoutes = ["/", "/login"];

export default function AppShell({
  children,
}: AppShellProps) {
  const pathname = usePathname();

  const isPublicRoute =
    publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return (
      <>
        <StartupLoader />
        {children}
      </>
    );
  }

  return (
    <>
      <StartupLoader />

      <div className="app-shell">
        <Sidebar />

        <div className="app-main">
          <Navbar />

          <main className="app-content">
            {children}
          </main>
        </div>

        <FloatingVoiceButton />
      </div>
    </>
  );
}