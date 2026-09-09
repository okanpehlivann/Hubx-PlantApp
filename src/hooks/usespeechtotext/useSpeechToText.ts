import {
  UseSpeechToTextOptions,
  UseSpeechToTextResult,
  SpeechToTextStatus,
  SpeechToTextError,
  SpeechEvent,
} from '@types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NativeEventEmitter, PermissionsAndroid, Platform } from 'react-native';
import { EVENTS, createSpeechError, nativeSpeechToText } from '@constants';

export const useSpeechToText = ({
  enabled = true,
  locale,
  onPartialResults,
  onResults,
  onError,
}: UseSpeechToTextOptions = {}): UseSpeechToTextResult => {
  const [status, setStatus] = useState<SpeechToTextStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<SpeechToTextError | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);

  const statusRef = useRef<SpeechToTextStatus>('idle');
  const operationRef = useRef(0);
  const callbacksRef = useRef({ onPartialResults, onResults, onError });

  useEffect(() => {
    callbacksRef.current = { onPartialResults, onResults, onError };
  }, [onError, onPartialResults, onResults]);

  useEffect(() => {
    if (!enabled || !nativeSpeechToText) {
      return undefined;
    }

    const emitter = new NativeEventEmitter(nativeSpeechToText);
    const subscriptions = [
      emitter.addListener(EVENTS.start, () => {
        statusRef.current = 'listening';
        setStatus('listening');
        setError(null);
      }),
      emitter.addListener(EVENTS.partialResults, (event: SpeechEvent) => {
        const text = event.text ?? '';
        setTranscript(text);
        callbacksRef.current.onPartialResults?.(text);
      }),
      emitter.addListener(EVENTS.results, (event: SpeechEvent) => {
        const text = event.text ?? '';
        setTranscript(text);
        callbacksRef.current.onResults?.(text);
      }),
      emitter.addListener(EVENTS.end, () => {
        statusRef.current = 'idle';
        setStatus('idle');
      }),
      emitter.addListener(EVENTS.error, (event: SpeechEvent) => {
        const speechError = createSpeechError(
          event.code ?? 'speech_error',
          event.message ?? 'Speech recognition failed.',
        );
        statusRef.current = 'error';
        setStatus('error');
        setError(speechError);
        callbacksRef.current.onError?.(speechError);
      }),
      emitter.addListener(EVENTS.availabilityChanged, (event: SpeechEvent) => {
        setAvailable(event.available ?? false);
      }),
    ];

    return () => subscriptions.forEach(subscription => subscription.remove());
  }, [enabled]);

  useEffect(() => {
    let isMounted = true;

    if (enabled && nativeSpeechToText?.isAvailable) {
      nativeSpeechToText
        .isAvailable(locale)
        .then(value => {
          if (isMounted) {
            setAvailable(value);
          }
        })
        .catch(() => {
          if (isMounted) {
            setAvailable(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [enabled, locale]);

  const setCurrentStatus = useCallback((nextStatus: SpeechToTextStatus) => {
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  }, []);

  const startListening = useCallback(async () => {
    if (statusRef.current === 'listening' || statusRef.current === 'starting') {
      return;
    }

    const operationId = operationRef.current + 1;
    operationRef.current = operationId;

    if (!enabled || !nativeSpeechToText) {
      const speechError = createSpeechError(
        'unavailable',
        'Speech recognition is not available on this platform.',
      );
      setCurrentStatus('error');
      setError(speechError);
      callbacksRef.current.onError?.(speechError);
      return;
    }

    setError(null);
    setTranscript('');
    setCurrentStatus('starting');

    try {
      let permissionGranted = false;

      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        permissionGranted = permission === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        permissionGranted = await nativeSpeechToText.requestPermission();
      }

      if (operationRef.current !== operationId) {
        return;
      }

      if (!permissionGranted) {
        throw createSpeechError(
          'permission_denied',
          'Microphone and speech recognition permission are required.',
        );
      }

      await nativeSpeechToText.startListening(locale);

      if (operationRef.current === operationId) {
        setCurrentStatus('listening');
      }
    } catch (caughtError) {
      if (operationRef.current !== operationId) {
        return;
      }

      const speechError =
        typeof caughtError === 'object' &&
        caughtError !== null &&
        'code' in caughtError
          ? (caughtError as SpeechToTextError)
          : createSpeechError(
              'start_failed',
              caughtError instanceof Error
                ? caughtError.message
                : 'Speech recognition could not be started.',
            );

      setCurrentStatus('error');
      setError(speechError);
      callbacksRef.current.onError?.(speechError);
    }
  }, [enabled, locale, setCurrentStatus]);

  const stopListening = useCallback(async () => {
    operationRef.current += 1;

    if (!nativeSpeechToText || statusRef.current === 'idle') {
      return;
    }

    setCurrentStatus('stopping');

    try {
      await nativeSpeechToText.stopListening();
    } finally {
      setCurrentStatus('idle');
    }
  }, [setCurrentStatus]);

  return {
    available,
    error,
    isListening: status === 'starting' || status === 'listening',
    status,
    transcript,
    startListening,
    stopListening,
  };
};

export default useSpeechToText;
