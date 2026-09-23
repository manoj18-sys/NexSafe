import "./globals.css";

import AppShell from "@/components/layout/AppShell";
import "maplibre-gl/dist/maplibre-gl.css";
import StartupLoader from "@/components/branding/StartupLoader";
import {
  LanguageProvider,
} from "@/contexts/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
        <AppShell>
          {children}
        </AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}