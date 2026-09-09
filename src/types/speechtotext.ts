export type SpeechToTextStatus =
  | 'idle'
  | 'starting'
  | 'listening'
  | 'stopping'
  | 'error';

export interface SpeechToTextError {
  code: string;
  message: string;
}

export interface NativeSpeechToTextModule {
  requestPermission: () => Promise<boolean>;
  startListening: (locale?: string) => Promise<void>;
  stopListening: () => Promise<void>;
  isAvailable: (locale?: string) => Promise<boolean>;
  addListener: (eventName: string) => void;
  removeListeners: (count: number) => void;
}

export interface SpeechEvent {
  text?: string;
  code?: string;
  message?: string;
  available?: boolean;
}

export interface UseSpeechToTextOptions {
  enabled?: boolean;
  locale?: string;
  onPartialResults?: (text: string) => void;
  onResults?: (text: string) => void;
  onError?: (error: SpeechToTextError) => void;
}

export interface UseSpeechToTextResult {
  available: boolean | null;
  error: SpeechToTextError | null;
  isListening: boolean;
  status: SpeechToTextStatus;
  transcript: string;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
}
