import React from 'react';
import { View } from 'react-native';
import Skeleton from '../skeleton';
import styles from './CategoryCardsSkeleton.styles';

const CategoryCardsSkeleton = () => (
  <View testID="categories-skeleton" style={styles.grid}>
    <Skeleton style={styles.card} />
    <Skeleton style={styles.card} />
    <Skeleton style={styles.card} />
    <Skeleton style={styles.card} />
  </View>
);

export default CategoryCardsSkeleton;
