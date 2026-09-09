import React from 'react';
import { View } from 'react-native';
import Skeleton from '../skeleton';
import styles from './QuestionCardsSkeleton.styles';

const QuestionCardsSkeleton = () => (
  <View testID="questions-skeleton" style={styles.row}>
    <Skeleton style={styles.card} />
    <Skeleton style={styles.card} />
  </View>
);

export default QuestionCardsSkeleton;
