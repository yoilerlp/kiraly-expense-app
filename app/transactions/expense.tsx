import { View, Text } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { Button } from '@/components';
import CreateTransactionScreen from '@/components/screens/Transaction/CreateTransactionScreen';
import ScreenHeader from '@/components/header';
import { Colors } from '@/theme/Colors';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import { TransactionType } from '@/interfaces/transaction';

export default function ExpenseView() {
  return (
    <>
      <CreateTransactionScreen type={TransactionType.EXPENSE} />
    </>
  );
}

