import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function LoadingScreen() {
  const { styles, theme } = useStyles(RedirectScreenStyles);
  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <ActivityIndicator size='large' color={theme.Colors.light_100} />
    </View>
  );
}

const RedirectScreenStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.violet_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

