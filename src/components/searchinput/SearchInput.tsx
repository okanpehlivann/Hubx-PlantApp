import React, { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import type { TextInputInstance } from 'react-native';
import { SearchIcon } from '@assets';
import { COLORS } from '@constants';
import CustomText from '../customtext';
import styles from './SearchInput.styles';
import { SearchInputProps } from '.';

export const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  containerStyle,
  inputStyle,
  clearable = false,
  value,
  placeholderTextColor = COLORS.textPlaceholder,
  onChangeText,
  ...props
}) => {
  const inputRef = useRef<TextInputInstance>(null);
  const [localValue, setLocalValue] = useState(value ?? '');

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const currentValue = value ?? localValue;

  const clearInput = () => {
    setLocalValue('');
    inputRef.current?.clear();
    onChangeText?.('');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>
        {icon ?? <SearchIcon width={20} height={20} />}
      </View>
      <TextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        {...props}
        value={value}
        onChangeText={text => {
          setLocalValue(text);
          onChangeText?.(text);
        }}
        style={[styles.input, inputStyle]}
        placeholderTextColor={placeholderTextColor}
        selectionColor={COLORS.primary}
      />
      {clearable && currentValue.length > 0 ? (
        <Pressable
          style={styles.clearButton}
          onPress={clearInput}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <CustomText
            variant="medium"
            size={20}
            lineHeight={20}
            color={COLORS.textSecondary}
          >
            ×
          </CustomText>
        </Pressable>
      ) : null}
    </View>
  );
};

export default SearchInput;
