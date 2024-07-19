import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import useTransaction from '@/hooks/data/useTransaction';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorScreen from '@/components/ErrorScreen';
import CreateTransactionScreen from '@/components/screens/Transaction/CreateTransactionScreen';

export default function EditTransactionScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data, isLoading, isError } = useTransaction(id);

  if (isLoading) return <LoadingScreen />;

  if (isError || !data) return <ErrorScreen />;

  return (
    <>
      <CreateTransactionScreen
        isEdit
        initialTransaction={data}
        type={data?.type!}
      />
    </>
  );
}

