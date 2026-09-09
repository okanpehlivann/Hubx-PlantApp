import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { LEGAL_CONTENT, SCREEN_NAMES } from '@constants';
import GetStartedScreen from './GetStartedScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@hooks', () => ({
  useArtworkLayout: () => ({
    frameStyle: { height: 499, width: 375 },
    imageStyle: { height: 547, top: -5, width: 375 },
    onLayout: jest.fn(),
  }),
}));

describe('GetStartedScreen', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('navigates to onboarding from the Get Started action', () => {
    render(<GetStartedScreen />);

    fireEvent.press(screen.getByRole('button', { name: 'Get Started' }));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(SCREEN_NAMES.Onboarding);
  });

  it.each([
    ['Terms of Use', 'terms'],
    ['Privacy Policy', 'privacy'],
  ] as const)('opens the %s bottom sheet', (label, document) => {
    render(<GetStartedScreen />);

    fireEvent.press(screen.getByRole('button', { name: label }));

    expect(screen.getAllByText(LEGAL_CONTENT[document].title)).toHaveLength(2);
    expect(
      screen.getByText(LEGAL_CONTENT[document].content),
    ).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: 'Done' }));

    expect(
      screen.queryByText(LEGAL_CONTENT[document].content),
    ).not.toBeOnTheScreen();
  });
});
