/**
 * utils/formatters.ts
 * Author: Shawon — github.com/shawon2210
 *
 * Three small helpers I wrote to keep number formatting consistent across
 * all three screens. formatCurrency uses M/K shorthand so values stay
 * readable inside narrow card layouts — e.g. "$2.40M" fits on one line
 * where "$2,400,000" would overflow on a 375px viewport.
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
