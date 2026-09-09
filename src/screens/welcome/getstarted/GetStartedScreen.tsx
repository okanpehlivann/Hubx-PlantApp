import { useArtworkLayout } from '@hooks';
import { IMAGES } from '@assets';
import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, LEGAL_CONTENT, SCREEN_NAMES } from '@constants';
import type { LegalDocument } from '@constants';
import {
  BottomSheet,
  CustomScreen,
  CustomButton,
  CustomText,
  WelcomeTitle,
} from '@components';
import styles from './GetStartedScreen.styles';
import { GetStartedNavigationProp } from '@types';

export default function GetStartedScreen() {
  const navigation = useNavigation<GetStartedNavigationProp>();
  const [activeLegalDocument, setActiveLegalDocument] =
    useState<LegalDocument | null>(null);
  const {
    frameStyle,
    imageStyle,
    onLayout: handleArtworkLayout,
  } = useArtworkLayout({
    width: 1038,
    frameHeight: 1515,
    imageHeight: 1515,
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
        <View style={styles.termsContainer}>
          <CustomText
            variant="regular"
            size={11}
            color={COLORS.textSecondaryMuted}
            lineHeight={15}
            style={styles.termsText}
          >
            By tapping next, you are agreeing to PlantID
          </CustomText>
          <View style={styles.termsLinksRow}>
            <Pressable
              onPress={() => setActiveLegalDocument('terms')}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Terms of Use"
            >
              <CustomText
                variant="regular"
                size={11}
                color={COLORS.textSecondaryMuted}
                lineHeight={15}
                style={styles.linkText}
              >
                Terms of Use
              </CustomText>
            </Pressable>
            <CustomText
              variant="regular"
              size={11}
              color={COLORS.textSecondaryMuted}
              lineHeight={15}
            >
              {'  &  '}
            </CustomText>
            <Pressable
              onPress={() => setActiveLegalDocument('privacy')}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Privacy Policy"
            >
              <CustomText
                variant="regular"
                size={11}
                color={COLORS.textSecondaryMuted}
                lineHeight={15}
                style={styles.linkText}
              >
                Privacy Policy
              </CustomText>
            </Pressable>
            <CustomText
              variant="regular"
              size={11}
              color={COLORS.textSecondaryMuted}
              lineHeight={15}
            >
              .
            </CustomText>
          </View>
        </View>
      </View>

      {activeLegalDocument ? (
        <BottomSheet
          visible
          title={LEGAL_CONTENT[activeLegalDocument].title}
          content={LEGAL_CONTENT[activeLegalDocument].content}
          onClose={() => setActiveLegalDocument(null)}
        />
      ) : null}
    </CustomScreen>
  );
}
