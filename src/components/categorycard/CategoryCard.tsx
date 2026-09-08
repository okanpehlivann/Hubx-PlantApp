import React from 'react';
import { Pressable, Image } from 'react-native';
import CustomText from '../customtext';
import styles from './CategoryCard.styles';
import type { CategoryCardProps } from '.';

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  imageUri,
  onPress,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={title}
      style={[styles.card, style]}
    >
      <CustomText style={styles.title}>{title}</CustomText>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default CategoryCard;
