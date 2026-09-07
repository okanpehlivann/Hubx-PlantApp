import React from 'react';
import { StatusBar, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './CustomScreen.styles';
import { CustomScreenProps } from '.';

export const CustomScreen: React.FC<CustomScreenProps> = ({
  children,
  style,
  contentContainerStyle,
  backgroundColor,
  statusBarStyle = 'dark-content',
  edges = ['top', 'bottom'],
  scroll = false,
}) => {
  const Container = scroll ? ScrollView : View;
  const containerProps = scroll
    ? {
        contentContainerStyle: [styles.content, contentContainerStyle],
        showsVerticalScrollIndicator: false,
      }
    : { style: [styles.content, contentContainerStyle] };

  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.container,
        backgroundColor ? { backgroundColor } : null,
        style,
      ]}
    >
      <StatusBar barStyle={statusBarStyle} />
      <Container {...containerProps}>{children}</Container>
    </SafeAreaView>
  );
};
