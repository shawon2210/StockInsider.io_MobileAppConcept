import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:3000';
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 400, height: 860 }, deviceScaleFactor: 1 });

await page.goto(base, { waitUntil: 'networkidle' });
await delay(700);

const dumpIds = async (label) => {
  const ids = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[id]')).map((e) => e.id)
  );
  console.log(`=== ${label} : ${ids.length} ids ===`);
  console.log(ids.join('\n'));
};

await dumpIds('HOME');
const text = await page.evaluate(() => document.body.innerText.slice(0, 1500));
console.log('--- HOME TEXT ---');
console.log(text);

await page.click('#home-cta-screener');
await page.waitForSelector('#screener-search-input');
await delay(400);
await page.click('#filter-type-purchases');
await delay(200);
await page.click('#filter-threshold-500k');
await delay(400);
await dumpIds('SCREENER');
const stext = await page.evaluate(() => document.body.innerText.slice(0, 2500));
console.log('--- SCREENER TEXT ---');
console.log(stext);

await page.click('#screener-trade-tr-001');
await page.waitForSelector('#details-back-btn');
await delay(500);
await dumpIds('DETAILS');
const dtext = await page.evaluate(() => document.body.innerText.slice(0, 3000));
console.log('--- DETAILS TEXT ---');
console.log(dtext);

await browser.close();