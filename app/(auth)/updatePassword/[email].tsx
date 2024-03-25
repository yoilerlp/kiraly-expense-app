import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { Text, View } from 'react-native';
import React from 'react';

// UI
import { Input, Button } from '@/components';

import { UserService } from '@/services';

export default function SetPasswordScreen() {
  const router = useRouter();

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const { control, formState, handleSubmit, watch } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      otp: '',
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: UserService.UpdatePassword,
    onSuccess: async (data) => {
      Toast.show({
        type: 'success',
        text1: data.message,
      });
      router.replace('/(auth)/login');
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  const { styles } = useStyles(setPasswordStyle);

  const { errors } = formState;

  const password = watch('password');

  const submit = (value: any) => {
    delete value.confirmPassword;
    updatePasswordMutation.mutate({
      email,
      ...value,
    });
  };

  if (!email) {
    return <Redirect href='/(auth)/forgotPassword' />;
  }

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>
        Enter the code sent to your email address and set a new password
      </Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name='otp'
          rules={{
            required: 'OTP is required',
            minLength: {
              value: 6,
              message: 'OTP must be 6 digits',
            },
            maxLength: {
              value: 6,
              message: 'OTP must be 6 digits',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'OTP must be a number',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='OTP code'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.otp?.message}
              keyboardType='numeric'
              maxLength={6}
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
        <Controller
          control={control}
          name='confirmPassword'
          rules={{
            required: 'Password is required',
            validate: (val: string) => {
              if (val !== password) {
                return 'Passwords do not match';
              }
              return true;
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Retype new password'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isPassword
              error={errors.confirmPassword?.message}
            />
          )}
        />
        <Button
          isLoading={updatePasswordMutation.isPending}
          disabled={updatePasswordMutation.isPending}
          onPress={handleSubmit(submit)}
          style={{ marginTop: 16 }}
          size='full'
          text='Continue'
        />
      </View>
    </View>
  );
}

const setPasswordStyle = createStyleSheet((theme) => ({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  title: {
    ...theme.Typography.Title3,
    color: theme.Colors.dark_100,
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    gap: 24,
    marginBottom: 34,
  },
}));

