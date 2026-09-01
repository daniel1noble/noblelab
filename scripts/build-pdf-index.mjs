/**
 * Rebuilds public/data/pdfs.json from whatever sits in public/pdfs.
 *
 * The Publications page shows a "PDF" link for a paper when its DOI appears in
 * that index, so adding a paper is: drop <doi with / and : replaced by ->.pdf
 * into public/pdfs, run `node scripts/build-pdf-index.mjs`, commit both.
 *
 * The index is kept separate from publications.json because that file is
 * regenerated from ORCID/Crossref/OpenAlex every night and would lose the link.
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = resolve(HERE, "..", "public", "pdfs");

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith(".pdf"));
const pdfs = {};
for (const f of files) {
  // The filename is the DOI with every character outside [a-z0-9._-] as "-".
  const key = f.replace(/\.pdf$/i, "");
  const { size } = await stat(join(DIR, f));
  pdfs[key] = { file: `/pdfs/${f}`, bytes: size };
}
const out = resolve(HERE, "..", "public", "data", "pdfs.json");
await writeFile(out, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), count: files.length, pdfs }, null, 1));
console.log(`pdfs.json: ${files.length} files`);
