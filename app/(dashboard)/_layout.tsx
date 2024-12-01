import LoadingScreen from '@/components/LoadingScreen';
import useAuth from '@/hooks/useAuth';
import { Redirect, Slot, usePathname } from 'expo-router';
import React from 'react';

function DashboardLayout() {
  const path = usePathname();

  const { appUnlocked, isLoading } = useAuth();

  if (!appUnlocked) {
    return (
      <Redirect
        withAnchor
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

  return <Slot />;
}

export default DashboardLayout;

