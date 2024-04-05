import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

import { Button } from '@/components';

export default function SetupAccount() {
  const { styles } = useStyles(setupAccountStyles);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Let’s setup your account!</Text>
        <Text style={styles.description}>
          Account can be your bank, credit card or your wallet.
        </Text>
      </View>
      <Link href='/(auth)/addAccount' asChild>
        <Button text='Let’s go' size='full' />
      </Link>
    </View>
  );
}

const setupAccountStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    ...theme.Typography.Body1,
    color: theme.Colors.dark_50,
    fontSize: 36,
    marginTop: 47,
    marginBottom: 37,
  },
  description: {
    ...theme.Typography.Body3,
    color: theme.Colors.dark_50,
  },
}));

