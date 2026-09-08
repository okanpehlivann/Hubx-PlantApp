import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CategoryCard from './CategoryCard';

describe('CategoryCard', () => {
  it('renders its title and invokes onPress when interactive', () => {
    const onPress = jest.fn();

    render(
      <CategoryCard
        title="Indoor plants"
        imageUri="https://example.test/indoor.jpg"
        onPress={onPress}
      />,
    );

    const card = screen.getByRole('button', { name: 'Indoor plants' });
    expect(screen.getByText('Indoor plants')).toBeOnTheScreen();

    fireEvent.press(card);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when no press handler is provided', () => {
    render(
      <CategoryCard
        title="Outdoor plants"
        imageUri="https://example.test/outdoor.jpg"
      />,
    );

    const card = screen.getByLabelText('Outdoor plants');

    expect(card).toBeDisabled();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
