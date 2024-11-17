import React from 'react';
import { Redirect } from 'expo-router';

import LoadingScreen from '@/components/LoadingScreen';
import useStorageValue from '@/hooks/useStorageValue';
import { StorageKeys } from '@/constants/storageKeys';

const defaultToken = '';
const defaultOnBoardingVisited = '';

export default function ValidateLoginView() {
  const { value: token, loading: loadingToken } = useStorageValue(
    StorageKeys.authToken,
    defaultToken
  );
  const { value, loading: loadingOnBoarding } = useStorageValue(
    StorageKeys.onBoardingVisited,
    defaultOnBoardingVisited
  );

  if (loadingOnBoarding || loadingToken) return <LoadingScreen />;

  if (token) {
    return <Redirect href={'/auth/validateSession'} />;
  }

  const isOnBoardingVisited = value === 'true';

  return (
    <Redirect href={isOnBoardingVisited ? '/auth/login' : '/auth/onboarding'} />
  );
}

