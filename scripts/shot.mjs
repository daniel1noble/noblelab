/** Ad-hoc screenshot: node scripts/shot.mjs <route> <out.png> [scrollY] [height] */
import { chromium } from "playwright";

const [route = "/", out = "./.smoke/shot.png", scrollY = "0", height = "900"] =
  process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: Number(height) } });
await page.goto(`http://localhost:5175${route}`, { waitUntil: "networkidle" });
await page.evaluate((y) => window.scrollTo(0, Number(y)), scrollY);
await page.waitForTimeout(1200);
await page.screenshot({ path: out });
await browser.close();
console.log("wrote", out);
