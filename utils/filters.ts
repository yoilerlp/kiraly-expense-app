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


export const AllFilterValue = 'All';

export const FilterOptionsList = [
  {
    label: 'Week',
    value: BasicDateFiltersEnum.WEEK,
  },
  {
    label: 'Month',
    value: BasicDateFiltersEnum.MONTH,
  },
  {
    label: 'Year',
    value: BasicDateFiltersEnum.YEAR,
  },
  {
    label: 'All',
    value: AllFilterValue,
  },
];

