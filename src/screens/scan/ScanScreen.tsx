import React from 'react';
import { View } from 'react-native';
import { CustomScreen, CustomText } from '@components';
import { COLORS } from '@constants';
import styles from './ScanScreen.styles';

export default function ScanScreen() {
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
          Scan
        </CustomText>
        <CustomText
          variant="regular"
          size={16}
          lineHeight={23}
          color={COLORS.textSecondary}
          style={styles.description}
        >
          Scan a plant to identify it and learn how to care for it.
        </CustomText>
      </View>
    </CustomScreen>
  );
}
