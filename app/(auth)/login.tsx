import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { Link, router } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';

import { setStorageItemAsync } from '@/utils/storage';
import { Input, Button } from '@/components';
import { LoginUser } from '@/services/user';

export default function LoginScreen() {
  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { errors } = formState;
  const { styles } = useStyles(loginStyles);

  const loginMutation = useMutation({
    mutationFn: LoginUser,
    onSuccess: async (data) => {
      Toast.show({
        type: 'success',
        text1: 'Login successfully',
      });
      await setStorageItemAsync('token', data.access_token);
      await setStorageItemAsync('user', JSON.stringify(data.user));
      router.replace('/(home)');
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    loginMutation.mutate(data);
  };
  return (
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name='email'
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Email'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType='email-address'
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          rules={{
            required: 'Password is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Password'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isPassword
              error={errors.password?.message}
            />
          )}
        />

        <Button
          isLoading={loginMutation.isPending}
          disabled={loginMutation.isPending}
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 16 }}
          size='full'
          text='Login'
        />
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

