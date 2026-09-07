import React from 'react';
import { TextInput, View } from 'react-native';
import { SearchIcon } from '@assets';
import { COLORS } from '@constants';
import styles from './SearchInput.styles';
import { SearchInputProps } from '.';

export const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  containerStyle,
  inputStyle,
  placeholderTextColor = COLORS.textPlaceholder,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>
        {icon ?? <SearchIcon width={20} height={20} />}
      </View>
      <TextInput
        {...props}
        style={[styles.input, inputStyle]}
        placeholderTextColor={placeholderTextColor}
        selectionColor={COLORS.primary}
      />
    </View>
  );
};

export default SearchInput;
