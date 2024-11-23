import React from 'react';
import CreateTransactionScreen from '@/components/screens/Transaction/CreateTransactionScreen';
import { TransactionType } from '@/interfaces/transaction';

export default function ExpenseView() {
  return (
    <>
      <CreateTransactionScreen type={TransactionType.INCOME} />
    </>
  );
}

