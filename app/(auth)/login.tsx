import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Input from '@/components/input';
import Button from '@/components/button';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const { styles } = useStyles(loginStyles);
  return (
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <Input placeholder='Email' />
        <Input placeholder='Password' isPassword />
        <Button style={{ marginTop: 16 }} size='full' text='Login' />
      </View>
      <Link href='/forgotPassword' asChild>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </Link>
      <Text style={styles.dontHaveAccount}>
        Don’t have an account yet?{' '}
        <Link href='/register' asChild>
          <Text style={styles.singUpText}>Sign Up</Text>
        </Link>
      </Text>
    </View>
  );
}

const loginStyles = createStyleSheet((theme) => ({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  formContainer: {
    gap: 24,
    marginBottom: 34,
  },
  forgotPasswordText: {
    ...theme.Typography.Title3,
    color: theme.Colors.violet_100,
    textAlign: 'center',
    marginBottom: 38,
  },
  dontHaveAccount: {
    ...theme.Typography.Body2,
    color: theme.Colors.light_20,
    textAlign: 'center',
  },
  singUpText: {
    ...theme.Typography.Body2,
    color: theme.Colors.violet_100,
    textDecorationLine: 'underline',
  },
}));

