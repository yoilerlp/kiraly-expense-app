import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import usePageContainer from '@/hooks/usePageContainer';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';

export default function LoadingScreen() {
  const { resetPagePartStyles } = usePageContainer();
  const { styles, theme } = useStyles(RedirectScreenStyles);

  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: theme.Colors.violet_100,
    },
    viewBottomContainerStyles: {
      backgroundColor: theme.Colors.violet_100,
    },
    statusBarProps: {
      style: 'light',
    },
  });

  useEffect(() => {
    return () => {
      resetPagePartStyles();
    };
  }, []);

  return (
    <View style={styles.container}>
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

