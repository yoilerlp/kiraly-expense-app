import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Checkbox, { CheckboxProps } from 'expo-checkbox';
import { View } from 'react-native';
import React from 'react';

export default function CustomCheckBox({
  ...props
}: CheckboxProps & { hasError?: boolean }) {
  const { styles, theme } = useStyles(checkBoxStyles);
  return (
    <View style={styles.container}>
      <Checkbox
        color={theme.Colors.violet_100}
        style={{
          backgroundColor: 'red',
          borderRadius: 4,
          ...(props.style || ({} as any)),
        }}
        {...props}
      />
    </View>
  );
}

const checkBoxStyles = createStyleSheet((theme) => ({
  container: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

