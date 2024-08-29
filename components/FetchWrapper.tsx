import { View, Text } from 'react-native';
import React, { PropsWithChildren } from 'react';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

type FetchWrapperProps = PropsWithChildren<{
  error?: any;
  loading?: boolean;
}>;

export default function FetchWrapper({
  error,
  loading,
  children,
}: FetchWrapperProps) {
  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen />;

  return <>{children}</>;
}
