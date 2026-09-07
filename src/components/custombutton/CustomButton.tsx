import React from 'react';
import { Text, ActivityIndicator, Pressable } from 'react-native';
import { COLORS } from '@constants';
import styles from './CustomButton.styles';
import { CustomButtonProps } from '.';

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[styles.button, style]}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.textOnDark} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};
