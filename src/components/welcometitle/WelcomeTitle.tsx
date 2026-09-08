import React from 'react';
import { Image, View } from 'react-native';
import { IMAGES } from '@assets';
import CustomText from '../customtext';
import type { WelcomeTitleProps } from '.';
import styles from './WelcomeTitle.styles';

export function WelcomeTitle({
  prefix,
  highlight,
  suffix = '',
  variant = 'medium',
  highlightVariant = 'extraBold',
  letterSpacing = 0.35,
  shadow = true,
}: WelcomeTitleProps) {
  const renderWords = (text: string) =>
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word, index) => (
        <CustomText
          key={`${index}-${word}`}
          variant={variant}
          size={28}
          letterSpacing={letterSpacing}
          style={[styles.word, shadow && styles.shadow]}
        >
          {word}
        </CustomText>
      ));

  return (
    <View
      accessible
      accessibilityRole="header"
      accessibilityLabel={`${prefix}${highlight}${suffix}`}
    >
      <View
        style={styles.row}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {renderWords(prefix)}
        <View style={styles.highlight} collapsable={false}>
          <CustomText
            variant={highlightVariant}
            size={28}
            letterSpacing={letterSpacing}
            style={shadow && styles.shadow}
          >
            {highlight}
          </CustomText>
          <Image
            source={IMAGES.brush}
            style={styles.brush}
            resizeMode="stretch"
            accessible={false}
          />
        </View>
        {renderWords(suffix)}
      </View>
    </View>
  );
}
