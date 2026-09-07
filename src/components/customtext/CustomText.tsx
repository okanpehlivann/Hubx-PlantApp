import React from 'react';
import { Text } from 'react-native';
import styles from './CustomText.styles';
import { CustomTextProps } from '.';

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = 'regular',
  size,
  lineHeight,
  letterSpacing,
  color,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles[variant],
        size !== undefined && { fontSize: size },
        lineHeight !== undefined && { lineHeight },
        letterSpacing !== undefined && { letterSpacing },
        color !== undefined && { color },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
