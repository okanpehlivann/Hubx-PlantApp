import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { WelcomeTitle } from './WelcomeTitle';

describe('WelcomeTitle', () => {
  it('exposes the visually split title as one accessible heading', () => {
    render(
      <WelcomeTitle
        prefix="Welcome to "
        highlight="PlantApp"
        suffix=" today"
      />,
    );

    expect(
      screen.getByRole('header', { name: 'Welcome to PlantApp today' }),
    ).toBeOnTheScreen();
  });
});
