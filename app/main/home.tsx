import { View, Text, FlatList, RefreshControl } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import React, { useMemo, useState } from 'react';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import { Typography } from '@/components';
import TabsBasicDateFilter from '@/components/filters/TabsBasicDateFilter';
import { BasicDateFiltersEnum, BasicDateFiltersList } from '@/utils/filters';
import PillTab from '@/components/ui/PillTab';
import TransactionCard from '@/components/ui/transaction/TransactionCard';
import UserBalance from '@/components/screens/home/UserBalance';
import useTransactions, {
  TRANSACTION_QUERY_KEY,
} from '@/hooks/data/useTransactions';
import { IFilterTransactionParams } from '@/interfaces';
import {
  generateMinAndMaxDateBasedOnFilters,
  generateMonthObject,
} from '@/utils/date';
import LoadingSpinner from '@/components/loaders';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { BALANCE_QUERY_KEY } from '@/utils';

export default function HomeScreen() {
  const router = useRouter();

  // balance selected month
  const [selectedMonth, setSelectedMonth] = React.useState(
    generateMonthObject(new Date()).date
  );

  const [transactionParams, setTransactionParams] = useState<
    IFilterTransactionParams & {
      currentDateTab: string;
    }
  >(() => {
    const { minDate, maxDate } = generateMinAndMaxDateBasedOnFilters(
      BasicDateFiltersEnum.WEEK
    );

    return {
      page: 1,
      currentDateTab: BasicDateFiltersEnum.WEEK,
      minDate,
      maxDate,
    };
  });

  // const [refreshing, setRefreshing] = useState(false);

  const { styles, theme } = useStyles(HomeStyles);

  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: theme.Colors.yellowGradient.start,
    },
    statusBarProps: {
      style: 'dark',
    },
    viewBottomContainerStyles: {
      backgroundColor: theme.Colors.light_80,
    },
  });

  //data

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch: refetchTransactions,
  } = useTransactions(transactionParams);

  const handleCurrentDateTabChange = (tab: string) => {
    const { minDate, maxDate } = generateMinAndMaxDateBasedOnFilters(
      tab as any
    );

    setTransactionParams({
      ...transactionParams,
      currentDateTab: tab,
      minDate,
      maxDate,
    });
  };

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage || isFetching) return;

    fetchNextPage();
  };

  const { pages: transactionPages = [] } = data || {};

  const [isRefreshing, setIsRefreshing] = useState(false);

  // TODO fix this
  const handleReflesh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setSelectedMonth(generateMonthObject(new Date()).date);

      queryClient.invalidateQueries({
        queryKey: [BALANCE_QUERY_KEY, TRANSACTION_QUERY_KEY],
      });

      queryClient.refetchQueries({
        queryKey: [BALANCE_QUERY_KEY, TRANSACTION_QUERY_KEY],
      });

      refetchTransactions();

      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleReflesh} />
        }
        showsVerticalScrollIndicator={false}
        data={transactionPages}
        contentContainerStyle={[styles.contentContainer]}
        style={{
          backgroundColor: theme.Colors.yellowGradient.start,
        }}
        onEndReached={hasNextPage ? handleLoadMore : null}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <>
            {item.rows.map((transaction) => (
              <View style={styles.cellContainer} key={transaction.key}>
                <TransactionCard
                  transaction={transaction}
                  dateFormat={transactionParams?.currentDateTab}
                />
              </View>
            ))}
          </>
        )}
        keyExtractor={(item) =>
          `${item.pagination.page}-${item.pagination.limit}-${item.pagination.total}`
        }
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <View style={{ alignItems: 'center', flex: 1, minHeight: 200 }}>
                <Text>No transactions found</Text>
              </View>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={{ flex: 1 }}>
            <UserBalance
              selectedMonth={selectedMonth}
              onChangeSelectedMonth={setSelectedMonth}
            />
            <TabsBasicDateFilter
              list={BasicDateFiltersList}
              activeTab={transactionParams?.currentDateTab}
              onPressTab={handleCurrentDateTabChange}
            />
            <View style={styles.transactionsSection}>
              <View style={styles.transactionsTitle}>
                <Typography
                  style={{ marginBottom: 16 }}
                  color={theme.Colors.dark_100}
                  fontSize={18}
                  type='Title3'
                >
                  Recent Transactions
                </Typography>
                {![BasicDateFiltersEnum.TODAY].includes(
                  transactionParams?.currentDateTab as any
                ) ? (
                  <View style={{ width: 80 }}>
                    <PillTab
                      isSingle
                      label='See All'
                      size='medium'
                      color='violet'
                      isActive
                      onPressTab={() => {
                        router.replace({
                          pathname: '/main/transaction',
                          params: {
                            filter: transactionParams.currentDateTab,
                          },
                        });
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <>{isFetchingNextPage ? <LoadingSpinner /> : null}</>
        }
      />
    </View>
  );
}

const HomeStyles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.Colors.light_100,
    paddingBottom: 16,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: theme.Colors.light_100,
  },
  transactionsSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  transactionsTitle: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  cellContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
}));

