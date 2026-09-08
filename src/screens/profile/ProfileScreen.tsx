import React from 'react';
import { View } from 'react-native';
import { CustomScreen, CustomText } from '@components';
import { COLORS } from '@constants';
import styles from './ProfileScreen.styles';

export default function ProfileScreen() {
  return (
    <CustomScreen edges={['top']} contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <CustomText
          variant="extraBold"
          size={28}
          lineHeight={34}
          color={COLORS.textPrimary}
          style={styles.title}
        >
          Profile
        </CustomText>
        <CustomText
          variant="regular"
          size={16}
          lineHeight={23}
          color={COLORS.textSecondary}
          style={styles.description}
        >
          Manage your profile and preferences here.
        </CustomText>
      </View>
    </CustomScreen>
  );
}
