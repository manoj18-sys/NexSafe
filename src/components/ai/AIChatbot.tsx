"use client";

import {
  Bot,
  Send,
  X,
  Mic,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";
import { getMockAIResponse } from "@/services/ai/mockAI";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  message: string;
  type?: "normal" | "warning" | "success";
}

interface AIChatbotProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatbot({
  open,
  onClose,
}: AIChatbotProps) {
  const { language } = useLanguage();

  const [messages, setMessages] =
    useState<ChatMessage[]>([
      {
        id: 1,
        role: "assistant",
        message:
          "Hello! I'm the NER-SAFE AI assistant. How can I help you?",
        type: "normal",
      },
    ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isListening, setIsListening] =
    useState(false);

  const [voiceEnabled, setVoiceEnabled] =
    useState(true);

  const [voiceError, setVoiceError] =
    useState("");

  const recognitionRef =
    useRef<SpeechRecognition | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * --------------------------------
   * Scroll chat
   * --------------------------------
   */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  /*
   * --------------------------------
   * Language mapping
   * --------------------------------
   */

  const languageMap: Record<string, string> = {
    en: "en-IN",
    hi: "hi-IN",
    as: "as-IN",
    bn: "bn-IN",
    ne: "ne-NP",
  };

  /*
   * --------------------------------
   * Text-to-speech
   * --------------------------------
   */

  const speakResponse = (text: string) => {
    if (!voiceEnabled) {
      return;
    }

    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang =
      languageMap[language] || "en-IN";

    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => {
      console.log(
        "NER-SAFE voice response started"
      );
    };

    utterance.onend = () => {
      console.log(
        "NER-SAFE voice response finished"
      );
    };

    utterance.onerror = (event) => {
      console.error(
        "NER-SAFE speech synthesis error:",
        event
      );
    };

    window.speechSynthesis.speak(
      utterance
    );
  };

  /*
   * --------------------------------
   * Send message to AI
   *
   * This function is shared by:
   *
   * 1. Normal typed messages
   * 2. Voice messages
   * --------------------------------
   */

  const sendMessage = async (
    messageText?: string
  ) => {
    const trimmed =
      (messageText ?? input).trim();

    if (!trimmed || isLoading) {
      return;
    }

    setVoiceError("");

    /*
     * Add user message immediately.
     */

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      message: trimmed,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    /*
     * Clear input.
     */

    setInput("");

    /*
     * Show loading state.
     */

    setIsLoading(true);

    try {
      /*
       * Call the mock AI service.
       */

      const response =
        await getMockAIResponse(
          trimmed,
          language
        );

      /*
       * Add AI response.
       */

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        message: response.message,
        type: response.type,
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);

      /*
       * Speak AI response.
       */

      speakResponse(response.message);
    } catch (error) {
      console.error(
        "NER-SAFE AI error:",
        error
      );

      const errorMessage =
        "I'm unable to process that request right now.";

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          message: errorMessage,
          type: "warning",
        },
      ]);

      speakResponse(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /*
   * --------------------------------
   * Browser speech recognition
   * --------------------------------
   */

  const startListening = () => {
    setVoiceError("");

    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setVoiceError(
        "Voice input is not supported by this browser. Try Google Chrome."
      );

      return;
    }

    if (isListening || isLoading) {
      return;
    }

    /*
     * Stop any previous recognition instance.
     */

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Already stopped.
      }
    }

    try {
      const recognition =
        new SpeechRecognitionAPI();

      const selectedLanguage =
        languageMap[language] || "en-IN";

      recognition.lang =
        selectedLanguage;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      /*
       * --------------------------------
       * Recognition started
       * --------------------------------
       */

      recognition.onstart = () => {
        console.log(
          "NER-SAFE voice recognition started"
        );

        setIsListening(true);
        setVoiceError("");
      };

      /*
       * --------------------------------
       * Recognition result
       *
       * IMPORTANT:
       * The old code stopped here:
       *
       * setInput(transcript)
       *
       * The new code ALSO sends the message.
       * --------------------------------
       */

      recognition.onresult = (event) => {
        const transcript =
          event.results[0][0].transcript.trim();

        console.log(
          "NER-SAFE voice transcript:",
          transcript
        );

        setIsListening(false);

        if (!transcript) {
          setVoiceError(
            "I didn't understand the voice input. Please try again."
          );

          return;
        }

        /*
         * Show transcript in the input.
         */

        setInput(transcript);

        /*
         * Automatically send the voice message.
         *
         * This is the main fix.
         */

        setTimeout(() => {
          sendMessage(transcript);
        }, 100);
      };

      /*
       * --------------------------------
       * Recognition error
       * --------------------------------
       */

      recognition.onerror = (event) => {
        console.error(
          "NER-SAFE speech recognition error:",
          event.error
        );

        setIsListening(false);

        if (event.error === "not-allowed") {
          setVoiceError(
            "Microphone permission was blocked. Allow microphone access for localhost."
          );
        } else if (
          event.error === "no-speech"
        ) {
          setVoiceError(
            "I didn't hear anything. Please try speaking again."
          );
        } else if (
          event.error === "audio-capture"
        ) {
          setVoiceError(
            "No microphone was detected. Check your microphone connection."
          );
        } else if (
          event.error === "network"
        ) {
          setVoiceError(
            "Voice recognition requires a network connection in this browser."
          );
        } else {
          setVoiceError(
            `Voice input error: ${event.error}`
          );
        }
      };

      /*
       * --------------------------------
       * Recognition ended
       * --------------------------------
       */

      recognition.onend = () => {
        console.log(
          "NER-SAFE voice recognition ended"
        );

        setIsListening(false);
      };

      recognitionRef.current =
        recognition;

      /*
       * Start microphone.
       */

      recognition.start();
    } catch (error) {
      console.error(
        "Failed to start speech recognition:",
        error
      );

      setIsListening(false);

      setVoiceError(
        "Unable to start the microphone. Please check your browser permissions."
      );
    }
  };

  /*
   * --------------------------------
   * Stop listening
   * --------------------------------
   */

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // Recognition may already have stopped.
    }

    setIsListening(false);
  };

  /*
   * --------------------------------
   * Keyboard
   * --------------------------------
   */

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      sendMessage();
    }
  };

  /*
   * --------------------------------
   * Cleanup
   * --------------------------------
   */

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        // Ignore cleanup errors.
      }

      if (
        typeof window !== "undefined" &&
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /*
   * --------------------------------
   * UI
   *
   * IMPORTANT:
   * The original CSS class structure
   * is preserved exactly.
   * --------------------------------
   */

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="ai-chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="ai-chatbot"
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: 40,
              scale: 0.96,
            }}
            transition={{ duration: 0.25 }}
          >
            {/* HEADER */}

            <div className="ai-chat-header">
              <div className="ai-chat-brand">
                <div className="ai-chat-logo">
                  <Bot size={19} />
                </div>

                <div>
                  <strong>
                    NER-SAFE AI
                  </strong>

                  <span>
                    Route Safety Assistant
                  </span>
                </div>
              </div>

              <div className="ai-chat-header-actions">
                <button
                  type="button"
                  onClick={() =>
                    setVoiceEnabled(
                      (value) => !value
                    )
                  }
                  aria-label="Toggle voice"
                >
                  {voiceEnabled ? (
                    <Volume2 size={17} />
                  ) : (
                    <VolumeX size={17} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close AI assistant"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* STATUS */}

            <div className="ai-chat-status">
              <span />
              AI ASSISTANT ONLINE
            </div>

            {/* MESSAGES */}

            <div className="ai-chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`ai-message-row ${
                    message.role === "user"
                      ? "ai-message-row-user"
                      : "ai-message-row-assistant"
                  }`}
                >
                  {message.role ===
                    "assistant" && (
                    <div className="ai-message-avatar">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`ai-message ${
                      message.role ===
                      "user"
                        ? "ai-message-user"
                        : "ai-message-assistant"
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="ai-message-row ai-message-row-assistant">
                  <div className="ai-message-avatar">
                    <Bot size={14} />
                  </div>

                  <div className="ai-message ai-message-assistant ai-message-loading">
                    <Loader2
                      size={15}
                      className="ai-loading-icon"
                    />

                    <span>
                      Analyzing...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* VOICE ERROR */}

            {voiceError && (
              <div className="ai-voice-error">
                {voiceError}
              </div>
            )}

            {/* LISTENING INDICATOR */}

            {isListening && (
              <div className="ai-listening-indicator">
                <span className="ai-listening-dot" />

                <span>
                  Listening...
                </span>

                <button
                  type="button"
                  onClick={stopListening}
                >
                  Stop
                </button>
              </div>
            )}

            {/* INPUT */}

            <div className="ai-chat-input-area">
              <div className="ai-chat-input-wrapper">
                <input
                  type="text"
                  value={input}
                  onChange={(event) =>
                    setInput(
                      event.target.value
                    )
                  }
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isListening
                      ? "Listening..."
                      : "Ask about routes, hazards..."
                  }
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className={`ai-mic-button ${
                    isListening
                      ? "ai-mic-listening"
                      : ""
                  }`}
                  onClick={
                    isListening
                      ? stopListening
                      : startListening
                  }
                  disabled={isLoading}
                  aria-label={
                    isListening
                      ? "Stop listening"
                      : "Start voice input"
                  }
                >
                  {isListening ? (
                    <Mic
                      size={17}
                    />
                  ) : (
                    <Mic size={17} />
                  )}
                </button>
              </div>

              <button
                type="button"
                className="ai-send-button"
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  !input.trim() ||
                  isLoading
                }
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>

            <div className="ai-chat-footer">
              NER-SAFE AI · MOCK BACKEND
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}