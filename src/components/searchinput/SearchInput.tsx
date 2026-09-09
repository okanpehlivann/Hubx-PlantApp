import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, TextInput, View } from 'react-native';
import type { TextInputInstance } from 'react-native';
import { MicIcon, SearchIcon } from '@assets';
import { COLORS } from '@constants';
import { useSpeechToText } from '@hooks';
import CustomText from '../customtext';
import styles from './SearchInput.styles';
import { SearchInputProps } from '.';

export const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  inputContainerRef,
  voiceButtonRef,
  containerStyle,
  inputStyle,
  clearable = false,
  voiceEnabled = false,
  speechLocale,
  onVoiceError,
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
  const voiceBaseValueRef = useRef('');
  const voiceActiveRef = useRef(false);
  const voicePulse = useRef(new Animated.Value(0)).current;
  const voicePulseAnimationRef = useRef<Animated.CompositeAnimation | null>(null);
  const [isVoicePressing, setIsVoicePressing] = useState(false);

  const startVoiceFeedback = () => {
    setIsVoicePressing(true);
    voicePulseAnimationRef.current?.stop();
    voicePulse.setValue(0);
    voicePulseAnimationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(voicePulse, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(voicePulse, {
          toValue: 0,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    voicePulseAnimationRef.current.start();
  };

  const stopVoiceFeedback = () => {
    setIsVoicePressing(false);
    voicePulseAnimationRef.current?.stop();
    voicePulseAnimationRef.current = null;
    Animated.timing(voicePulse, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    return () => {
      voicePulseAnimationRef.current?.stop();
    };
  }, [voicePulse]);

  const updateValue = useCallback(
    (nextValue: string) => {
      setLocalValue(nextValue);
      onChangeText?.(nextValue);
    },
    [onChangeText],
  );

  const handleVoiceText = useCallback(
    (text: string) => {
      const baseValue = voiceBaseValueRef.current.trim();
      const spokenValue = text.trim();
      updateValue([baseValue, spokenValue].filter(Boolean).join(' '));
    },
    [updateValue],
  );

  const { isListening, startListening, stopListening } = useSpeechToText({
    enabled: voiceEnabled,
    locale: speechLocale,
    onPartialResults: handleVoiceText,
    onResults: handleVoiceText,
    onError: onVoiceError,
  });

  const clearInput = () => {
    updateValue('');
    inputRef.current?.clear();
  };

  const inputContent = (
    <View
      ref={inputContainerRef}
      collapsable={inputContainerRef ? false : undefined}
      style={[
        styles.container,
        voiceEnabled ? styles.inputWithVoice : containerStyle,
      ]}
    >
      <View style={styles.iconContainer}>
        {icon ?? <SearchIcon width={20} height={20} />}
      </View>
      <TextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        {...props}
        value={value}
        onChangeText={updateValue}
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

  if (!voiceEnabled) {
    return inputContent;
  }

  return (
    <View style={[styles.voiceRow, containerStyle]}>
      {inputContent}
      <Pressable
        ref={voiceButtonRef}
        collapsable={false}
        style={({ pressed }) => [
          styles.voiceButton,
          (pressed || isListening || isVoicePressing) && styles.voiceButtonActive,
        ]}
        onPressIn={() => {
          if (voiceActiveRef.current) {
            return;
          }

          voiceActiveRef.current = true;
          voiceBaseValueRef.current = currentValue;
          startVoiceFeedback();
          startListening().catch(() => undefined);
        }}
        onPressOut={() => {
          if (!voiceActiveRef.current) {
            return;
          }

          voiceActiveRef.current = false;
          stopVoiceFeedback();
          stopListening().catch(() => undefined);
        }}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Search by voice"
        accessibilityState={{ busy: isListening }}
      >
        {isVoicePressing ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.voicePulse,
              {
                opacity: voicePulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 0],
                }),
                transform: [
                  {
                    scale: voicePulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.55],
                    }),
                  },
                ],
              },
            ]}
          />
        ) : null}
        {MicIcon ? <MicIcon width={20} height={20} /> : null}
        {isVoicePressing ? <View pointerEvents="none" style={styles.voiceListeningDot} /> : null}
      </Pressable>
    </View>
  );
};

export default SearchInput;
