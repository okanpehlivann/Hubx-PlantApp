import React from 'react';
import { TextInput } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('forwards text input behaviour and renders a custom icon', () => {
    const onChangeText = jest.fn();

    render(
      <SearchInput
        placeholder="Search for plants"
        onChangeText={onChangeText}
        icon={<TextInput testID="custom-search-icon" value="" />}
      />,
    );

    const input = screen.getByPlaceholderText('Search for plants');

    fireEvent.changeText(input, 'Monstera');

    expect(onChangeText).toHaveBeenCalledWith('Monstera');
    expect(screen.getByTestId('custom-search-icon')).toBeOnTheScreen();
  });

  it('uses the provided placeholder text color', () => {
    render(<SearchInput placeholder="Search" placeholderTextColor="#ff00aa" />);

    expect(screen.getByPlaceholderText('Search')).toHaveProp(
      'placeholderTextColor',
      '#ff00aa',
    );
  });
});
