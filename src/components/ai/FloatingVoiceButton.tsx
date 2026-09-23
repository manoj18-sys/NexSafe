"use client";

import { Mic } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import AIChatbot from "./AIChatbot";

export default function FloatingVoiceButton() {
  const [chatOpen, setChatOpen] =
    useState(false);

  return (
    <>
      <motion.button
        type="button"
        className="floating-voice-button"
        aria-label="Open NER-SAFE AI voice assistant"
        title="AI Voice Assistant"
        onClick={() =>
          setChatOpen(true)
        }
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.94,
        }}
      >
        <span className="floating-voice-pulse" />

        <Mic size={23} />

        <span className="floating-voice-label">
          AI
        </span>
      </motion.button>

      <AIChatbot
        open={chatOpen}
        onClose={() =>
          setChatOpen(false)
        }
      />
    </>
  );
}