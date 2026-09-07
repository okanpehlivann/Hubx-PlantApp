import React from 'react';
import { CustomScreen, CustomText } from '@components';
import styles from './HomeScreen.styles';

export default function HomeScreen() {
  return (
    <CustomScreen contentContainerStyle={styles.container}>
      <CustomText>Home Screen</CustomText>
    </CustomScreen>
  );
}
