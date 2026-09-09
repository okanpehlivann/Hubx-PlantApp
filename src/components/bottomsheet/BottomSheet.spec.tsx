import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import BottomSheet from './BottomSheet';

describe('BottomSheet', () => {
  it('renders its title and content and closes from the Done action', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();

    render(
      <BottomSheet
        visible
        title="Terms of Use"
        content="These are the terms."
        onClose={onClose}
      />,
    );

    expect(screen.getByText('Terms of Use')).toBeOnTheScreen();
    expect(screen.getByText('These are the terms.')).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: 'Done' }));
    act(() => {
      jest.runAllTimers();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
