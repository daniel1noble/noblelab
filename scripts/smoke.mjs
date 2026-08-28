/**
 * Loads every route in a real browser, records console errors, failed network
 * requests and a few structural assertions, then writes screenshots.
 *
 *   node scripts/smoke.mjs [baseUrl] [outDir]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:5175";
const OUT = process.argv[3] || "./.smoke";

const ROUTES = [
  ["/", "home"],
  ["/research", "research"],
  ["/people", "people"],
  ["/publications", "publications"],
  ["/software", "software"],
  ["/teaching", "teaching"],
  ["/gallery", "gallery"],
  ["/opportunities", "opportunities"],
  ["/news", "news"],
  ["/contact", "contact"],
  ["/nonexistent-page", "404"],
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let failures = 0;

for (const [route, name] of ROUTES) {
  const errors = [];
  const netFails = [];
  const onConsole = (m) => m.type() === "error" && errors.push(m.text());
  const onPageError = (e) => errors.push(`pageerror: ${e.message}`);
  const onFailed = (r) => netFails.push(`${r.url()} — ${r.failure()?.errorText}`);
  const onResponse = (r) => {
    if (r.status() >= 400) netFails.push(`${r.status()} ${r.url()}`);
  };

  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  page.on("requestfailed", onFailed);
  page.on("response", onResponse);

  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(900); // let reveal animations settle

  const h1 = (await page.locator("h1").first().textContent().catch(() => null))?.trim();
  const headerFixed = await page.evaluate(() => {
    const el = document.querySelector("header");
    return el ? getComputedStyle(el).position : null;
  });

  // Scroll to the bottom to trigger lazy content, then confirm the header stayed.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  const headerVisibleAfterScroll = await page.locator("header").isVisible();
  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1
  );

  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });

  page.off("console", onConsole);
  page.off("pageerror", onPageError);
  page.off("requestfailed", onFailed);
  page.off("response", onResponse);

  const bad = errors.length || netFails.length || !h1 || headerFixed !== "fixed" ||
    !headerVisibleAfterScroll || horizontalOverflow;
  if (bad) failures++;

  console.log(`${bad ? "FAIL" : "ok  "} ${route.padEnd(22)} h1="${h1 ?? "MISSING"}"`);
  if (headerFixed !== "fixed") console.log(`      header position: ${headerFixed}`);
  if (!headerVisibleAfterScroll) console.log("      header hidden after scrolling to bottom");
  if (horizontalOverflow) console.log("      page scrolls horizontally");
  for (const e of errors.slice(0, 6)) console.log(`      console: ${e}`);
  for (const n of netFails.slice(0, 6)) console.log(`      network: ${n}`);
}

/* ------------------------------------------- page-specific content checks */

console.log("\nContent checks");

await page.goto(`${BASE}/publications`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const pubCount = await page.locator("article").count();
const highlights = await page.locator('text="Selected papers"').count();
const yearFilter = await page.locator('button:has-text("All years")').count();
console.log(`  publications rendered: ${pubCount} ${pubCount > 20 ? "ok" : "FAIL"}`);
console.log(`  selected papers block: ${highlights > 0 ? "ok" : "FAIL"}`);
console.log(`  year filter present:   ${yearFilter > 0 ? "ok" : "FAIL"}`);
if (pubCount <= 20 || highlights === 0 || yearFilter === 0) failures++;

// The publication list must not carry software or dataset deposits.
const junk = await page.evaluate(() =>
  [...document.querySelectorAll("h3")]
    .map((h) => h.textContent || "")
    .filter((t) => /^Additional file|zenodo|CRAN|freqTLS/i.test(t))
);
console.log(`  no software/data rows: ${junk.length === 0 ? "ok" : `FAIL (${junk.join("; ")})`}`);
if (junk.length) failures++;

await page.goto(`${BASE}/gallery`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const thumbs = await page.locator('img[src*="-thumb"]').count();
console.log(`  gallery thumbnails:    ${thumbs} ${thumbs >= 10 ? "ok" : "FAIL"}`);
if (thumbs < 10) failures++;

await page.goto(`${BASE}/people`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const countryPaths = await page.locator("svg path[d]").count();
console.log(`  map country paths:     ${countryPaths} ${countryPaths > 100 ? "ok" : "FAIL"}`);
if (countryPaths <= 100) failures++;

// mobile menu
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`${BASE}/`, { waitUntil: "networkidle" });
await mobile.locator('button[aria-label="Open menu"]').click();
await mobile.waitForTimeout(700);
// The desktop nav is present but hidden at this width, so scope to the overlay.
const navVisible = await mobile
  .locator('.fixed.inset-0 a:has-text("Publications")')
  .first()
  .isVisible();
console.log(`  mobile menu opens:     ${navVisible ? "ok" : "FAIL"}`);
if (!navVisible) failures++;
await mobile.screenshot({ path: `${OUT}/mobile-menu.png` });
await mobile.close();

await browser.close();
console.log(`\n${failures === 0 ? "All checks passed." : `${failures} check group(s) failed.`}`);
process.exit(failures === 0 ? 0 : 1);
