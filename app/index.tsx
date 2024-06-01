import React from 'react';
import { Redirect } from 'expo-router';

import LoadingScreen from '@/components/LoadingScreen';
import OnboardingScreen from '@/components/onboarding';
import useAuth from '@/hooks/useAuth';

export default function ValidateLoginView() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (user) return <Redirect href='/main/transaction' />;

  return <OnboardingScreen />;
}

