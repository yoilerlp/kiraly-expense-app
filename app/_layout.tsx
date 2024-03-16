import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import PageContainer from '@/components/PageContainer';
import { assets } from '../constants/assets';
import '@/unistyles';
import ScreenHeader from '@/components/header';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)/onboarding',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...assets.fonts,
    ...Ionicons.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const isLogged = false;
  return (
    <PageContainer>
      <Stack
        // initialRouteName={isLogged ? '(home)/index' : '(auth)/forgotPassword'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      >
        <Stack.Screen name='index' />
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
            header: () => <ScreenHeader title='Verifycation' />,
          }}
          name='(auth)/verify'
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
          name='(auth)/setPassword'
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
  );
}

