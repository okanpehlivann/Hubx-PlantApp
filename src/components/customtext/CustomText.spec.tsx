import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { CustomText } from './CustomText';

describe('CustomText', () => {
  it('applies typography props and forwards native text props', () => {
    render(
      <CustomText
        variant="bold"
        size={18}
        lineHeight={24}
        letterSpacing={0.5}
        color="#123456"
        numberOfLines={1}
      >
        Plant care tips
      </CustomText>,
    );

    const text = screen.getByText('Plant care tips');

    expect(text).toHaveStyle({
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0.5,
      color: '#123456',
    });
    expect(text.props.numberOfLines).toBe(1);
  });
});
