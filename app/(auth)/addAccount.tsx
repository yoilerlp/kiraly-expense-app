import React from 'react';

import CreateAccountForm from '@/components/forms/CreateAccountForm';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import { Colors } from '@/theme/Colors';

export default function AddAccount() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <ScreenHeader
              title='Add new account'
              bgColor={Colors.violet_100}
              textColor='white'
            />
          ),
        }}
      />
      <CreateAccountForm />
    </>
  );
}
