import React from 'react';
import { Animated } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import LaunchScreen from './LaunchScreen';

type AnimationMock = {
  start: jest.Mock;
  stop: jest.Mock;
};

const asAnimation = (): AnimationMock => ({
  start: jest.fn(),
  stop: jest.fn(),
});

describe('LaunchScreen', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the branding and completes after the enter and exit animations', () => {
    const onComplete = jest.fn();
    const enterAnimation = asAnimation();
    const exitAnimation = asAnimation();
    const sequenceAnimation = asAnimation();

    jest
      .spyOn(Animated, 'parallel')
      .mockReturnValueOnce(
        enterAnimation as unknown as ReturnType<typeof Animated.parallel>,
      )
      .mockReturnValueOnce(
        exitAnimation as unknown as ReturnType<typeof Animated.parallel>,
      );
    jest
      .spyOn(Animated, 'sequence')
      .mockReturnValue(
        sequenceAnimation as unknown as ReturnType<typeof Animated.sequence>,
      );

    render(<LaunchScreen onComplete={onComplete} />);

    expect(screen.getByText('PlantApp')).toBeOnTheScreen();
    expect(screen.getByText('Your plants, thriving.')).toBeOnTheScreen();
    expect(enterAnimation.start).toHaveBeenCalledWith(expect.any(Function));

    const enterResult = enterAnimation.start.mock.calls[0][0] as (result: {
      finished: boolean;
    }) => void;
    enterResult({ finished: true });

    expect(sequenceAnimation.start).toHaveBeenCalledWith(expect.any(Function));

    const exitResult = sequenceAnimation.start.mock.calls[0][0] as (result: {
      finished: boolean;
    }) => void;
    exitResult({ finished: true });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('stops active animations when it unmounts', () => {
    const enterAnimation = asAnimation();
    const exitAnimation = asAnimation();

    jest
      .spyOn(Animated, 'parallel')
      .mockReturnValueOnce(
        enterAnimation as unknown as ReturnType<typeof Animated.parallel>,
      )
      .mockReturnValueOnce(
        exitAnimation as unknown as ReturnType<typeof Animated.parallel>,
      );
    jest
      .spyOn(Animated, 'sequence')
      .mockReturnValue(
        asAnimation() as unknown as ReturnType<typeof Animated.sequence>,
      );

    const { unmount } = render(<LaunchScreen onComplete={jest.fn()} />);

    unmount();

    expect(enterAnimation.stop).toHaveBeenCalledTimes(1);
    expect(exitAnimation.stop).toHaveBeenCalledTimes(1);
  });
});
