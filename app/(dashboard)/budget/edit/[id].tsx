import ErrorScreen from '@/components/ErrorScreen';
import LoadingScreen from '@/components/LoadingScreen';
import CreateBadgetForm, {
  ICreateBudgetForm,
} from '@/components/forms/CreateBudgetForm';
import { BudgetService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';

export default function EditBudgetView() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: budget,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['budget', id],
    queryFn: () => BudgetService.GetBudgeById(id),
    enabled: !!id,
  });

  const initialValues = useMemo(() => {
    const budgetHasLimit = budget?.receiveAlert && budget?.amountAlert !== null;

    const alertPercentage =
      !budgetHasLimit && budget?.amount
        ? null
        : Math.round((budget?.amountAlert! / budget?.amount!) * 100);

    const values: ICreateBudgetForm & {
      id: string;
    } = {
      amount: budget?.amount || 0,
      categoryId: budget?.categoryId || '',
      receiveAlert: budget?.receiveAlert || false,
      alertPercentage,
      id: budget?.id || '',
    };

    return values;
  }, [budget]);

  if (isLoading) return <LoadingScreen />;

  if (isError || !budget) return <ErrorScreen />;

  return (
    <>
      <CreateBadgetForm
        isEdit
        month={budget?.month!}
        initialValues={initialValues}
      />
    </>
  );
}

