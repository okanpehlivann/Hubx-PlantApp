import { useArtworkLayout } from '@hooks';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '@navigation';
import { SCREEN_NAMES, ONBOARDING_SLIDES, OnboardingSlide } from '@constants';
import { CustomScreen, CustomButton, WelcomeTitle } from '@components';
import styles from './OnboardingScreen.styles';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.Onboarding
>;

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const [careArtworkHeight, setCareArtworkHeight] = useState(0);
  const {
    frameStyle,
    imageStyle,
    onLayout: handleArtworkLayout,
    window: { width, height },
  } = useArtworkLayout({
    width: 375,
    frameHeight: 550,
    imageHeight: 683,
    imageTop: -20,
  });

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;
  const phoneTop = width * 0.2;

  const phoneHeight = Math.max(
    width * 0.696 * (540 / 261),
    careArtworkHeight - phoneTop + 4,
  );

  const handleContinue = () => {
    if (isLastSlide) {
      navigation.navigate(SCREEN_NAMES.Paywall);
      return;
    }

    const nextIndex = activeIndex + 1;
    listRef.current?.scrollToOffset({
      offset: nextIndex * width,
      animated: true,
    });
    setActiveIndex(nextIndex);
  };

  const renderItem = ({ item }: { item: OnboardingSlide }) => (
    <View
      style={[
        styles.slide,
        {
          width,
          paddingBottom: item.artwork
            ? Math.max(0, footerHeight - buttonHeight)
            : footerHeight,
        },
      ]}
    >
      <View style={styles.slideHeader}>
        <WelcomeTitle
          prefix={item.titlePrefix}
          highlight={item.titleHighlight}
          suffix={item.titleSuffix}
        />
      </View>
      <View
        style={styles.imageContainer}
        onLayout={
          item.artwork
            ? event => setCareArtworkHeight(event.nativeEvent.layout.height)
            : handleArtworkLayout
        }
      >
        {item.backgroundImage && (
          <Image
            source={item.backgroundImage}
            style={[styles.backgroundImage, { height: height * 0.6 }]}
            resizeMode="cover"
          />
        )}
        {item.artwork ? (
          <Image
            source={item.image}
            style={[styles.phoneImage, { top: phoneTop, height: phoneHeight }]}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.artworkFrame, frameStyle]}>
            <Image
              source={item.image}
              style={[styles.image, imageStyle]}
              resizeMode="contain"
            />
          </View>
        )}
        {item.artwork && (
          <Image
            source={item.artwork}
            style={styles.artwork}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <CustomScreen>
      <FlatList
        ref={listRef}
        data={ONBOARDING_SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        style={styles.list}
        renderItem={renderItem}
      />

      <View
        style={styles.footer}
        pointerEvents="box-none"
        onLayout={event => setFooterHeight(event.nativeEvent.layout.height)}
      >
        <View
          style={styles.buttonContainer}
          onLayout={event => setButtonHeight(event.nativeEvent.layout.height)}
        >
          <CustomButton title="Continue" onPress={handleContinue} />
        </View>
        <View style={styles.dotsRow}>
          {ONBOARDING_SLIDES.map((slide, index) => (
            <View
              key={slide.id}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      </View>
    </CustomScreen>
  );
}
