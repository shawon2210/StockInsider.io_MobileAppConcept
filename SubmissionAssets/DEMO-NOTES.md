# Market Pulse — Submission Assets

Everything here was produced from the final app build (`dist/`) via `npm run build`.

## Deliverables

| Asset | File | Notes |
|---|---|---|
| APK (installable) | `MarketPulse-debug.apk` | 4.1 MB, debug-signed. `com.marketpulse.app`, minSdk 24, targetSdk 36. Built with `gradlew assembleDebug`. Installed + launched on an Android 16 (API 36) emulator — see `apk-emulator-install-proof.png` (live screenshot; app text scanner verified "Market Pulse" in the rendered view). |
| Screenshot 1 — Home | `screenshots/screenshot1_Home_MarketPulse.png` | Summary cards, top signals, latest activity, CTA, disclaimer. |
| Screenshot 2 — Screener | `screenshots/screenshot2_Screener_Filters.png` | Filters applied: **Type = Purchases**, **Amount = $500K+** (both visibly selected) → 4 filtered results. |
| Screenshot 3 — Details | `screenshots/screenshot3_TradeDetails_Chart.png` | NOVA trade details: specs, mock chart, "Why This Matters", prototype disclaimer. |
| Demo video | `video/MarketPulse-demo-720p.mp4` | 800x1720 (steady mobile portrait), 25 fps, ~61 s, H.264. Raw capture also kept in `video/*.webm`. |

All screenshots were captured in a real mobile preview (device-framed Chrome, 400x860 CSS @2x → 800px wide) and every element was verified by DOM assertions (ids/text), not just visually.

## Demo video — flow & the decision it explains

1. **Launch** (Home): summary cards + dashboard.
2. **Navigate**: Home → Screener.
3. **Filter/Search**: apply **Type = Purchases** and **Amount = $500K+** → 4 insider trades remain.
4. **Details**: open tr-001 **NOVA** (largest purchase: 2.4M, by CEO Maya Chen), scroll to chart + "Why This Matters" + disclaimer.
5. **Empty state**: search `zzq` → "No matching transactions" → clear.
6. **Back Home**.

**Decision highlighted (NovaGrid Systems / NOVA):** among all sampled filings, tr-001 is the strongest conviction signal — a $2.4M direct insider **purchase** (in-basket defensible as long-term conviction, unlike a sale) by the **CEO**, executed near the year's low. The prototype then:

- computes **Trading Signal: Strong Buy** (insider behavior input ~ 5/5);
- surfaces the **edge** with "Why This Matters" (insider window: an executive buying near the low often precedes a period of elevated interest / positive drift);
- honestly floors expectations with the **disclaimer** (screenshots plus full prototype disclaimer, no regression claim, not investment advice).

## Prototype disclaimer (also rendered in the app)

> Demo data is mock/sample and does not represent real filings. Insight is informational, for concept evaluation only — not investment advice.