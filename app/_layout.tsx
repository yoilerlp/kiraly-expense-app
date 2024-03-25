import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

import AuthContextProvider from '@/context/authContext/Provider';
import PageContainer from '@/components/PageContainer';
import { StorageKeys } from '@/constants/storageKeys';
import useStorageValue from '@/hooks/useStorageValue';
import ScreenHeader from '@/components/header';
import { assets } from '../constants/assets';
import CustomToast from '@/components/toast';
import '@/unistyles';

const queryClient = new QueryClient();

export { ErrorBoundary } from 'expo-router';
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...assets.fonts,
    ...Ionicons.font,
  });

  const appIsReady = loaded && !error;
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { value } = useStorageValue(StorageKeys.authToken, '');

  const isLogged = !!value;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <PageContainer>
          <Stack
            initialRouteName={isLogged ? '(home)' : 'index'}
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'white' },
            }}
          >
            {/* <Stack.Screen name='(auth)/index' /> */}
            <Stack.Screen name='(home)' options={{ headerShown: false }} />
            <Stack.Screen
              options={{
                headerShown: true,
                header: () => <ScreenHeader title='Sign Up' />,
              }}
              name='(auth)/register'
            />
            <Stack.Screen
              options={{
                headerShown: true,
                header: () => <ScreenHeader title='Login' />,
              }}
              name='(auth)/login'
            />
            <Stack.Screen
              options={{
                headerShown: true,
                header: () => <ScreenHeader title='Reset Password' />,
              }}
              name='(auth)/updatePassword/[email]'
            />
            <Stack.Screen
              options={{
                headerShown: true,
                header: () => <ScreenHeader title='Forgot Password' />,
              }}
              name='(auth)/forgotPassword'
            />
          </Stack>
        </PageContainer>
        <CustomToast />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

