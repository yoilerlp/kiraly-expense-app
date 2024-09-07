import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Icon from '@/components/icon';
import Typography from '@/components/typography';
import { Link } from 'expo-router';
import { formatCurrency } from '@/utils/currency';

type Loan = {
  accountId: string;
  accountName: string;
  balance: number;
};

type LoanCardProps = {
  loan: Loan;
};

export default function LoanCard({ loan }: LoanCardProps) {
  const { styles, theme } = useStyles(StylesSheet);
  const balanceIsNegative = loan.balance < 0;
  return (
    <Link
      href={{
        pathname: '/loans/[id]',
        params: {
          id: loan.accountId,
        },
      }}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <View style={styles.name}>
          <Icon name='Profile' size={24} />
          <Typography type='Title4'>{loan.accountName}</Typography>
        </View>
        <View style={styles.balance}>
          <Typography style={styles.amount(balanceIsNegative)} type='Title4'>
            ${formatCurrency(balanceIsNegative ? -loan.balance : loan.balance)}
          </Typography>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    marginBottom: 8,
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: theme.Colors.light_60,
    borderRadius: 16,
  },
  name: {
    flexDirection: 'row',
    gap: 10,
    flexGrow: 1,
  },
  balance: {},
  amount: (isNegative = false) => ({
    color: !isNegative ? theme.Colors.red_100 : theme.Colors.green_100,
  }),
}));
