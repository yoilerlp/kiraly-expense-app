import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import { ReportService } from '@/services';

const key = 'GET_GENERAL_EXPENSES_INCOME';
export default function useGeneralExpenseAndIconme() {
  const { user } = useAuth();

  const reportQuery = useQuery({
    queryKey: [key],
    queryFn: ReportService.GetUserTotalIncomeAndExpenses,
    enabled: !!user,
  });

  return reportQuery;
}

