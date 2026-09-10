import React from 'react';
import { Animated } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import AppErrorFallback from './AppErrorFallback';

describe('AppErrorFallback', () => {
  const animations: Array<{ start: jest.Mock; stop: jest.Mock }> = [];

  beforeEach(() => {
    jest.spyOn(Animated, 'loop').mockImplementation(() => {
      const animation = {
        start: jest.fn(),
        stop: jest.fn(),
        reset: jest.fn(),
      };
      animations.push(animation);

      return animation as unknown as ReturnType<typeof Animated.loop>;
    });
  });

  afterEach(() => {
    animations.length = 0;
  });

  it('explains the failure and lets the user return home', () => {
    const onGoHome = jest.fn();
    const { unmount } = render(<AppErrorFallback onGoHome={onGoHome} />);

    expect(screen.getByText('Something went wrong')).toBeOnTheScreen();
    expect(
      screen.getByText(/The app encountered an unexpected error/),
    ).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: 'Go to Home' }));

    expect(onGoHome).toHaveBeenCalledTimes(1);
    expect(animations).toHaveLength(2);
    animations.forEach(animation => expect(animation.start).toHaveBeenCalled());

    unmount();

    animations.forEach(animation => expect(animation.stop).toHaveBeenCalled());
  });
});
