import React from 'react';
import { render, screen } from '@testing-library/react-native';
import GradientText from './GradientText';

describe('GradientText', () => {
  it('renders the title with the supplied gradient colors', () => {
    render(
      <GradientText
        colors={['rgba(229, 201, 144, 1)', 'rgba(228, 176, 70, 1)']}
        style={{
          fontFamily: 'SF-Pro-Text-Bold',
          fontSize: 16,
          lineHeight: 21,
        }}
      >
        FREE Premium Available
      </GradientText>,
    );

    expect(screen.getByText('FREE Premium Available')).toBeOnTheScreen();
  });
});
