import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import {ReportService } from '@/services';

export const GET_BASIC_USER_EXPENSES_REPORT_QUERY_KEY =
  'GET_BASIC_USER_EXPENSES_REPORT_QUERY_KEY';

export default function useBasicExpensesReport(params: {
  minDate: string;
  maxDate: string;
}) {
  const { user } = useAuth();

  const reportQuery = useQuery({
    queryKey: [GET_BASIC_USER_EXPENSES_REPORT_QUERY_KEY],
    queryFn: () => ReportService.GetUserBasicExpensesReport(params),
    enabled: !!user,
  });

  return reportQuery;
}
