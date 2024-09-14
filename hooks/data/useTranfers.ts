import { IFilterTransferParams } from '@/interfaces';
import { transferService } from '@/services';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const transfer_QUERY_KEY = 'transfers-query-key';

export default function useTransfers(params: IFilterTransferParams) {
  const key = useMemo(() => {
    const { page, limit, maxDate = '', minDate = '', orderBy = '' } = params;

    const key = `transfers?page=${page}&limit=${limit}&maxDate=${maxDate}&minDate=${minDate}&orderBy=${orderBy}`;
    return key;
  }, [params]);

  const result = useInfiniteQuery({
    queryKey: [transfer_QUERY_KEY, key],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      transferService.GetAlltransfers({
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

