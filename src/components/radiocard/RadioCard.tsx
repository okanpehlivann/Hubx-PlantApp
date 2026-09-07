import React from 'react';
import { Pressable, View } from 'react-native';
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
          color="#FFFFFF"
        >
          {title}
        </CustomText>
        {description ? (
          <CustomText
            variant="light"
            size={12}
            letterSpacing={0}
            color="rgba(255, 255, 255, 0.7)"
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
            color="#FFFFFF"
          >
            {badge}
          </CustomText>
        </View>
      ) : null}
    </Pressable>
  );
};

export default RadioCard;
