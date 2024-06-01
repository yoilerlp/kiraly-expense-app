export enum BasicDateFiltersEnum {
  TODAY = 'Today',
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year',
}

export const BasicDateFilters = Object.values(BasicDateFiltersEnum);

export const BasicDateFiltersList = BasicDateFilters.map((filter) => ({
  value: filter,
  label: filter,
}));

