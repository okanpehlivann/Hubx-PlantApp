import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { CustomButton } from './CustomButton';

describe('CustomButton', () => {
  it('exposes an accessible button and calls onPress', () => {
    const onPress = jest.fn();

    render(<CustomButton title="Continue" onPress={onPress} />);

    const button = screen.getByRole('button', { name: 'Continue' });
    expect(button).toBeEnabled();
    expect(button).not.toBeBusy();

    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('keeps its accessible name but disables interaction while loading', () => {
    const onPress = jest.fn();

    render(<CustomButton title="Continue" onPress={onPress} loading />);

    const button = screen.getByRole('button', { name: 'Continue' });
    expect(button).toBeDisabled();
    expect(button).toBeBusy();
    expect(screen.queryByText('Continue')).toBeNull();

    fireEvent.press(button);

    expect(onPress).not.toHaveBeenCalled();
  });
});
