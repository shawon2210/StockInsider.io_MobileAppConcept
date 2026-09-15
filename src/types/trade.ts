/**
 * types/trade.ts
 * Author: Shawon
 * GitHub: https://github.com/shawon2210
 *
 * Core TypeScript types for the Market Pulse prototype.
 * I decided to use a union type for role/type rather than enums so the data
 * stays plain-serializable and easy to filter with strict equality checks
 * in the screener — no .toString() noise, no enum reverse-mapping quirks.
 *
 * activityHistory holds 7 normalized integers I made up for each trade;
 * they drive the bezier SVG chart in TradeDetailsScreen without any live data.
 */

export type InsiderRole = 'CEO' | 'CFO' | 'Director' | 'Officer';

export type TradeType = 'purchase' | 'sale';


export type SignalStrength = 'High' | 'Medium' | 'Low';

export interface InsiderTrade {
  id: string;
  ticker: string;
  company: string;
  sector: string;
  insider: string;
  role: InsiderRole;
  type: TradeType;
  transactionCode: 'P' | 'S';
  shares: number;
  pricePerShare: number;
  value: number;
  transactionDate: string;
  filedAt: string;
  signal: string;
  signalStrength: SignalStrength;
  activityHistory: number[]; // 7-day volume/activity normalized values for the chart
}

export type ScreenName = 'Home' | 'Screener' | 'TradeDetails';

export interface FilterState {
  searchQuery: string;
  type: 'all' | 'purchase' | 'sale';
  role: 'all' | InsiderRole;
  threshold: number; // 0 for Any, 100000, 500000, 1000000
}
