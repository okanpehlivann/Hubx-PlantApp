import React from 'react';
import { Pressable, View } from 'react-native';
import { RightArrowIcon } from '@assets';
import CustomText from '../customtext';
import styles from './CommonCard.styles';
import { CommonCardProps } from '.';

export const CommonCard: React.FC<CommonCardProps> = ({
  icon,
  title,
  description,
  showArrow = false,
  onPress,
  style,
  titleStyle,
  descriptionStyle,
  arrowIcon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={[styles.card, style]}
    >
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}

      <View style={styles.textContainer}>
        <CustomText variant="bold" size={16} lineHeight={21} style={titleStyle}>
          {title}
        </CustomText>
        {description ? (
          <CustomText
            variant="regular"
            size={13}
            lineHeight={16}
            style={[styles.description, descriptionStyle]}
          >
            {description}
          </CustomText>
        ) : null}
      </View>

      {showArrow
        ? arrowIcon ?? (
            <RightArrowIcon width={24} height={24} style={styles.arrowIcon} />
          )
        : null}
    </Pressable>
  );
};

export default CommonCard;
