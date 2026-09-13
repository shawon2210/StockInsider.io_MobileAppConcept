import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  ArrowLeft,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  SlidersHorizontal,
  Briefcase,
  DollarSign,
  Filter,
} from 'lucide-react';
import { InsiderRole, InsiderTrade, TradeType } from '../types/trade';
import { TradeCard } from '../components/TradeCard';
import { FilterChip } from '../components/FilterChip';

interface ScreenerScreenProps {
  trades: InsiderTrade[];
  initialSearchQuery?: string;
  onSelectTrade: (trade: InsiderTrade) => void;
  onNavigateBack: () => void;
}

export const ScreenerScreen: React.FC<ScreenerScreenProps> = ({
  trades,
  initialSearchQuery = '',
  onSelectTrade,
  onNavigateBack,
}) => {
  // Search state
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  // 3 independent filter groups
  const [typeFilter, setTypeFilter] = useState<'all' | TradeType>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'CEO' | 'CFO' | 'Director'>('all');
  const [thresholdFilter, setThresholdFilter] = useState<number>(0); // 0 = Any, 100k, 500k, 1m

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Derived filtered trades
  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      // 1. Search filter: ticker or company case-insensitively, or signal
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTicker = trade.ticker.toLowerCase().includes(query);
        const matchesCompany = trade.company.toLowerCase().includes(query);
        const matchesSignal = trade.signal.toLowerCase().includes(query);
        const matchesInsider = trade.insider.toLowerCase().includes(query);

        if (!matchesTicker && !matchesCompany && !matchesSignal && !matchesInsider) {
          return false;
        }
      }

      // 2. Transaction Type filter: All, Purchases, Sales
      if (typeFilter !== 'all' && trade.type !== typeFilter) {
        return false;
      }

      // 3. Role filter: All roles, CEO, CFO, Director (Officer stays in 'all')
      if (roleFilter !== 'all' && trade.role !== roleFilter) {
        return false;
      }

      // 4. Value Threshold: Any, $100K+, $500K+, $1M+
      if (thresholdFilter > 0 && trade.value < thresholdFilter) {
        return false;
      }

      return true;
    });
  }, [trades, searchQuery, typeFilter, roleFilter, thresholdFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    typeFilter !== 'all' ||
    roleFilter !== 'all' ||
    thresholdFilter > 0;

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setRoleFilter('all');
    setThresholdFilter(0);
  };

  return (
    <div className="flex flex-col space-y-4 pb-8">
      {/* Header with Back button */}
      <header className="pt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <button
            id="screener-back-btn"
            type="button"
            onClick={onNavigateBack}
            aria-label="Back to Market Pulse"
            className="p-2 -ml-1 rounded-xl bg-[#172033] border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
              Latest Trades
            </h1>
            <p className="text-[11px] text-slate-400">Interactive insider activity screener</p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            id="screener-reset-top-btn"
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </header>

      {/* Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            id="screener-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticker or company..."
            className="w-full pl-10 pr-9 py-2.5 bg-[#172033] border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
          />
          {searchQuery && (
            <button
              id="screener-clear-search-btn"
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3 Independent Filter Groups */}
      <section aria-label="Screener filter groups" className="space-y-3 bg-[#172033]/60 p-3.5 rounded-2xl border border-slate-800/80">
        {/* Filter 1: Transaction Type */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <SlidersHorizontal className="w-3 h-3 text-sky-400" />
            <span>Transaction Type</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              id="filter-type-all"
              label="All Types"
              active={typeFilter === 'all'}
              onClick={() => setTypeFilter('all')}
            />
            <FilterChip
              id="filter-type-purchases"
              label="Purchases"
              active={typeFilter === 'purchase'}
              activeColor="emerald"
              icon={<ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />}
              onClick={() => setTypeFilter('purchase')}
            />
            <FilterChip
              id="filter-type-sales"
              label="Sales"
              active={typeFilter === 'sale'}
              activeColor="rose"
              icon={<ArrowDownRight className="w-3.5 h-3.5 text-red-400" />}
              onClick={() => setTypeFilter('sale')}
            />
          </div>
        </div>

        {/* Filter 2: Insider Role */}
        <div className="pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Briefcase className="w-3 h-3 text-purple-400" />
            <span>Insider Role</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              id="filter-role-all"
              label="All roles"
              active={roleFilter === 'all'}
              onClick={() => setRoleFilter('all')}
            />
            <FilterChip
              id="filter-role-ceo"
              label="CEO"
              active={roleFilter === 'CEO'}
              activeColor="purple"
              onClick={() => setRoleFilter('CEO')}
            />
            <FilterChip
              id="filter-role-cfo"
              label="CFO"
              active={roleFilter === 'CFO'}
              activeColor="purple"
              onClick={() => setRoleFilter('CFO')}
            />
            <FilterChip
              id="filter-role-director"
              label="Director"
              active={roleFilter === 'Director'}
              activeColor="purple"
              onClick={() => setRoleFilter('Director')}
            />
          </div>
        </div>

        {/* Filter 3: Value Threshold */}
        <div className="pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <DollarSign className="w-3 h-3 text-emerald-400" />
            <span>Value Threshold</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              id="filter-threshold-any"
              label="Any value"
              active={thresholdFilter === 0}
              onClick={() => setThresholdFilter(0)}
            />
            <FilterChip
              id="filter-threshold-100k"
              label="$100K+"
              active={thresholdFilter === 100000}
              activeColor="sky"
              onClick={() => setThresholdFilter(100000)}
            />
            <FilterChip
              id="filter-threshold-500k"
              label="$500K+"
              active={thresholdFilter === 500000}
              activeColor="sky"
              onClick={() => setThresholdFilter(500000)}
            />
            <FilterChip
              id="filter-threshold-1m"
              label="$1M+"
              active={thresholdFilter === 1000000}
              activeColor="sky"
              onClick={() => setThresholdFilter(1000000)}
            />
          </div>
        </div>
      </section>

      {/* Results Header & Counter */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-xs font-semibold text-slate-300">
          <span>Showing </span>
          <span className="text-sky-400 font-mono font-bold">
            {filteredTrades.length}
          </span>
          <span> {filteredTrades.length === 1 ? 'demo result' : 'demo results'}</span>
          {hasActiveFilters && <span className="text-slate-400 font-normal"> (filtered)</span>}
        </div>

        <span className="text-[11px] text-slate-400">
          Tap trade for details
        </span>
      </div>

      {/* Trades List or Empty State */}
      <div className="space-y-2.5">
        {filteredTrades.length > 0 ? (
          filteredTrades.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              onClick={onSelectTrade}
              idPrefix="screener-trade"
            />
          ))
        ) : (
          /* Actionable Empty State */
          <div
            id="screener-empty-state"
            className="bg-[#172033] border border-dashed border-slate-700/80 rounded-2xl p-8 text-center space-y-3 mt-2"
          >
            <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                No matching transactions
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                No fictional demo trades match those filters. Try adjusting your search or filter values.
              </p>
            </div>
            <button
              id="screener-clear-filters-empty-btn"
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
