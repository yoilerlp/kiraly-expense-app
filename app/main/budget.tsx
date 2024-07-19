import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';

import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import SectionRounded from '@/components/screens/SectionRounded';
import { Button, Icon, LoadingSpinner, Typography } from '@/components';
import { capitalizeFirstLetter, monthsList } from '@/utils';
import useBudgets from '@/hooks/data/useBudgets';
import BudgetCard from '@/components/ui/budget/BudgetCard';
import { useDebounce } from '@/hooks/useDebounce';

const availableMonths = monthsList.map((month, idx) => ({
  label: capitalizeFirstLetter(month),
  value: idx,
}));

export default function BadgeView() {
  const router = useRouter();

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonthIdx = new Date().getMonth();
    return availableMonths[currentMonthIdx];
  });

  const { styles, theme } = useStyles(StylesSheet);

  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: theme.Colors.violet_100,
    },
    viewBottomContainerStyles: {
      backgroundColor: theme.Colors.light_80,
    },
    statusBarProps: {
      style: 'light',
    },
  });

  const debounceSelectedMonth = useDebounce({
    value: selectedMonth.value,
    delay: 300,
  });

  const { data: budgets, isLoading } = useBudgets({
    month: debounceSelectedMonth + 1,
    year: new Date().getFullYear(),
  });

  const handleNextMonth = () => {
    const nextMonth = availableMonths[selectedMonth.value + 1];
    if (!nextMonth) return;
    setSelectedMonth(nextMonth);
  };

  const handlePreviousMonth = () => {
    const previousMonth = availableMonths[selectedMonth.value - 1];
    if (!previousMonth) return;
    setSelectedMonth(previousMonth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthSelectionContainer}>
        <Icon.WithOpacity
          opacity={selectedMonth.value < 1 ? 0.1 : 1}
          size={34}
          color={theme.Colors.light_100}
          name='ArrowRightNavigation'
          style={{ transform: [{ rotate: '180deg' }] }}
          touchableOpacityProps={{
            onPress: handlePreviousMonth,
            disabled: selectedMonth.value < 1,
          }}
        />
        <Typography color={theme.Colors.light_100} type='Title2'>
          {selectedMonth.label}
        </Typography>
        <Icon.WithOpacity
          opacity={selectedMonth.value > 10 ? 0.1 : 1}
          size={34}
          color={theme.Colors.light_100}
          name='ArrowRightNavigation'
          touchableOpacityProps={{
            onPress: handleNextMonth,
            disabled: selectedMonth.value > 10,
          }}
        />
      </View>
      <SectionRounded
        size={10}
        style={{ backgroundColor: theme.Colors.light_100, paddingBottom: 24 }}
      >
        <FlatList
          data={budgets}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          scrollEnabled
          renderItem={({ item }) => {
            const amountUsed = item?.transactions?.reduce((acc, current) => {
              return acc + current.amount;
            }, 0);

            return (
              <BudgetCard
                amount={item.amount}
                amountUsed={amountUsed}
                categoryName={item.category?.name || ''}
                categoryKey={item.category?.key || ''}
                onPress={() => {
                  router.push(`/budget/${item.id}`);
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View style={styles.noContentContainer}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Typography center type='Body1' color={theme.Colors.light_20}>
                    You don’t have a budget. {'\n'} Let’s make one so you in
                    control.
                  </Typography>
                </>
              )}
            </View>
          )}
        />
        <Link
          href={`/budget/createBadget?month=${selectedMonth.value + 1}` as any}
          asChild
        >
          <Button size='full' text='Create a budget' />
        </Link>
      </SectionRounded>
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.violet_100,
  },
  monthSelectionContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  noContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
