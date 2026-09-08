/**
 * @format
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from './App';

jest.mock('@navigation', () => {
  const ReactModule = require('react');
  const { Text } = require('react-native');
  const { useSelector } = require('react-redux');

  return {
    RootNavigator: ({ startAtHome = false }: { startAtHome?: boolean }) => {
      const isLoading = useSelector(
        (state: { app: { isLoading: boolean } }) => state.app.isLoading,
      );

      return ReactModule.createElement(
        Text,
        { accessibilityRole: 'text' },
        `${startAtHome ? 'home' : 'default'}:${
          isLoading ? 'loading' : 'ready'
        }`,
      );
    },
  };
});

jest.mock('@components', () => ({
  AppErrorFallback: () => null,
}));

describe('App', () => {
  it('renders the initial navigator state through the Redux provider', () => {
    render(<App />);

    expect(screen.getByRole('text')).toHaveTextContent('default:loading');
  });
});
