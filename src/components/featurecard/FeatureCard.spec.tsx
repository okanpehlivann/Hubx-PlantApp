import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import FeatureCard from './FeatureCard';

describe('FeatureCard', () => {
  it('renders the feature title, description, and icon', () => {
    render(
      <FeatureCard
        title="Unlimited"
        description="Plant identification"
        icon={<Text testID="feature-icon">Icon</Text>}
      />,
    );

    expect(screen.getByText('Unlimited')).toBeOnTheScreen();
    expect(screen.getByText('Plant identification')).toBeOnTheScreen();
    expect(screen.getByTestId('feature-icon')).toBeOnTheScreen();
  });

  it('renders without an optional icon', () => {
    render(<FeatureCard title="Faster" description="Process plants quickly" />);

    expect(screen.getByText('Faster')).toBeOnTheScreen();
    expect(screen.getByText('Process plants quickly')).toBeOnTheScreen();
    expect(screen.queryByTestId('feature-icon')).toBeNull();
  });
});
