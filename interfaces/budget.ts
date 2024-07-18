import { Category } from './category';

export type Budget = {
  id: string;
  description: string;
  amount: number;
  amountAlert: number | null;
  receiveAlert: boolean;
  month: number;
  year: number;
  createdAt: string;
  userId: string;
  categoryId: string;
  category?: Category;
};

