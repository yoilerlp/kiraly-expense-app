export const formatCurrency = (value: number) => {
  const currencyFormater = new Intl.NumberFormat('de-DE', {
    // style: 'currency',
    // currency: 'USD',
    // signDisplay: 'never',
    // // maximumFractionDigits: 0,
    // minimumFractionDigits: 0,
    // notation: 'standard',
  });

  return currencyFormater.format(Math.round(value));
};
