import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:3000';
const out = 'D:/Market-Pulse/SubmissionAssets/screenshots';
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({
  viewport: { width: 400, height: 860 },
  deviceScaleFactor: 2,
});

await page.goto(base, { waitUntil: 'networkidle' });
await page.waitForSelector('#home-search-trigger');
await delay(700);

// Screenshot 1: Home / Market Pulse with summary cards + activity
await page.screenshot({
  path: `${out}/screenshot1_Home_MarketPulse.png`,
  fullPage: true,
});
console.log('screenshot 1 done (home)');

// Navigate to Screener via the primary CTA
await page.click('#home-cta-screener');
await page.waitForSelector('#screener-search-input');
await delay(500);

// Apply filters so the selected state is visually obvious: Purchases + $500K+
await page.click('#filter-type-purchases');
await delay(250);
await page.click('#filter-threshold-500k');
await page.waitForTimeout(500);

await page.screenshot({
  path: `${out}/screenshot2_Screener_Filters.png`,
  fullPage: true,
});
console.log('screenshot 2 done (screener)');

// Open the NOVA Large CEO Purchase detail card
await page.click('#screener-trade-tr-001');
await page.waitForSelector('#details-back-btn');
await delay(600);

await page.screenshot({
  path: `${out}/screenshot3_TradeDetails_Chart.png`,
  fullPage: true,
});
console.log('screenshot 3 done (details)');

await browser.close();
console.log('ALL SCREENSHOTS CAPTURED');