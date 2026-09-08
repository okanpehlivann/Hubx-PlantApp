import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { SCREEN_NAMES } from '@constants';
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
});
