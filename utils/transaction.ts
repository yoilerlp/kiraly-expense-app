import { Transaction } from '@/interfaces';
import dayjs from './date';
import { capitalizeFirstLetter } from './text';

type IGroupBy = 'Week' | 'Month' | 'Year' | 'All';
export const groupTransactionsByDate = (
  grupBy: IGroupBy,
  transactions: Transaction[]
) => {
  const groupFunction = GroupBy[grupBy];

  if (!groupFunction)
    return {
      'This month': transactions,
    };

  const result = groupFunction(transactions);

  return result;
};

const GroupBy: Partial<Record<IGroupBy, any>> = {
  Month: (transactions: Transaction[]) => {
    const result = transactions.reduce(
      (acc, transaction) => {
        const { Today = [], Yesterday = [], Week = [], Other = [] } = acc;

        const today = dayjs();

        const transactionDate = dayjs(transaction.createdAt);

        if (transactionDate.isSame(today, 'day')) {
          Today.push(transaction);
        } else if (transactionDate.isBefore(today, 'day')) {
          Yesterday.push(transaction);
        } else if (transactionDate.isSame(today, 'week')) {
          Week.push(transaction);
        } else {
          Other.push(transaction);
        }

        return {
          Today,
          Yesterday,
          Week,
          Other,
        };
      },
      {
        Today: [] as Transaction[],
        Yesterday: [] as Transaction[],
        Week: [] as Transaction[],
        Other: [] as Transaction[],
      }
    );

    return result;
  },
  Week: (transactions: Transaction[]) => {
    const result = transactions.reduce(
      (acc, transaction) => {
        const { Today = [], Yesterday = [], Other = [] } = acc;

        const today = dayjs();

        const transactionDate = dayjs(transaction.createdAt);

        if (transactionDate.isSame(today, 'day')) {
          Today.push(transaction);
        } else if (transactionDate.isBefore(today, 'day')) {
          Yesterday.push(transaction);
        } else {
          Other.push(transaction);
        }

        return {
          Today,
          Yesterday,
          Other,
        };
      },
      {
        Today: [] as Transaction[],
        Yesterday: [] as Transaction[],
        Other: [] as Transaction[],
      }
    );

    return result;
  },
  Year: (transactions: Transaction[]) => {
    const result = transactions.reduce((acc, transaction) => {
      const transactionDate = dayjs(transaction.createdAt);

      const transactionMonth = capitalizeFirstLetter(
        transactionDate.format('MMMM')
      );

      return {
        ...acc,
        [transactionMonth]: [...(acc[transactionMonth] || []), transaction],
      };
    }, {} as Record<string, Transaction[]>);

    return result;
  },
  All: (transactions: Transaction[]) => {
    return transactions?.reduce((acc, transaction) => {
      const transactionDate = dayjs(transaction.createdAt);

      const transactionYear = capitalizeFirstLetter(
        transactionDate.format('YYYY')
      );

      const transactionMonth = capitalizeFirstLetter(
        transactionDate.format('MMMM')
      );

      const transactionDay = capitalizeFirstLetter(
        transactionDate.format('D')
      );

      const key = `${transactionDay} ${transactionMonth} ${transactionYear}`;

      return {
        ...acc,
        [key]: [...(acc[key] || []), transaction],
      };
    }, {} as Record<string, Transaction[]>);
  },
};

