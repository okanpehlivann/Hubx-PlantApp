import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PaywallScreen from './PaywallScreen';

const mockUnwrap = jest.fn(() => Promise.resolve());
const mockDispatch = jest.fn(() => ({ unwrap: mockUnwrap }));
const mockPersistOnboardingCompleted = jest.fn((isCompleted: boolean) => ({
  type: 'app/persistOnboardingCompleted',
  payload: isCompleted,
}));

jest.mock('@store', () => ({
  useAppDispatch: () => mockDispatch,
  persistOnboardingCompleted: (isCompleted: boolean) =>
    mockPersistOnboardingCompleted(isCompleted),
}));

describe('PaywallScreen', () => {
  it('selects the yearly plan by default and lets the user change it', () => {
    render(<PaywallScreen />);

    const monthlyPlan = screen.getByRole('radio', { name: '1 Month' });
    const yearlyPlan = screen.getByRole('radio', { name: '1 Year' });

    expect(yearlyPlan).toBeChecked();
    expect(monthlyPlan).not.toBeChecked();

    fireEvent.press(monthlyPlan);

    expect(monthlyPlan).toBeChecked();
    expect(yearlyPlan).not.toBeChecked();
  });

  it.each([['Close paywall'], ['Try free for 3 days']])(
    'persists completion when the user presses %s',
    buttonName => {
      render(<PaywallScreen />);

      fireEvent.press(screen.getByRole('button', { name: buttonName }));

      expect(mockPersistOnboardingCompleted).toHaveBeenCalledWith(true);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'app/persistOnboardingCompleted',
        payload: true,
      });
      expect(mockUnwrap).toHaveBeenCalledTimes(1);
    },
  );
});
