import { Button, Typography } from '@/components';
import FetchWrapper from '@/components/FetchWrapper';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import { StorageKeys } from '@/constants/storageKeys';
import useStorageValue from '@/hooks/useStorageValue';
import { removeStorageItem } from '@/utils';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import * as LocalAuthentication from 'expo-local-authentication';
import useAuth from '@/hooks/useAuth';

function ValidateSessionScreen() {
  const { setShouldReAuth } = useAuth();

  const router = useRouter();

  const { styles, theme } = useStyles(styleaSheet);

  const { value, loading } = useStorageValue(StorageKeys.user, '');

  const userLastSession = useMemo(() => {
    if (!value) {
      return {
        name: '',
        email: '',
      };
    }

    return JSON.parse(value as unknown as string);
  }, [value]);

  const validateBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    const sopported =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    const supportFingerPrint = sopported.includes(
      LocalAuthentication.AuthenticationType.FINGERPRINT
    );

    const supportFaceId = sopported.includes(
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
    );

    return {
      hasHardware,
      isEnrolled,
      supportFingerPrint,
      supportFaceId,
    };
  };

  const validateBiometricsLogin = async () => {
    const { hasHardware, isEnrolled } = await validateBiometrics();

    if (!hasHardware || !isEnrolled) {
      handleClickLoginWithPassword();
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      cancelLabel: 'Cancel',
      promptMessage: 'Verify your fingerprint or face ID to log in.',
      requireConfirmation: true,
    });

    if (result.success) {
      setShouldReAuth?.(true);
      router.replace('/main/home');
    }
  };

  const handleClickLoginWithPassword = async () => {
    await removeStorageItem(StorageKeys.authToken);

    router.replace('/auth/login');
  };

  useEffect(() => {
    validateBiometricsLogin();
  }, []);

  return (
    <FetchWrapper loading={loading}>
      <View style={styles.container}>
        <SafeAreasSetting
          statusBarBgColor={theme.Colors.violet_100}
          bottomBgColor={theme.Colors.violet_100}
        />

        <Typography
          type='Title1'
          color={theme.Colors.white}
          style={{ marginBottom: 16 }}
        >
          Hi {userLastSession?.name || 'Usuario'}!
        </Typography>

        <Typography type='Title3' color={theme.Colors.white}>
          We detected an active session. Please use your password, fingerprint,
          or face recognition to log back in.
        </Typography>

        <View style={styles.buttonsContainer}>
          <Button
            size='full'
            variant='secondary'
            text='Use fingerprint or face ID'
            onPress={validateBiometricsLogin}
          />

          <Button
            size='full'
            variant='primary'
            text='Use password'
            onPress={handleClickLoginWithPassword}
          />
        </View>
      </View>
    </FetchWrapper>
  );
}

const styleaSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 200,
    backgroundColor: theme.Colors.violet_100,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
}));

export default ValidateSessionScreen;

