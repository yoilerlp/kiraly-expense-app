import { View, Text } from 'react-native';
import React from 'react';
import ScreenHeader from '@/components/header';
import { Stack, useLocalSearchParams } from 'expo-router';
import CreateAccountForm from '@/components/forms/CreateAccountForm';
import useAccount from '@/hooks/data/useAccount';
import FetchWrapper from '@/components/FetchWrapper';
import { Colors } from '@/theme/Colors';

export default function UpdateAccountView() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data, isLoading, error } = useAccount(id);

  return (
    <>
      <FetchWrapper loading={isLoading} error={error}>
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => (
              <ScreenHeader
                title='Update account'
                bgColor={Colors.violet_100}
                textColor='white'
              />
            ),
          }}
        />
        <CreateAccountForm
          isUpdating
          initialValues={{
            name: data?.account.name || '',
            type: data?.account.type || '',
            id,
          }}
        />
      </FetchWrapper>
    </>
  );
}
