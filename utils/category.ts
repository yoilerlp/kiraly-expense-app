import { IconName } from '@/components/icon';
import { CategoryKey } from '@/interfaces/category';
import { Colors } from '@/theme/Colors';

interface TransactionCategoryIcon {
  name: IconName;
  containerColor: string;
  iconColor: string;
}

export const getTransactionCategoryIcon = (
  categoryKey: CategoryKey
): TransactionCategoryIcon => {
  switch (categoryKey) {
    case CategoryKey.FOOD:
      return {
        name: 'Food',
        containerColor: Colors.green_20,
        iconColor: Colors.green_100,
      };

    case CategoryKey.TEST:
      return {
        name: 'Subscription',
        containerColor: Colors.violet_20,
        iconColor: Colors.violet_100,
      };

    default:
      return {
        name: 'Food',
        containerColor: Colors.red_20,
        iconColor: Colors.red_100,
      };
  }
};

