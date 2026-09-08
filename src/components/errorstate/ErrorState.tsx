import React from 'react';
import { Text, View } from 'react-native';
import CustomText from '../customtext';
import styles from './ErrorState.styles';
import type { ErrorStateProps } from '.';

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Hay aksi, bir hata oluştu.',
  icon,
  style,
  messageStyle,
}) => {
  return (
    <View
      style={[styles.container, style]}
      accessible
      accessibilityRole="alert"
    >
      {icon ?? (
        <View style={styles.icon}>
          <Text style={styles.iconText}>!</Text>
        </View>
      )}
      <CustomText
        variant="medium"
        size={16}
        lineHeight={22}
        style={[styles.message, messageStyle]}
      >
        {message}
      </CustomText>
    </View>
  );
};

export default ErrorState;
