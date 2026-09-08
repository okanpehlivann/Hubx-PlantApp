import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import EmptyState from './EmptyState';

jest.mock('@assets', () => {
  const actual = jest.requireActual('@assets');

  return {
    ...actual,
    SearchIcon: () => {
      const { Text: MockText } = require('react-native');
      return <MockText testID="default-empty-icon">Search</MockText>;
    },
  };
});

describe('EmptyState', () => {
  it('renders the default search illustration and message', () => {
    render(
      <EmptyState
        title="No results found"
        description="Try a different plant name."
      />,
    );

    expect(screen.getByTestId('default-empty-icon')).toBeOnTheScreen();
    expect(screen.getByText('No results found')).toBeOnTheScreen();
    expect(screen.getByText('Try a different plant name.')).toBeOnTheScreen();
  });

  it('supports a custom illustration', () => {
    render(
      <EmptyState
        title="Nothing here"
        description="Come back later."
        icon={<Text testID="custom-empty-icon">Plant</Text>}
      />,
    );

    expect(screen.getByTestId('custom-empty-icon')).toBeOnTheScreen();
    expect(screen.queryByTestId('default-empty-icon')).toBeNull();
  });
});
