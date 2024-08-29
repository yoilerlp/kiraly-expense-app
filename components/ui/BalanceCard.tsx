import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Icon, { IconName } from '../icon';
import Typography from '../typography';
import { numberToTwoDecimals } from '@/utils/number';
import { formatCurrency } from '../../utils/currency';

type BalanceCardProps = {
  type: 'income' | 'expense';
  amount: number;
  iconName?: IconName;
  description: string;
};

export default function BalanceCard({
  type,
  amount,
  description,
  iconName,
}: BalanceCardProps) {
  const { styles, theme } = useStyles(balanceCardStyles, {
    type,
  });

  const cardColor =
    type === 'income' ? theme.Colors.green_100 : theme.Colors.red_100;

  const icon: IconName = iconName || (type === 'income' ? 'Income' : 'Expense');
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={32} color={cardColor} />
      </View>
      <View style={styles.textContainer}>
        <Typography fontSize={15} color={theme.Colors.light_80} type='Body3'>
          {description}
        </Typography>
        <Typography
          numberOfLines={1}
          ellipsizeMode='tail'
          fontSize={16}
          color={theme.Colors.light_80}
          type='Title3'
        >
          ${formatCurrency(amount)}
        </Typography>
      </View>
    </View>
  );
}

const balanceCardStyles = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: theme.Colors.light_80,
    padding: 16,
    height: 80,
    borderRadius: 28,
    minWidth: 174,
    maxWidth: 174,
    variants: {
      type: {
        income: {
          backgroundColor: theme.Colors.green_100,
        },
        expense: {
          backgroundColor: theme.Colors.red_100,
        },
      },
    },
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: theme.Colors.light_100,
    padding: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'space-between',
  },
}));

