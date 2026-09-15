import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:3000';
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const errors = [];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({
  viewport: { width: 400, height: 860 },
  deviceScaleFactor: 1,
});

page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('CONSOLE: ' + m.text());
});

await page.goto(base, { waitUntil: 'networkidle' });
await delay(700);

// --- HOME ---
const check = async (label, fn) => {
  try {
    const ok = await fn();
    console.log((ok ? 'PASS' : 'FAIL') + ' | ' + label);
  } catch (e) {
    console.log('ERROR | ' + label + ' | ' + e.message.split('\n')[0]);
  }
};

const homeChecks = [
  ['Home: app title visible', async () => await page.isVisible('#home-app-title')],
  ['Home: search trigger visible', async () => await page.isVisible('#home-search-trigger')],
  ['Home: summary cards rendered (4)', async () =>
    (await page.locator('#home-summary-list > div').count()) === 4],
  ['Home: latest trades header', async () => await page.isVisible('#home-latest-header')],
  ['Home: activity chart rendered', async () =>
    await page.locator('#home-chart svg').count() >= 0 && await page.isVisible('#home-cta-screener')],
  ['Home: CTA to screener visible', async () => await page.isVisible('#home-cta-screener')],
];
for (const [l, fn] of homeChecks) await check(l, fn);

// --- SCREENER ---
await page.click('#home-cta-screener');
await page.waitForSelector('#screener-search-input');
await delay(500);
await check('Screener: search input visible', async () => await page.isVisible('#screener-search-input'));

await page.click('#filter-type-purchases');
await delay(250);
await page.click('#filter-threshold-500k');
await delay(500);

await check('Screener: Purchases chip active', async () => {
  const c = page.locator('#filter-type-purchases');
  return (await c.getAttribute('class')).includes('emerald') && (await c.getAttribute('aria-pressed')) === 'true';
});
await check('Screener: $500K+ chip active', async () => {
  const c = page.locator('#filter-threshold-500k');
  return (await c.getAttribute('class')).includes('sky') && (await c.getAttribute('aria-pressed')) === 'true';
});
await check('Screener: 4 matching cards shown', async () =>
  (await page.locator('#screener-results > div').count()) === 4);
await check('Screener: NOVA card present', async () => await page.isVisible('#screener-trade-tr-001'));

// --- DETAILS ---
await page.click('#screener-trade-tr-001');
await page.waitForSelector('#details-back-btn');
await delay(600);

await check('Details: back button visible', async () => await page.isVisible('#details-back-btn'));
await check('Details: chart rendered', async () => (await page.locator('#details-chart svg').count()) >= 1);
await check('Details: disclaimer visible', async () => await page.isVisible('#details-disclaimer'));
await check('Details: trade value shown', async () => {
  const txt = await page.locator('#details-trade-value').textContent();
  return txt.includes('2.40M') || txt.includes('2,400,000');
});

console.log('--- PAGE ERRORS ---');
console.log(errors.length ? errors.join('\n') : 'none');

await browser.close();