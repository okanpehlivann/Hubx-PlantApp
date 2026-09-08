import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ScanScreen from './ScanScreen';

describe('ScanScreen', () => {
  it('renders the scan heading and identification message', () => {
    render(<ScanScreen />);

    expect(screen.getByText('Scan')).toBeOnTheScreen();
    expect(
      screen.getByText(
        'Scan a plant to identify it and learn how to care for it.',
      ),
    ).toBeOnTheScreen();
  });
});
