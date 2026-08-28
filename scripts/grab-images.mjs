/** One-off: pulls the photographs off the old Owlstown site into public/images/raw. */
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "..", "public", "images", "raw");
const listFile = process.argv[2];

const EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

const urls = (await readFile(listFile, "utf8"))
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);

await mkdir(OUT, { recursive: true });
let ok = 0;
for (const url of urls) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = (res.headers.get("content-type") || "").split(";")[0];
    const ext = EXT[type] || "bin";
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) continue; // skip icons and tracking pixels
    await writeFile(resolve(OUT, `${url.split("/").pop()}.${ext}`), buf);
    ok++;
  } catch (err) {
    console.warn(`  failed ${url}: ${err.message}`);
  }
}
console.log(`Saved ${ok}/${urls.length} images to public/images/raw`);
