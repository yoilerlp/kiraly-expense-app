import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '@/components/typography';
import { Budget, CategoryKey } from '@/interfaces';
import CategoryIconCard from '../CategoryIconCard';
import { categoriesColorsConfig } from '@/utils';

type ExpenseSlideBudgetCardProps = {
  reportDateLabel: string;
  budgetsExceeds: Budget[];
  allBudgets: Budget[];
};

export default function ExpenseSlideBudgetCard({
  reportDateLabel,
  budgetsExceeds,
  allBudgets,
}: ExpenseSlideBudgetCardProps) {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <View style={styles.slideContent}>
      <Typography
        type='Title2'
        center
        style={{ marginTop: 40, opacity: 0.7 }}
        color={theme.Colors.light_100}
      >
        This {reportDateLabel}
      </Typography>

      {budgetsExceeds?.length > 0 ? (
        <View style={styles.budgetsContainer}>
          <Typography type='Title1' center color={theme.Colors.light_100}>
            {budgetsExceeds?.length} of {allBudgets.length} Budget is {'\n'}{' '}
            exceeds the limit
          </Typography>
          <View style={styles.budgetList}>
            {budgetsExceeds?.map((budget) => {
              const categoryColorConfig =
                categoriesColorsConfig[
                  budget?.category?.key! || ('' as CategoryKey.OTHER)
                ];
              return (
                <CategoryIconCard
                  key={budget?.id}
                  wrapperStyles={{ backgroundColor: theme.Colors.light_100 }}
                  categoryName={budget?.category?.name!}
                  iconName={categoryColorConfig.name}
                  containerColor={categoryColorConfig.containerColor}
                />
              );
            })}
          </View>
        </View>
      ) : (
        <>
          <Typography type='Title1' center color={theme.Colors.light_100}>
            Great! No budget exceed the limit
          </Typography>
        </>
      )}

      <Text></Text>
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  slideContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetsContainer: {
    gap: 28,
  },
  budgetList: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
}));
