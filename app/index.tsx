import React from 'react';
import { Redirect, Slot } from 'expo-router';

import LoadingScreen from '@/components/LoadingScreen';
import OnboardingScreen from '@/components/onboarding';
import useAuth from '@/hooks/useAuth';

export default function ValidateLoginView() {
  const { user, isLoading } = useAuth();

  console.log({
    user,
    isLoading,
  });
  if (isLoading) return <LoadingScreen />;

  if (user && !isLoading) return <Redirect href={'/main/home'} />;

  return <OnboardingScreen />;
}
