/**
 * components/TradeCard.tsx
 * Author: Shawon — github.com/shawon2210
 *
 * Card component for displaying a single trade in both Home and Screener feeds.
 * Key design considerations I focused on:
 * - 3-tier hierarchy: Ticker/Company top, Value/Type middle, Insider/Role bottom.
 * - Double cues: text "Purchase ↑" / "Sale ↓" + colors for strict accessibility.
 * - Keyboard support: onKeyDown handler for Enter and Space accessibility.
 */

import React from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronRight, User } from 'lucide-react';
import { InsiderTrade } from '../types/trade';
import { SignalBadge } from './SignalBadge';
import { formatCurrency } from '../utils/formatters';


interface TradeCardProps {
  trade: InsiderTrade;
  onClick: (trade: InsiderTrade) => void;
  idPrefix?: string;
}

export const TradeCard: React.FC<TradeCardProps> = ({
  trade,
  onClick,
  idPrefix = 'trade-card',
}) => {
  const isPurchase = trade.type === 'purchase';

  return (
    <div
      id={`${idPrefix}-${trade.id}`}
      role="button"
      tabIndex={0}
      onClick={() => onClick(trade)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(trade);
        }
      }}
      className="group relative bg-[#172033] hover:bg-[#1B273F] active:bg-[#151D2E] rounded-2xl p-4 border border-slate-800 hover:border-slate-700/80 transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500/50"
    >
      {/* Top row: Ticker, Company Name, Signal badge */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="bg-[#0B1220] border border-slate-800 rounded-xl px-2.5 py-1 shrink-0">
            <span className="font-mono font-bold text-sm text-slate-100 tracking-wider">
              {trade.ticker}
            </span>
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
              {trade.company}
            </h4>
            <span className="text-[11px] text-slate-400 block truncate">
              {trade.sector}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <SignalBadge strength={trade.signalStrength} label={trade.signal} size="sm" />
        </div>
      </div>

      {/* Middle row: Value & Transaction Type with Icon & Color */}
      <div className="flex items-baseline justify-between pt-1 pb-2 border-t border-slate-800/60">
        <div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">
            Trade Value
          </span>
          <span className="text-lg font-bold text-slate-100 font-mono tracking-tight">
            {formatCurrency(trade.value)}
          </span>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">
            Type
          </span>
          <div
            className={`inline-flex items-center gap-1 font-semibold text-sm ${
              isPurchase ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {isPurchase ? (
              <ArrowUpRight className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 shrink-0 text-red-400" />
            )}
            <span>{isPurchase ? 'Purchase ↑' : 'Sale ↓'}</span>
          </div>
        </div>
      </div>

      {/* Bottom row: Insider Name & Role, Filing Timestamp, chevron */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/40 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-medium text-slate-300 truncate">{trade.insider}</span>
          <span className="text-slate-400">•</span>
          <span className="bg-slate-800/80 text-slate-300 px-1.5 py-0.5 rounded text-[11px] font-semibold shrink-0">
            {trade.role}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-slate-400 ml-2">
          <span>{trade.filedAt}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};
