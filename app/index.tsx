import React from 'react';
import { Redirect } from 'expo-router';

import LoadingScreen from '@/components/LoadingScreen';
import useAuth from '@/hooks/useAuth';
import useStorageValue from '@/hooks/useStorageValue';
import { StorageKeys } from '@/constants/storageKeys';

export default function ValidateLoginView() {
  const { user, isLoading } = useAuth();

  const { value, loading: loadingOnBoarding } = useStorageValue(
    StorageKeys.onBoardingVisited,
    ''
  );

  if (isLoading || loadingOnBoarding) return <LoadingScreen />;

  if (user && !isLoading) return <Redirect href={'/main/home'} />;
  // if (user && !isLoading)
  //   return (
  //     <Redirect
  //       href={`/transactions/view/transaction/3e096db0-552c-48e0-88c6-3db63301206b`}
  //     />
  //   );

  const isOnBoardingVisited = value === 'true';

  return (
    <Redirect href={isOnBoardingVisited ? '/auth/login' : '/auth/onboarding'} />
  );
}
