"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";

import {
  ArrowRight,
  ShieldCheck,
  Radio,
  Map,
  Mic,
} from "lucide-react";

import { getHealth } from "@/lib/api/health";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  const [systemOnline, setSystemOnline] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await getHealth();
        setSystemOnline(true);
      } catch {
        setSystemOnline(false);
      }
    };

    // Check immediately
    checkHealth();

    // Check every 5 seconds
    const interval = setInterval(checkHealth, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="landing-page">
      {/* Background glow */}
      <div className="background-glow background-glow-one" />
      <div className="background-glow background-glow-two" />

      {/* Top status bar */}
      <motion.header
        className="top-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="brand">
          <div className="brand-mark">
            <ShieldCheck size={20} />
          </div>

          <div>
            <div className="brand-name">NER-SAFE</div>

            <div className="brand-subtitle">
              {t.landing.brandSubtitle}
            </div>
          </div>
        </div>

        <div className="landing-header-actions">
          <LanguageSwitcher variant="landing" />

          <div className="system-status">
            <span
              className={`status-dot ${
                systemOnline ? "" : "status-dot-offline"
              }`}
            />

            {systemOnline
              ? t.landing.systemOnline
              : "Backend Offline"}
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <section className="hero">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Radio size={15} />
          {t.landing.liveNetwork}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {t.landing.heroTitleLine1}
          <br />
          <span>{t.landing.heroTitleLine2}</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          {t.landing.heroDescription}
        </motion.p>

        {/* Feature cards */}
        <motion.div
          className="feature-grid"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="glass feature-card">
            <Map size={22} />

            <div>
              <h3>{t.landing.features.routeTitle}</h3>
              <p>{t.landing.features.routeDescription}</p>
            </div>
          </div>

          <div className="glass feature-card">
            <ShieldCheck size={22} />

            <div>
              <h3>{t.landing.features.riskTitle}</h3>
              <p>{t.landing.features.riskDescription}</p>
            </div>
          </div>

          <div className="glass feature-card">
            <Mic size={22} />

            <div>
              <h3>Voice Assistance</h3>
              <p>
                Interact with the system using regional languages.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enter button */}
        <motion.button
          className="enter-button"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/login")}
        >
          {t.landing.enterCommandCentre}
          <ArrowRight size={18} />
        </motion.button>
      </section>

      {/* Bottom information */}
      <motion.footer
        className="bottom-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span>NER-SAFE</span>
        <span>•</span>
        <span>GIS · AI · OFFLINE-FIRST</span>
      </motion.footer>
    </main>
  );
}
