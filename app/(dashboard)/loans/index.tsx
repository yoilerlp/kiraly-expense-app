import { View, Text, FlatList } from 'react-native';
import React, { Fragment, useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import TabNavigationContainer from '@/components/tab/TabNavigationContainer';
import TabNavigationItem from '@/components/tab/TabNavigationItem';
import { Button, Input } from '@/components';
import LoanCard from '@/components/ui/loans/LoanCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { AccountService } from '@/services';
import { AccountType } from '@/interfaces';
import FetchWrapper from '@/components/FetchWrapper';
import useLoanAccounts, {
  GET_ALL_LOAN_ACCOUNTS_BY_USER_KEY,
} from '@/hooks/data/useLoanAccounts';

export default function LoansView() {
  const { styles, theme } = useStyles(StylesSheet);

  // state
  const [accountName, setAccountName] = useState<string>('');

  const [showMyDebts, setShowMyDebts] = useState(false);

  // queries

  const {
    data: loanAccounts,
    isLoading,
    refetch: refetchLoanAccounts,
    error,
  } = useLoanAccounts();

  // mutations
  const createAccountMutation = useMutation({
    mutationFn: AccountService.CreateUserAccounts,
    onSuccess: async (data) => {
      Toast.show({
        type: 'success',
        text1: 'Account created successfully',
      });

      setAccountName('');
      refetchLoanAccounts();
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  const loans = useMemo(() => {
    const data = loanAccounts?.map((item) => {
      const balance =
        (item.balance.total_income || 0) - (item.balance.total_expense || 0);

      return {
        accountId: item.account.id,
        accountName: item.account.name,
        balance,
      };
    });

    return (
      data?.filter((item) => {
        const isAnDebt = item.balance > 0;

        return showMyDebts ? isAnDebt : !isAnDebt;
      }) || []
    );
  }, [loanAccounts, showMyDebts]);

  const handleCreateAccount = () => {
    createAccountMutation.mutate({ name: accountName, type: AccountType.LOAN });
  };

  return (
    <FetchWrapper loading={isLoading} error={error}>
      <View style={{ flex: 1 }}>
        <Fragment>
          <View style={styles.container}>
            <Stack.Screen
              options={{
                headerShown: true,
                header: () => (
                  <ScreenHeader
                    title='Loans'
                    bgColor={theme.Colors.violet_100}
                    textColor={theme.Colors.light_100}
                  />
                ),
              }}
            />
            <SafeAreasSetting
              statusBarBgColor={theme.Colors.violet_100}
              bottomBgColor={theme.Colors.violet_100}
            />
            <View style={styles.section}>
              <TabNavigationContainer>
                <TabNavigationItem
                  isActive={!showMyDebts}
                  text={'Owes me'}
                  onPress={() => {
                    setShowMyDebts(false);
                  }}
                />
                <TabNavigationItem
                  isActive={showMyDebts}
                  text={'I owe'}
                  onPress={() => {
                    setShowMyDebts(true);
                  }}
                />
              </TabNavigationContainer>
            </View>

            <View style={[styles.section, styles.form]}>
              <View style={styles.input}>
                <Input
                  placeholder='Add new loan account'
                  value={accountName}
                  onChangeText={(text) => {
                    setAccountName(text);
                  }}
                />
              </View>
              <Button
                disabled={
                  createAccountMutation.isPending || accountName?.length < 5
                }
                isLoading={createAccountMutation.isPending}
                onPress={handleCreateAccount}
                text='Add'
                size='small'
                style={{
                  alignSelf: 'flex-end',
                }}
              />
            </View>

            {/* <View style={styles.section}></View> */}
          </View>
        </Fragment>
        <FlatList
          style={{ flex: 1 }}
          data={loans}
          keyExtractor={(item) => item.accountId}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          ListHeaderComponent={() => null}
          renderItem={({ item }) => {
            return <LoanCard loan={item} />;
          }}
        />
      </View>
    </FetchWrapper>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    // flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 16,
  },
  form: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  input: {
    flexGrow: 1,
    width: '100%',
  },
}));

