import React, { useEffect, useMemo, useState } from 'react';
import {
  AccessibilityInfo,
  Modal,
  Pressable,
  Text,
  type LayoutChangeEvent,
  useWindowDimensions,
  View,
} from 'react-native';
import Svg, { Defs, Mask, Rect } from 'react-native-svg';
import { COLORS } from '@constants';
import styles from './FeatureTour.styles';
import type { FeatureTourProps, FeatureTourTargetLayout } from '.';

const SCREEN_PADDING = 16;
const SPOTLIGHT_EDGE_PADDING = 6;
const TOOLTIP_GAP = 14;
const DEFAULT_TOOLTIP_HEIGHT = 210;
const MAX_MEASURE_ATTEMPTS = 12;
const MEASURE_DELAY_MS = 32;

export const FeatureTour: React.FC<FeatureTourProps> = ({
  visible,
  steps,
  onFinish,
  onSkip,
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetLayout, setTargetLayout] =
    useState<FeatureTourTargetLayout | null>(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [isModalReady, setIsModalReady] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  useEffect(() => {
    if (visible) {
      setCurrentStepIndex(0);
      setTargetLayout(null);
      setTooltipHeight(0);
      setIsModalReady(false);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || !currentStep || !isModalReady) {
      return;
    }

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const movePastUnavailableStep = () => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(index => index + 1);
      } else {
        onFinish();
      }
    };

    const measureTarget = (attempt: number) => {
      if (cancelled) {
        return;
      }

      const target = currentStep.targetRef.current;

      if (!target || typeof target.measureInWindow !== 'function') {
        if (attempt >= MAX_MEASURE_ATTEMPTS) {
          movePastUnavailableStep();
          return;
        }

        retryTimer = setTimeout(() => measureTarget(attempt + 1), 100);
        return;
      }

      target.measureInWindow((x, y, width, height) => {
        if (cancelled) {
          return;
        }

        if (width <= 0 || height <= 0) {
          if (attempt >= MAX_MEASURE_ATTEMPTS) {
            movePastUnavailableStep();
            return;
          }

          retryTimer = setTimeout(() => measureTarget(attempt + 1), 100);
          return;
        }

        setTargetLayout({ x, y, width, height });
      });
    };

    setTargetLayout(null);
    setTooltipHeight(0);

    retryTimer = setTimeout(() => measureTarget(0), MEASURE_DELAY_MS);

    return () => {
      cancelled = true;

      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [
    currentStep,
    currentStepIndex,
    isModalReady,
    onFinish,
    screenHeight,
    screenWidth,
    steps.length,
    visible,
  ]);

  useEffect(() => {
    if (!visible || !currentStep || !targetLayout) {
      return;
    }

    AccessibilityInfo.announceForAccessibility(
      `${currentStep.title}. ${currentStep.description}`,
    );
  }, [currentStep, targetLayout, visible]);

  const spotlight = useMemo(() => {
    if (!targetLayout || !currentStep) {
      return null;
    }

    const padding = currentStep.spotlightPadding ?? SPOTLIGHT_EDGE_PADDING;
    const left = Math.max(
      SPOTLIGHT_EDGE_PADDING,
      targetLayout.x - padding,
    );
    const top = Math.max(
      SPOTLIGHT_EDGE_PADDING,
      targetLayout.y - padding,
    );
    const right = Math.min(
      screenWidth - SPOTLIGHT_EDGE_PADDING,
      targetLayout.x + targetLayout.width + padding,
    );
    const bottom = Math.min(
      screenHeight - SPOTLIGHT_EDGE_PADDING,
      targetLayout.y + targetLayout.height + padding,
    );

    return {
      x: left,
      y: top,
      width: Math.max(0, right - left),
      height: Math.max(0, bottom - top),
      borderRadius: currentStep.borderRadius ?? 14,
    };
  }, [
    currentStep,
    screenHeight,
    screenWidth,
    targetLayout,
  ]);

  if (!visible || !currentStep) {
    return null;
  }

  const handleNext = () => {
    if (isLastStep) {
      onFinish();
      return;
    }

    setTargetLayout(null);
    setTooltipHeight(0);
    setCurrentStepIndex(index => index + 1);
  };

  const handleSkip = () => {
    (onSkip ?? onFinish)();
  };

  const measuredTooltipHeight = tooltipHeight || DEFAULT_TOOLTIP_HEIGHT;
  const spaceBelow = spotlight
    ? screenHeight - (spotlight.y + spotlight.height)
    : 0;
  const shouldPlaceBelow =
    currentStep.placement === 'below' ||
    (currentStep.placement !== 'above' &&
      spaceBelow >= measuredTooltipHeight + TOOLTIP_GAP + SCREEN_PADDING);
  const proposedTooltipTop = spotlight
    ? shouldPlaceBelow
      ? spotlight.y + spotlight.height + TOOLTIP_GAP
      : spotlight.y - measuredTooltipHeight - TOOLTIP_GAP
    : SCREEN_PADDING;
  const tooltipTop = Math.max(
    SCREEN_PADDING,
    Math.min(
      proposedTooltipTop,
      screenHeight - measuredTooltipHeight - SCREEN_PADDING,
    ),
  );

  const handleTooltipLayout = (event: LayoutChangeEvent) => {
    const nextHeight = Math.ceil(event.nativeEvent.layout.height);

    if (nextHeight !== tooltipHeight) {
      setTooltipHeight(nextHeight);
    }
  };

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      navigationBarTranslucent
      testID="feature-tour-modal"
      onShow={() => setIsModalReady(true)}
      onRequestClose={handleSkip}
    >
      <View
        style={styles.overlay}
        accessibilityViewIsModal
        testID="feature-tour"
      >
        <Pressable
          accessible={false}
          style={styles.touchGuard}
          onPress={() => undefined}
        />

        {spotlight ? (
          <>
            <Svg
              pointerEvents="none"
              width={screenWidth}
              height={screenHeight}
              style={styles.overlayGraphic}
            >
              <Defs>
                <Mask
                  id="feature-tour-spotlight-mask"
                  x={0}
                  y={0}
                  width={screenWidth}
                  height={screenHeight}
                  maskUnits="userSpaceOnUse"
                  maskContentUnits="userSpaceOnUse"
                >
                  <Rect
                    x={0}
                    y={0}
                    width={screenWidth}
                    height={screenHeight}
                    fill="#FFFFFF"
                  />
                  <Rect
                    x={spotlight.x}
                    y={spotlight.y}
                    width={spotlight.width}
                    height={spotlight.height}
                    rx={spotlight.borderRadius}
                    ry={spotlight.borderRadius}
                    fill="#000000"
                  />
                </Mask>
              </Defs>

              <Rect
                x={0}
                y={0}
                width={screenWidth}
                height={screenHeight}
                fill="rgba(8, 18, 13, 0.72)"
                mask="url(#feature-tour-spotlight-mask)"
              />
              <Rect
                x={spotlight.x}
                y={spotlight.y}
                width={spotlight.width}
                height={spotlight.height}
                rx={spotlight.borderRadius}
                ry={spotlight.borderRadius}
                fill="transparent"
                stroke={COLORS.primary}
                strokeWidth={2}
              />
            </Svg>

            <View
              onLayout={handleTooltipLayout}
              style={[styles.tooltip, { top: tooltipTop }]}
            >
              <View style={styles.tooltipHeader}>
                <Text style={styles.stepLabel}>
                  {currentStepIndex + 1} / {steps.length}
                </Text>
                <Pressable
                  hitSlop={8}
                  onPress={handleSkip}
                  accessibilityRole="button"
                  accessibilityLabel="Skip feature tour"
                >
                  <Text style={styles.skipText}>Skip</Text>
                </Pressable>
              </View>

              <Text style={styles.title}>{currentStep.title}</Text>
              <Text style={styles.description}>{currentStep.description}</Text>

              <View style={styles.footer}>
                <View style={styles.progress} accessibilityElementsHidden>
                  {steps.map((step, index) => (
                    <View
                      key={step.id}
                      style={[
                        styles.progressDot,
                        index === currentStepIndex && styles.progressDotActive,
                      ]}
                    />
                  ))}
                </View>

                <Pressable
                  style={styles.nextButton}
                  onPress={handleNext}
                  accessibilityRole="button"
                  accessibilityLabel={
                    isLastStep ? 'Finish feature tour' : 'Next feature'
                  }
                >
                  <Text style={styles.nextButtonText}>
                    {isLastStep ? 'Done' : 'Next'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </Modal>
  );
};

export default FeatureTour;
