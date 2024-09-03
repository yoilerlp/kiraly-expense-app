import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Account } from '@/interfaces';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Icon from '@/components/icon';
import Typography from '@/components/typography';
import { Link } from 'expo-router';

type AccountCardProps = {
  account: Account;
};

const AccountCard = ({ account }: AccountCardProps) => {
  const { styles, theme } = useStyles(StylesSheet);
  return (
    <Link
      href={{
        pathname: '/account/[id]',
        params: {
          id: account.id,
        },
      }}
      asChild
    >
      <TouchableOpacity style={styles.wrapper} activeOpacity={0.3}>
        <View style={styles.container}>
          <View style={styles.accountType}>
            <Icon
              name={account.type === 'BANK' ? 'Salary' : 'Wallet'}
              size={32}
              color={theme.Colors.green_80}
            />
          </View>
          <Typography type='Title4'>{account.name}</Typography>
          <View style={styles.iconsContainer}>
            <Icon.WithLink
              href={`/account/update/${account.id}`}
              size={24}
              name='Edit'
              color={theme.Colors.violet_100}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const StylesSheet = createStyleSheet((theme) => ({
  wrapper: {
    borderBottomWidth: 1,
    borderColor: theme.Colors.light_60,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  accountType: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F1F1FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
    flexGrow: 1,
  },
}));

export default AccountCard;
