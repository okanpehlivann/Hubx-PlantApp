import React from 'react';
import { FlatList } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { SCREEN_NAMES } from '@constants';
import OnboardingScreen from './OnboardingScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@hooks', () => ({
  useArtworkLayout: () => ({
    frameStyle: { height: 550, width: 375 },
    imageStyle: { height: 683, top: -20, width: 375 },
    onLayout: jest.fn(),
    window: { height: 812, width: 375 },
  }),
}));

describe('OnboardingScreen', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('scrolls to the next slide when Continue is pressed', () => {
    const scrollToOffset = jest
      .spyOn(FlatList.prototype, 'scrollToOffset')
      .mockImplementation(() => undefined);
    render(<OnboardingScreen />);

    fireEvent.press(screen.getByRole('button', { name: 'Continue' }));

    expect(scrollToOffset).toHaveBeenCalledWith({
      animated: true,
      offset: 375,
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to Paywall after reaching the last slide', () => {
    jest
      .spyOn(FlatList.prototype, 'scrollToOffset')
      .mockImplementation(() => undefined);
    render(<OnboardingScreen />);

    fireEvent(screen.getByLabelText('Onboarding slides'), 'momentumScrollEnd', {
      nativeEvent: { contentOffset: { x: 375, y: 0 } },
    });
    fireEvent.press(screen.getByRole('button', { name: 'Continue' }));

    expect(mockNavigate).toHaveBeenCalledWith(SCREEN_NAMES.Paywall);
  });
});
