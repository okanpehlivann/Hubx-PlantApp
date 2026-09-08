import React from 'react';
import { render, screen } from '@testing-library/react-native';
import DiagnoseScreen from './DiagnoseScreen';

describe('DiagnoseScreen', () => {
  it('renders the diagnosis heading and availability message', () => {
    render(<DiagnoseScreen />);

    expect(screen.getByText('Diagnose')).toBeOnTheScreen();
    expect(
      screen.getByText('Plant health analysis will be available here.'),
    ).toBeOnTheScreen();
  });
});
