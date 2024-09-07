import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Slot, Stack, usePathname, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect } from 'react';

import AuthContextProvider from '@/context/authContext/Provider';
import PageContextProvider from '@/context/pageContext';
import PageContainer from '@/components/PageContainer';
import { StorageKeys } from '@/constants/storageKeys';
import useStorageValue from '@/hooks/useStorageValue';
import ScreenHeader from '@/components/header';
import { assets } from '../constants/assets';
import CustomToast from '@/components/toast';
import { Colors } from '@/theme/Colors';

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
    return <LoadingSpinner />;
  }

  return <RootLayoutNav />;
}

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoadingScreen from '@/components/LoadingScreen';
import useIsMounted from '@/hooks/useIsMounted';
import { LoadingSpinner } from '@/components';

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <PageContextProvider>
            <PageContainer>
              <>
                <Stack
                  initialRouteName='/'
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' },
                    animation: 'fade_from_bottom',
                  }}
                />
              </>
            </PageContainer>
            <CustomToast />
          </PageContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
