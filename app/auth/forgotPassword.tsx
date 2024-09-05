import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

import { Input, Button } from '@/components';
import { UserService } from '@/services';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const sendRecoveryPassWordMutation = useMutation({
    mutationFn: UserService.SendRecoveryPasswordCode,
    onSuccess: async (data, variables) => {
      Toast.show({
        type: 'success',
        text1: data.message,
      });
      router.push(`/auth/updatePassword/${variables.email}`);
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  const { styles  } = useStyles(forgotPasswordStyles);

  const { errors } = formState;

  const submit = async (values: { email: string }) => {
    sendRecoveryPassWordMutation.mutate(values);
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>
        Don’t worry.{'\n'}Enter your email and we’ll {'\n'}send you a code to
        reset your password.
      </Text>
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
      <Button
        isLoading={sendRecoveryPassWordMutation.isPending}
        disabled={sendRecoveryPassWordMutation.isPending}
        onPress={handleSubmit(submit)}
        style={{ marginTop: 50 }}
        size='full'
        text='Continue'
      />
    </View>
  );
}

const forgotPasswordStyles = createStyleSheet((theme) => ({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  emailSendContainer: {
    paddingHorizontal: 32,
    paddingBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    gap: 24,
    marginBottom: 34,
  },
  img: {
    width: 312,
    height: 312,
    marginBottom: 18,
  },
  emailSendTitle: {
    ...theme.Typography.Title2,
    color: theme.Colors.dark_100,
    textAlign: 'center',
    marginBottom: 24,
  },
  emailSendText: {
    ...theme.Typography.Body1,
    color: theme.Colors.dark_25,
    textAlign: 'center',
  },
  title: {
    ...theme.Typography.Title2,
    color: theme.Colors.dark_100,
    marginBottom: 46,
  },
}));

// const renderPassWordSend = () => {
//   return (
//     <View style={[styles.pageContainer, styles.emailSendContainer]}>
//       <View>
//         <Image style={styles.img} source={assets.onboarding.emailSend} />
//         <Text style={styles.emailSendTitle}>Your email is on the way</Text>
//         <Text style={styles.emailSendText}>
//           Check your email{' '}
//           <Text
//             style={[styles.emailSendText, { color: theme.Colors.violet_100 }]}
//           >
//             test@test.com
//           </Text>{' '}
//           and follow the instructions to reset your password
//         </Text>
//       </View>
//       <Button size='full' text='Back to Login' />
//     </View>
//   );
// };

