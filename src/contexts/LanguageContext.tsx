"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { LanguageCode } from "@/config/languages";

import en from "@/data/translations/en.json";
import hi from "@/data/translations/hi.json";
import as from "@/data/translations/as.json";
import bn from "@/data/translations/bn.json";
import ne from "@/data/translations/ne.json";

const translations = {
  en,
  hi,
  as,
  bn,
  ne,
} as const;

type EnglishTranslations = typeof en;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

function isObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function deepMerge<T>(
  base: T,
  override: DeepPartial<T>
): T {
  if (!isObject(base) || !isObject(override)) {
    return (
      override === undefined
        ? base
        : (override as T)
    );
  }

  const result = {
    ...base,
  } as Record<string, unknown>;

  for (const key of Object.keys(override)) {
    const overrideValue = (
      override as Record<string, unknown>
    )[key];

    if (overrideValue === undefined) {
      continue;
    }

    const baseValue = result[key];

    if (
      isObject(baseValue) &&
      isObject(overrideValue)
    ) {
      result[key] = deepMerge(
        baseValue,
        overrideValue
      );
    } else {
      result[key] = overrideValue;
    }
  }

  return result as T;
}

function getTranslations(
  language: LanguageCode
): EnglishTranslations {
  if (language === "en") {
    return en;
  }

  return deepMerge(
    en,
    translations[language] as DeepPartial<EnglishTranslations>
  );
}

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: EnglishTranslations;
}

const LanguageContext =
  createContext<LanguageContextType | undefined>(
    undefined
  );

const LANGUAGE_KEY = "ner-safe-language";

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<LanguageCode>("en");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(LANGUAGE_KEY);

    if (
      savedLanguage === "en" ||
      savedLanguage === "hi" ||
      savedLanguage === "as" ||
      savedLanguage === "bn" ||
      savedLanguage === "ne"
    ) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (
    newLanguage: LanguageCode
  ) => {
    setLanguageState(newLanguage);

    localStorage.setItem(
      LANGUAGE_KEY,
      newLanguage
    );
  };

  const t = getTranslations(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}