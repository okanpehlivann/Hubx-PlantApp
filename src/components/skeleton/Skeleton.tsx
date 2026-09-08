import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import styles from './Skeleton.styles';
import type { SkeletonProps } from '.';

export const Skeleton: React.FC<SkeletonProps> = ({
  style,
  testID = 'skeleton',
}) => {
  const shimmerProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerProgress, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerProgress, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [shimmerProgress]);

  const shimmerTranslateX = shimmerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-160, 160],
  });

  return (
    <View
      testID={testID}
      accessible
      accessibilityLabel="Loading content"
      style={[styles.container, style]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shimmer,
          { transform: [{ translateX: shimmerTranslateX }] },
        ]}
      />
    </View>
  );
};

export default Skeleton;
