import React, { PropsWithChildren, useEffect } from 'react';
import AuthContext from '.';
import useUserLogged from '@/hooks/useUserLogged';
import useStorageValue from '@/hooks/useStorageValue';
import { setStorageItemAsync } from '@/utils/storage';
import { useRouter } from 'expo-router';
import { StorageKeys } from '../../constants/storageKeys';
import { useQuery } from '@tanstack/react-query';
import { AccountService } from '@/services';
import { GET_ALL_ACCOUNTS_BY_USER_KEY } from '@/hooks/data/useUserAccounts';

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const rotuer = useRouter();

  const { data, isError, isLoading, refetch, token, updateUserData } =
    useUserLogged();

  const logOut = () => {
    setStorageItemAsync('token', null);
    rotuer.replace('/auth/login');
  };

  useEffect(() => {
    if (isError) {
      console.log({ isError });
      logOut();
    }
  }, [isError]);

  return (
    <AuthContext.Provider
      value={{
        user: data!,
        isLoading: isLoading,
        logOut,
        getUserToken() {
          return token;
        },
        reloadUser: () => {
          refetch();
        },
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
