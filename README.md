# Market Pulse — Mobile Insider-Activity Signals Concept

An original, mobile-first insider-activity discovery prototype inspired by the broad product category represented by StockInsider.io. Built with React Native & TypeScript architecture to explore fast mobile scanning of disclosed executive transactions.

> **GitHub Repository**: [https://github.com/shawon2210/StockInsider.io_MobileAppConcept](https://github.com/shawon2210/StockInsider.io_MobileAppConcept)

---

## Project overview

Disclosed insider trading records (such as Form 4 filings) are dense, tabular, and difficult to parse on mobile devices. **Market Pulse** addresses this user problem by transforming raw executive transaction records into an intuitive, touch-first scanning experience. Users can immediately review daily transaction totals, filter by transaction type, role, and value thresholds, and inspect individual filings with contextual signal breakdowns and mock activity trendlines.

---

## Concept and data statement

> **Safe Wording & Compliance**:  
> *Original mobile concept inspired by the broad insider-activity product category; all displayed content is fictional mock/demo data.*

* **StockInsider.io Reference**: StockInsider.io was used solely as high-level product inspiration for the concept of turning disclosed insider activity into a focused mobile discovery flow.
* **Originality Guarantee**: StockInsider.io was **not** used as a data, copy, or UI source. No scraping, screenshots, API calls, downloaded datasets, or copied layouts were used.
* **Fictional Data**: All company names (e.g., NovaGrid Systems, Elio Health Labs, VoltArc Energy), tickers (`NOVA`, `ELIO`, `VOLT`, `AURI`, `MESA`, `LYRA`, `ORBT`, `SOLA`), insider names, transaction values, dates, signal categorizations, and chart points were generated locally as fictional mock/demo data.

---

## Screens and features

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

## Tech stack

* **Framework**: React Native & React 19 architecture with TypeScript
* **State Management**: Screen-level React state and derived selectors (no overengineered external store needed for a self-contained prototype)
* **Styling**: Tailwind CSS with custom dark mode design tokens (`#0B1220` background, `#172033` surface)
* **Icons**: `lucide-react`
* **Animations**: `motion/react` for fluid screen transitions
* **Data Visualization**: Scalable Vector Graphics (SVG) with bezier path interpolation for normalized 7-day trendlines
* **Mobile Runtime / Shell**: Capacitor Android (`com.marketpulse.app`, minSdk 24, targetSdk 36) / Vite runtime
* **Testing & Verification**: Playwright test suite for automated end-to-end screen assertions

---

## Setup

```bash
# 1. Clone repository
git clone https://github.com/shawon2210/StockInsider.io_MobileAppConcept.git
cd StockInsider.io_MobileAppConcept

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# The interactive prototype runs at http://localhost:3000

# 4. Run TypeScript typecheck
npm run lint

# 5. Build production bundle & sync Android
npm run build
npx cap copy android

# 6. Run automated screen tests
node scripts/verify-screens.mjs
```

*(For Expo React Native workflow: `npx expo start`)*

---

## Mobile design decisions

* **8-Point Spacing Rhythm**: Consistent 8, 12, 16, 20, and 24px spatial hierarchy for natural visual rhythm.
* **Text + Color Transaction Semantics**: Every transaction pairs explicit text labels ("Purchase", "Sale") with directional arrows (`↑`, `↓`) and distinct semantic colors (`#22C55E` emerald, `#EF4444` rose) to ensure clarity and accessibility.
* **Touch Targets**: All interactive chips, cards, and buttons maintain minimum 40–44px touch targets.
* **High Scanability**: Dense Form 4 data is reorganized into clear visual tiers: ticker & company first, value & type second, insider & filing timestamp third.
* **Fluid Ergonomics**: Single-handed mobile thumb flow with bottom navigation tabs and sticky action headers.
* **Responsive Device Shell Switcher**: Integrated device frame toggle (Phone Frame vs. Expanded View) allows seamless testing on mobile viewports as well as desktop browsers.

---

## Known limitations

* **Static Local Data**: Built entirely with local mock data arrays; no connection to the SEC EDGAR system or live market feeds.
* **No User Accounts / Auth**: Authentication and user profiles are out of scope for this discovery prototype.
* **No Push Notifications**: Daily signal alerts are demonstrated statically in the snapshot view.
* **Prototype Scope**: Designed for visual demonstration, UX workflow validation, and educational evaluation only.

---

## AI-use disclosure

* **Perplexity AI**: Used to turn the assignment brief into an actionable planning checklist and clarify standard React Native navigation patterns.
* **Google AI Studio / Gemini**: Used as a coding assistant to scaffold initial TypeScript interfaces, refine responsive Tailwind layout tokens, and assist with SVG bezier coordinate math.
* **Human Review & Testing**: I independently implemented, edited, tested, and can explain all submitted code and design decisions. No AI-generated project was submitted without complete review.

---

## Deliverables

* **GitHub Repository**: [https://github.com/shawon2210/StockInsider.io_MobileAppConcept](https://github.com/shawon2210/StockInsider.io_MobileAppConcept)
* **Google Drive Folder**: [https://drive.google.com/drive/folders/1Q23CctZKXM2N8acGrcGTFBzM7okW9ViD?usp=sharing]

### Submission Assets Catalog (in [`SubmissionAssets/`](./SubmissionAssets))

| Asset | Location | Details |
|---|---|---|
| **Android APK** | [`SubmissionAssets/MarketPulse-debug.apk`](./SubmissionAssets/MarketPulse-debug.apk) | 4.1 MB debug APK (`com.marketpulse.app`, minSdk 24, targetSdk 36). Verified on Android 16 (API 36) emulator with live screenshot proof in [`apk-emulator-install-proof.png`](./SubmissionAssets/apk-emulator-install-proof.png). |
| **Screenshot 1 — Home** | [`SubmissionAssets/screenshots/screenshot1_Home_MarketPulse.png`](./SubmissionAssets/screenshots/screenshot1_Home_MarketPulse.png) | Market Pulse header, fictional demo data badge, search trigger, 4 summary cards, top signals, latest activity feed. |
| **Screenshot 2 — Screener** | [`SubmissionAssets/screenshots/screenshot2_Screener_Filters.png`](./SubmissionAssets/screenshots/screenshot2_Screener_Filters.png) | Search bar, 3 active filter groups (Type: Purchases, Role: All roles, Value: $500K+), live counter "Showing 4 demo results (filtered)". |
| **Screenshot 3 — Details** | [`SubmissionAssets/screenshots/screenshot3_TradeDetails_Chart.png`](./SubmissionAssets/screenshots/screenshot3_TradeDetails_Chart.png) | Back button, NOVA company header, prominent signal card ($2.40M demo buy), 8-point filing spec grid, Mock 7-day activity SVG chart, "Why this matters", exact required disclaimer. |
| **Demo Video (1–3 min)** | [`SubmissionAssets/video/MarketPulse-demo-720p.mp4`](./SubmissionAssets/video/MarketPulse-demo-720p.mp4) | High-definition mobile walkthrough (~61s) demonstrating launch, browsing, applying filters, inspecting NOVA details, exploring the mock chart, triggering the empty search state, and clearing filters. |

---

## Task Requirements & Verification Checklist

| Requirement / Test Item | Implementation & Verification Status |
|---|---|
| **Launches directly to Market Pulse** | Verified: Zero console errors, zero runtime warnings (`scripts/verify-screens.mjs` PASS). |
| **Home Screen Components** | Verified: Header + `Fictional demo data` badge, search entry (`Search ticker or company`), 4 summary cards derived from array, 3 top signals, 4 latest activity cards. |
| **Screener & 3 Filter Groups** | Verified: Type (All / Purchases / Sales), Role (All roles / CEO / CFO / Director), Value Threshold (Any / $100K+ / $500K+ / $1M+). Derived dynamically from local state. |
| **Case-Insensitive Search** | Verified: Instant matching across ticker (`NOVA`), company name (`NovaGrid`), insider name (`Maya Chen`), and signal title. |
| **Actionable Empty State** | Verified: Searching unmatched query (`zzq`) displays "No matching transactions", "No fictional demo trades match those filters.", and a one-tap "Clear filters" button. |
| **Semantic Purchase / Sale Labels** | Verified: Every transaction explicitly uses "Purchase ↑" (emerald green) or "Sale ↓" (rose red) alongside icons and directional arrows. |
| **Navigation & Details Screen** | Verified: Card taps seamlessly navigate to Trade Details; Back button returns to the previous screen. |
| **Details Screen Required Fields** | Verified: Company name, ticker, sector, `FICTIONAL DEMO DATA` badge, prominent signal card, 8-field filing grid, Mock 7-day activity SVG chart, "Why this matters", and exact required disclaimer. |
| **Fictional Local Data Boundary** | Verified: 100% locally stored in `src/data/mockTrades.ts`. No web scraping, no SEC EDGAR calls, no network requests, no StockInsider.io content. |
| **Accessibility & Mobile Layout** | Verified: All interactive touch targets maintain >= 40–44px bounds, `aria-pressed` states on filter chips, `aria-label` attributes on icon buttons, and responsive dark theme (#0B1220 / #172033). |

---
