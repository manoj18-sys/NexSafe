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
    code: "kh",
    name: "Khasi",
    nativeName: "Khasi",
  },
  {
    code: "lus",
    name: "Mizo",
    nativeName: "Mizo",
  },
];

export const notificationSettings = [
  {
    id: "hazards",
    title: "Hazard alerts",
    description:
      "Receive alerts when hazards are detected near active routes.",
    enabled: true,
  },
  {
    id: "rerouting",
    title: "Route changes",
    description:
      "Get notified when the system recommends a new route.",
    enabled: true,
  },
  {
    id: "emergency",
    title: "Emergency notifications",
    description:
      "Receive high-priority emergency and rescue alerts.",
    enabled: true,
  },
];

export const emergencyContacts = [
  {
    label: "Emergency services",
    number: "112",
  },
  {
    label: "Ambulance",
    number: "108",
  },
];

export const profileSettings = {
  name: "NER-SAFE Operator",
  phone: "+91 98XXXXXX42",
  location: "Northeast India",
  role: "Fleet / Logistics Operator",
};