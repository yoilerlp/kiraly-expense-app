export const BasicDateFilters = ['Today', 'Week', 'Month', 'Year'] as const;

export const BasicDateFiltersList = BasicDateFilters.map((filter) => ({
  value: filter,
  label: filter,
}));

