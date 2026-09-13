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
