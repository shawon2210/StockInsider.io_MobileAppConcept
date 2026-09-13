import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity,
  SlidersHorizontal,
  Info,
  Smartphone,
  Maximize2,
  Minimize2,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { InsiderTrade, ScreenName } from '../types/trade';
import { MOCK_TRADES } from '../data/mockTrades';
import { HomeScreen } from '../screens/HomeScreen';
import { ScreenerScreen } from '../screens/ScreenerScreen';
import { TradeDetailsScreen } from '../screens/TradeDetailsScreen';

export const AppNavigator: React.FC = () => {
  // Navigation stack state
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');
  const [previousScreen, setPreviousScreen] = useState<ScreenName>('Home');
  const [selectedTrade, setSelectedTrade] = useState<InsiderTrade | null>(null);
  const [initialScreenerSearch, setInitialScreenerSearch] = useState<string>('');

  // Device simulation state (mobile frame vs responsive viewport)
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  // Screen navigation handlers
  const navigateToHome = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('Home');
  };

  const navigateToScreener = (searchQuery: string = '') => {
    setInitialScreenerSearch(searchQuery);
    setPreviousScreen(currentScreen);
    setCurrentScreen('Screener');
  };

  const navigateToDetails = (trade: InsiderTrade) => {
    setSelectedTrade(trade);
    setPreviousScreen(currentScreen);
    setCurrentScreen('TradeDetails');
  };

  const handleBackFromDetails = () => {
    // Return to whatever screen called it (Home or Screener)
    setCurrentScreen(previousScreen === 'TradeDetails' ? 'Home' : previousScreen);
  };

  const handleBackFromScreener = () => {
    setCurrentScreen('Home');
  };

  return (
    <div className="min-h-screen bg-[#070C15] text-slate-100 flex flex-col items-center justify-start antialiased selection:bg-sky-500/30">
      {/* Top Preview Bar (Helpful controls: Mobile frame toggle, Info, Prototype status) */}
      <nav
        aria-label="Prototype Top Controls"
        className="w-full bg-[#0B1220] border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-xs z-30"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">
            MarketPulse <span className="text-slate-400 font-normal hidden sm:inline">• Mobile Signals Prototype</span>
          </span>
          <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
            Fictional Data Only
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Device Frame */}
          <button
            type="button"
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#172033] hover:bg-[#1E293B] border border-slate-700/70 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={deviceFrameMode ? 'Switch to Full Width view' : 'Switch to Mobile Frame view'}
          >
            {deviceFrameMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expanded</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>

          {/* Prototype Info Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowInfoModal(true)}
            aria-label="View prototype design notes and disclaimer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#172033] hover:bg-[#1E293B] border border-slate-700/70 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Project Info</span>
          </button>
        </div>
      </nav>

      {/* Main Container / Mobile Device Wrapper */}
      <main className="w-full flex-1 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6">
        <div
          className={`w-full transition-all duration-300 ${
            deviceFrameMode
              ? 'max-w-[420px] rounded-[36px] border border-slate-700/80 shadow-2xl overflow-hidden bg-[#0B1220] my-auto'
              : 'max-w-2xl bg-[#0B1220] rounded-2xl border border-slate-800 p-2 sm:p-4'
          }`}
          style={{ minHeight: deviceFrameMode ? '780px' : 'auto' }}
        >
          {/* Mobile Status Bar Simulation (Visible in Phone Frame Mode) */}
          {deviceFrameMode && (
            <div className="h-7 px-6 pt-2 flex items-center justify-between text-[11px] text-slate-400 select-none bg-[#0B1220] border-b border-slate-800/40">
              <span className="font-semibold text-slate-300">9:41</span>
              <div className="w-20 h-3.5 bg-black/80 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <span>5G</span>
                <span className="w-4 h-2 border border-slate-400 rounded-xs inline-block relative after:absolute after:inset-0.5 after:bg-slate-300" />
              </div>
            </div>
          )}

          {/* Active Screen Area with Fluid Slide Transitions */}
          <div className="p-4 sm:p-5 flex-1 min-h-[640px] flex flex-col">
            <AnimatePresence mode="wait">
              {currentScreen === 'Home' && (
                <motion.div
                  key="screen-home"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="flex-1"
                >
                  <HomeScreen
                    trades={MOCK_TRADES}
                    onNavigateToScreener={navigateToScreener}
                    onSelectTrade={navigateToDetails}
                  />
                </motion.div>
              )}

              {currentScreen === 'Screener' && (
                <motion.div
                  key="screen-screener"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="flex-1"
                >
                  <ScreenerScreen
                    trades={MOCK_TRADES}
                    initialSearchQuery={initialScreenerSearch}
                    onSelectTrade={navigateToDetails}
                    onNavigateBack={handleBackFromScreener}
                  />
                </motion.div>
              )}

              {currentScreen === 'TradeDetails' && selectedTrade && (
                <motion.div
                  key={`screen-details-${selectedTrade.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="flex-1"
                >
                  <TradeDetailsScreen
                    trade={selectedTrade}
                    onNavigateBack={handleBackFromDetails}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Bottom Navigation Bar (Tabs for Home & Screener) */}
          <nav
            aria-label="Mobile Bottom Navigation"
            className="sticky bottom-0 w-full bg-[#111827]/95 backdrop-blur-md border-t border-slate-800 px-6 py-2.5 flex items-center justify-around z-20"
          >
            <button
              id="tab-btn-home"
              type="button"
              onClick={navigateToHome}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all cursor-pointer ${
                currentScreen === 'Home'
                  ? 'text-sky-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span className="text-[11px]">Market Pulse</span>
            </button>

            <button
              id="tab-btn-screener"
              type="button"
              onClick={() => navigateToScreener('')}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all cursor-pointer ${
                currentScreen === 'Screener'
                  ? 'text-sky-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-[11px]">Screener</span>
            </button>
          </nav>
        </div>
      </main>

      {/* Info & Compliance Modal */}
      {showInfoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50"
        >
          <div className="bg-[#172033] border border-slate-700 max-w-md w-full rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-sm">
                  Project Inspiration & Compliance Note
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-2.5 leading-relaxed">
              <p className="font-medium text-sky-300">
                Original mobile concept inspired by the broad insider-activity product category; all displayed content is fictional mock/demo data.
              </p>
              <p>
                • <strong>No Real Financial Data</strong>: All tickers (NOVA, ELIO, VOLT, MESA, etc.), executives, share prices, and filing timestamps were created specifically for this prototype.
              </p>
              <p>
                • <strong>Original Interface</strong>: Custom visual hierarchy, spacing, filter chips, SVG activity chart, and mobile navigation flow.
              </p>
              <p className="p-2.5 rounded-xl bg-[#0B1220] border border-amber-900/40 text-amber-200/90 text-[11px]">
                This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
