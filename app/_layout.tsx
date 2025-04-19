import { useEffect } from 'react';

import { useQuickActionRouting } from 'expo-quick-actions/router';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as QuickActions from 'expo-quick-actions';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NotificationProvider } from '@/context/NotificationContext';
import AuthContextProvider from '@/context/authContext/Provider';
import PageContextProvider from '@/context/pageContext';
import PageContainer from '@/components/PageContainer';
import { LoadingSpinner } from '@/components';
import { assets } from '../constants/assets';
import CustomToast from '@/components/toast';

import '@/unistyles';
import { AppQuickActions } from '@/utils/app';

const queryClient = new QueryClient();

export { ErrorBoundary } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    const config: Notifications.NotificationBehavior = {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
    return config;
  },
});

SplashScreen.setOptions({
  fade: true,
});

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
    const setupQuickActions = async () => {
      const isSupported = await QuickActions.isSupported();

      if (!isSupported) return;

      QuickActions.setItems(AppQuickActions).catch((err) => console.log(err));
    };
    setupQuickActions();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useQuickActionRouting((action) => {});

  if (!appIsReady) {
    return <LoadingSpinner />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <NotificationProvider>
            <PageContextProvider>
              <PageContainer>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' },
                    animation: 'fade_from_bottom',
                  }}
                />
              </PageContainer>
              <CustomToast />
            </PageContextProvider>
          </NotificationProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

