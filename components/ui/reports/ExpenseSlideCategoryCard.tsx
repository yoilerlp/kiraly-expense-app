import { View } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '@/components/typography';
import CategoryIconCard from '../CategoryIconCard';
import { categoriesColorsConfig } from '@/utils';
import { Category, CategoryKey } from '@/interfaces';
import { formatCurrency } from '@/utils/currency';

type ExpenseSlideCategoryCardProps = {
  isIncome: boolean;
  category: Pick<Category, 'name' | 'key'> | null;
  categoryAmountExpensed: number;
};

export default function ExpenseSlideCategoryCard({
  isIncome = false,
  category,
  categoryAmountExpensed,
}: ExpenseSlideCategoryCardProps) {
  const { styles, theme } = useStyles(StylesSheet);

  const categoryColorConfig =
    categoriesColorsConfig[category?.key || ('' as CategoryKey.OTHER)];

  if (!category) {
    return <View />
  }

  return (
    <View style={styles.container}>
      <Typography center type='Title2'>
        your biggest {'\n'} {isIncome ? 'Income' : 'Expense'} is from
      </Typography>

      <CategoryIconCard
        containerColor={categoryColorConfig?.containerColor}
        iconName={categoryColorConfig?.name}
        categoryName={category.name}
      />

      <Typography fontSize={36} type='Title3'>
        $ {formatCurrency(categoryAmountExpensed)}
      </Typography>
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    gap: 8,
    backgroundColor: theme.Colors.light_100,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
}));
