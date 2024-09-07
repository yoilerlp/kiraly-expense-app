import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import { AccountService } from '@/services';

export const GET_ALL_LOAN_ACCOUNTS_BY_USER_KEY = 'get-all-loan-accounts';

export default function useLoanAccounts() {
  const { user } = useAuth();

  const loanAccountsQuery = useQuery({
    queryKey: [GET_ALL_LOAN_ACCOUNTS_BY_USER_KEY],
    queryFn: () => AccountService.GetUserLoanAccountsWithBalance(),
    enabled: !!user,
  });

  return loanAccountsQuery;
}
