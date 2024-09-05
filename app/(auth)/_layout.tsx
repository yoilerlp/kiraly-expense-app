import { View, Text } from 'react-native';
import React from 'react';
import { Slot, Stack } from 'expo-router';
import ScreenHeader from '@/components/header';

export default function AuthLayout() {
  return (
    <Stack
      // initialRouteName={isLogged ? 'main' : '(auth)/login'}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen
        name='main'
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name='transactions'
        options={{
          headerShown: false,
          // animation: 'fade',
        }}
      />
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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='(auth)/setupAccount'
      />
    </Stack>
  );
}
