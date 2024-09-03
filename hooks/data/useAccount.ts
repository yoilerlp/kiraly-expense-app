import { AccountService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useAccount(id: string) {
  const query = useQuery({
    queryKey: ['account', id],
    queryFn: () => AccountService.GetAccountWithBalanceById(id),
    enabled: !!id,
  });

  return query;
}
