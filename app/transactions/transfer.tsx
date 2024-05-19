import React from 'react';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import { Colors } from '@/theme/Colors';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import CreateTransferScreen from '../../components/screens/CreateTransferScreen';

export default function ExpenseView() {
  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: Colors.blue_100,
    },
    viewBottomContainerStyles: {
      backgroundColor: Colors.light_100,
    },
    statusBarProps: {
      style: 'light',
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <ScreenHeader
                title='Transfer'
                bgColor={Colors.blue_100}
                textColor={Colors.light_100}
              />
            );
          },
        }}
      />
      <CreateTransferScreen  />
    </>
  );
}

