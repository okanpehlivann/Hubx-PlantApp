import React from 'react';
import { Pressable, View } from 'react-native';
import { COLORS } from '@constants';
import CustomText from '../customtext';
import styles from './RadioCard.styles';
import { RadioCardProps } from '.';

export const RadioCard: React.FC<RadioCardProps> = ({
  title,
  description,
  selected,
  onPress,
  badge,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={title}
      accessibilityState={{ checked: selected }}
      style={[styles.card, selected && styles.cardSelected, style]}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <View style={styles.textWrapper}>
        <CustomText
          variant="medium"
          size={16}
          letterSpacing={0}
          color={COLORS.textOnDark}
        >
          {title}
        </CustomText>
        {description ? (
          <CustomText
            variant="light"
            size={12}
            letterSpacing={0}
            color={COLORS.textOnDarkMuted}
            style={styles.description}
          >
            {description}
          </CustomText>
        ) : null}
      </View>
      {badge ? (
        <View style={styles.badge}>
          <CustomText
            variant="medium"
            size={12}
            letterSpacing={0}
            color={COLORS.textOnDark}
          >
            {badge}
          </CustomText>
        </View>
      ) : null}
    </Pressable>
  );
};

export default RadioCard;
