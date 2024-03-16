import { View, Text, TextInput } from 'react-native';
import React, { ComponentProps } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

type InputProps = ComponentProps<typeof TextInput> & {
  isPassword?: boolean;
  error?: string;
};
export default function Input({
  isPassword = false,
  error,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const { styles, theme } = useStyles(inputStyles);

  const showPasswordText = isPassword ? !isPasswordVisible : false;

  return (
    <View>
      <View
        style={{
          ...(props.style || ({} as any)),
          ...styles.container(isFocused),
        }}
      >
        <TextInput
          {...props}
          placeholderTextColor={theme.Colors.light_20}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={showPasswordText}
          autoCapitalize='none'
        />
        {isPassword && (
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color={theme.Colors.light_20}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        )}
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
}

const inputStyles = createStyleSheet((theme) => ({
  container(isFocused: boolean) {
    return {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
      padding: 16,
      height: 56,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isFocused ? theme.Colors.violet_100 : theme.Colors.light_60,
      backgroundColor: theme.Colors.light_100,
    };
  },
  input: {
    ...theme.Typography.Body1,
    color: theme.Colors.dark_100,
    flexGrow: 1,
  },
  errorMessage: {
    ...theme.Typography.Tiny,
    color: theme.Colors.red_80,
    marginTop: 4,
    paddingLeft: 8,
  },
}));

