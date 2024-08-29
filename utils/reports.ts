import { Category, Transaction, TransactionType } from '@/interfaces';
import { BasicReport } from '@/interfaces/statistics';
import { LineChartData } from './chart';
import { getMinAndMaxDate } from './date';

export const generateFinancialReportData = (data: BasicReport | undefined) => {
  if (!data) return;

  const transactions = data?.basicExpenses?.transactions || [];

  const transactionsDates: string[] = [];

  const expensesTransactions: Transaction[] = [];
  const incomeTransactions: Transaction[] = [];

  const expensesByCategory: Record<
    string,
    {
      category: Category;
      amount: number;
    }
  > = {};

  const incomeByCategory: typeof expensesByCategory = {};

  const lineChartValuesExpenses: LineChartData = [];
  const lineChartValuesIncome: LineChartData = [];

  transactions.forEach((transaction) => {
    // save date
    transactionsDates.push(transaction.createdAt);

    // save line chart values

    const lineChartItemValue = {
      date: new Date(transaction.createdAt),
      value: transaction.amount,
    };

    if (transaction.type === TransactionType.EXPENSE) {
      lineChartValuesExpenses.push(lineChartItemValue);
      expensesTransactions.push(transaction);
    } else {
      lineChartValuesIncome.push(lineChartItemValue);
      incomeTransactions.push(transaction);
    }

    if (transaction.type === TransactionType.EXPENSE) {
      const oldAmount =
        expensesByCategory[transaction.category.id]?.amount || 0;

      expensesByCategory[transaction.category.id] = {
        category: transaction.category,
        amount: oldAmount + transaction.amount,
      };
    } else {
      const oldAmount = incomeByCategory[transaction.category.id]?.amount || 0;

      incomeByCategory[transaction.category.id] = {
        category: transaction.category,
        amount: oldAmount + transaction.amount,
      };
    }
  });

  const { minDate, maxDate } = getMinAndMaxDate(transactionsDates);

  const categoryExpenses = Object.values(expensesByCategory)
    .map((category) => ({
      ...category,
      percentage: Math.round(
        (category.amount / data?.basicExpenses?.totalExpense || 0) * 100
      ),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const categoryIncomes = Object.values(incomeByCategory)
    .map((category) => ({
      ...category,
      percentage: Math.round(
        (category.amount / data?.basicExpenses?.totalIncome) * 100
      ),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return {
    minDate,
    maxDate,
    categoryExpenses,
    categoryIncomes,
    lineChartValuesExpenses,
    lineChartValuesIncome,
    expensesTransactions,
    incomeTransactions,
  };
};
