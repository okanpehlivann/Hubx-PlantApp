import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('renders an accessible shimmering placeholder', () => {
    render(<Skeleton testID="plant-skeleton" />);

    expect(screen.getByTestId('plant-skeleton')).toBeOnTheScreen();
    expect(screen.getByLabelText('Loading content')).toBeOnTheScreen();
  });
});
