import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import usePageContainer from '@/hooks/usePageContainer';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import Typography from './typography';
import { Link } from 'expo-router';
import Button from './button';

export default function ErrorScreen({
  msg = 'Something went wrong',
}: {
  msg?: string;
}) {
  const { resetPagePartStyles } = usePageContainer();
  const { styles, theme } = useStyles(RedirectScreenStyles);

  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: theme.Colors.red_100,
    },
    viewBottomContainerStyles: {
      backgroundColor: theme.Colors.red_100,
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
      <Typography color={theme.Colors.light_100} center type='TitleX'>
        {msg}
      </Typography>
      <Link href='/' asChild>
        <Button text='Back to Home' size='small' variant='secondary' />
      </Link>
    </View>
  );
}

const RedirectScreenStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.red_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

