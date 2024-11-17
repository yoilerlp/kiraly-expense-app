import { Budget } from './budget';
import { Category } from './category';
import { Transaction } from './transaction';

export interface BasicReport {
  basicExpenses: BasicExpenses;
  budgetsExceeds: Budget[];
  budgets: Budget[];
}

interface BasicExpenses {
  totalExpense: number;
  totalIncome: number;
  balance: number;
  categoryWithMaxIcomeValue: CategoryWithMaxEValue;
  categoryWithMaxExpenseValue: CategoryWithMaxEValue;
  transactions: Transaction[];
}
interface CategoryWithMaxEValue {
  value: number;
  detail: Category;
}

