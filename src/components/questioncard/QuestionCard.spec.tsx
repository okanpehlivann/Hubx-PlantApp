import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import QuestionCard from './QuestionCard';

describe('QuestionCard', () => {
  it('renders an accessible button and invokes onPress', () => {
    const onPress = jest.fn();

    render(
      <QuestionCard
        title="How often should I water it?"
        imageUri="https://example.test/watering.jpg"
        onPress={onPress}
      />,
    );

    const card = screen.getByRole('button', {
      name: 'How often should I water it?',
    });
    expect(card).toBeOnTheScreen();

    fireEvent.press(card);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when no link handler is provided', () => {
    render(
      <QuestionCard
        title="Plant care basics"
        imageUri="https://example.test/care.jpg"
      />,
    );

    const card = screen.getByLabelText('Plant care basics');

    expect(card).toBeDisabled();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
