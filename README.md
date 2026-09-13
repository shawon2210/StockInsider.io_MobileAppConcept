# Market Pulse — Mobile Insider-Activity Signals Concept

An original, mobile-first insider-activity discovery prototype inspired by the broad product category represented by StockInsider.io. Built with React Native & TypeScript architecture to explore fast mobile scanning of disclosed executive transactions.

---

## Project Overview

Disclosed insider trading records (such as Form 4 filings) are dense, tabular, and difficult to parse on mobile devices. **Market Pulse** addresses this user problem by transforming raw executive transaction records into an intuitive, touch-first scanning experience. Users can immediately review daily transaction totals, filter by transaction type, role, and value thresholds, and inspect individual filings with contextual signal breakdowns and mock activity trendlines.

---

## Concept and Data Statement

> **Safe Wording & Compliance**:
> *Original mobile concept inspired by the broad insider-activity product category; all displayed content is fictional mock/demo data.*

- **StockInsider.io Reference**: StockInsider.io was used solely as high-level product inspiration for the concept of turning disclosed insider activity into a focused mobile discovery flow.
- **Originality Guarantee**: StockInsider.io was **not** used as a data, copy, or UI source. No scraping, screenshots, API calls, downloaded datasets, or copied layouts were used.
- **Fictional Data**: All company names (e.g., NovaGrid Systems, Elio Health Labs, VoltArc Energy), tickers (`NOVA`, `ELIO`, `VOLT`, `AURI`, `MESA`, `LYRA`, `ORBT`, `SOLA`), insider names, transaction values, dates, signal categorizations, and chart points were generated locally as fictional mock/demo data.

---

## Screens and Features

The application implements three connected screens:

### 1. Market Pulse (Home Screen)
- **Header & Badge**: Clean title with a prominent `Fictional demo data` badge.
- **Quick Search Entry**: Tapping "Search ticker or company" navigates directly to the screener with pre-focus capability.
- **Dynamic Summary Cards**:
  - *Transactions*: Total demo filings recorded today.
  - *Top Signals*: High-strength signal count.
  - *Purchase Value*: Local sum of fictional insider purchases ($5.34M+).
  - *Sale Value*: Local sum of fictional insider sales ($5.77M+).
- **Top Signals Today**: Original signal categories (*Large CEO Purchase*, *Cluster Buy*, *Executive Sale*).
- **Latest Activity Feed**: Top recent filings displaying ticker, company, purchase/sale indicator with arrow and color coding, insider name & role, filing timestamp, and signal-strength badge.
- **Primary CTA**: Direct navigation to browse all trades in the Screener.

### 2. Latest Trades / Screener Screen
- **Search Engine**: Instant case-insensitive matching across ticker symbols, company names, insider names, and signal categories.
- **Three Independent Filter Groups**:
  - *Transaction Type*: All Types • Purchases (↑ Green) • Sales (↓ Red).
  - *Insider Role*: All roles • CEO • CFO • Director (Officers included in All roles).
  - *Value Threshold*: Any value • $100K+ • $500K+ • $1M+.
- **Live Counter**: Real-time feedback showing exact demo match count (e.g., "6 demo results (filtered)").
- **Actionable Empty State**: Informative feedback when no records match filter criteria, complete with a single-tap "Clear filters" action.

### 3. Trade Details Screen
- **Navigation & Header**: Intuitive back navigation, company name, ticker badge, sector classification, and `FICTIONAL DEMO DATA` badge.
- **Prominent Signal Card**: Displays signal title (e.g., "Large CEO Purchase"), trade valuation, and insider context.
- **Structured Metric Grid**:
  - Insider & Role (e.g., Maya Chen • CEO)
  - Transaction Type & Code (e.g., Purchase ↑ • Code P)
  - Shares Traded (e.g., 24,000 shares)
  - Price per Share (e.g., $100.00 demo)
  - Total Transaction Value (e.g., $2.40M demo)
  - Signal Strength & Categorization (e.g., High • Large CEO Purchase)
  - Transaction Date & Filing Timestamp
- **Custom Data Visualization**: Custom SVG `Mock 7-day activity` chart showing normalized accumulation/distribution curves.
- **Educational Context ("Why this matters")**: Objective explanations of executive transaction disclosures without speculative claims.
- **Required Prototype Disclaimer**:
  > *This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.*

---

## Tech Stack

- **Framework**: React Native / React 19 architecture with TypeScript
- **Styling**: Tailwind CSS with custom dark mode design tokens (`#0B1220` background, `#172033` surface)
- **Icons**: `lucide-react`
- **Animations**: `motion/react` for fluid screen transitions
- **Visualization**: Scalable Vector Graphics (SVG) with bezier interpolation for normalized 7-day trendlines
- **Build Tool**: Vite / Node.js runtime

---

## Setup & Running Locally

```bash
# 1. Clone repository
git clone <repository-url>
cd market-pulse-insider

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# The interactive mobile prototype will be available at http://localhost:3000
```

*(For Expo React Native bare project deployment: `npx expo start`)*

---

## Mobile Design Decisions

- **8-Point Spacing Rhythm**: Consistent 8, 12, 16, 20, and 24px spatial hierarchy.
- **Color & Text Semantics**: Every transaction uses both explicit text labels ("Purchase", "Sale"), directional arrows (`↑`, `↓`), and dual colors (`#22C55E` emerald, `#EF4444` rose) to ensure accessibility and clarity.
- **Touch Targets**: All interactive chips, cards, and buttons maintain minimum 40–44px touch targets.
- **Fluid Ergonomics**: Single-handed mobile thumb flow with bottom navigation tabs and sticky action headers.
- **Phone Frame Switcher**: Features an integrated device shell toggle (Phone Frame vs. Expanded View) for flexible evaluation on desktop or mobile viewports.

---

## Known Limitations

- **Static Local Data**: Built entirely with local mock data arrays; no connection to the SEC EDGAR system or live market feeds.
- **No User Accounts / Auth**: No user login or session state needed for this prototype scope.
- **No Push Notifications**: Daily signal alerts are demonstrated statically in the snapshot view.
- **Prototype Scope**: Designed for visual demonstration and UX workflow validation only.

---

## AI-Use Disclosure

- **Coding Assistant**: Google AI Studio agent with Gemini 2.5 was used to scaffold the TypeScript data structures, craft the responsive UI components, implement the SVG chart path math, and assemble the screen navigator.

---

## Deliverables

- **Live Web Preview**: Integrated AI Studio container preview running on port 3000
- **GitHub Repository**: Submitted via student portal
- **Google Drive Folder**: Includes APK build artifacts, high-resolution device screenshots, and interactive video walkthrough
