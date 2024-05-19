import { TransactionService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function useTransaction(id: string) {
  const query = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => TransactionService.GetTransactionById(id),
    enabled: !!id,
  });

  return query;
}

