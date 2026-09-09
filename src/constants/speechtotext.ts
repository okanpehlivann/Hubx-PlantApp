import { NativeSpeechToTextModule, SpeechToTextError } from '@types';
import { NativeModules } from 'react-native';

export const MODULE_NAME = 'SpeechToText';

export const EVENTS = {
  start: 'speechStart',
  partialResults: 'speechPartialResults',
  results: 'speechResults',
  end: 'speechEnd',
  error: 'speechError',
  availabilityChanged: 'speechAvailabilityChanged',
} as const;

export const nativeSpeechToText = NativeModules[MODULE_NAME] as
  | NativeSpeechToTextModule
  | undefined;

export const createSpeechError = (
  code: string,
  message: string,
): SpeechToTextError => ({ code, message });
