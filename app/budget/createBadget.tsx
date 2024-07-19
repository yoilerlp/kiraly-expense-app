import CreateBadgetForm from '@/components/forms/CreateBudgetForm';
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function CreateBadgetView() {
  const { month } = useLocalSearchParams<{
    month: string;
  }>();

  if (!month || isNaN(Number(month))) return <Redirect href='/main/budget' />;

  return (
    <>
      <CreateBadgetForm month={Number(month)} />
    </>
  );
}
