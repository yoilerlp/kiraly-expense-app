import { Account } from './account';
import { Category } from './category';
import { FileItemDb } from './file';

export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
}

export interface Transaction {
  id: string;
  key: number;
  description: string;
  amount: number;
  type: TransactionType;
  userId: string;
  accountId: string;
  categoryId: string;
  account: Account;
  category: Category;
  transactionFiles: {
    id: string;
    file: FileItemDb;
  }[];
  createdAt: string;
}

export type IFilterTransactionParams = {
  limit?: number;
  page?: number;
  minDate?: string;
  maxDate?: string;
  orderBy?: 'HIGHEST' | 'LOWEST' | 'NEWEST' | 'OLDEST';
  type?: TransactionType[];
  categories?: string[];
  accounts?: string[];
};

