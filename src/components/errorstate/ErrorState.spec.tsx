import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import ErrorState from './ErrorState';

describe('ErrorState', () => {
  it('shows the default message in an accessible alert', () => {
    render(<ErrorState />);

    expect(screen.getByRole('alert')).toBeOnTheScreen();
    expect(screen.getByText('Oops, something went wrong.')).toBeOnTheScreen();
    expect(screen.getByText('!')).toBeOnTheScreen();
  });

  it('supports a custom message and icon', () => {
    render(
      <ErrorState
        message="Unable to load plants"
        icon={<Text testID="error-icon">Error icon</Text>}
      />,
    );

    expect(screen.getByText('Unable to load plants')).toBeOnTheScreen();
    expect(screen.getByTestId('error-icon')).toBeOnTheScreen();
    expect(screen.queryByText('!')).toBeNull();
  });
});
