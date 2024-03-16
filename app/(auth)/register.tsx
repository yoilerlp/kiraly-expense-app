import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useForm, Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

import { Button, CustomCheckBox, Input } from '@/components';

type RegisterData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

export default function Register() {
  const { control, formState, handleSubmit } = useForm<RegisterData>({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      acceptTerms: false,
    },
  });
  const { styles } = useStyles(registerStyles);

  const { errors } = formState;

  const onSubmit = (data: RegisterData) => {
    console.log(data);
  };
  return (
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name='name'
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='lastName'
          rules={{ required: 'Last Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Last Name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.lastName?.message}
            />
          )}
        />
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
            minLength: {
              message: 'Password must be at least 6 characters',
              value: 6,
            },
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

        <View style={{ marginBottom: 24 }}>
          <View style={styles.checkBoxContainer}>
            <Controller
              rules={{ required: 'Accept Terms is required' }}
              render={({ field: { onChange, value } }) => (
                <CustomCheckBox onValueChange={onChange} value={value} />
              )}
              name='acceptTerms'
              control={control}
            />
            <Text numberOfLines={2} style={styles.checkBoxText}>
              By signing up, you agree to the
              <Text style={styles.checkBoxTextHint}>Terms of </Text> {'\n'}
              <Text style={styles.checkBoxTextHint}>
                Service and Privacy Policy
              </Text>
            </Text>
          </View>
          <Text style={styles.checkBoxError}>
            {errors.acceptTerms?.message}
          </Text>
        </View>
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ marginBottom: 40 }}
        size='full'
        text='Sign Up'
      />
      <View style={styles.allReadyAccount}>
        <Text style={styles.allreadyAccountText}>Already have an account?</Text>
        <Link href='/login' asChild>
          <Text style={styles.loginText}>Login</Text>
        </Link>
      </View>
    </View>
  );
}

const registerStyles = createStyleSheet((theme) => ({
  pageContainer: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  formContainer: {
    gap: 24,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  checkBoxText: {
    ...theme.Typography.Body2,
    color: 'black',
  },
  checkBoxTextHint: {
    ...theme.Typography.Body2,
    color: theme.Colors.violet_100,
  },
  checkBoxError: {
    ...theme.Typography.Tiny,
    color: theme.Colors.red_80,
    marginTop: 4,
    paddingLeft: 8,
  },
  allReadyAccount: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allreadyAccountText: {
    ...theme.Typography.Body2,
    color: theme.Colors.light_20,
  },
  loginText: {
    ...theme.Typography.Body2,
    color: theme.Colors.violet_100,
    textDecorationLine: 'underline',
  },
}));

