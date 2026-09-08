import React from 'react';
import { render, screen } from '@testing-library/react-native';
import GardenScreen from './GardenScreen';

describe('GardenScreen', () => {
  it('renders the garden heading and saved-plants message', () => {
    render(<GardenScreen />);

    expect(screen.getByText('My Garden')).toBeOnTheScreen();
    expect(
      screen.getByText(
        'Your saved plants and care routine will be available here.',
      ),
    ).toBeOnTheScreen();
  });
});
