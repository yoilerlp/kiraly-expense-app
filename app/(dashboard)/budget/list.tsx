import { Typography } from '@/components';
import FetchWrapper from '@/components/FetchWrapper';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import ScreenHeader from '@/components/header';
import { BudgetBasicCard } from '@/components/ui/budget/BudgetCard';
import useAuth from '@/hooks/useAuth';
import { Budget } from '@/interfaces';
import { BudgetService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { SectionList, View } from 'react-native';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function BudgetListView() {
  const { styles, theme } = useStyles(StylesSheet);
  const auth = useAuth();
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ['budgets', 'history', auth.user?.id],
    queryFn: BudgetService.GetBudgetHistoryByUser,
  });

  const sectinosData = useMemo(() => {
    const budgetgrouped = data?.reduce((acc, item) => {
      const key = item.year;
      const oldItems = acc[key] || [];
      return {
        ...acc,
        [key]: [...oldItems, item],
      };
    }, {} as Record<string, Budget[]>);

    const dataByYear = Object.keys(budgetgrouped || {}).map((key) => {
      return {
        title: key,
        data: budgetgrouped?.[key] || [],
      };
    });

    return dataByYear;
  }, [data]);

  return (
    <FetchWrapper loading={isLoading} error={error}>
      <SafeAreasSetting statusBarBgColor={theme.Colors.violet_100} />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: true,
          header: () => {
            return (
              <ScreenHeader
                bgColor={theme.Colors.violet_100}
                textColor={theme.Colors.light_100}
                title={'Budget List'}
              />
            );
          },
        }}
      />
      <View style={styles.container}>
        <SectionList
          sections={sectinosData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <BudgetBasicCard
                amount={item.amount}
                category={item.category!}
                month={item.month}
                onPress={() => {
                  router.push(`/budget/${item.id}`);
                }}
              />
            </View>
          )}
          SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ paddingLeft: 16 }}>
              <Typography fontSize={18} type='Title3'>
                {title}
              </Typography>
            </View>
          )}
        />
      </View>
    </FetchWrapper>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.light_100,
    paddingVertical: 24,
  },
}));

