import React from 'react';
import { render, screen } from '@testing-library/react-native';
import CategoryCardsSkeleton from './CategoryCardsSkeleton';

describe('CategoryCardsSkeleton', () => {
  it('renders a loading placeholder for each category card', () => {
    render(<CategoryCardsSkeleton />);

    expect(screen.getByTestId('categories-skeleton')).toBeOnTheScreen();
    expect(screen.getAllByTestId('skeleton')).toHaveLength(4);
  });
});
