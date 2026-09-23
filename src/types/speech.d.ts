interface SpeechRecognitionEvent
  extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition
  extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;

  start(): void;
  stop(): void;
  abort(): void;

  onstart:
    | (() => void)
    | null;

  onresult:
    | ((event: SpeechRecognitionEvent) => void)
    | null;

  onerror:
    | ((event: any) => void)
    | null;

  onend:
    | (() => void)
    | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}