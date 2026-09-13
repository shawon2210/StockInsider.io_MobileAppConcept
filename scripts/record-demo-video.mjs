import { chromium } from 'playwright-core';

const BASE = 'http://127.0.0.1:3000';
const OUT_DIR = 'D:/Market-Pulse/SubmissionAssets/video';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function smoothScroll(page, total, waitMs) {
  const step = 240;
  let scrolled = 0;
  while (scrolled < total) {
    await page.evaluate((d) => window.scrollBy({ top: d, behavior: 'smooth' }), Math.min(step, total - scrolled));
    scrolled += step;
    await wait(waitMs);
  }
}

const browser = await chromium.launch({
  headless: true,
});

const context = await browser.newContext({
  viewport: { width: 400, height: 860 },
  deviceScaleFactor: 2,
  recordVideo: { dir: OUT_DIR },
});

const page = await context.newPage();

async function step(label, ms) {
  console.log(`video-step: ${label}`);
  await wait(ms);
}

try {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('#home-search-trigger', { timeout: 15000 });
  await step('app-launched-home', 3200);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await smoothScroll(page, 1400, 900);
  await step('home-scrolled-summary-activity', 2600);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(800);

  await page.click('#home-cta-screener');
  await page.waitForSelector('#screener-search-input', { timeout: 10000 });
  await step('opened-screener', 2600);

  await page.click('#filter-type-purchases');
  await wait(1600);
  await page.click('#filter-threshold-500k');
  await page.waitForTimeout(1400);
  await step('filtered-purchases-500k', 3000);

  await smoothScroll(page, 700, 800);
  await wait(2000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(1200);

  await page.click('#screener-trade-tr-001');
  await page.waitForSelector('#details-back-btn', { timeout: 10000 });
  await step('opened-nova-details', 3000);

  await smoothScroll(page, 1600, 1000);
  await step('details-scrolled-chart-disclaimer', 3000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(1200);

  await page.click('#details-back-btn');
  await page.waitForSelector('#screener-search-input', { timeout: 10000 });
  await step('back-to-screener', 2400);

  await page.fill('#screener-search-input', 'NOVA');
  await wait(1800);
  await page.fill('#screener-search-input', '');
  await wait(1600);

  await page.fill('#screener-search-input', 'zzq');
  await page.waitForSelector('#screener-empty-state', { timeout: 10000 });
  await step('empty-search-state', 3000);

  await page.click('#screener-clear-filters-empty-btn');
  await page.waitForTimeout(1500);
  await step('cleared-to-full-list', 2200);

  await page.click('#tab-btn-home');
  await page.waitForSelector('#home-search-trigger', { timeout: 10000 });
  await step('back-home', 3000);

  console.log('video-steps-complete');
} catch (err) {
  console.error('VIDEO_ERROR:', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}