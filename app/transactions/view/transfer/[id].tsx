import React from 'react';
import ViewTransactinoScreen from '@/components/screens/Transaction/ViewTransactinoScreen';
import { useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { transferService } from '@/services';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorScreen from '@/components/ErrorScreen';
import { TransactionType } from '@/interfaces';
import Toast from 'react-native-toast-message';

export default function ViewTransfer() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['tranfer', id],
    queryFn: () => transferService.GetTransferById(id),
  });

  const mutation = useMutation({
    mutationFn: transferService.DeleteTransferById,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Transfer deleted successfully',
      });
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
        text2: 'Failed to delete transfer',
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
          id: data?.id,
          amount: data.amount,
          description: data.description,
          walletOrTo: data?.destinationAccount?.name,
          categoryOrFrom: data?.originAccount?.name,
          files:
            data?.transferFiles?.map(({ file }) => ({
              fileName: file.name,
              uri: file.url,
              type: file.type,
              mimeType: file.type,
              size: file.size,
              base64: '',
            })) || [],
          createdAt: data?.createdAt,
        }}
        type={TransactionType.TRANSFER}
        onDelete={() => mutation.mutate(data.id)}
      />
    </>
  );
}

