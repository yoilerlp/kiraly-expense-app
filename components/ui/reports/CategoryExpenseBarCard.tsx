import { View } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '@/components/typography';
import CategoryTag from '../CategoryTag';
import { Category } from '@/interfaces';
import { capitalizeFirstLetter, categoriesColorsConfig } from '@/utils';
import ProgressBar from '@/components/graph/ProgressBar';
import { formatCurrency } from '@/utils/currency';

type CategoryExpenseBarCardProps = {
  category: Category;
  amount: number;
  percentage: number;
  isIncome?: boolean;
};

export default function CategoryExpenseBarCard({
  category,
  amount,
  percentage,
  isIncome = false,
}: CategoryExpenseBarCardProps) {
  const { styles, theme } = useStyles(StylesSheet);

  const categoryColorConfig = categoriesColorsConfig[category.key];

  const categoryName = capitalizeFirstLetter(category.name);

  const transactionSymbol = isIncome ? '+' : '-';

  const textColor = isIncome ? theme.Colors.green_100 : theme.Colors.red_100;

  return (
    <View style={styles.container}>
      <View style={styles.categorySection}>
        <CategoryTag
          categoryName={categoryName}
          color={categoryColorConfig?.iconColor}
        />
        <Typography
          type='Title2'
          color={textColor}
          style={{ textTransform: 'capitalize' }}
        >
          {transactionSymbol} ${formatCurrency(amount)}
        </Typography>
      </View>
      <ProgressBar
        progress={percentage}
        fillColor={categoryColorConfig?.iconColor || theme.Colors.dark_100}
      />
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {},
  categorySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
}));
