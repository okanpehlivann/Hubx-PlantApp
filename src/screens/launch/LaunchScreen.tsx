import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { TabHomeIcon } from '@assets';
import { COLORS } from '@constants';
import { CustomScreen, CustomText } from '@components';
import styles from './LaunchScreen.styles';
import { LaunchScreenProps } from '@types';

export default function LaunchScreen({ onComplete }: LaunchScreenProps) {
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(0.9)).current;
  const iconTranslateY = useRef(new Animated.Value(12)).current;
  const exitTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const enterAnimation = Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(contentScale, {
        toValue: 1,
        speed: 16,
        bounciness: 5,
        useNativeDriver: true,
      }),
      Animated.timing(iconTranslateY, {
        toValue: 0,
        duration: 480,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    const exitAnimation = Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 280,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(exitTranslateY, {
        toValue: -10,
        duration: 280,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    enterAnimation.start(result => {
      if (!result.finished) {
        return;
      }

      Animated.sequence([Animated.delay(360), exitAnimation]).start(
        exitResult => {
          if (exitResult.finished) {
            onComplete();
          }
        },
      );
    });

    return () => {
      enterAnimation.stop();
      exitAnimation.stop();
    };
  }, [
    contentOpacity,
    contentScale,
    exitTranslateY,
    iconTranslateY,
    onComplete,
  ]);

  return (
    <CustomScreen
      backgroundColor={COLORS.background}
      statusBarStyle="dark-content"
      edges={['top', 'bottom']}
      contentContainerStyle={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: contentOpacity,
            transform: [
              { scale: contentScale },
              { translateY: exitTranslateY },
            ],
          },
        ]}
      >
        <Animated.View style={{ transform: [{ translateY: iconTranslateY }] }}>
          <View style={styles.iconBackground}>
            <TabHomeIcon width={44} height={46} color={COLORS.primary} />
          </View>
        </Animated.View>
        <CustomText
          variant="extraBold"
          size={32}
          lineHeight={38}
          color={COLORS.textPrimary}
          style={styles.title}
        >
          PlantApp
        </CustomText>
        <CustomText
          variant="regular"
          size={14}
          lineHeight={20}
          color={COLORS.textSecondary}
        >
          Your plants, thriving.
        </CustomText>
      </Animated.View>
    </CustomScreen>
  );
}
