import React from 'react';
import { Redirect } from 'expo-router';

import LoadingScreen from '@/components/LoadingScreen';
import useStorageValue from '@/hooks/useStorageValue';
import { StorageKeys } from '@/constants/storageKeys';

const defaultToken = '';
const defaultOnBoardingVisited = '';
const defaultBlockByBiometrics = '';

export default function ValidateLoginView() {
  const { value: token, loading: loadingToken } = useStorageValue(
    StorageKeys.authToken,
    defaultToken
  );
  const { value, loading: loadingOnBoarding } = useStorageValue(
    StorageKeys.onBoardingVisited,
    defaultOnBoardingVisited
  );
  const { value: blockByBiometrics, loading: loadingBlockByBiometrics } =
    useStorageValue(StorageKeys.blockByBiometric, defaultBlockByBiometrics);

  const isOnBoardingVisited = value === 'true';

  const isBlockByBiometric = blockByBiometrics === 'true';

  if (loadingOnBoarding || loadingToken || loadingBlockByBiometrics)
    return <LoadingScreen />;

  if (token && isBlockByBiometric) {
    return <Redirect href={'/auth/validateSession'} />;
  }

  return (
    <Redirect href={isOnBoardingVisited ? '/auth/login' : '/auth/onboarding'} />
  );
}

