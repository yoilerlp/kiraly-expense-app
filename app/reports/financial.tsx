import { View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, { useMemo, memo, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import ScreenHeader from '@/components/header';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Icon, Select, Typography } from '@/components';
import {
  BasicDateFiltersEnum,
  FilterOptionsList,
  capitalizeFirstLetter,
  categoriesColorsConfig,
  generateMinAndMaxDateBasedOnFilters,
} from '@/utils';
import { IconName } from '@/components/icon';
import LineChart from '@/components/graph/LineChart';
import useBasicExpensesReport from '@/hooks/data/useBasicExpensesReport';
import PieChartComp from '@/components/graph/PieChart';
import TabNavigationContainer from '@/components/tab/TabNavigationContainer';
import TabNavigationItem from '@/components/tab/TabNavigationItem';
import { Category, Transaction, TransactionType } from '@/interfaces';
import { TransactionCard } from '@/components/ui';
import CategoryExpenseBarCard from '@/components/ui/reports/CategoryExpenseBarCard';
import BarChart from '@/components/graph/BarChart';
import { generateFinancialReportData } from '@/utils/reports';
import FetchWrapper from '@/components/FetchWrapper';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import { formatCurrency } from '../../utils/currency';

const graphTypesList: {
  icon: IconName;
  type: 'LineChart' | 'PieChart' | 'BarChart';
}[] = [
  {
    icon: 'Graph',
    type: 'LineChart',
  },
  {
    icon: 'DonutChart',
    type: 'PieChart',
  },
  {
    icon: 'BarChart',
    type: 'BarChart',
  },
];

const categoryOrTransactionOptions = ['Transaction', 'Category'];

const tabTypes = [TransactionType.EXPENSE, TransactionType.INCOME];

const financialReporFilterOptions = [
  BasicDateFiltersEnum.WEEK,
  BasicDateFiltersEnum.MONTH,
  BasicDateFiltersEnum.YEAR,
].map((filter) => ({
  label: capitalizeFirstLetter(filter),
  value: filter,
}));

export default function FinancialReportView() {
  const { filter = BasicDateFiltersEnum.MONTH } = useLocalSearchParams<{
    filter: string;
  }>();

  const [fitlerDateType, setFilterDateType] = useState(() => filter);

  const { styles, theme } = useStyles(StylesSheet);

  const [activeGraphType, setActiveGraphType] = useState(
    graphTypesList[0].type
  );

  const [activeTabType, setActiveTabType] = useState(tabTypes[0]);

  const [activeCategoryOrTransaction, setActiveCategoryOrTransaction] =
    React.useState(categoryOrTransactionOptions[0]);

  const showTransactionsList =
    activeCategoryOrTransaction !== categoryOrTransactionOptions[1];

  const showIncomeTransactions = activeTabType === TransactionType.INCOME;

  const { minDate, maxDate } = generateMinAndMaxDateBasedOnFilters(
    fitlerDateType as any
  );

  const { data, isLoading, error } = useBasicExpensesReport({
    minDate: minDate!,
    maxDate: maxDate!,
  });

  const chartData = useMemo(() => {
    return generateFinancialReportData(data);
  }, [data]);

  const generatePieChartData = (
    categories: {
      category: Category;
      percentage: number;
      amount: number;
    }[],
    isForStatusBar = false
  ) => {
    const pieChartData = categories.map((categoryData) => {
      const categoryColorConfig =
        categoriesColorsConfig[categoryData.category.key];

      return {
        color: categoryColorConfig?.iconColor || theme.Colors.dark_100,
        value: isForStatusBar ? categoryData.amount : categoryData.percentage,
        text: `${categoryData.percentage}%`,
        frontColor: categoryColorConfig?.iconColor || theme.Colors.dark_100,
        label: categoryData.category.name,
      };
    });

    return pieChartData;
  };

  const RenderValueComponent = () => {
    return (
      <Typography color={theme.Colors.dark_100} type='Title1'>
        ${' '}
        {formatCurrency(
          showIncomeTransactions
            ? data?.basicExpenses?.totalIncome || 0
            : data?.basicExpenses?.totalExpense || 0
        )}
      </Typography>
    );
  };

  return (
    <FetchWrapper error={error} loading={isLoading}>
      <View style={styles.container}>
        <Stack.Screen
          key={fitlerDateType}
          options={{
            headerShown: !isLoading && !error,
            header: () => (
              <ScreenHeader
                bgColor={theme.Colors.violet_100}
                textColor={theme.Colors.light_100}
                title='Financial Report'
                returnUrl='/main/home'
              />
            ),
          }}
        />

        <SafeAreasSetting
          statusBarBgColor={theme.Colors.violet_100}
          bottomBgColor={theme.Colors.violet_100}
          statusBarProps={{ style: 'light' }}
        />
        <View>
          <View style={styles.filtersContainer}>
            <Select
              placeholderDefaultValue={BasicDateFiltersEnum.MONTH}
              value={fitlerDateType}
              onChange={(value) => {
                if (!value) return;
                setFilterDateType(value);
              }}
              items={financialReporFilterOptions}
              iconProps={{
                color: theme.Colors.violet_100,
                size: 24,
              }}
              style={{
                viewContainer: styles.selectViewContainer,
                inputContainer: styles.selectInputContainer,
              }}
            />
            <View style={styles.graphTypeContainer}>
              {graphTypesList?.map((item) => {
                const isActive = activeGraphType === item.type;
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={`report-graph-type-${item.icon}`}
                    onPress={() => {
                      setActiveGraphType(item.type);
                    }}
                    style={styles.graphTypeItem({
                      isActive,
                    })}
                  >
                    <Icon
                      size={32}
                      color={
                        isActive
                          ? theme.Colors.light_100
                          : theme.Colors.violet_100
                      }
                      name={item.icon}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* value section */}
          {activeGraphType === 'LineChart' ? (
            <View style={styles.valueSection}>{RenderValueComponent()}</View>
          ) : null}

          {/* chart section */}
          <View
            style={{
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            {chartData && activeGraphType === 'LineChart' ? (
              <LineChart
                data={
                  showIncomeTransactions
                    ? chartData?.lineChartValuesIncome
                    : chartData?.lineChartValuesExpenses
                }
                minDate={chartData?.minDate}
                maxDate={chartData?.maxDate}
              />
            ) : null}
            {chartData && activeGraphType === 'PieChart' ? (
              <PieChartComp
                data={generatePieChartData(
                  showIncomeTransactions
                    ? chartData?.categoryIncomes
                    : chartData?.categoryExpenses
                )}
                centerLabelComponent={RenderValueComponent}
              />
            ) : null}

            {chartData && activeGraphType === 'BarChart' ? (
              <View style={{ alignItems: 'center', width: '90%' }}>
                <BarChart
                  width={Dimensions.get('window').width}
                  data={generatePieChartData(
                    showIncomeTransactions
                      ? chartData?.categoryIncomes
                      : chartData?.categoryExpenses,
                    true
                  )}
                />
              </View>
            ) : null}
          </View>

          {/* transaction type filter */}
          <View style={styles.section}>
            <TabNavigationContainer>
              {tabTypes?.map((type) => {
                const isActive = activeTabType === type;
                return (
                  <TabNavigationItem
                    key={`tab-navigation-${type}`}
                    isActive={isActive}
                    text={capitalizeFirstLetter(type.toLowerCase())}
                    onPress={() => {
                      setActiveTabType(type);
                    }}
                  />
                );
              })}
            </TabNavigationContainer>
          </View>

          {/* transaction or category filter */}
          <View style={styles.section}>
            <View style={{ width: 180 }}>
              <Select
                value={activeCategoryOrTransaction}
                placeholderDefaultValue='Transaction'
                onChange={(value) => {
                  if (!value) {
                    return;
                  }
                  setActiveCategoryOrTransaction(value);
                }}
                items={categoryOrTransactionOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
                style={{
                  viewContainer: styles.selectViewContainer,
                  inputContainer: styles.selectInputContainer,
                }}
              />
            </View>
            <View style={{ flexGrow: 1 }} />
          </View>
        </View>
        <View style={styles.container}>
          {showTransactionsList ? (
            <FlatList
              keyExtractor={(item) => item.id}
              data={
                showIncomeTransactions
                  ? chartData?.incomeTransactions
                  : chartData?.expensesTransactions
              }
              renderItem={({ item: transaction }) => (
                <TransacionCell transaction={transaction} />
              )}
            />
          ) : (
            <FlatList
              data={
                showIncomeTransactions
                  ? chartData?.categoryIncomes || []
                  : chartData?.categoryExpenses || []
              }
              keyExtractor={(item) => item.category.id}
              renderItem={({ item }) => (
                <View style={[styles.cellcontainer, { marginBottom: 24 }]}>
                  <CategoryExpenseBarCard
                    key={`${item.category.id}-${activeTabType}`}
                    category={item.category}
                    amount={Math.round(item.amount)}
                    percentage={item.percentage}
                    isIncome={showIncomeTransactions}
                  />
                </View>
              )}
            />
          )}
        </View>
      </View>
    </FetchWrapper>
  );
}

const TransacionCell = memo(({ transaction }: { transaction: Transaction }) => {
  return (
    <View
      style={{
        marginBottom: 8,
        paddingHorizontal: 16,
      }}
    >
      <TransactionCard transaction={transaction} dateFormat={'Year'} />
    </View>
  );
});

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.margins.lg,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  selectViewContainer: {
    borderColor: theme.Colors.light_60,
    borderRadius: 100,
  },
  selectInputContainer: {
    width: 100,
  },
  graphTypeContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  graphTypeItem: ({ isActive = true }: { isActive?: boolean }) => {
    return {
      width: 48,
      height: 48,
      borderWidth: 1,
      borderColor: isActive ? theme.Colors.violet_100 : theme.Colors.light_60,
      backgroundColor: isActive
        ? theme.Colors.violet_100
        : theme.Colors.light_100,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    };
  },
  valueSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  cellcontainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
}));
