import React, { PropsWithChildren, useEffect, useState } from 'react';
import AuthContext from '.';
import useUserLogged from '@/hooks/useUserLogged';
import { setStorageItemAsync } from '@/utils/storage';
import { useRouter } from 'expo-router';

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [shouldReAuth, setShouldReAuth] = useState(false);

  const [appUnlocked, setAppUnlocked] = useState(false);

  const rotuer = useRouter();

  const { data, isError, isLoading, refetch, token, updateUserData } =
    useUserLogged({
      enabledQuery: shouldReAuth,
    });

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
        shouldReAuth,
        appUnlocked,
        setAppUnlocked,
        setShouldReAuth,
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

