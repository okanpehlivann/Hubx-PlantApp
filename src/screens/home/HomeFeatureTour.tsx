import React, { type RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ViewInstance } from 'react-native';
import { FeatureTour, type FeatureTourStep } from '@components';
import { STORAGE_KEYS } from '@constants';

type HomeFeatureTourProps = {
  enabled: boolean;
  ready: boolean;
  includeQuestions: boolean;
  searchTargetRef: RefObject<ViewInstance | null>;
  voiceButtonRef: RefObject<ViewInstance | null>;
  questionsTargetRef: RefObject<ViewInstance | null>;
  scanButtonRef: RefObject<ViewInstance | null>;
};

const COMPLETED_VALUE = 'true';

const HomeFeatureTour: React.FC<HomeFeatureTourProps> = ({
  enabled,
  ready,
  includeQuestions,
  searchTargetRef,
  voiceButtonRef,
  questionsTargetRef,
  scanButtonRef,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let active = true;

    AsyncStorage.getItem(STORAGE_KEYS.HOME_FEATURE_TOUR_COMPLETED)
      .then(value => {
        if (active) {
          setIsCompleted(value === COMPLETED_VALUE);
        }
      })
      .catch(() => {
        if (active) {
          setIsCompleted(false);
        }
      });

    return () => {
      active = false;
    };
  }, [enabled]);

  const steps = useMemo<FeatureTourStep[]>(() => {
    const homeSteps: FeatureTourStep[] = [
      {
        id: 'search',
        title: 'Find the plant you need',
        description:
          'Type a plant name to quickly search through guides and categories.',
        targetRef: searchTargetRef,
        borderRadius: 14,
        spotlightPadding: 5,
        placement: 'below',
      },
      {
        id: 'voice-search',
        title: 'Search with your voice',
        description:
          'Press and hold the microphone, say the plant name, then release to stop listening.',
        targetRef: voiceButtonRef,
        borderRadius: 28,
        spotlightPadding: 7,
        placement: 'below',
      },
    ];

    if (includeQuestions) {
      homeSteps.push({
        id: 'questions',
        title: 'Explore plant guides',
        description:
          'Swipe through quick guides and tap a card to learn more about plant care.',
        targetRef: questionsTargetRef,
        borderRadius: 18,
        spotlightPadding: 5,
      });
    }

    homeSteps.push({
      id: 'scan',
      title: 'Identify a plant',
      description:
        'Tap the camera button to photograph a plant and start identifying it.',
      targetRef: scanButtonRef,
      borderRadius: 46,
      spotlightPadding: 5,
      placement: 'above',
    });

    return homeSteps;
  }, [
    includeQuestions,
    questionsTargetRef,
    scanButtonRef,
    searchTargetRef,
    voiceButtonRef,
  ]);

  const completeTour = useCallback(() => {
    setIsCompleted(true);
    AsyncStorage.setItem(
      STORAGE_KEYS.HOME_FEATURE_TOUR_COMPLETED,
      COMPLETED_VALUE,
    ).catch(error => {
      console.warn('[HomeFeatureTour] Completion could not be saved.', error);
    });
  }, []);

  return (
    <FeatureTour
      visible={enabled && ready && isCompleted === false}
      steps={steps}
      onFinish={completeTour}
      onSkip={completeTour}
    />
  );
};

export default HomeFeatureTour;
