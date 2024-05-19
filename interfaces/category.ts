export enum CategoryKey {
  FOOD = 'FOOD',
  TRANSFER = 'TRANSFER',
  TEST2 = 'TEST2',
  TEST = 'TEST',
}

export interface Category {
  id: string;
  name: string;
  description: string;
  key: CategoryKey;
}

