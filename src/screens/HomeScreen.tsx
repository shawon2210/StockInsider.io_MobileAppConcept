import React from 'react';
import {
  Search,
  TrendingUp,
  TrendingDown,
  FileSpreadsheet,
  Zap,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import { InsiderTrade } from '../types/trade';
import { SummaryCard } from '../components/SummaryCard';
import { TradeCard } from '../components/TradeCard';
import { formatCurrency } from '../utils/formatters';

interface HomeScreenProps {
  trades: InsiderTrade[];
  onNavigateToScreener: (initialSearch?: string, initialSignal?: string) => void;
  onSelectTrade: (trade: InsiderTrade) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  trades,
  onNavigateToScreener,
  onSelectTrade,
}) => {
  // Calculate dynamic sums from the mock array so feed & summaries are 100% consistent
  const totalFilings = trades.length;
  const purchaseTrades = trades.filter((t) => t.type === 'purchase');
  const saleTrades = trades.filter((t) => t.type === 'sale');
  const highStrengthCount = trades.filter((t) => t.signalStrength === 'High').length;

  const totalPurchaseValue = purchaseTrades.reduce((acc, t) => acc + t.value, 0);
  const totalSaleValue = saleTrades.reduce((acc, t) => acc + t.value, 0);

  // Latest 4 trades
  const latestFour = trades.slice(0, 4);

  // Top signal categories
  const topSignals = [
    {
      title: 'Large CEO Purchase',
      desc: 'High-conviction C-level buying',
      count: trades.filter((t) => t.signal === 'Large CEO Purchase' || t.signal === 'Leadership Buy').length,
      color: 'border-emerald-800/60 bg-emerald-950/30 text-emerald-300',
      badge: 'High Signal',
    },
    {
      title: 'Cluster Buy',
      desc: 'Multiple director acquisitions',
      count: trades.filter((t) => t.signal === 'Cluster Buy').length,
      color: 'border-purple-800/60 bg-purple-950/30 text-purple-300',
      badge: 'Multi-insider',
    },
    {
      title: 'Executive Sale',
      desc: 'Significant C-suite disposals',
      count: trades.filter((t) => t.signal === 'Executive Sale' || t.signal === 'Large Sale').length,
      color: 'border-amber-800/60 bg-amber-950/30 text-amber-300',
      badge: 'Disposal',
    },
  ];

  return (
    <div className="flex flex-col space-y-5 pb-8">
      {/* Header */}
      <header className="pt-2">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <h1 id="home-app-title" className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Market Pulse
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-950/80 text-sky-300 border border-sky-800/60">
              Fictional demo data
            </span>
          </div>
          
          <button
            id="header-info-btn"
            type="button"
            onClick={() => onNavigateToScreener()}
            aria-label="Open screener filters"
            className="p-2 rounded-xl bg-[#172033] border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-400">
          Disclosed insider-trading signals & activity overview
        </p>
      </header>

      {/* Search Input Bar (Entry point to Screener) */}
      <div className="relative">
        <button
          id="home-search-trigger"
          type="button"
          onClick={() => onNavigateToScreener()}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#172033] hover:bg-[#1B273F] border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition-all group shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-2.5 text-slate-400 group-hover:text-slate-300">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
            <span className="text-sm font-normal">Search ticker or company</span>
          </div>
          <span className="text-[11px] font-medium text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-lg border border-sky-800/40">
            Browse all
          </span>
        </button>
      </div>

      {/* 3 Summary Cards (+ High Strength Stat) */}
      <section aria-labelledby="summary-heading">
        <div className="flex items-center justify-between mb-2.5">
          <h2 id="summary-heading" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Today's Snapshot
          </h2>
          <span className="text-[11px] text-slate-400">Calculated locally</span>
        </div>

        <div id="home-summary-list" className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <SummaryCard
            id="summary-card-filings"
            title="Transactions"
            value={`${totalFilings} filings`}
            subtitle="Demo filings recorded"
            icon={FileSpreadsheet}
            variant="neutral"
            onClick={() => onNavigateToScreener()}
          />
          <SummaryCard
            id="summary-card-signals"
            title="Top Signals"
            value={`${highStrengthCount} high`}
            subtitle="Notable strength signals"
            icon={Zap}
            variant="accent"
            onClick={() => onNavigateToScreener()}
          />
          <SummaryCard
            id="summary-card-purchases"
            title="Purchase Value"
            value={formatCurrency(totalPurchaseValue)}
            subtitle={`${purchaseTrades.length} demo buys`}
            icon={TrendingUp}
            variant="purchase"
            onClick={() => onNavigateToScreener()}
          />
          <SummaryCard
            id="summary-card-sales"
            title="Sale Value"
            value={formatCurrency(totalSaleValue)}
            subtitle={`${saleTrades.length} demo sales`}
            icon={TrendingDown}
            variant="sale"
            onClick={() => onNavigateToScreener()}
          />
        </div>
      </section>

      {/* Top Signals Today */}
      <section aria-labelledby="top-signals-heading">
        <div className="flex items-center justify-between mb-2.5">
          <h2 id="top-signals-heading" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Top Signals Today
          </h2>
          <span className="text-[11px] text-slate-400">Fictional categories</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {topSignals.map((sig, idx) => (
            <div
              key={idx}
              id={`top-signal-${idx}`}
              onClick={() => onNavigateToScreener(sig.title)}
              role="button"
              tabIndex={0}
              className={`p-3 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${sig.color}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-90">
                  {sig.badge}
                </span>
                <span className="text-xs font-bold font-mono">
                  {sig.count} trades
                </span>
              </div>
              <div className="font-semibold text-sm text-slate-100">
                {sig.title}
              </div>
              <div className="text-[11px] text-slate-300 opacity-80 mt-0.5">
                {sig.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Activity (At least 4 cards) */}
      <section aria-labelledby="latest-activity-heading">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 id="home-latest-header" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Latest Activity
            </h2>
            <p className="text-[11px] text-slate-400">Recent mock filings</p>
          </div>

          <button
            id="browse-all-trades-btn"
            type="button"
            onClick={() => onNavigateToScreener()}
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors py-1 px-2 rounded-lg hover:bg-sky-500/10 cursor-pointer"
          >
            <span>View all ({trades.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {latestFour.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              onClick={onSelectTrade}
              idPrefix="home-latest"
            />
          ))}
        </div>

        {/* Big CTA to Screener */}
        <div className="pt-3">
          <button
            id="home-cta-screener"
            type="button"
            onClick={() => onNavigateToScreener()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
          >
            <span>Open Screener & Filters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Educational safe notice */}
      <div className="bg-[#172033]/60 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Original mobile concept inspired by the broad insider-activity product category; all displayed content is fictional mock/demo data.
        </p>
      </div>
    </div>
  );
};
