import RNPickerSelect, {
  PickerSelectProps,
  Item,
} from 'react-native-picker-select';

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';

type SelectProps<T = string> = {
  value: T;
  onChange: (value: T, idx: number) => void;
  items: (Item & {
    value: T;
  })[];

  placeholder?: string;
  error?: string;
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
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const { styles, theme } = useStyles(selectStyles);

  return (
    <View>
      <RNPickerSelect
        onOpen={() => {
          setIsOpen(true);
          onOpen && onOpen();
        }}
        onClose={(param) => {
          setIsOpen(false);
          onClose && onClose(param);
        }}
        placeholder={{
          value: '',
          label: placeholder,
          inputLabel: placeholder,
          color: theme.Colors.light_20,
        }}
        Icon={() => (
          <Ionicons
            name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={32}
            color={theme.Colors.light_20}
          />
        )}
        style={{
          viewContainer: styles.viewContainer,
          inputIOS: styles.input,
          inputAndroid: styles.input,
          inputIOSContainer: styles.inputContainer,
          inputAndroidContainer: styles.inputContainer,
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
  viewContainer: {
    borderRadius: 16,
    padding: 16,
    height: 56,
    borderWidth: 1,
    borderColor: theme.Colors.light_60,
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