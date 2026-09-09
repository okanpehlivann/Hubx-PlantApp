import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  type LayoutChangeEvent,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@constants';
import ErrorState from '../errorstate';
import styles from './CustomScreen.styles';
import type { CustomScreenProps } from '.';

export const CustomScreen: React.FC<CustomScreenProps> = ({
  children,
  style,
  contentContainerStyle,
  backgroundColor,
  statusBarStyle = 'dark-content',
  edges = ['top', 'bottom'],
  scroll = false,
  loading = false,
  error,
  errorMessage = 'Hay aksi, bir hata oluştu.',
  errorIcon,
  refreshing = false,
  onRefresh,
  refreshColor = COLORS.primary,
}) => {
  const [scrollViewportHeight, setScrollViewportHeight] = useState(0);
  const Container = scroll ? ScrollView : View;

  const handleScrollLayout = (event: LayoutChangeEvent) => {
    setScrollViewportHeight(Math.ceil(event.nativeEvent.layout.height));
  };

  const containerProps = scroll
    ? {
        contentContainerStyle: [
          styles.content,
          contentContainerStyle,
          onRefresh &&
            scrollViewportHeight > 0 && {
              minHeight: scrollViewportHeight + 1,
            },
        ],
        onLayout: handleScrollLayout,
        showsVerticalScrollIndicator: false,
        alwaysBounceVertical: true,
        overScrollMode: 'always' as const,
        keyboardDismissMode: 'on-drag' as const,
        keyboardShouldPersistTaps: 'handled' as const,
        onScrollBeginDrag: () => Keyboard.dismiss(),
        refreshControl: onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={refreshColor}
            colors={[refreshColor]}
          />
        ) : undefined,
      }
    : { style: [styles.content, contentContainerStyle] };

  const content = loading ? (
    <View style={styles.stateContainer}>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        accessibilityLabel="Loading"
      />
    </View>
  ) : error ? (
    <ErrorState message={errorMessage} icon={errorIcon} />
  ) : (
    children
  );

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
      <Container {...containerProps}>{content}</Container>
    </SafeAreaView>
  );
};
