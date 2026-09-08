import React from 'react';
import { Linking } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useGetCategoriesQuery, useGetQuestionsQuery } from '@api';
import HomeScreen from './HomeScreen';

jest.mock('@api', () => ({
  useGetCategoriesQuery: jest.fn(),
  useGetQuestionsQuery: jest.fn(),
}));

jest.mock('@assets', () => ({
  IMAGES: {
    homeBackground: { uri: 'home-background.png' },
  },
  PremiumMessageIcon: 'PremiumMessageIcon',
  RightArrowIcon: 'RightArrowIcon',
  ScannerIcon: 'ScannerIcon',
  SearchIcon: 'SearchIcon',
  SpeedometerIcon: 'SpeedometerIcon',
  TabHomeIcon: 'TabHomeIcon',
}));

const mockUseGetCategoriesQuery = useGetCategoriesQuery as jest.Mock;
const mockUseGetQuestionsQuery = useGetQuestionsQuery as jest.Mock;

const emptyQueryResult = {
  data: { data: [] },
  error: undefined,
  isLoading: false,
};

describe('HomeScreen', () => {
  beforeEach(() => {
    mockUseGetCategoriesQuery.mockReset();
    mockUseGetQuestionsQuery.mockReset();
    mockUseGetCategoriesQuery.mockReturnValue(emptyQueryResult);
    mockUseGetQuestionsQuery.mockReturnValue(emptyQueryResult);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows loading while either home request is pending', () => {
    mockUseGetCategoriesQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(<HomeScreen />);

    expect(screen.getByLabelText('Loading')).toBeOnTheScreen();
    expect(screen.queryByText('Hi, plant lover!')).toBeNull();
  });

  it('shows an error state when a home request fails', () => {
    mockUseGetQuestionsQuery.mockReturnValue({
      data: undefined,
      error: { status: 500 },
      isLoading: false,
    });

    render(<HomeScreen />);

    expect(screen.getByRole('alert')).toBeOnTheScreen();
    expect(screen.getByText('Hay aksi, bir hata oluştu.')).toBeOnTheScreen();
    expect(screen.queryByText('Hi, plant lover!')).toBeNull();
  });

  it('orders successful results and opens the selected question link', () => {
    const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);

    mockUseGetQuestionsQuery.mockReturnValue({
      data: {
        data: [
          {
            id: 2,
            image_uri: 'https://example.com/question-b.jpg',
            order: 2,
            subtitle: 'Question B subtitle',
            title: 'Question B',
            uri: 'https://example.com/question-b',
          },
          {
            id: 1,
            image_uri: 'https://example.com/question-a.jpg',
            order: 1,
            subtitle: 'Question A subtitle',
            title: 'Question A',
            uri: 'https://example.com/question-a',
          },
        ],
      },
      error: undefined,
      isLoading: false,
    });
    mockUseGetCategoriesQuery.mockReturnValue({
      data: {
        data: [
          {
            id: 2,
            image: { url: 'https://example.com/category-b.jpg' },
            rank: 2,
            title: 'Category B',
          },
          {
            id: 1,
            image: { url: 'https://example.com/category-a.jpg' },
            rank: 1,
            title: 'Category A',
          },
        ],
      },
      error: undefined,
      isLoading: false,
    });

    render(<HomeScreen />);

    expect(
      screen
        .getAllByText(/^Question /)
        .map(question => question.props.children),
    ).toEqual(['Question A', 'Question B']);
    expect(
      screen
        .getAllByText(/^Category /)
        .map(category => category.props.children),
    ).toEqual(['Category A', 'Category B']);

    fireEvent.press(screen.getByRole('button', { name: 'Question A' }));

    expect(openURL).toHaveBeenCalledTimes(1);
    expect(openURL).toHaveBeenCalledWith('https://example.com/question-a');
  });
});
