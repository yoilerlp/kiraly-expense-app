import type { RouterAction } from 'expo-quick-actions/router';

export const AppQuickActions: RouterAction[] = [
  {
    id: '0',
    title: 'Add expense',
    subtitle: 'Add new expense',
    icon: 'expense',
    params: {
      href: '/transactions/expense',
    },
  },
  {
    id: '1',
    title: 'Add income',
    subtitle: 'Add new income',
    icon: 'income',
    params: {
      href: '/transactions/income',
    },
  },
];

