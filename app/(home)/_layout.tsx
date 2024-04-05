import useUserAccounts from '@/hooks/data/useUserAccounts';
import { Redirect, Tabs } from 'expo-router';
export default function HomeLayout() {
  const { data: accounts, isLoading } = useUserAccounts();
  if (accounts?.length !== 0 && !isLoading)
    return <Redirect href={'/(auth)/addAccount'} />;

  return <Tabs />;
}

