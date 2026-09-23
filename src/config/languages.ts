export const supportedLanguages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
  },
  {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
  },
  {
    code: "ne",
    name: "Nepali",
    nativeName: "नेपाली",
  },
] as const;

export type LanguageCode =
  (typeof supportedLanguages)[number]["code"];