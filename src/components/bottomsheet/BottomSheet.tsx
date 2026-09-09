import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@constants';
import CustomButton from '../custombutton';
import CustomText from '../customtext';
import styles from './BottomSheet.styles';
import type { BottomSheetProps } from '.';

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  title,
  content,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const [isMounted, setIsMounted] = useState(visible);
  const sheetAnimation = useRef(new Animated.Value(0)).current;
  const backdropAnimation = useRef(new Animated.Value(0)).current;
  const isClosing = useRef(false);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  const closeSheet = useCallback((notifyParent: boolean) => {
    if (isClosing.current) {
      return;
    }

    isClosing.current = true;
    Animated.parallel([
      Animated.timing(sheetAnimation, {
        toValue: 0,
        duration: 240,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnimation, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) {
        return;
      }

      setIsMounted(false);
      isClosing.current = false;

      if (notifyParent) {
        onCloseRef.current();
      }
    });
  }, [backdropAnimation, sheetAnimation]);

  useEffect(() => {
    if (!visible) {
      if (isMounted) {
        closeSheet(false);
      }
      return;
    }

    isClosing.current = false;
    setIsMounted(true);
    sheetAnimation.setValue(0);
    backdropAnimation.setValue(0);

    const animationFrame = requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(sheetAnimation, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnimation, {
          toValue: 1,
          duration: 240,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [
    backdropAnimation,
    closeSheet,
    isMounted,
    sheetAnimation,
    visible,
  ]);

  const sheetTranslateY = sheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, 0],
  });

  return (
    <Modal
      visible={isMounted}
      transparent
      animationType="none"
      onRequestClose={() => closeSheet(true)}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <Pressable
          style={styles.backdropTouchTarget}
          onPress={() => closeSheet(true)}
          accessible={false}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.backdrop, { opacity: backdropAnimation }]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: insets.bottom + 16,
              transform: [{ translateY: sheetTranslateY }],
            },
          ]}
        >
          <View style={styles.handle} />
          <CustomText
            variant="extraBold"
            size={24}
            lineHeight={30}
            color={COLORS.textPrimary}
            style={styles.title}
          >
            {title}
          </CustomText>

          <ScrollView
            style={styles.contentScroll}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <CustomText
              variant="regular"
              size={15}
              lineHeight={23}
              color={COLORS.textSecondary}
            >
              {content}
            </CustomText>
          </ScrollView>

          <CustomButton title="Done" onPress={onClose} />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
