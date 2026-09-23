import type { LanguageCode } from "@/config/languages";

interface MockAIResponse {
  message: string;
  type?: "normal" | "warning" | "success";
}

export async function getMockAIResponse(
  message: string,
  language: LanguageCode
): Promise<MockAIResponse> {
  // Simulate backend/network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 700)
  );

  const input = message.toLowerCase().trim();

  /*
   * -----------------------------
   * ENGLISH
   * -----------------------------
   */

  if (language === "en") {
    if (
      input.includes("route") ||
      input.includes("destination") ||
      input.includes("travel") || input.includes("Guwahati") || input.includes("Shillong")
    ) {
      return {
        message:
          "The current route to Shillong from Guwahati has a watch level risk due to recent landslides. I can suggest alternate routes or safe zones along your path.",
        type: "normal",
      };
    }

    if (
      input.includes("hazard") ||
      input.includes("landslide") ||
      input.includes("blockage")
    ) {
      return {
        message:
          "There are currently monitored hazards across Northeast corridors. I can help you identify affected routes and suggest safer alternatives.",
        type: "warning",
      };
    }

    if (
      input.includes("safe zone") ||
      input.includes("safe harbor") ||
      input.includes("shelter")
    ) {
      return {
        message:
          "I can help locate designated safe zones near your route. Safe zones can be used when an alternate route is unavailable.",
        type: "success",
      };
    }

    if (
      input.includes("emergency") ||
      input.includes("sos")
    ) {
      return {
        message:
          "For an emergency, use the SOS / Emergency section to access emergency assistance and available contacts.",
        type: "warning",
      };
    }

    if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("hey")
    ) {
      return {
        message:
          "Hello! I'm the NER-SAFE AI assistant. I can help with routes, hazards, safe zones, and emergency information.",
        type: "normal",
      };
    }

    return {
      message:
        "I'm the NER-SAFE AI assistant. You can ask me about route safety, hazards, alternate routes, safe zones, or emergency assistance.",
      type: "normal",
    };
  }

  /*
   * -----------------------------
   * HINDI
   * -----------------------------
   */

  if (language === "hi") {
    if (
      input.includes("route") ||
      input.includes("रास्ता") ||
      input.includes("मार्ग")
    ) {
      return {
        message:
          "मैं आपके मार्ग में खतरों, सड़क की स्थिति और सुरक्षित वैकल्पिक मार्गों की जानकारी देने में मदद कर सकता हूँ।",
        type: "normal",
      };
    }

    if (
      input.includes("hazard") ||
      input.includes("खतरा") ||
      input.includes("भूस्खलन")
    ) {
      return {
        message:
          "NER-SAFE निगरानी किए जा रहे मार्गों पर खतरों की जानकारी रखता है। मैं प्रभावित मार्गों और सुरक्षित विकल्पों की जानकारी दे सकता हूँ।",
        type: "warning",
      };
    }

    if (
      input.includes("safe zone") ||
      input.includes("सुरक्षित क्षेत्र")
    ) {
      return {
        message:
          "मैं आपके मार्ग के पास उपलब्ध सुरक्षित क्षेत्रों की जानकारी देने में मदद कर सकता हूँ।",
        type: "success",
      };
    }

    if (
      input.includes("emergency") ||
      input.includes("आपातकाल")
    ) {
      return {
        message:
          "आपातकाल में Emergency / SOS सेक्शन का उपयोग करके उपलब्ध सहायता और संपर्क जानकारी प्राप्त करें।",
        type: "warning",
      };
    }

    return {
      message:
        "नमस्ते! मैं NER-SAFE AI सहायक हूँ। आप मुझसे मार्ग, खतरे, सुरक्षित क्षेत्र और आपातकालीन सहायता के बारे में पूछ सकते हैं।",
      type: "normal",
    };
  }

  /*
   * -----------------------------
   * ASSAMESE
   * -----------------------------
   */

  if (language === "as") {
    return {
      message:
        "নমস্কাৰ! মই NER-SAFE AI সহায়ক। আপুনি পথৰ সুৰক্ষা, বিপদ, বিকল্প পথ আৰু নিৰাপদ অঞ্চলৰ বিষয়ে সুধিব পাৰে।",
      type: "normal",
    };
  }

  /*
   * -----------------------------
   * BENGALI
   * -----------------------------
   */

  if (language === "bn") {
    return {
      message:
        "নমস্কার! আমি NER-SAFE AI সহায়ক। আপনি রুট নিরাপত্তা, বিপদ, বিকল্প রুট এবং নিরাপদ অঞ্চল সম্পর্কে জানতে পারেন।",
      type: "normal",
    };
  }

  /*
   * -----------------------------
   * NEPALI
   * -----------------------------
   */

  if (language === "ne") {
    return {
      message:
        "नमस्कार! म NER-SAFE AI सहायक हुँ। तपाईं मार्ग सुरक्षा, जोखिम, वैकल्पिक मार्ग र सुरक्षित क्षेत्रबारे सोध्न सक्नुहुन्छ।",
      type: "normal",
    };
  }

  return {
    message:
      "I can help you with route safety, hazards, alternate routes and safe zones.",
    type: "normal",
  };
}