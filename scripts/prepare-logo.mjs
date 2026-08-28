/**
 * Prepares the logo mark for the site.
 *
 *   node scripts/prepare-logo.mjs <input.png> <output.png> [size]
 *
 * The artwork is light-on-black. If its background is opaque black it would
 * show as a faint square against the page, which is #0A0A0A rather than pure
 * black, so the black is keyed out: alpha becomes the pixel's own brightness.
 * Because the page behind is almost black, the result composites to the same
 * appearance with no visible edge.
 *
 * Fully transparent margins are then trimmed and the result is resized.
 */
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const [input, output, sizeArg = "800"] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node scripts/prepare-logo.mjs <input.png> <output.png> [size]");
  process.exit(1);
}

const bytes = Array.from(new Uint8Array(await readFile(resolve(input))));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("about:blank");

const result = await page.evaluate(
  async ({ bytes, size }) => {
    const blob = new Blob([new Uint8Array(bytes)], { type: "image/png" });
    const bitmap = await createImageBitmap(blob);

    const src = document.createElement("canvas");
    src.width = bitmap.width;
    src.height = bitmap.height;
    const sctx = src.getContext("2d", { willReadFrequently: true });
    sctx.drawImage(bitmap, 0, 0);

    const img = sctx.getImageData(0, 0, src.width, src.height);
    const d = img.data;

    const cornerAlpha = d[3];
    let keyed = 0;

    for (let i = 0; i < d.length; i += 4) {
      const brightness = Math.max(d[i], d[i + 1], d[i + 2]);
      // Keep whichever is lower: an already-transparent pixel stays transparent.
      const next = Math.min(d[i + 3], brightness);
      if (next === d[i + 3]) continue;
      keyed++;
      d[i + 3] = next;

      /*
       * Un-premultiply. Compositing colour C at alpha a over black yields C*a,
       * so keying alone would darken every pixel by its own brightness. Scaling
       * the channels by 255/brightness cancels that exactly, and the pixel
       * composites back to the colour the artwork was drawn in.
       */
      if (next > 0) {
        const gain = 255 / next;
        d[i] = Math.min(255, Math.round(d[i] * gain));
        d[i + 1] = Math.min(255, Math.round(d[i + 1] * gain));
        d[i + 2] = Math.min(255, Math.round(d[i + 2] * gain));
      }
    }
    sctx.putImageData(img, 0, 0);

    // Bounding box of anything still visible.
    let minX = src.width, minY = src.height, maxX = -1, maxY = -1;
    for (let y = 0; y < src.height; y++) {
      for (let x = 0; x < src.width; x++) {
        if (d[(y * src.width + x) * 4 + 3] > 8) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return { error: "image is entirely transparent" };

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    const side = Math.max(cropW, cropH);

    // Square canvas so the mark keeps its proportions wherever it is placed.
    const out = document.createElement("canvas");
    out.width = size;
    out.height = size;
    const octx = out.getContext("2d");
    octx.imageSmoothingQuality = "high";
    const scale = size / side;
    octx.drawImage(
      src,
      minX, minY, cropW, cropH,
      (size - cropW * scale) / 2, (size - cropH * scale) / 2,
      cropW * scale, cropH * scale
    );

    return {
      url: out.toDataURL("image/png"),
      original: `${src.width}x${src.height}`,
      cropped: `${cropW}x${cropH}`,
      cornerAlpha,
      keyed,
    };
  },
  { bytes, size: Number(sizeArg) }
);

await browser.close();

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

await writeFile(resolve(output), Buffer.from(result.url.split(",")[1], "base64"));
console.log(
  `${result.original} -> trimmed ${result.cropped} -> ${sizeArg}x${sizeArg}\n` +
    `corner alpha was ${result.cornerAlpha}; ${result.keyed.toLocaleString()} pixels made more transparent`
);
