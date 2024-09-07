export interface Account {
  id: string;
  name: string;
  key: number;
  type: AccountType;
  userId: string;
}

type AccountBalance = {
  total_income: number | null;
  total_expense: number | null;
};

export type AccountWithBalance = {
  account: Account;
  balance: AccountBalance;
};

export enum AccountType {
  CREDIT = 'CREDIT',
  BANK = 'BANK',
  DEBIT = 'DEBIT',
  SAVING = 'SAVING',
  LOAN = 'LOAN',
  CARD = 'CARD',
}
