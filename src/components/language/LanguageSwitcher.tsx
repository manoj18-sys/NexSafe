"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  supportedLanguages,
} from "@/config/languages";

interface LanguageSwitcherProps {
  variant?: "landing" | "navbar";
}

export default function LanguageSwitcher({
  variant = "navbar",
}: LanguageSwitcherProps) {
  const {
    language,
    setLanguage,
  } = useLanguage();

  const currentLanguage =
    supportedLanguages.find(
      (item) => item.code === language
    );

  return (
    <div
      className={`language-switcher language-switcher-${variant}`}
    >
      <Globe size={16} />

      <select
        value={language}
        onChange={(event) =>
          setLanguage(
            event.target.value as
              typeof language
          )
        }
        aria-label="Select language"
      >
        {supportedLanguages.map(
          (item) => (
            <option
              key={item.code}
              value={item.code}
            >
              {item.nativeName}
            </option>
          )
        )}
      </select>

      <ChevronDown size={14} />
      
    </div>
  );
}