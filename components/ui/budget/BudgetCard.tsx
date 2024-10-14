import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import CategoryTag from '../CategoryTag';

import Icon from '@/components/icon';
import Typography from '@/components/typography';
import ProgressBar from '@/components/graph/ProgressBar';
import { getCategoryConfig } from '@/utils';
import { formatCurrency } from '../../../utils/currency';
import { Category } from '@/interfaces';

type BudgetCardProps = {
  amountUsed: number;
  amount: number;
  warningAmount?: number;
  category: Category;
  onPress?: () => void;
};

function BudgetCard({
  amount,
  amountUsed,
  warningAmount,
  category,
  onPress,
}: BudgetCardProps) {
  const { styles, theme } = useStyles(budgetCardStyles);

  const amountIsExceeded = amountUsed > amount;
  const alertAmountIsExceeded = warningAmount && amountUsed > warningAmount;

  const limitIsExceeded = amountIsExceeded || alertAmountIsExceeded;
  // const limitIsExceeded = true;

  const remainingAmount = amount - amountUsed;

  const remainingIsNegative = remainingAmount < 0;

  const categoryColorConfig = getCategoryConfig(category);

  const percentageUsed = Math.round((amountUsed / amount) * 100);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.categorySection}>
        <CategoryTag
          categoryName={category?.name}
          color={categoryColorConfig?.iconColor}
        />
        {limitIsExceeded ? (
          <Icon name='Warning' color={theme.Colors.red_100} size={32} />
        ) : null}
      </View>
      <Typography type='Title2'>
        Remaining ${remainingIsNegative ? 0 : formatCurrency(remainingAmount)}
      </Typography>
      <ProgressBar
        progress={percentageUsed}
        fillColor={categoryColorConfig?.iconColor || theme.Colors.dark_100}
      />
      <Typography
        color={theme.Colors.light_20}
        type='Body1'
        style={{ marginTop: 4, marginBottom: 10 }}
      >
        ${formatCurrency(amountUsed)} of ${formatCurrency(amount)}
      </Typography>
      {limitIsExceeded ? (
        <Typography color={theme.Colors.red_100} type='Body1'>
          You’ve exceed the limit!
        </Typography>
      ) : null}
    </TouchableOpacity>
  );
}

export function BudgetBasicCard({
  category,
  onPress,
  amount,
  month,
}: Omit<BudgetCardProps, 'amountUsed'> & { month: number }) {
  const { styles } = useStyles(budgetCardStyles);

  const categoryColorConfig = getCategoryConfig(category);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.categorySection}>
        <CategoryTag
          categoryName={category.name}
          color={categoryColorConfig?.iconColor}
        />
        <Typography type='Body1'> Month: {month}</Typography>
      </View>
      <Typography type='Title2'>Amount ${formatCurrency(amount)}</Typography>
    </TouchableOpacity>
  );
}

const budgetCardStyles = createStyleSheet((theme) => ({
  container: {
    padding: 16,
    width: '100%',
  },
  categorySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
}));

export default BudgetCard;

