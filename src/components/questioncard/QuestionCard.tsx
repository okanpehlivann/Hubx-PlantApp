import React from 'react';
import { Pressable, View, Image } from 'react-native';
import CustomText from '../customtext';
import styles from './QuestionCard.styles';
import type { QuestionCardProps } from '.';

export const QuestionCard: React.FC<QuestionCardProps> = ({
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
      <View style={styles.image}>
        <Image
          source={{ uri: imageUri }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <CustomText
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.title}
          >
            {title}
          </CustomText>
        </View>
      </View>
    </Pressable>
  );
};

export default QuestionCard;
