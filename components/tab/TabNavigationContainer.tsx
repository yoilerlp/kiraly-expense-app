import { View, Text } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function TabNavigationContainer({
  children,
}: PropsWithChildren) {
  const { styles } = useStyles(StylesSheet);

  return <View style={styles.container}>{children}</View>;
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 56,
    backgroundColor: theme.Colors.light_60,
    borderRadius: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    overflow: 'hidden',
  },
}));
