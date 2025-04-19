import LoadingScreen from '@/components/LoadingScreen';
import useAuth from '@/hooks/useAuth';
import { Redirect, Slot, Stack, usePathname } from 'expo-router';
import React from 'react';

function DashboardLayout() {
  const path = usePathname();
  console.log({
    path
  })
  const { appUnlocked, isLoading } = useAuth();

  if (!appUnlocked) {
    return (
      <Redirect
        href={{
          pathname: '/auth/validateSession',
          params: {
            from: path,
          },
        }}
      />
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
        animation: 'fade_from_bottom',
      }}
    />
  );
}

export default DashboardLayout;

