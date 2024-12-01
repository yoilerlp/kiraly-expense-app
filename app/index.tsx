import React from 'react';
import { Redirect } from 'expo-router';

import LoadingScreen from '@/components/LoadingScreen';
import useStorageValue from '@/hooks/useStorageValue';
import { StorageKeys } from '@/constants/storageKeys';
import useAuth from '@/hooks/useAuth';
import { LogicStringValue } from '@/utils';

const defaultOnBoardingVisited = '';
export default function ValidateLoginView() {
  // const { isLoading: loadingSession, user } = useAuth();

  const { value, loading: loadingOnBoarding } = useStorageValue(
    StorageKeys.onBoardingVisited,
    defaultOnBoardingVisited
  );

  if (loadingOnBoarding) {
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

