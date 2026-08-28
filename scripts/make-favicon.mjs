/**
 * Builds the favicon set from the logo mark.
 *
 *   node scripts/make-favicon.mjs
 *
 * The mark is light-on-transparent, which would disappear against Chrome's
 * light tab bar, so each icon is drawn on the site's own near-black tile. That
 * also matches how the logo appears everywhere else on the site.
 */
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, "..", "public", "images", "logo-mark.png");
const PUBLIC = resolve(HERE, "..", "public");

/**
 * [file, pixel size, corner radius as a fraction, inset as a fraction, zoom]
 *
 * The mark's outermost branch tips are about a pixel wide once scaled to 32px,
 * so the whole phylogeny averages into grey. The tab icon therefore zooms in on
 * the thermometer, which is the one element with strokes thick enough to
 * survive. The larger icons keep the whole mark.
 */
const ICONS = [
  ["favicon-32.png", 32, 0.18, 0.0, 2.6],
  ["favicon-192.png", 192, 0.18, 0.06, 1.0],
  ["apple-touch-icon.png", 180, 0.0, 0.1, 1.0], // iOS masks its own corners
];

const bytes = Array.from(new Uint8Array(await readFile(SRC)));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("about:blank");

for (const [name, size, radius, inset, zoom] of ICONS) {
  const dataUrl = await page.evaluate(
    async ({ bytes, size, radius, inset, zoom }) => {
      const bm = await createImageBitmap(new Blob([new Uint8Array(bytes)], { type: "image/png" }));
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const x = c.getContext("2d");

      if (radius > 0) {
        const r = size * radius;
        x.beginPath();
        x.moveTo(r, 0);
        x.arcTo(size, 0, size, size, r);
        x.arcTo(size, size, 0, size, r);
        x.arcTo(0, size, 0, 0, r);
        x.arcTo(0, 0, size, 0, r);
        x.closePath();
        x.clip();
      }
      x.fillStyle = "#0A0A0A";
      x.fillRect(0, 0, size, size);

      const pad = size * inset;
      const drawn = (size - pad * 2) * zoom;
      const offset = (size - drawn) / 2;
      x.imageSmoothingQuality = "high";
      x.drawImage(bm, offset, offset, drawn, drawn);
      return c.toDataURL("image/png");
    },
    { bytes, size, radius, inset, zoom }
  );

  await writeFile(resolve(PUBLIC, name), Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log(`  ${name.padEnd(22)} ${size}x${size}`);
}

await browser.close();
console.log("Done. Icons are drawn on #0A0A0A so they stay visible on a light tab bar.");
