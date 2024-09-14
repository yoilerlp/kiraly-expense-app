import { Account } from './account';
import { FileItemDb } from './file';
import { SortTransactionBy } from './transaction';

export interface Transfer {
  id: string;
  key: number;
  description: string;
  amount: number;
  createdAt: string;
  userId: string;
  originAccountId: string;
  destinationAccountId: string;
  originAccount: Account;
  destinationAccount: Account;
  transferFiles: {
    id: string;
    file: FileItemDb;
  }[];
}

export type IFilterTransferParams = {
  limit?: number;
  page?: number;
  minDate?: string;
  maxDate?: string;
  orderBy?: SortTransactionBy;
};

