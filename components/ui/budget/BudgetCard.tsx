import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import CategoryTag from '../CategoryTag';

import Icon from '@/components/icon';
import Typography from '@/components/typography';
import ProgressBar from '@/components/graph/ProgressBar';

type BudgetCardProps = {
  categoryName: string;
  categoryKey?: string;
  amountUsed: number;
  amount: number;
  onPress?: () => void;
};

function BudgetCard({
  amount,
  amountUsed,
  categoryName,
  onPress,
}: BudgetCardProps) {
  const { styles, theme } = useStyles(budgetCardStyles);

  const limitIsExceeded = amountUsed > amount;

  const remainingAmount = amount - amountUsed;

  const remainingIsNegative = remainingAmount < 0;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.categorySection}>
        <CategoryTag categoryName={categoryName} />
        {limitIsExceeded ? (
          <Icon name='Warning' color={theme.Colors.red_100} size={32} />
        ) : null}
      </View>
      <Typography type='Title2'>
        Remaining ${remainingIsNegative ? 0 : remainingAmount}
      </Typography>
      <ProgressBar progress={20} fillColor={theme.Colors.red_100} />
      <Typography
        color={theme.Colors.light_20}
        type='Body1'
        style={{ marginTop: 4, marginBottom: 10 }}
      >
        ${amountUsed} of ${amount}
      </Typography>
      {limitIsExceeded ? (
        <Typography color={theme.Colors.red_100} type='Body1'>
          You’ve exceed the limit!
        </Typography>
      ) : null}
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

