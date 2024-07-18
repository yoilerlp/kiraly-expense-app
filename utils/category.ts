import { IconName } from '@/components/icon';
import { CategoryKey } from '@/interfaces/category';
import { Colors } from '@/theme/Colors';

interface TransactionCategoryIcon {
  name: IconName;
  containerColor: string;
  iconColor: string;
}

// iconos faltantes //
// para otros

export const categoriesColorsConfig: Record<CategoryKey, TransactionCategoryIcon> = {
  [CategoryKey.FOOD]: {
    name: 'Food',
    containerColor: Colors.red_20,
    iconColor: Colors.red_100,
  },
  [CategoryKey.BILLS]: {
    name: 'Subscription',
    containerColor: Colors.violet_20,
    iconColor: Colors.violet_100,
  },
  [CategoryKey.GASOLINE]: {
    name: 'Transportation',
    containerColor: Colors.red_20,
    iconColor: Colors.red_100,
  },
  [CategoryKey.DIVER]: {
    name: 'Profile',
    containerColor: Colors.green_20,
    iconColor: Colors.green_100,
  },
  [CategoryKey.LOAN]: {
    name: 'Transaction',
    containerColor: Colors.violet_20,
    iconColor: Colors.violet_100,
  },
  [CategoryKey.SALARY]: {
    name: 'Salary',
    containerColor: Colors.green_20,
    iconColor: Colors.green_100,
  },
  [CategoryKey.ENTERTAINMENT]: {
    name: 'Hobby',
    containerColor: Colors.blue_20,
    iconColor: Colors.blue_100,
  },
  [CategoryKey.SUBSCRIPTION]: {
    name: 'Subscription',
    containerColor: Colors.violet_20,
    iconColor: Colors.violet_100,
  },
  [CategoryKey.CLOTHES]: {
    name: 'Shooping',
    containerColor: Colors.green_20,
    iconColor: Colors.green_100,
  },
  [CategoryKey.HOBBY]: {
    name: 'Hobby',
    containerColor: Colors.yellow_20,
    iconColor: Colors.yellow_100,
  },
  [CategoryKey.MOTOCYCLE]: {
    name: 'Transportation',
    containerColor: Colors.blue_20,
    iconColor: Colors.blue_100,
  },
  [CategoryKey.TRANSFER]: {
    name: 'Transfer',
    containerColor: Colors.blue_20,
    iconColor: Colors.blue_100,
  },
  [CategoryKey.TECHNOLOGY]: {
    name: 'Tech',
    containerColor: Colors.blue_20,
    iconColor: Colors.blue_100,
  },
  [CategoryKey.HEALTH]: {
    name: 'Health',
    containerColor: Colors.green_20,
    iconColor: Colors.green_100,
  },
  [CategoryKey.MONEY_LENT]: {
    name: 'Transaction',
    containerColor: Colors.green_20,
    iconColor: Colors.green_100,
  },
  [CategoryKey.DOMI]: {
    name: 'Profile',
    containerColor: Colors.blue_20,
    iconColor: Colors.blue_100,
  },
  [CategoryKey.OTHER]: {
    name: 'Other',
    containerColor: Colors.light_40,
    iconColor: Colors.dark_100,
  },
};

export const getTransactionCategoryIcon = (
  categoryKey: CategoryKey
): TransactionCategoryIcon => {
  return categoriesColorsConfig[categoryKey];
};

