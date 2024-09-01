import React from 'react';
import { Redirect } from 'expo-router';

import LoadingScreen from '@/components/LoadingScreen';
import OnboardingScreen from '@/components/onboarding';
import useAuth from '@/hooks/useAuth';

export default function ValidateLoginView() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />; 

  return <Redirect href={'/main/profile'} />;

  if (user) return <Redirect href={'/main/profile'} />;

  return <OnboardingScreen />;
}

