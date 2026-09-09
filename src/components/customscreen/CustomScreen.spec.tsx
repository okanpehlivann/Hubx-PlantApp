import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { CustomScreen } from './CustomScreen';

describe('CustomScreen', () => {
  it('renders children when there is no loading or error state', () => {
    render(
      <CustomScreen>
        <Text>Screen content</Text>
      </CustomScreen>,
    );

    expect(screen.getByText('Screen content')).toBeOnTheScreen();
    expect(screen.queryByLabelText('Loading')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows loading instead of both the error and children', () => {
    render(
      <CustomScreen loading error={new Error('Request failed')}>
        <Text>Screen content</Text>
      </CustomScreen>,
    );

    expect(screen.getByLabelText('Loading')).toBeOnTheScreen();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.queryByText('Screen content')).toBeNull();
  });

  it('shows the provided error message instead of children', () => {
    render(
      <CustomScreen
        error={new Error('Request failed')}
        errorMessage="Could not load plants"
      >
        <Text>Screen content</Text>
      </CustomScreen>,
    );

    expect(screen.getByRole('alert')).toBeOnTheScreen();
    expect(screen.getByText('Could not load plants')).toBeOnTheScreen();
    expect(screen.queryByLabelText('Loading')).toBeNull();
    expect(screen.queryByText('Screen content')).toBeNull();
  });

  it('keeps refreshable content scrollable when it is shorter than the viewport', () => {
    const { UNSAFE_getByType } = render(
      <CustomScreen scroll onRefresh={jest.fn()}>
        <Text>Short content</Text>
      </CustomScreen>,
    );

    fireEvent(UNSAFE_getByType(ScrollView), 'layout', {
      nativeEvent: {
        layout: { x: 0, y: 0, width: 375, height: 600 },
      },
    });

    const scrollView = UNSAFE_getByType(ScrollView);
    const contentStyle = StyleSheet.flatten(
      scrollView.props.contentContainerStyle,
    );

    expect(contentStyle.minHeight).toBe(601);
    expect(scrollView.props.overScrollMode).toBe('always');
  });
});
