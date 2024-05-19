import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import { AccountService } from '@/services';

export const GET_ALL_ACCOUNTS_BY_USER_KEY = 'get-all-accounts';

export default function useUserAccounts() {
  const { user } = useAuth();

  const accountsQuery = useQuery({
    queryKey: [GET_ALL_ACCOUNTS_BY_USER_KEY],
    queryFn: () => AccountService.GetUserAccounts(),
    enabled: !!user,
  });

  return accountsQuery;
}

