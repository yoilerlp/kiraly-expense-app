import { createStyleSheet, useStyles } from 'react-native-unistyles';
import React, { useEffect, useRef, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import ScreenHeader from '@/components/header';
import Button from '@/components/button';
import useTimer from '@/hooks/useTimer';

import { ResendOTPCode, VerifyOTPCode } from '@/services/user';
export default function VerifyOTPScreen() {
  const { minutes, seconds, timeIsOver, resumeTimer, resetTimer } = useTimer(5);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const refs = useRef<TextInput[]>([]);

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const router = useRouter();

  const verifyOTPMutation = useMutation({
    mutationFn: VerifyOTPCode,
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: data.message,
      });
      setTimeout(() => {
        router.replace('/auth/login');
      }, 3000);
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });
  const reSendOTPMutation = useMutation({
    mutationFn: ResendOTPCode,
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: data.message,
      });
      resetTimer();
      resumeTimer();
      setOtp(['', '', '', '', '', '']);
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  const { styles } = useStyles(verifyStyles);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if value is entered
    if (value && index < 5) {
      refs.current[index + 1].focus();
    }

    // if is the last element, hide keyboard
    if (value && index === 5) {
      Keyboard.dismiss();
    }
  };

  const isValidInputCode = () => {
    return otp.every((value) => !!value && !isNaN(Number(value)));
  };

  useEffect(() => {
    resumeTimer();
  }, [email]);

  const handleResendCode = () => {
    if (!timeIsOver || !email) return;
    reSendOTPMutation.mutate({ email });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={'padding'}
      style={styles.pageContainer}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ScreenHeader title='Verifycation' />,
        }}
      />
      <View style={styles.divider}></View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter your {'\n'}Verification Code</Text>
        <View style={styles.optContainer}>
          {otp.map((optValue, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={styles.otpInputCircle(Boolean(optValue))}
                onPress={() => {
                  refs?.current[idx]?.focus();
                }}
              >
                <TextInput
                  caretHidden
                  style={styles.optInputText}
                  ref={(ref) => {
                    refs.current[idx] = ref as any;
                  }}
                  onChangeText={(value) => handleChange(idx, value)}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === 'Backspace' &&
                      idx > 0 &&
                      !otp[idx]
                    ) {
                      // If backspace is pressed and current input is empty, focus previous input
                      refs.current[idx - 1].focus();
                    }
                  }}
                  value={optValue}
                  keyboardType='numeric'
                  maxLength={1}
                  textAlign='center'
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {!timeIsOver && (
          <View style={styles.timmerContainer}>
            <Text style={styles.timmerText}>
              {minutes}:{seconds < 10 ? '0' : ''}
              {seconds}
            </Text>
          </View>
        )}

        <View style={styles.emailTextContainer}>
          <Text style={styles.textContainer}>
            We send verification code to your {'\n'}email{' '}
            <Text style={styles.emailText}>{email}</Text>. You can check your
            inbox.
          </Text>
        </View>
        <Pressable
          disabled={!timeIsOver}
          style={({ pressed }) => ({
            opacity: pressed || !timeIsOver ? 0.7 : 1,
            marginBottom: 47,
          })}
          onPress={handleResendCode}
        >
          <Text style={[styles.emailText, { textDecorationLine: 'underline' }]}>
            I didn’t received the code? Send again
          </Text>
        </Pressable>
        <Button
          onPress={() => {
            const data = { email, otp: otp.join('') };
            verifyOTPMutation.mutate(data);
          }}
          isLoading={verifyOTPMutation.isPending}
          disabled={!isValidInputCode()}
          size='full'
          text='Verify'
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const verifyStyles = createStyleSheet((theme) => ({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  divider: {
    flex: 4,
  },
  formContainer: {
    flex: 7,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  title: {
    ...theme.Typography.Title1,
    color: theme.Colors.dark_100,
    marginBottom: 30,
  },
  optContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 40,
    marginBottom: 32,
  },
  timmerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 40,
    marginBottom: 16,
  },
  timmerText: {
    ...theme.Typography.Title3,
    color: theme.Colors.violet_100,
  },
  otpInputCircle(hasValue: boolean) {
    return {
      width: hasValue ? 21 : 16,
      height: hasValue ? '100%' : 16,
      borderRadius: hasValue ? undefined : 8,
      backgroundColor: hasValue ? undefined : '#E0E2E9',
    };
  },
  optInputText: {
    ...theme.Typography.TitleX,
    fontSize: 32,
    lineHeight: 40,
    color: theme.Colors.dark_75,
  },
  emailTextContainer: {
    maxWidth: 321,
    marginBottom: 16,
  },
  textContainer: {
    ...theme.Typography.Body1,
  },
  emailText: {
    ...theme.Typography.Body1,
    color: theme.Colors.violet_100,
  },
}));

