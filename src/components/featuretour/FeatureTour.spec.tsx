import React, { type RefObject } from 'react';
import type { ViewInstance } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import FeatureTour, { type FeatureTourStep } from '.';

const createTargetRef = (
  x: number,
  y: number,
  width: number,
  height: number,
): RefObject<ViewInstance | null> =>
  ({
    current: {
      measureInWindow: (
        callback: (
          targetX: number,
          targetY: number,
          targetWidth: number,
          targetHeight: number,
        ) => void,
      ) => callback(x, y, width, height),
    },
  } as unknown as RefObject<ViewInstance | null>);

describe('FeatureTour', () => {
  const steps: FeatureTourStep[] = [
    {
      id: 'search',
      title: 'Find a plant',
      description: 'Search by plant name.',
      targetRef: createTargetRef(24, 100, 327, 44),
    },
    {
      id: 'scan',
      title: 'Identify a plant',
      description: 'Open the camera.',
      targetRef: createTargetRef(150, 680, 82, 82),
    },
  ];

  it('walks through each target and finishes', async () => {
    const onFinish = jest.fn();

    render(<FeatureTour visible steps={steps} onFinish={onFinish} />);
    fireEvent(screen.getByTestId('feature-tour-modal'), 'show');

    expect(await screen.findByText('Find a plant')).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: 'Next feature' }));

    expect(await screen.findByText('Identify a plant')).toBeOnTheScreen();

    fireEvent.press(
      screen.getByRole('button', { name: 'Finish feature tour' }),
    );

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('allows the tour to be skipped', async () => {
    const onSkip = jest.fn();

    render(
      <FeatureTour
        visible
        steps={steps}
        onFinish={jest.fn()}
        onSkip={onSkip}
      />,
    );

    fireEvent(screen.getByTestId('feature-tour-modal'), 'show');

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Skip feature tour' }),
      ).toBeOnTheScreen(),
    );

    fireEvent.press(
      screen.getByRole('button', { name: 'Skip feature tour' }),
    );

    expect(onSkip).toHaveBeenCalledTimes(1);
  });
});
