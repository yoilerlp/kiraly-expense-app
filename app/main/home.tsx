import { View, Text, FlatList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import React, { useState } from 'react';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import { Typography } from '@/components';
import TabsBasicDateFilter from '@/components/filters/TabsBasicDateFilter';
import { BasicDateFiltersEnum, BasicDateFiltersList } from '@/utils/filters';
import PillTab from '@/components/ui/PillTab';
import TransactionCard from '@/components/ui/transaction/TransactionCard';
import UserBalance from '@/components/screens/home/UserBalance';
import useTransactions from '@/hooks/data/useTransactions';
import { IFilterTransactionParams } from '@/interfaces';
import { generateMinAndMaxDateBasedOnFilters } from '@/utils/date';
import LoadingSpinner from '@/components/loaders';

export default function HomeScreen() {
  const [transactionParams, setTransactionParams] = useState<
    IFilterTransactionParams & {
      currentDateTab: string;
    }
  >(() => {
    const { minDate, maxDate } = generateMinAndMaxDateBasedOnFilters(
      BasicDateFiltersEnum.TODAY
    );

    return {
      page: 1,
      currentDateTab: 'Today',
      minDate,
      maxDate,
    };
  });

  const [refreshing, setRefreshing] = useState(false);

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

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
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

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={transactionPages}
      contentContainerStyle={styles.container}
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
        <View style={{ marginBottom: 8 }}>
          <UserBalance />
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
              <View style={{ width: 80 }}>
                <PillTab
                  isSingle
                  label='See All'
                  size='medium'
                  color='violet'
                  isActive
                  onPressTab={() => {}}
                />
              </View>
            </View>
          </View>
        </View>
      )}
      ListFooterComponent={
        <>{isFetchingNextPage ? <LoadingSpinner /> : null}</>
      }
    />
  );
}

const HomeStyles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.Colors.light_100,
    paddingBottom: 16,
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

