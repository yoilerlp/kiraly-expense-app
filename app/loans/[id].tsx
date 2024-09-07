import AccountDetail from '@/components/screens/account/AccountDetail';
import { useLocalSearchParams } from 'expo-router';

export default function LoanDetails() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  return (
    <>
      <AccountDetail id={id} isForLoan />
    </>
  );
}
