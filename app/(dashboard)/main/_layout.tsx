import { Redirect, Tabs } from 'expo-router';
import useUserAccounts from '@/hooks/data/useUserAccounts';
import TabBar from '@/components/navigation/bottomBar/TabBar';

export default function MainLayout() {
  const { isLoading: loadingAccounts, data: accounts } = useUserAccounts();

  if (accounts && accounts?.length === 0 && !loadingAccounts) {
    return <Redirect href={'/auth/setupAccount'} />;
  }

  return (
    <Tabs
      tabBar={(props) => {
        return <TabBar {...props} />;
      }}
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name='index' />
      <Tabs.Screen name='home' />
      <Tabs.Screen name='transaction' />
      <Tabs.Screen name='budget' />
      <Tabs.Screen name='profile' />
    </Tabs>
  );
}

