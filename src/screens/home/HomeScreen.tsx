import React from 'react';
import { View } from 'react-native';
import { CommonCard, CustomScreen, CustomText, SearchInput } from '@components';
import styles from './HomeScreen.styles';
import { COLORS } from '@constants';
import { PremiumMessageIcon } from '@assets';

export default function HomeScreen() {
  return (
    <CustomScreen
      scroll
      contentContainerStyle={styles.container}
      statusBarStyle="dark-content"
    >
      <View style={styles.header}>
        <CustomText
          variant="regular"
          size={16}
          lineHeight={19}
          color={COLORS.textPrimary}
          letterSpacing={0.07}
        >
          Hi, plant lover!
        </CustomText>
        <View style={styles.greetingRow}>
          <CustomText
            variant="medium"
            size={24}
            lineHeight={28}
            letterSpacing={0.35}
            style={styles.greetingTitle}
          >
            Good Afternoon!
          </CustomText>
          <CustomText size={24} lineHeight={28} style={styles.weatherIcon}>
            ⛅
          </CustomText>
        </View>
      </View>

      <SearchInput
        placeholder="Search for plants"
        returnKeyType="search"
        containerStyle={styles.searchInput}
        accessibilityLabel="Search for plants"
      />

      <CommonCard
        title="FREE Premium Available"
        description="Tap to upgrade your account!"
        showArrow
        icon={<PremiumMessageIcon />}
        style={styles.premiumCard}
        titleStyle={styles.premiumTitle}
        descriptionStyle={styles.premiumDescription}
      />
    </CustomScreen>
  );
}
