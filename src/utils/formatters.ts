/**
 * Utility formatters for financial and date representations in demo mode
 */

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `$${millions.toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    return `$${thousands.toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
