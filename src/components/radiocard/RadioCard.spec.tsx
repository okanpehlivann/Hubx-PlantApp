import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import RadioCard from './RadioCard';

describe('RadioCard', () => {
  it('exposes selection state and invokes onPress', () => {
    const onPress = jest.fn();

    render(
      <RadioCard
        title="1 Year"
        description="First 3 days free"
        badge="Save 50%"
        selected
        onPress={onPress}
      />,
    );

    const card = screen.getByRole('radio', { name: '1 Year' });

    expect(card).toBeChecked();
    expect(screen.getByText('First 3 days free')).toBeOnTheScreen();
    expect(screen.getByText('Save 50%')).toBeOnTheScreen();

    fireEvent.press(card);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('exposes an unselected state and omits an absent badge', () => {
    render(
      <RadioCard
        title="1 Month"
        description="$2.99/month"
        selected={false}
        onPress={jest.fn()}
      />,
    );

    expect(screen.getByRole('radio', { name: '1 Month' })).not.toBeChecked();
    expect(screen.getByText('$2.99/month')).toBeOnTheScreen();
    expect(screen.queryByText('Save 50%')).toBeNull();
  });
});
