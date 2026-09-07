import { IMAGES } from '@assets';
import { PAYWALL_OPTIONS } from '@enums';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setOnboardingCompleted } from '@store';
import { COLORS, SPACING, PAYWALL_FEATURES, PAYWALL_PLANS } from '@constants';
import {
  CustomScreen,
  CustomText,
  CustomButton,
  FeatureCard,
  RadioCard,
} from '@components';
import styles from './PaywallScreen.styles';

export default function PaywallScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [selectedPlanId, setSelectedPlanId] = useState<PAYWALL_OPTIONS>(
    PAYWALL_OPTIONS.YEARLY,
  );

  const completeOnboarding = () => {
    dispatch(setOnboardingCompleted(true));
  };

  const renderPaywallFeature = ({
    item,
  }: {
    item: (typeof PAYWALL_FEATURES)[0];
  }) => {
    const Icon = item.IconComponent;
    return (
      <FeatureCard
        icon={<Icon width={17} height={17} fill={COLORS.textOnDark} />}
        title={item.title}
        description={item.description}
        style={styles.featureCard}
      />
    );
  };

  return (
    <CustomScreen
      backgroundColor={COLORS.backgroundDark}
      statusBarStyle="light-content"
      edges={['bottom']}
      contentContainerStyle={styles.root}
    >
      <Image
        source={IMAGES.paywallBackground}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Pressable
        style={[styles.closeButton, { top: insets.top + SPACING.xs }]}
        onPress={completeOnboarding}
        hitSlop={12}
      >
        <CustomText
          variant="bold"
          size={16}
          lineHeight={18}
          color={COLORS.textOnDark}
        >
          ×
        </CustomText>
      </Pressable>

      <View style={styles.panel}>
        <CustomText
          variant="extraBold"
          size={30}
          letterSpacing={0}
          color={COLORS.textOnDark}
        >
          PlantApp{' '}
          <CustomText
            variant="light"
            size={24}
            letterSpacing={0}
            color={COLORS.textOnDark}
          >
            Premium
          </CustomText>
        </CustomText>
        <CustomText
          variant="light"
          size={17}
          letterSpacing={0.38}
          color={COLORS.textOnDarkMuted}
          style={styles.subheading}
        >
          Access All Features
        </CustomText>

        <FlatList
          data={PAYWALL_FEATURES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={feature => feature.id}
          style={styles.featuresScroll}
          contentContainerStyle={styles.featuresRow}
          renderItem={renderPaywallFeature}
        />

        {PAYWALL_PLANS.map(plan => (
          <RadioCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            badge={plan.badge}
            selected={selectedPlanId === plan.id}
            onPress={() => setSelectedPlanId(plan.id)}
            style={styles.planCard}
          />
        ))}

        <CustomButton
          title="Try free for 3 days"
          onPress={completeOnboarding}
          style={styles.ctaButton}
        />

        <CustomText
          variant="light"
          size={9}
          lineHeight={13}
          letterSpacing={0}
          color={COLORS.textOnDarkSubtle}
          style={styles.disclaimer}
        >
          After the 3-day free trial period you'll be charged $274.99 per year
          unless you cancel before the trial expires. Yearly Subscription is
          Auto-Renewable
        </CustomText>

        <View style={styles.linksRow}>
          <CustomText
            variant="regular"
            size={11}
            letterSpacing={0}
            color={COLORS.textOnDarkFaded}
          >
            Terms
          </CustomText>
          <CustomText
            variant="regular"
            size={11}
            color={COLORS.textOnDarkDisabled}
            style={styles.linkDivider}
          >
            •
          </CustomText>
          <CustomText
            variant="regular"
            size={11}
            letterSpacing={0}
            color={COLORS.textOnDarkFaded}
          >
            Privacy
          </CustomText>
          <CustomText
            variant="regular"
            size={11}
            color={COLORS.textOnDarkDisabled}
            style={styles.linkDivider}
          >
            •
          </CustomText>
          <CustomText
            variant="regular"
            size={11}
            letterSpacing={0}
            color={COLORS.textOnDarkFaded}
          >
            Restore
          </CustomText>
        </View>
      </View>
    </CustomScreen>
  );
}
