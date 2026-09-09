import React from 'react';
import { render, screen } from '@testing-library/react-native';
import QuestionCardsSkeleton from './QuestionCardsSkeleton';

describe('QuestionCardsSkeleton', () => {
  it('renders a loading placeholder for each question card', () => {
    render(<QuestionCardsSkeleton />);

    expect(screen.getByTestId('questions-skeleton')).toBeOnTheScreen();
    expect(screen.getAllByTestId('skeleton')).toHaveLength(2);
  });
});
