import React from 'react';
import { View } from 'react-native';
import { COLORS } from '@constants';
import CustomText from '../customtext';
import styles from './FeatureCard.styles';
import { FeatureCardProps } from '.';

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : <View />}

      <View style={styles.textContainer}>
        <CustomText
          variant="medium"
          size={20}
          letterSpacing={0.38}
          lineHeight={24}
          color={COLORS.textOnDark}
        >
          {title}
        </CustomText>
        <CustomText
          variant="regular"
          size={13}
          letterSpacing={-0.08}
          lineHeight={18}
          color={COLORS.textOnDarkMuted}
          style={styles.description}
        >
          {description}
        </CustomText>
      </View>
    </View>
  );
};

export default FeatureCard;
