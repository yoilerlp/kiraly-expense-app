import { IFilterTransactionParams } from '@/interfaces';
import { TransactionService } from '@/services';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useTransactions(params: IFilterTransactionParams) {
  const key = useMemo(() => {
    const {
      page,
      limit,
      maxDate = '',
      minDate = '',
      orderBy = '',
      type = [],
      categories = [],
      accounts = [],
    } = params;

    const key = `transactions?page=${page}&limit=${limit}&maxDate=${maxDate}&minDate=${minDate}&orderBy=${orderBy}&type=${type.toString()}&categories=${categories.toString()}&accounts=${accounts.toString()}`;
    return key;
  }, [params]);

  const result = useInfiniteQuery({
    queryKey: [key],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      TransactionService.GetAllTransactions({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const { pagination } = lastPage;
      const totalItemsLoaded = allPages.length * pagination.limit;
      if (totalItemsLoaded >= pagination.total) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
  });

  return result;
}

