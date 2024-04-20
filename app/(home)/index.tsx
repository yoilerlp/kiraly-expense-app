import { View, Text } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import useUserAccounts from '@/hooks/data/useUserAccounts';
import { Redirect, useRouter } from 'expo-router';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { AccountService } from '@/services';
import { Account } from '@/interfaces';

export default function index() {
  // const [accounts, setAccounts] = useState<Account[]>([]);

  // const [isLoading, setIsLoading] = useState(true);

  // useRefreshOnFocus(() => {
  //   refetch();
  // });

  // const fetchAccounts = async () => {
  //   console.log('fetching accounts');
  //   setIsLoading(true);
  //   try {
  //     const result = await AccountService.GetUserAccounts();
  //     if (result && result.length === 0) {
  //       router.replace('/(auth)/setupAccount');
  //     }
  //   } catch (error) {
  //   } finally {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000);
  //   }
  // };

  // if (accounts && accounts?.length === 0 && !isLoading)
  //   return <Redirect href={'/(auth)/setupAccount'} />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>TEST INDEX</Text>
    </View>
  );
}

