/**
 * screens/TradeDetailsScreen.tsx
 * Author: Shawon — github.com/shawon2210
 *
 * The detail view for a single fictional trade. I structured it top-to-bottom
 * the way I'd want to read it: company identity → signal headline → raw numbers
 * → chart trend → educational context → disclaimer. That order mirrors how a
 * real analyst would scan a filing — big picture first, specifics second.
 *
 * The getContextNote() function produces different copy for purchases vs sales
 * and for C-suite vs director roles so the educational section feels relevant
 * to whatever trade is being viewed, not generic boilerplate.
 *
 * Prototype disclaimer is required by the task spec — I made it visually
 * prominent (amber border, warning icon) so nobody can miss it.
 */


import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Clock,
  Coins,
  FileCode,
  Layers,
  UserCheck,
  Info,
  Building,
} from 'lucide-react';
import { InsiderTrade } from '../types/trade';
import { SignalBadge } from '../components/SignalBadge';
import { MockActivityChart } from '../components/MockActivityChart';
import { formatCurrency, formatNumber, formatPrice } from '../utils/formatters';

interface TradeDetailsScreenProps {
  trade: InsiderTrade;
  onNavigateBack: () => void;
}

export const TradeDetailsScreen: React.FC<TradeDetailsScreenProps> = ({
  trade,
  onNavigateBack,
}) => {
  const isPurchase = trade.type === 'purchase';

  // Contextual educational snippet
  const getContextNote = () => {
    if (isPurchase) {
      if (trade.role === 'CEO' || trade.role === 'CFO') {
        return 'A senior executive purchase can be a data point for further research because it shows a disclosed transaction by someone close to the company. It does not reveal the person’s full financial situation or predict future performance.';
      }
      return 'Director or cluster insider buying reflects open-market share accumulation. Disclosures are mandatory under regulatory guidelines but do not guarantee corporate trajectory.';
    } else {
      return 'Executive share sales are routinely scheduled through diversification plans (e.g. 10b5-1 mock programs), tax obligations, or asset reallocation. A sale alone does not indicate lack of confidence in company operations.';
    }
  };

  return (
    <div className="flex flex-col space-y-4 pb-12">
      {/* Top Navigation Bar */}
      <header className="pt-2 flex items-center justify-between">
        <button
          id="details-back-btn"
          type="button"
          onClick={onNavigateBack}
          aria-label="Back to previous screen"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#172033] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
          FICTIONAL DEMO DATA
        </span>
      </header>

      {/* Company Header */}
      <section aria-label="Company Overview" className="bg-[#172033] border border-slate-800 rounded-2xl p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#0B1220] border border-slate-800 font-mono font-bold text-sm text-sky-400">
                {trade.ticker}
              </span>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" />
                {trade.sector}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              {trade.company}
            </h1>
          </div>

          <div className="shrink-0">
            <SignalBadge
              strength={trade.signalStrength}
              label={trade.signal}
              size="md"
              showIcon
            />
          </div>
        </div>
      </section>

      {/* Prominent Signal Card */}
      <section
        aria-label="Signal Highlights"
        className={`rounded-2xl p-4 sm:p-5 border transition-all ${
          isPurchase
            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
            : 'bg-red-950/20 border-red-800/40 text-red-300'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
            {isPurchase ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            )}
            <span>{trade.signal}</span>
          </div>
          <span className="text-xs font-mono font-bold">
            Strength: {trade.signalStrength}
          </span>
        </div>

        <div id="details-trade-value" className="text-2xl sm:text-3xl font-bold font-mono text-slate-100 tracking-tight mb-1">
          {formatCurrency(trade.value)}
        </div>
        <p className="text-xs text-slate-300 opacity-90">
          {formatCurrency(trade.value)} fictional demo insider {isPurchase ? 'buy' : 'sale'} reported by{' '}
          <span className="font-semibold text-white">{trade.insider}</span> ({trade.role}).
        </p>
      </section>

      {/* Structured Grid of Required Trade Details */}
      <section aria-labelledby="filing-details-heading" className="bg-[#172033] border border-slate-800 rounded-2xl p-4">
        <h2 id="filing-details-heading" className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>Filing Specifications</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Insider & Role */}
          <div className="p-3 bg-[#0B1220]/70 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-0.5 font-medium flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-slate-400" />
              Insider
            </span>
            <span className="font-semibold text-slate-200 text-sm">
              {trade.insider} • <span className="text-sky-400">{trade.role}</span>
            </span>
          </div>

          {/* Transaction & Code */}
          <div className="p-3 bg-[#0B1220]/70 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-0.5 font-medium flex items-center gap-1">
              <FileCode className="w-3 h-3 text-slate-400" />
              Transaction
            </span>
            <span className={`font-semibold text-sm ${isPurchase ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPurchase ? 'Purchase ↑' : 'Sale ↓'} • Code {trade.transactionCode}
            </span>
          </div>

          {/* Shares */}
          <div className="p-3 bg-[#0B1220]/70 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-0.5 font-medium flex items-center gap-1">
              <Coins className="w-3 h-3 text-slate-400" />
              Shares Traded
            </span>
            <span className="font-semibold text-slate-200 font-mono text-sm">
              {formatNumber(trade.shares)} shares
            </span>
          </div>

          {/* Price Per Share */}
          <div className="p-3 bg-[#0B1220]/70 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">
              Price Per Share
            </span>
            <span className="font-semibold text-slate-200 font-mono text-sm">
              {formatPrice(trade.pricePerShare)} <span className="text-slate-400 font-normal text-xs">(demo)</span>
            </span>
          </div>

          {/* Total Value */}
          <div className="p-3 bg-[#0B1220]/70 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">
              Total Value
            </span>
            <span className="font-bold text-slate-100 font-mono text-sm">
              {formatCurrency(trade.value)} <span className="text-slate-400 font-normal text-xs">(demo)</span>
            </span>
          </div>

          {/* Signal Strength */}
          <div className="p-3 bg-[#0B1220]/70 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">
              Signal Strength
            </span>
            <span className="font-semibold text-slate-200 text-sm">
              {trade.signalStrength} • {trade.signal}
            </span>
          </div>

          {/* Transaction Date */}
          <div className="p-3 bg-[#0B1220]/70 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-0.5 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              Transaction Date
            </span>
            <span className="font-semibold text-slate-300">
              {trade.transactionDate}
            </span>
          </div>

          {/* Filed Date & Time */}
          <div className="p-3 bg-[#0B1220]/70 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-0.5 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              Filed Date
            </span>
            <span className="font-semibold text-slate-300">
              {trade.filedAt}
            </span>
          </div>
        </div>
      </section>

      {/* Custom Visualization: Mock 7-day activity */}
      <div id="details-chart">
        <MockActivityChart
          data={trade.activityHistory}
          tradeType={trade.type}
          ticker={trade.ticker}
        />
      </div>

      {/* Why This Matters Educational Card */}
      <section aria-labelledby="why-matters-heading" className="bg-[#172033] border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <h3 id="why-matters-heading" className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Why this matters
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {getContextNote()}
        </p>
      </section>

      {/* Required Exact Regulatory/Prototype Disclaimer */}
      <footer id="details-disclaimer" aria-label="Disclaimer" className="bg-[#0B1220] border border-amber-900/30 rounded-2xl p-4">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Prototype Disclaimer
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
