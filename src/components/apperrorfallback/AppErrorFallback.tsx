import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { TabHomeIcon } from '@assets';
import { COLORS } from '@constants';
import CustomButton from '../custombutton';
import CustomScreen from '../customscreen';
import CustomText from '../customtext';
import styles from './AppErrorFallback.styles';

export interface AppErrorFallbackProps {
  onRetry: () => void;
}

export const AppErrorFallback: React.FC<AppErrorFallbackProps> = ({
  onRetry,
}) => {
  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const pulseProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(logoTranslateY, {
          toValue: -6,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseProgress, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(pulseProgress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(300),
      ]),
    );

    floatAnimation.start();
    pulseAnimation.start();

    return () => {
      floatAnimation.stop();
      pulseAnimation.stop();
    };
  }, [logoTranslateY, pulseProgress]);

  const pulseScale = pulseProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.86, 1.35],
  });
  const pulseOpacity = pulseProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <CustomScreen
      backgroundColor={COLORS.background}
      statusBarStyle="dark-content"
      edges={['top', 'bottom']}
      contentContainerStyle={styles.content}
    >
      <View accessibilityRole="alert">
        <View style={styles.logoArea} accessible accessibilityLabel="PlantApp">
          <Animated.View
            pointerEvents="none"
            style={[
              styles.pulseRing,
              {
                opacity: pulseOpacity,
                transform: [{ scale: pulseScale }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.logoBadge,
              { transform: [{ translateY: logoTranslateY }] },
            ]}
          >
            <TabHomeIcon width={44} height={46} />
          </Animated.View>
        </View>

        <CustomText
          variant="extraBold"
          size={28}
          lineHeight={34}
          color={COLORS.textPrimary}
          style={styles.title}
        >
          Bir şeyler ters gitti
        </CustomText>
        <CustomText
          variant="regular"
          size={16}
          lineHeight={23}
          color={COLORS.textSecondary}
          style={styles.message}
        >
          Uygulama beklenmeyen bir hatayla karşılaştı. Tekrar deneyerek kaldığın
          yerden devam edebilirsin.
        </CustomText>

        <CustomButton
          title="Tekrar Dene"
          onPress={onRetry}
          style={styles.retryButton}
        />
      </View>
    </CustomScreen>
  );
};

export default AppErrorFallback;
