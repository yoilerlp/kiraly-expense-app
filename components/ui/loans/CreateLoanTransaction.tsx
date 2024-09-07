import { View, Text, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Button, CustomBottomSheetComp, Input, Typography } from '@/components';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TransactionService } from '@/services';
import Toast from 'react-native-toast-message';
import { CategoryKey, Transaction, TransactionType } from '@/interfaces';
import useCategories from '@/hooks/data/useCategories';
import FetchWrapper from '@/components/FetchWrapper';
import { GET_ALL_LOAN_ACCOUNTS_BY_USER_KEY } from '@/hooks/data/useLoanAccounts';

type LoadFormValues = {
  amount: number;
  description: string;
};

type Props = {
  account: {
    id: string;
    name: string;
  };
  onError?: () => void;
  onSuccess?: (t: Transaction) => void;
  sheetIndex: number;
  onChangeSheetIndex: (index: number) => void;
};

export default function CreateLoanTransaction({
  account,
  sheetIndex = -1,
  onError,
  onSuccess,
  onChangeSheetIndex,
}: Props) {
  const { styles, theme } = useStyles(StylesSheet);

  // state
  const { control, handleSubmit } = useForm<LoadFormValues>();

  const [isCreatingPayment, setIsCreatingPayment] = useState(false);

  //queries
  const {
    data: categories,
    isPending: loadingCategories,
    isError: errorCategories,
  } = useCategories();

  const queryClient = useQueryClient();

  // mutation
  const createTransactionMutation = useMutation({
    mutationFn: TransactionService.CreateTransaction,
    onMutate(variables) {
      if (variables.type === TransactionType.INCOME) {
        setIsCreatingPayment(true);
      }
    },
    onSuccess(data) {
      Toast.show({
        type: 'success',
        text1: 'Transaction created',
        text2: 'Transaction created successfully',
      });
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_LOAN_ACCOUNTS_BY_USER_KEY],
      });
    },
    onError(error: string) {
      Toast.show({
        type: 'error',
        text1: 'Transaction failed',
        text2: error,
      });
      onError?.();
    },
    onSettled() {
      isCreatingPayment && setIsCreatingPayment(false);
    },
  });

  const onSubmit = (type: TransactionType) => {
    return (data: LoadFormValues) => {
      const moneyLendCategory = categories?.find(
        (category) => category.key === CategoryKey.MONEY_LENT
      )!;

      createTransactionMutation.mutate({
        accountId: account.id,
        amount: data.amount,
        categoryId: moneyLendCategory.id,
        description: data.description,
        type,
        files: [],
      });
    };
  };

  return (
    <CustomBottomSheetComp
      index={sheetIndex}
      onChange={onChangeSheetIndex}
      snapPoints={['40%']}
    >
      <FetchWrapper loading={loadingCategories} error={errorCategories}>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Typography center type='Title3' style={styles.title}>
            Add transaction to {account?.name} Loans
          </Typography>
          <View style={styles.amontContainer}>
            <Controller
              control={control}
              name='amount'
              rules={{
                required: 'This field is required',
                validate(value) {
                  const realValue = Number(value);
                  if (isNaN(realValue)) return 'Invalid number';
                  if (realValue <= 0) return 'Invalid number';
                  return true;
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value ? String(field.value) : undefined}
                    error={fieldState.error?.message}
                    keyboardType='numeric'
                    placeholder='$0'
                  />
                );
              }}
            />
          </View>
          <Controller
            control={control}
            name='description'
            rules={{ required: 'Please add a description' }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder='Description'
                  onChangeText={field.onChange}
                  value={field.value}
                  error={fieldState?.error?.message}
                  maxLength={300}
                />
              );
            }}
          />
          <View style={styles.buttonsContainer}>
            <Button
              text='Lend'
              size='small'
              iconName='Expense'
              iconSize={30}
              style={styles.btn}
              onPress={handleSubmit(onSubmit(TransactionType.EXPENSE))}
              disabled={createTransactionMutation.isPending}
              isLoading={
                createTransactionMutation.isPending && !isCreatingPayment
              }
            />
            <Button
              text='Payment'
              size='small'
              iconName='Income'
              iconSize={30}
              style={styles.btn}
              onPress={handleSubmit(onSubmit(TransactionType.INCOME))}
              disabled={createTransactionMutation.isPending}
              isLoading={
                createTransactionMutation.isPending && isCreatingPayment
              }
            />
          </View>
        </KeyboardAvoidingView>
      </FetchWrapper>
    </CustomBottomSheetComp>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    marginVertical: 8,
  },
  amontContainer: {},
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    width: '45%',
  },
}));
