import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import { AccountService } from '@/services';
import { AccountType } from '@/interfaces';

export const GET_ALL_ACCOUNTS_BY_USER_KEY = 'get-all-accounts';

export default function useUserAccounts(type?: AccountType) {
  const { user } = useAuth();

  const accountsQuery = useQuery({
    queryKey: [GET_ALL_ACCOUNTS_BY_USER_KEY, type || ''],
    queryFn: () => AccountService.GetUserAccounts(type),
    enabled: !!user,
  });

  return accountsQuery;
}
