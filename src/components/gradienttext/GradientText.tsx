import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import type { GradientTextProps } from '.';
import styles from './GradientText.styles';

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors,
  style,
}) => {
  const textStyle = StyleSheet.flatten(style) ?? {};
  const fontSize =
    typeof textStyle.fontSize === 'number' ? textStyle.fontSize : 16;
  const lineHeight =
    typeof textStyle.lineHeight === 'number'
      ? textStyle.lineHeight
      : Math.ceil(fontSize * 1.2);

  return (
    <View style={[styles.container, { height: lineHeight }]}>
      <Text style={[style, styles.shadowText]}>{children}</Text>
      <Svg
        width="100%"
        height={lineHeight}
        style={styles.gradient}
        pointerEvents="none"
        accessible={false}
      >
        <Defs>
          <LinearGradient
            id="gradient-text-fill"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <Stop offset="0%" stopColor={colors[0]} />
            <Stop offset="100%" stopColor={colors[1]} />
          </LinearGradient>
        </Defs>
        <SvgText
          x={0}
          y={fontSize}
          fill="url(#gradient-text-fill)"
          fontFamily={textStyle.fontFamily}
          fontSize={fontSize}
          fontWeight={textStyle.fontWeight}
          letterSpacing={textStyle.letterSpacing}
        >
          {children}
        </SvgText>
      </Svg>
    </View>
  );
};

export default GradientText;
