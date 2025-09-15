export default function formatAmountToNumber(formattedValue: string): number {

  if (formattedValue.length < 1 || typeof formattedValue !== 'string') {
    return 0
  }

  const rawValue = formattedValue.replace(/\./g, '').replace(',', '.');

  return parseFloat(rawValue);
}

export function formatNumberToAmount(amount: number): string {
  const [integerPart, decimalPart] = amount.toString().split('.');

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
}
