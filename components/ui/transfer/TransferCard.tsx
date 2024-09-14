import { View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Icon from '@/components/icon';
import Typography from '@/components/typography';
import { getTransactionCategoryIcon } from '@/utils/category';
import { formatTransactionCardDateByFilter } from '@/utils/date';
import { Link } from 'expo-router';
import { formatCurrency } from '@/utils/currency';
import { BasicDateFiltersEnum } from '@/utils';
import { CategoryKey, Transfer } from '@/interfaces';

type TransferCardCardProps = {
  transfer: Transfer;
  dateFormat?: string;
};

function TransferCard({
  transfer,
  dateFormat = 'Year',
}: TransferCardCardProps) {
  const { styles, theme } = useStyles(StylesSheet);

  const iconDetails = getTransactionCategoryIcon(CategoryKey.TRANSFER);

  const isExpense = false;

  const transactionSign = isExpense ? '-' : '+';

  return (
    <Link href={`/transactions/view/transfer/${transfer.id}`} asChild>
      <TouchableOpacity style={styles.container} activeOpacity={0.8}>
        {/* PADDING HERE */}
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: iconDetails.containerColor,
              },
            ]}
          >
            <Icon
              name={iconDetails.name}
              color={iconDetails.iconColor}
              size={40}
            />
          </View>

          <View style={styles.detailsContainer}>
            {/* CAteory y amount */}
            <View style={styles.categoryAndAmountContainer}>
              <Typography
                type='Body2'
                color={theme.Colors.dark_100}
                style={{ textTransform: 'capitalize' }}
              >
                {transfer.originAccount.name} {'->'}{' '}
                {transfer.destinationAccount.name}
              </Typography>
              <Typography
                type='Title4'
                style={styles.transactionAmount(isExpense)}
              >
                {transactionSign} ${formatCurrency(Number(transfer.amount))}
              </Typography>
            </View>
            {/* DEscription and date */}
            <View style={styles.categoryAndAmountContainer}>
              <Typography
                type='Body3'
                color={theme.Colors.dark_25}
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{ width: '40%' }}
              >
                {transfer.description}
              </Typography>
              <Typography
                type='Body3'
                color={theme.Colors.dark_25}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {formatTransactionCardDateByFilter({
                  dateS: transfer.createdAt,
                  dateFilterKey: BasicDateFiltersEnum.YEAR,
                })}
              </Typography>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.Colors.light_80,
    borderRadius: 24,
    height: 90,
    padding: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  iconContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.Colors.yellow_20,
    padding: 10,
    borderRadius: 16,
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 3,
    justifyContent: 'space-between',
  },
  categoryAndAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionAmount: (isExpense) => ({
    color: isExpense ? theme.Colors.red_100 : theme.Colors.green_100,
  }),
}));

export default memo(TransferCard);

