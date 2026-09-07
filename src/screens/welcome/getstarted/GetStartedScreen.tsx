import { useArtworkLayout } from '@hooks';
import { IMAGES } from '@assets';
import React from 'react';
import { View, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '@navigation';
import { COLORS, SCREEN_NAMES } from '@constants';
import {
  CustomScreen,
  CustomButton,
  CustomText,
  WelcomeTitle,
} from '@components';
import styles from './GetStartedScreen.styles';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.GetStarted
>;

export default function GetStartedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    frameStyle,
    imageStyle,
    onLayout: handleArtworkLayout,
  } = useArtworkLayout({
    width: 375,
    frameHeight: 499,
    imageHeight: 547,
    imageTop: -5,
  });

  return (
    <CustomScreen contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <WelcomeTitle
          prefix="Welcome to "
          highlight="PlantApp"
          variant="regular"
          highlightVariant="bold"
          letterSpacing={0.07}
        />
        <CustomText
          variant="regular"
          size={16}
          color={COLORS.textSecondary}
          lineHeight={22}
          letterSpacing={0.07}
          style={styles.subtitle}
        >
          Identify more than 3000+ plants and 88% accuracy.
        </CustomText>
      </View>

      <View style={styles.imageContainer} onLayout={handleArtworkLayout}>
        <View style={[styles.artworkFrame, frameStyle]}>
          <Image
            source={IMAGES.getStarted}
            style={[styles.image, imageStyle]}
            resizeMode="contain"
            accessibilityLabel="Plant identification illustration"
          />
        </View>
      </View>

      <View style={styles.footerContainer}>
        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate(SCREEN_NAMES.Onboarding)}
        />
        <CustomText
          variant="regular"
          size={11}
          color={COLORS.textSecondaryMuted}
          lineHeight={15}
          style={styles.termsText}
        >
          By tapping next, you are agreeing to PlantID{'\n'}
          <CustomText
            variant="regular"
            color={COLORS.textSecondaryMuted}
            style={styles.linkText}
          >
            Terms of Use
          </CustomText>{' '}
          &{' '}
          <CustomText
            variant="regular"
            color={COLORS.textSecondaryMuted}
            style={styles.linkText}
          >
            Privacy Policy
          </CustomText>
          .
        </CustomText>
      </View>
    </CustomScreen>
  );
}
