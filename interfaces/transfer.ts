import { Account } from './account';
import { FileItemDb } from './file';

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

