# Shawon's Interview Defense Guide: Market Pulse
**Project**: Market Pulse — Mobile Insider-Activity Signals Prototype  
**Developer**: Shawon ([@shawon2210](https://github.com/shawon2210))  
**Target Role**: React Native Developer Intern (Batch 04) • Arklab AI  

Use this guide to confidently explain your technical decisions in the interview. Everything in the codebase was built with clear, defensible engineering intent.

---

## 1. "Walk us through your architecture and how you structured the project."

**Your Answer**:
> "I followed a modular, feature-oriented structure with clear separation of concerns:
> - `src/types/trade.ts`: Single source of truth for TypeScript domain types (`InsiderTrade`, `InsiderRole`, `TradeType`, etc.).
> - `src/data/mockTrades.ts`: Self-contained fictional demo dataset with 10 records designed so all filter permutations yield results.
> - `src/navigation/AppNavigator.tsx`: Lean state-driven screen orchestrator managing the 3-screen stack (`Home` -> `Screener` -> `TradeDetails`) without bloated external routing dependencies.
> - `src/screens/`: The 3 core views (`HomeScreen`, `ScreenerScreen`, `TradeDetailsScreen`).
> - `src/components/`: Reusable atomic UI building blocks (`TradeCard`, `FilterChip`, `SummaryCard`, `SignalBadge`, `MockActivityChart`).
> - `src/theme/colors.ts`: Centralized dark design tokens with semantic colors for transaction types.
> - `src/utils/formatters.ts`: Pure numerical formatting functions (`$2.40M`, `$500K`)."

---

## 2. "Why didn't you install a heavy charting library like Recharts, Chart.js, or Victory?"

**Your Answer**:
> "For a 3-screen mobile prototype, pulling in a 300KB charting library is massive overkill and degrades startup performance. Instead, I hand-coded a lightweight Scalable Vector Graphics (SVG) curve in `MockActivityChart.tsx`.
> 
> I used cubic bezier interpolation: taking 7 normalized data points and calculating smooth control points:
> `C ((prevX + x) / 2) prevY, ((prevX + x) / 2) y, x y`
> 
> This gave me complete control over:
> 1. Color gradients matching the trade type (emerald for buy, orange for sale).
> 2. Crisp, responsive SVG rendering at zero dependency cost.
> 3. Zero hydration mismatches or canvas rendering lag."

---

## 3. "How did you implement the Screener filtering and search logic?"

**Your Answer**:
> "I kept the three filter groups (`typeFilter`, `roleFilter`, `thresholdFilter`) and `searchQuery` as independent pieces of React state, and derived the results inside a single `useMemo`:
> 
> ```typescript
> const filteredTrades = useMemo(() => {
>   return trades.filter((trade) => {
>     // 1. Search: case-insensitive match on ticker, company, insider, signal
>     if (searchQuery.trim()) { ... }
>     // 2. Transaction Type: All, Purchases, Sales
>     if (typeFilter !== 'all' && trade.type !== typeFilter) return false;
>     // 3. Role: All roles, CEO, CFO, Director (Officer stays in 'All')
>     if (roleFilter !== 'all' && trade.role !== roleFilter) return false;
>     // 4. Value: trade.value >= threshold (e.g. 500k)
>     if (thresholdFilter > 0 && trade.value < thresholdFilter) return false;
>     return true;
>   });
> }, [trades, searchQuery, typeFilter, roleFilter, thresholdFilter]);
> ```
> 
> This avoids redundant re-renders, keeps filtering instant, and made the empty state seamless: searching `zzq` with active filters reliably triggers the empty state with a one-tap `Clear filters` reset."

---

## 4. "Why did you use React state instead of Redux or Zustand?"

**Your Answer**:
> "Engineering is about choosing the right tool for the scope. Market Pulse is a local, unidirectional discovery flow where data flows down from `mockTrades` and selection events bubble up. Introducing Redux or Zustand would introduce unnecessary boilerplate without any state-sharing benefit. Screen-level state with clean prop-passing keeps the codebase readable, debuggable, and lightweight."

---

## 5. "How did you ensure accessibility and mobile-first ergonomics?"

**Your Answer**:
> "Three key decisions:
> 1. **Touch Targets**: All touchable chips and cards maintain minimum 40–44px heights (`min-h-[40px]`).
> 2. **Double Cues for Color Blindness**: Never relied on green/red alone. Every transaction explicitly pairs colored text with clear directional arrows (`Purchase ↑` / `Sale ↓`) and textual transaction codes (`Code P` / `Code S`).
> 3. **Accessibility Attributes**: Added `aria-pressed={active}` to filter chips, `role="button"` and `tabIndex={0}` with `onKeyDown` (Enter/Space support) to trade cards, and `aria-label` to icon-only buttons."

---

## 6. "How did you respect the StockInsider.io concept boundary?"

**Your Answer**:
> "I treated StockInsider.io strictly as high-level product inspiration for mobile insider-activity scanning. I did not scrape, copy, or query any real StockInsider.io or SEC EDGAR data. Every single ticker (`NOVA`, `ELIO`, `VOLT`, etc.), company name, executive name, valuation, and signal strength was created locally from scratch in `mockTrades.ts`. I also made sure the required mock-data disclaimer is displayed prominently across the app header, compliance modal, and detail screen."
