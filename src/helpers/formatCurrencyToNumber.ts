export default function formatCurrencyToNumber(currencyText: string | number) {
  return Number(`${currencyText}`.replace(/[^\d]/g, ''));
}
