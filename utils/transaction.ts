import { Transaction } from '@/interfaces';
import * as dateFns from 'date-fns';
import * as dateFnsTz from 'date-fns-tz';
import { capitalizeFirstLetter } from './text';


export const BALANCE_QUERY_KEY = 'user_balance_key';

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
        const today = dateFnsTz.toZonedTime(new Date(), 'UTC');
        const transactionDate = new Date(transaction.createdAt);
        if (dateFns.isSameDay(today, transactionDate)) {
          Today.push(transaction);
        } else if (dateFns.isBefore(transactionDate, today)) {
          Yesterday.push(transaction);
        } else if (dateFns.isSameWeek(transactionDate, today)) {
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

        const today = dateFnsTz.toZonedTime(new Date(), 'UTC');

        const transactionDate = new Date(transaction.createdAt);

        if (dateFns.isSameDay(today, transactionDate)) {
          Today.push(transaction);
        } else if (dateFns.isBefore(transactionDate, today)) {
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
      const transactionDate = new Date(transaction.createdAt);

      const transactionMonth = capitalizeFirstLetter(
        dateFns.format(transactionDate, 'MMMM')
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
      const transactionDate = new Date(transaction.createdAt);

      const transactionYear = capitalizeFirstLetter(
        // transactionDate.format('YYYY')
        dateFns.format(transactionDate, 'YYYY')
      );

      const transactionMonth = capitalizeFirstLetter(
        // transactionDate.format('MMMM')
        dateFns.format(transactionDate, 'MMMM')
      );

      const transactionDay = capitalizeFirstLetter(
        // transactionDate.format('D')
        dateFns.format(transactionDate, 'D')
      );

      const key = `${transactionDay} ${transactionMonth} ${transactionYear}`;

      return {
        ...acc,
        [key]: [...(acc[key] || []), transaction],
      };
    }, {} as Record<string, Transaction[]>);
  },
};
