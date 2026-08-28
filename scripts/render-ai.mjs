/**
 * Renders an Illustrator file to PNG, keeping transparency.
 *
 * Illustrator saves .ai with PDF compatibility by default, so pdf.js can draw
 * it. Rendering happens inside Playwright's Chromium because pdf.js needs a
 * real canvas.
 *
 *   node scripts/render-ai.mjs <input.ai> <output.png> [scale]
 */
import { chromium } from "playwright";
import { readFile, writeFile, copyFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const [input, output, scaleArg = "3", pageArg = "1"] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node scripts/render-ai.mjs <input.ai> <output.png> [scale]");
  process.exit(1);
}

// pdf.js refuses a .ai extension, so hand it a .pdf copy.
const tmpPdf = resolve(HERE, "..", ".render-tmp.pdf");
await copyFile(resolve(input), tmpPdf);

const pdfjsPath = resolve(HERE, "..", "node_modules", "pdfjs-dist", "build", "pdf.mjs");
const workerPath = resolve(HERE, "..", "node_modules", "pdfjs-dist", "build", "pdf.worker.mjs");

/**
 * A file:// page cannot dynamically import another file:// module, so pdf.js is
 * copied into public/ and loaded over the running dev server instead.
 */
const publicDir = resolve(HERE, "..", "public", "_pdfjs");
await mkdir(publicDir, { recursive: true });
await copyFile(pdfjsPath, resolve(publicDir, "pdf.mjs"));
await copyFile(workerPath, resolve(publicDir, "pdf.worker.mjs"));

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("console", (m) => m.type() === "error" && console.error("  page:", m.text()));

await page.goto("http://localhost:5175/");

const pdfBytes = Array.from(new Uint8Array(await readFile(tmpPdf)));

const dataUrl = await page.evaluate(
  async ({ bytes, pdfjsUrl, workerUrl, scale, pageNo }) => {
    const pdfjs = await import(pdfjsUrl);
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
    const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
    const pdfPage = await doc.getPage(pageNo);
    const viewport = pdfPage.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    // No background fill, so anything the artwork leaves empty stays transparent.
    await pdfPage.render({ canvasContext: ctx, viewport }).promise;
    return { url: canvas.toDataURL("image/png"), w: canvas.width, h: canvas.height, pages: doc.numPages };
  },
  {
    bytes: pdfBytes,
    pdfjsUrl: "/_pdfjs/pdf.mjs",
    workerUrl: "/_pdfjs/pdf.worker.mjs",
    scale: Number(scaleArg),
    pageNo: Number(pageArg),
  }
);

await browser.close();
await writeFile(resolve(output), Buffer.from(dataUrl.url.split(",")[1], "base64"));
console.log(`Rendered ${output} page ${pageArg}/${dataUrl.pages} at ${dataUrl.w}x${dataUrl.h}`);
