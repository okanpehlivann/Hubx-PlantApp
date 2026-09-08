import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CommonCard from './CommonCard';

describe('CommonCard', () => {
  it('renders content and invokes onPress for an interactive card', () => {
    const onPress = jest.fn();

    render(
      <CommonCard
        title="Premium available"
        description="Tap to upgrade"
        icon={<Text testID="card-icon">Icon</Text>}
        onPress={onPress}
      />,
    );

    expect(screen.getByText('Premium available')).toBeOnTheScreen();
    expect(screen.getByText('Tap to upgrade')).toBeOnTheScreen();
    expect(screen.getByTestId('card-icon')).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: /Premium available/ }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a custom arrow only when the arrow is requested', () => {
    render(
      <CommonCard
        title="Plans"
        showArrow
        arrowIcon={<Text testID="custom-arrow">→</Text>}
      />,
    );

    expect(screen.getByText('Plans')).toBeOnTheScreen();
    expect(screen.getByTestId('custom-arrow')).toBeOnTheScreen();
    expect(screen.queryByText('→')).toBeOnTheScreen();
  });
});
