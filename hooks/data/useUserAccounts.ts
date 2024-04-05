import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import { AccountService } from '@/services';

export default function useUserAccounts() {
  const { user } = useAuth();

  const accountsQuery = useQuery({
    queryKey: ['userAccounts', user?.id],
    queryFn: () => AccountService.GetUserAccounts(),
    retry: 1,
    enabled: !!user,
  });

  return accountsQuery;
}

