import LineChart from '@/components/graph/LineChart';
import LoadingSpinner from '@/components/loaders';
import Select from '@/components/select';
import Typography from '@/components/typography';
import BalanceCard from '@/components/ui/BalanceCard';
import UserAvatar from '@/components/ui/UserAvatar';
import useGeneralExpenseAndIconme from '@/hooks/data/useBasicExpensesBalance';
import useBasicExpensesReport from '@/hooks/data/useBasicExpensesReport';
import useAuth from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { TransactionService } from '@/services';
import {
  BALANCE_QUERY_KEY,
  BasicDateFilters,
  BasicDateFiltersEnum,
} from '@/utils';
import { removeDuplicateByKey } from '@/utils/array';
import { formatCurrency } from '@/utils/currency';
import {
  generateMinAndMaxDateBasedOnFilters,
  generateMonthObject,
  getMinAndMaxDateInMonthUTCFromLocalTime,
  getMonthsInRange,
} from '@/utils/date';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type UserBalanceProps = {
  selectedMonth: string;
  onChangeSelectedMonth: (date: string) => void;
};

function UserBalance({
  selectedMonth,
  onChangeSelectedMonth: setSelectedMonth,
}: UserBalanceProps) {
  const { styles, theme } = useStyles(StylesSheet);

  const auth = useAuth();

  const {
    data: minAndMaxTransactionDate,
    isLoading: isTransactionDatePending,
  } = useQuery({
    queryKey: ['min-max-transaction-date'],
    queryFn: TransactionService.GetMinAndMaxTransactionDate,
  });

  const monthsList = useMemo(() => {
    if (!minAndMaxTransactionDate) return [];

    const { min, max } = minAndMaxTransactionDate;

    const months = getMonthsInRange({
      minDate: min,
      maxDate: max,
    });

    const curentMonthObject = generateMonthObject(new Date());

    months.push(curentMonthObject);

    return removeDuplicateByKey(months, 'date');
  }, [minAndMaxTransactionDate]);

  const balanceFilterData = useMemo(() => {
    const monthData = monthsList.find((month) => month.date === selectedMonth)!;
    if (!monthData) return;

    const curentMonthUTCDate = new Date(monthData?.utcDate);
    const year = curentMonthUTCDate.getFullYear();
    const month = curentMonthUTCDate.getMonth() + 1;

    const balanceDates = getMinAndMaxDateInMonthUTCFromLocalTime(selectedMonth);

    return {
      key: `balance-${year}-${month}`,
      year,
      month,
      balanceDates,
    };
  }, [selectedMonth, monthsList]);

  const debouncedKey = useDebounce({
    value: balanceFilterData?.key,
  });

  const { data: balanceData, isLoading: isLoadingBalanceData } = useQuery({
    queryKey: [BALANCE_QUERY_KEY, debouncedKey],
    queryFn: () => {
      return TransactionService.GetMonthBalance({
        // year: balanceFilterData?.year!,
        // month: balanceFilterData?.month!,
        minDate: balanceFilterData?.balanceDates?.minDate!,
        maxDate: balanceFilterData?.balanceDates?.maxDate!,
      });
    },
    enabled: !!balanceFilterData,
  });

  // year balance
  const { data: yearReportData, isLoading: isLoadingYearReport } =
    useGeneralExpenseAndIconme();

  console.log({
    yearReportData,
  });

  const lineChartData = useMemo(() => {
    if (!balanceData) return [];
    return balanceData?.transactions?.map(({ createdAt, amount }) => ({
      date: new Date(createdAt),
      value: amount,
    }));
  }, [balanceData]);

  const loadingData = isTransactionDatePending || isLoadingBalanceData;

  if (loadingData) {
    return (
      <View style={styles.detailsSection}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <>
      <View style={styles.detailsSection}>
        <LinearGradient
          colors={[
            theme.Colors.yellowGradient.start,
            theme.Colors.yellowGradient.end,
          ]}
          style={styles.gradiantContainer}
        >
          <View style={styles.avatarSection}>
            <Link href='/main/profile' asChild>
              <TouchableOpacity>
                <UserAvatar imgUrl={auth?.user?.photo!} />
              </TouchableOpacity>
            </Link>
            <Select
              value={selectedMonth}
              onChange={setSelectedMonth}
              items={monthsList?.map((month) => ({
                label: month.label,
                value: month.date,
              }))}
              iconProps={{
                color: theme.Colors.violet_100,
                size: 24,
              }}
              style={{
                viewContainer: styles.selectViewContainer,
                inputContainer: styles.selectInputContainer,
              }}
            />
            <View />
            {/* <Icon
              name='Notification'
              size={24}
              color={theme.Colors.violet_100}
            /> */}
          </View>
          <Typography color={theme.Colors.light_20} center type='Body3'>
            Account Balance
          </Typography>
          <Typography
            color={theme.Colors.dark_75}
            center
            type='Title2'
            style={styles.balanceValue}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            $
            {formatCurrency(
              Number(yearReportData?.total_income || 0) -
                Number(yearReportData?.total_expense || 0)
            )}
          </Typography>
          <Typography color={theme.Colors.light_20} center type='Body3'>
            Month Balance
          </Typography>
          <Typography
            color={theme.Colors.dark_75}
            center
            type='Title1'
            style={[styles.balanceValue, { marginBottom: 16 }]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            $
            {formatCurrency(
              Number(balanceData?.balance?.income || 0) -
                Number(balanceData?.balance?.expense || 0)
            )}
          </Typography>

          <View style={styles.balanceCardsContainer}>
            <BalanceCard
              type='income'
              description='Income'
              amount={Number(balanceData?.balance?.income || 0)}
            />
            <BalanceCard
              type='expense'
              description='Expenses'
              amount={Number(balanceData?.balance?.expense || 0)}
            />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.spendFrequencyContainer}>
        <Typography
          style={{ marginBottom: 16 }}
          color={theme.Colors.dark_100}
          fontSize={18}
          type='Title3'
        >
          Spend Frequency
        </Typography>
        <LineChart
          data={lineChartData}
          minDate={minAndMaxTransactionDate?.min!}
          maxDate={minAndMaxTransactionDate?.max!}
        />
      </View>
    </>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  detailsSection: {
    height: 280,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  gradiantContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectViewContainer: {
    borderColor: theme.Colors.light_60,
    borderRadius: 100,
    // height: 50,
    backgroundColor: theme.Colors.yellow_40,
  },
  selectInputContainer: {
    width: 100,
  },
  balanceValue: {
    marginBlock: 8,
    textAlign: 'center',
  },
  balanceCardsContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  spendFrequencyContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
}));

export default UserBalance;

