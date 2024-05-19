import React from 'react';
import ViewTransactinoScreen from '@/components/screens/Transaction/ViewTransactinoScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TransactionService } from '@/services';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorScreen from '@/components/ErrorScreen';
import Toast from 'react-native-toast-message';

export default function ViewExpense() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => TransactionService.GetTransactionById(id),
  });

  const mutation = useMutation({
    mutationFn: TransactionService.DeleteTransaction,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Transaction deleted successfully',
      });
      setTimeout(() => {
        router.replace('/main/home');
      }, 1000);
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
        text2: 'Failed to delete transaction',
      });
    },
  });

  if (isLoading) return <LoadingScreen />;

  if (isError || !data) return <ErrorScreen />;

  return (
    <>
      <ViewTransactinoScreen
        data={{
          key: String(data?.key),
          id: data.id,
          amount: data.amount,
          description: data.description,
          walletOrTo: data?.account?.name,
          categoryOrFrom: data?.category?.name,
          files:
            data?.transactionFiles?.map(({ file }) => ({
              id: file.id,
              fileName: file.name,
              type: file.type,
              size: file.size,
              uri: file.url,
              mimeType: file.type,
              base64: '',
            })) || [],
          createdAt: data?.createdAt,
        }}
        type={data.type}
        onDelete={() => mutation.mutate(data.id)}
      />
    </>
  );
}

