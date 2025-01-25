import React from 'react';
import { Redirect } from 'expo-router';

import LoadingScreen from '@/components/LoadingScreen';
import useStorageValue from '@/hooks/useStorageValue';
import { StorageKeys } from '@/constants/storageKeys';
import { LogicStringValue } from '@/utils';
import useAuth from '@/hooks/useAuth';

const defaultOnBoardingVisited = '';
export default function ValidateLoginView() {
  const { isLoading: loadingSession } = useAuth();

  const { value, loading: loadingOnBoarding } = useStorageValue(
    StorageKeys.onBoardingVisited,
    defaultOnBoardingVisited
  );

  if (loadingOnBoarding || loadingSession) {
    return <LoadingScreen />;
  }

  // if (user?.id) {
  //   return <Redirect href={'/auth/validateSession'} />;
  // }

  const isOnBoardingVisited = value === LogicStringValue.true;

  return (
    <Redirect href={isOnBoardingVisited ? '/main/home' : '/auth/onboarding'} />
  );
}

