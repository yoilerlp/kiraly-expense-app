import { View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import FetchWrapper from '@/components/FetchWrapper';
import { Icon, Typography } from '@/components';
import { formatCurrency } from '@/utils/currency';
import useTransactions from '@/hooks/data/useTransactions';
import {
  AccountType,
  IFilterTransactionParams,
  SortTransactionBy,
  Transaction,
} from '@/interfaces';
import { groupTransactionsByDate } from '@/utils';
import TransactionSections from '@/components/ui/transaction/TransactionSections';
import useAccount from '@/hooks/data/useAccount';
import CreateLoanTransaction from '@/components/ui/loans/CreateLoanTransaction';

type AccountDetailProps = {
  id: string;
  isForLoan?: boolean;
};

export default function AccountDetail({
  id,
  isForLoan = false,
}: AccountDetailProps) {
  const { styles, theme } = useStyles(StylesSheet);

  // for loan
  const [showModalAddTransation, setshowModalAddTransation] = useState(false);

  const { data, isLoading, error, refetch: refetchAccount } = useAccount(id);

  const [transactionParams, setTransactionParams] =
    useState<IFilterTransactionParams>(() => {
      return {
        page: 1,
        limit: 20,
        orderBy: SortTransactionBy.NEWEST,
        accounts: [id],
        accountTypes: isForLoan ? [AccountType.LOAN] : undefined,
      };
    });

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch: refetchTransactions,
  } = useTransactions(transactionParams);

  const balanceValue = data?.balance
    ? (data?.balance?.total_income || 0) - (data?.balance?.total_expense || 0)
    : 0;

  const sectinosData = useMemo(() => {
    const allTransationsLoaded =
      transactionsData?.pages?.reduce((acc, page) => {
        return [...acc, ...(page?.rows || [])];
      }, [] as Transaction[]) || [];

    const transactinosGroupByDate = groupTransactionsByDate(
      'Month',
      allTransationsLoaded
    );

    const sectionsList = Object.entries(transactinosGroupByDate)
      .map(([key, value]) => ({
        title: key,
        data: value as Transaction[],
      }))
      .filter((item) => item?.data?.length > 0);
    return sectionsList;
  }, [transactionsData]);

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage || isFetching) return;
    fetchNextPage();
  };

  return (
    <FetchWrapper loading={isLoading} error={error}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => (
              <ScreenHeader
                title={isForLoan ? 'Loan' : 'Account'}
                rightIcon={
                  isForLoan ? (
                    <Icon
                      name='Add'
                      size={28}
                      onPress={() => setshowModalAddTransation(true)}
                    />
                  ) : (
                    <Icon.WithLink
                      href={`/account/update/${id}`}
                      name='Edit'
                      size={18}
                    />
                  )
                }
              />
            ),
          }}
        />

        <TransactionSections
          sectinosData={sectinosData}
          handleLoadMore={handleLoadMore}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoadingTransactions}
        >
          <View style={styles.accountHero}>
            <View style={styles.accountType}>
              <Icon
                name={data?.account?.type === 'BANK' ? 'Salary' : 'Wallet'}
                size={32}
              />
            </View>
            <Typography type='Title2'>{data?.account?.name}</Typography>
            <Typography
              color={
                balanceValue > 0 ? theme.Colors.green_80 : theme.Colors.red_80
              }
              type='Title1'
            >
              ${formatCurrency(balanceValue)}
            </Typography>
          </View>
        </TransactionSections>
      </View>

      {isForLoan ? (
        <CreateLoanTransaction
          account={{
            name: data?.account?.name || '',
            id,
          }}
          visible={showModalAddTransation}
          onClose={() => {
            setshowModalAddTransation(false);
          }}
          onSuccess={() => {
            setshowModalAddTransation(false);
            refetchTransactions();
            refetchAccount();
          }}
        />
      ) : null}
    </FetchWrapper>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {},
  accountHero: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 44,
  },
  accountType: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F1F1FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

