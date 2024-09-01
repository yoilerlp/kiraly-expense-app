import { Text, TouchableOpacity, View, SectionList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import React, { useMemo, useState } from 'react';

import {
  Select,
  Typography,
  Icon,
  LoadingSpinner,
  CustomBottomSheetComp,
} from '@/components';
import { TransactionCard } from '@/components/ui';

import {
  IFilterTransactionParams,
  SortTransactionBy,
  Transaction,
} from '@/interfaces';

import {
  groupTransactionsByDate,
  BasicDateFiltersEnum,
  generateMinAndMaxDateBasedOnFilters,
  FilterOptionsList,
  AllFilterValue,
} from '@/utils';

import useTransactions from '@/hooks/data/useTransactions';
import TransactionFilter from '@/components/filters/TransactionFilter';
import { Link, useLocalSearchParams } from 'expo-router';

const getInitialFilterParams = (filter: BasicDateFiltersEnum) => {
  const { minDate, maxDate } = generateMinAndMaxDateBasedOnFilters(
    filter || BasicDateFiltersEnum.MONTH
  );

  return {
    page: 1,
    limit: Number.MAX_SAFE_INTEGER,
    currentDateTab: filter || BasicDateFiltersEnum.MONTH,
    minDate,
    maxDate,
    orderBy: SortTransactionBy.NEWEST,
  };
};

function TransactionsListView() {
  const { styles, theme } = useStyles(StylesSheet);

  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);

  const { filter = BasicDateFiltersEnum.MONTH } = useLocalSearchParams<{
    filter: BasicDateFiltersEnum;
  }>();

  const [transactionParams, setTransactionParams] = useState<
    IFilterTransactionParams & {
      currentDateTab: string;
    }
  >(() => {
    return getInitialFilterParams(filter);
  });

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useTransactions(transactionParams);

  const sectinosData = useMemo(() => {
    const allTransationsLoaded =
      data?.pages?.reduce((acc, page) => {
        return [...acc, ...(page?.rows || [])];
      }, [] as Transaction[]) || [];

    const transactinosGroupByDate = groupTransactionsByDate(
      transactionParams?.currentDateTab as any,
      allTransationsLoaded
    );

    const sectionsList = Object.entries(transactinosGroupByDate)
      .map(([key, value]) => ({
        title: key,
        data: value as Transaction[],
      }))
      .filter((item) => item?.data?.length > 0);
    return sectionsList;
  }, [data]);

  const activeFilters = useMemo(() => {
    let totalFitlers = 0;

    if (transactionParams?.categories?.length! > 0) totalFitlers++;

    if (transactionParams?.accounts?.length! > 0) totalFitlers++;

    return totalFitlers;
  }, [transactionParams]);

  const openBottomSheet = () => {
    setBottomSheetIndex(0);
  };

  const handleSelectChange = (value: string) => {
    const { minDate, maxDate } = generateMinAndMaxDateBasedOnFilters(
      value as any
    );

    const usePagination = [
      BasicDateFiltersEnum.YEAR,
      AllFilterValue,
      '',
    ].includes(value);

    setTransactionParams({
      ...transactionParams,
      currentDateTab: value,
      minDate,
      maxDate,
      limit: usePagination ? 20 : Number.MAX_SAFE_INTEGER,
    });
  };

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage || isFetching) return;
    fetchNextPage();
  };

  console.log({
    filter
  })

  return (
    <View style={{ flex: 1 }} key={filter}>
      <SectionList
        contentContainerStyle={styles.container}
        style={{ backgroundColor: theme.Colors.light_100 }}
        sections={sectinosData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReached={hasNextPage ? handleLoadMore : null}
        onEndReachedThreshold={0.1}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderContainer}>
            <Typography fontSize={18} type='Title3'>
              {title}
            </Typography>
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.filtersContainer}>
              <Select
                value={transactionParams.currentDateTab}
                onChange={handleSelectChange}
                items={FilterOptionsList}
                iconProps={{
                  color: theme.Colors.violet_100,
                  size: 24,
                }}
                style={{
                  viewContainer: styles.selectViewContainer,
                  inputContainer: styles.selectInputContainer,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.iconFilterContainer}
                onPress={openBottomSheet}
              >
                <Icon.WithBadge
                  badgeText={activeFilters > 0 ? activeFilters.toString() : ''}
                  name='Filters'
                  size={32}
                />
              </TouchableOpacity>
            </View>
            {[
              BasicDateFiltersEnum.WEEK,
              BasicDateFiltersEnum.MONTH,
              BasicDateFiltersEnum.YEAR,
            ].includes(transactionParams.currentDateTab as any) ? (
              <View style={{ height: 64, paddingVertical: 8, marginBottom: 8 }}>
                <Link
                  href={{
                    pathname: '/reports/slides',
                    params: {
                      filter: transactionParams.currentDateTab,
                    },
                  }}
                  asChild
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.seeReportBtn}
                  >
                    <Typography color={theme.Colors.violet_100} type='Body1'>
                      See your financial report
                    </Typography>
                    <Icon
                      name='ArrowRightNavigation'
                      color={theme.Colors.violet_100}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            ) : null}
          </>
        )}
        SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Text>No transactions found</Text>
            )}
          </View>
        )}
        ListFooterComponent={
          <>{isFetchingNextPage ? <LoadingSpinner /> : null}</>
        }
      />
      <CustomBottomSheetComp
        index={bottomSheetIndex}
        onChange={setBottomSheetIndex}
        snapPoints={['60%']}
      >
        <TransactionFilter
          initialValues={{
            categories: transactionParams.categories,
            types: transactionParams.type,
            sortBy: transactionParams.orderBy,
          }}
          onReset={() => {
            setBottomSheetIndex(-1);
            setTransactionParams(getInitialFilterParams(filter));
          }}
          onSave={(data) => {
            setBottomSheetIndex(-1);
            const { categories, types, sortBy, accounts } = data;

            setTransactionParams({
              ...transactionParams,
              page: 1,
              categories,
              type: types,
              orderBy: sortBy,
              accounts: accounts,
            });
          }}
        />
      </CustomBottomSheetComp>
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.Colors.light_100,
    paddingHorizontal: theme.margins.xl,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingVertical: theme.margins.lg,
  },
  selectViewContainer: {
    borderColor: theme.Colors.light_60,
    borderRadius: 100,
    height: 50,
  },
  selectInputContainer: {
    width: 100,
  },
  iconFilterContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    padding: 4,
    borderColor: theme.Colors.light_60,
  },
  seeReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.Colors.violet_20,
  },
  sectionHeaderContainer: {
    // marginBottom: 8,
  },
}));

export default TransactionsListView;
