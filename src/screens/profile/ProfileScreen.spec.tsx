import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen';

describe('ProfileScreen', () => {
  it('renders the profile heading and settings message', () => {
    render(<ProfileScreen />);

    expect(screen.getByText('Profile')).toBeOnTheScreen();
    expect(
      screen.getByText('Manage your profile and preferences here.'),
    ).toBeOnTheScreen();
  });
});
