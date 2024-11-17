import React, { PropsWithChildren, useEffect } from 'react';
import AuthContext from '.';
import useUserLogged from '@/hooks/useUserLogged';
import { setStorageItemAsync } from '@/utils/storage';
import { useRouter } from 'expo-router';

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

