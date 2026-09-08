import React from 'react';
import { Text, View } from 'react-native';
import { SearchIcon } from '@assets';
import { COLORS } from '@constants';
import CustomText from '../customtext';
import styles from './EmptyState.styles';
import type { EmptyStateProps } from '.';

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  testID = 'empty-state',
}) => {
  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.illustration} accessible={false}>
        <View style={styles.illustrationCircle}>
          {icon ?? <SearchIcon width={30} height={30} color={COLORS.primary} />}
        </View>
        <View style={[styles.leaf, styles.leftLeaf]} />
        <View style={[styles.leaf, styles.rightLeaf]} />
      </View>
      <CustomText
        variant="medium"
        size={18}
        lineHeight={24}
        color={COLORS.textPrimary}
        style={styles.title}
      >
        {title}
      </CustomText>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default EmptyState;
