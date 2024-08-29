export const formatCurrency = (value: number) => {
  const currencyFormater = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    signDisplay: 'never',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    notation: 'standard',
  });

  return currencyFormater.format(Math.round(value));
};
