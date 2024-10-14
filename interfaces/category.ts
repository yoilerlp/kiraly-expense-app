export enum CategoryKey {
  FOOD = 'FOOD',
  BILLS = 'BILLS',
  GASOLINE = 'GASOLINE',
  DIVER = 'DIVER',
  DOMI = 'DOMI',
  LOAN = 'LOAN',
  SALARY = 'SALARY',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SUBSCRIPTION = 'SUBSCRIPTION',
  CLOTHES = 'CLOTHES',
  HOBBY = 'HOBBY',
  MOTOCYCLE = 'MOTOCYCLE',
  TRANSFER = 'TRANSFER',
  TECHNOLOGY = 'TECHNOLOGY',
  HEALTH = 'HEALTH',
  MONEY_LENT = 'MONEY_LENT',
  OTHER = 'OTHER',
}

export interface Category {
  id: string;
  name: string;
  description: string;
  key: CategoryKey;
  type: CategoryType;
  isActive: boolean;
  userId: string;
  mainColor: string | null;
  subColor: string | null;
  icon: string | null;
}

export enum CategoryType {
  USER = 'USER',
  SYSTEM = 'SYSTEM',
}

export enum CategoryColorType {
  VIOLET = 'VIOLET',
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
}

