import { View, Text, Image } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Input from '@/components/input';
import Button from '@/components/button';
import { assets } from '@/constants/assets';

export default function ForgotPasswordScreen() {
  const { styles, theme } = useStyles(forgotPasswordStyles);

  const emailSended = false;
  const renderPassWordSend = () => {
    return (
      <View style={[styles.pageContainer, styles.emailSendContainer]}>
        <View>
          <Image style={styles.img} source={assets.onboarding.emailSend} />
          <Text style={styles.emailSendTitle}>Your email is on the way</Text>
          <Text style={styles.emailSendText}>
            Check your email{' '}
            <Text
              style={[styles.emailSendText, { color: theme.Colors.violet_100 }]}
            >
              test@test.com
            </Text>{' '}
            and follow the instructions to reset your password
          </Text>
        </View>
        <Button size='full' text='Back to Login' />
      </View>
    );
  };

  if (emailSended) return renderPassWordSend();

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>
        Don’t worry.{'\n'}Enter your email and we’ll {'\n'}send you a link to
        reset your password.
      </Text>
      <Input placeholder='Email' keyboardType='email-address' />
      <Button style={{ marginTop: 50 }} size='full' text='Continue' />
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

