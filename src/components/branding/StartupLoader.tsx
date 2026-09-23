"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { usePathname } from "next/navigation";

const FIRST_LOAD_KEY = "ner-safe-first-load";
const LOGIN_TRANSITION_KEY =
  "ner-safe-login-transition";

export default function StartupLoader() {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !pathname) {
      return;
    }

    const firstLoadShown =
      sessionStorage.getItem(FIRST_LOAD_KEY);

    const loginTransition =
      sessionStorage.getItem(LOGIN_TRANSITION_KEY);

    const shouldShowFirstLoad =
      !firstLoadShown && pathname === "/";

    const shouldShowAfterLogin =
      loginTransition === "true" &&
      pathname.startsWith("/dashboard");

    if (
      !shouldShowFirstLoad &&
      !shouldShowAfterLogin
    ) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (shouldShowFirstLoad) {
      sessionStorage.setItem(
        FIRST_LOAD_KEY,
        "true"
      );
    }

    if (shouldShowAfterLogin) {
      sessionStorage.removeItem(
        LOGIN_TRANSITION_KEY
      );
    }

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [mounted, pathname]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="startup-loader"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="startup-loader-glow" />

          <div className="startup-loader-grid" />

          <motion.div
            className="startup-loader-content"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            {/* Logo */}
            <motion.div
              className="startup-logo"
              initial={{
                opacity: 0,
                scale: 0.75,
                rotate: -8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="startup-logo-ring"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="startup-logo-inner">
                <Shield
                  size={31}
                  strokeWidth={1.8}
                />
              </div>
            </motion.div>

            {/* Brand */}
            <motion.div
              className="startup-brand"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.55,
              }}
            >
              <h1>NER-SAFE</h1>

              <span>
                NORTHEASTERN ROUTE SAFETY
              </span>
            </motion.div>

            {/* Progress */}
            <div className="startup-progress-track">
              <motion.div
                className="startup-progress"
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 1.45,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Status */}
            <motion.div
              className="startup-status"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.55,
                duration: 0.4,
              }}
            >
              <span className="startup-status-dot" />

              <span>
                INITIALIZING SAFETY SYSTEM
              </span>
            </motion.div>
          </motion.div>

          {/* Corners */}
          <div className="startup-corner startup-corner-tl">
            NER-SAFE / 01
          </div>

          <div className="startup-corner startup-corner-br">
            SYSTEM BOOT
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}