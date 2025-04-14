import RNPickerSelect, {
  PickerSelectProps,
  Item,
} from 'react-native-picker-select';

import { View, Text, ViewStyle, Platform } from 'react-native';
import React, { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';
import { IconProps } from '../icon';

type SelectProps<T = string> = {
  value: T;
  onChange: (value: T, idx: number) => void;
  items: (Item & {
    value: T;
  })[];

  placeholder?: string;
  placeholderDefaultValue?: T;
  error?: string;

  style?: {
    viewContainer?: ViewStyle;
    inputContainer?: ViewStyle;
  };

  iconProps?: Partial<IconProps>;
  mode?: "dialog" | "dropdown" | undefined
} & Pick<PickerSelectProps, 'onOpen' | 'onClose' | 'disabled'>;

export default function Select<T>({
  value,
  onChange,
  items,
  placeholder = 'Select',
  error,
  onOpen,
  onClose,
  disabled,
  style: customStyle = {},
  iconProps = {},
  placeholderDefaultValue,
  mode = "dialog"
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const { styles, theme } = useStyles(selectStyles);

  return (
    <View style={styles.container}>
      <RNPickerSelect
        fixAndroidTouchableBug
        onOpen={() => {
          setIsOpen(true);
          onOpen && onOpen();
        }}
        onClose={(param) => {
          setIsOpen(false);
          onClose && onClose(param);
        }}
        placeholder={{
          value: placeholderDefaultValue ?? '',
          label: placeholder,
          inputLabel: placeholder,
          color: theme.Colors.light_20,
        }}
        pickerProps={{
          mode
        }}
        Icon={
          Platform.OS === 'android'
            ? undefined
            : () => (
                <Ionicons
                  name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={iconProps?.size || 32}
                  color={iconProps?.color || theme.Colors.light_20}
                />
              )
        }
        style={{
          viewContainer: [styles.viewContainer, customStyle?.viewContainer],
          inputIOS: styles.input,
          inputAndroid: styles.input,
          inputIOSContainer: [
            styles.inputContainer,
            customStyle?.inputContainer,
          ],
          inputAndroidContainer: [
            styles.inputContainer,
            customStyle?.inputContainer,
          ],
          iconContainer: styles.iconContainer,
          done: styles.doneText,
          placeholder: {
            ...styles.input,
            ...styles.placeholder,
          },
        }}
        value={value}
        items={items}
        onValueChange={onChange}
        disabled={disabled}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
}

const selectStyles = createStyleSheet((theme) => ({
  container: {},
  viewContainer: {
    borderRadius: 16,
    padding: Platform.select({ ios: 16, default: 0 }),
    height: 56,
    borderWidth: 1,
    borderColor: theme.Colors.light_60,
    minWidth: Platform.select({ android: 160, default: 0 }),
  },
  placeholder: {
    color: theme.Colors.light_20,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  input: {
    ...theme.Typography.Body1,
    color: theme.Colors.dark_100,
    flexGrow: 1,
  },
  iconContainer: {},
  doneText: {
    ...theme.Typography.Body1,
    color: theme.Colors.violet_100,
  },
  errorMessage: {
    ...theme.Typography.Tiny,
    color: theme.Colors.red_80,
    marginTop: 4,
    paddingLeft: 8,
  },
}));
