import { BudgetService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';

function useBudgets(params: { year: number; month: number }) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: [user?.id, 'budgets', params.year, params.month],
    queryFn: () => BudgetService.GetBudgetsByYearAndMonth(params),
    enabled: !!user,
  });

  return query;
}

export default useBudgets;

