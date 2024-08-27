import { View, Text } from 'react-native';
import React, { ComponentProps } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '@/components/typography';
import ExpenseSlideCategoryCard from './ExpenseSlideCategoryCard';
import Icon from '@/components/icon';
import { formatCurrency } from '@/utils/currency';
type ExpenseSlideContentProps = ComponentProps<
  typeof ExpenseSlideCategoryCard
> & {
  totalAmountExpensed: number;
  reportDateLabel: string;
};

export default function ExpenseSlideContent({
  reportDateLabel,
  category,
  isIncome,
  categoryAmountExpensed,
  totalAmountExpensed,
}: ExpenseSlideContentProps) {
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

      <View>
        {category && totalAmountExpensed ? (
          <>
            <Typography
              style={{ marginBottom: 24 }}
              center
              color={theme.Colors.light_100}
              type='Title1'
            >
              You {isIncome ? 'Earned 💰' : 'Spend 💸'}
            </Typography>
            <Typography center color={theme.Colors.light_100} type='TitleX'>
              ${formatCurrency(totalAmountExpensed)}
            </Typography>
          </>
        ) : (
          <>
            <Typography center color={theme.Colors.light_100} type='Title3'>
              Sorry, this {reportDateLabel} you have{' '}
              {isIncome ? 'Earned' : 'Spend'} 0 {'\n'} {'\n'}
              <Icon name='Warning' color={theme.Colors.light_100} />
            </Typography>
          </>
        )}
      </View>

      <ExpenseSlideCategoryCard
        isIncome={isIncome}
        category={category}
        categoryAmountExpensed={categoryAmountExpensed}
      />
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  slideContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
