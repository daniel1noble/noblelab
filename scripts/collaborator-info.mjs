/**
 * Helper for maintaining MAIN_COLLABORATORS in src/content/site.ts.
 *
 * For each ORCID listed there it reports the current affiliation, taken from
 * OpenAlex's last-known institution rather than from a joint paper, plus any
 * personal pages the researcher has registered on ORCID and a portrait found
 * on one of them.
 *
 *   node scripts/collaborator-info.mjs            report only
 *   node scripts/collaborator-info.mjs --download  also save portraits
 *
 * Portraits land in public/images/collaborators/. They are photographs of real
 * people, so ask before publishing one.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(HERE, "..", "src", "content", "site.ts");
const OUT = resolve(HERE, "..", "public", "images", "collaborators");
const DOWNLOAD = process.argv.includes("--download");
const MAILTO = "daniel.noble@anu.edu.au";
const UA = `noble-lab-website/1.0 (mailto:${MAILTO})`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const slug = (name) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Pull the name/ORCID pairs straight out of the content file. */
async function readCollaborators() {
  const src = await readFile(SITE, "utf8");
  const block = src.split("export const MAIN_COLLABORATORS")[1]?.split("];")[0] ?? "";
  const out = [];
  for (const entry of block.split(/\{\s*\n/).slice(1)) {
    const name = entry.match(/name:\s*"([^"]+)"/)?.[1];
    const orcid = entry.match(/orcid:\s*"([^"]+)"/)?.[1];
    if (name) out.push({ name, orcid: orcid ?? null });
  }
  return out;
}

async function currentAffiliation(orcid) {
  const id = orcid.split("/").pop();
  const d = await fetch(
    `https://api.openalex.org/authors?filter=orcid:${id}&mailto=${MAILTO}`,
    { headers: { "User-Agent": UA } }
  )
    .then((r) => r.json())
    .catch(() => null);
  const a = d?.results?.[0];
  if (!a) return null;
  const inst = a.last_known_institutions?.[0] || a.affiliations?.[0]?.institution;
  return inst ? { name: inst.display_name, country: inst.country_code } : null;
}

/** Personal and laboratory pages the researcher registered on ORCID. */
async function researcherUrls(orcid) {
  const id = orcid.split("/").pop();
  const d = await fetch(`https://pub.orcid.org/v3.0/${id}/researcher-urls`, {
    headers: { Accept: "application/json", "User-Agent": UA },
  })
    .then((r) => r.json())
    .catch(() => null);
  return (d?.["researcher-url"] || []).map((u) => u.url?.value).filter(Boolean);
}

/** The page's social-preview image is nearly always the portrait. */
async function portraitFrom(url) {
  try {
    const html = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" }).then((r) =>
      r.ok ? r.text() : null
    );
    if (!html) return null;
    const og =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];
    if (!og) return null;
    // meta tags arrive HTML-escaped, which breaks query strings
    const clean = og.replace(/&amp;/g, "&").replace(/&#0?38;/g, "&");
    if (/blank\.jpg|placeholder|logo/i.test(clean)) return null;
    return new URL(clean, url).href;
  } catch {
    return null;
  }
}

const people = await readCollaborators();
console.log(`${people.length} collaborators listed in site.ts\n`);
if (DOWNLOAD) await mkdir(OUT, { recursive: true });

for (const p of people) {
  if (!p.orcid) {
    console.log(`${p.name}\n   no ORCID recorded`);
    continue;
  }
  const inst = await currentAffiliation(p.orcid);
  const urls = await researcherUrls(p.orcid);

  let photo = null;
  for (const u of urls.slice(0, 3)) {
    photo = await portraitFrom(u);
    if (photo) break;
  }

  console.log(p.name);
  console.log(`   affiliation: ${inst ? `${inst.name} (${inst.country})` : "unknown"}`);
  if (urls.length) console.log(`   pages: ${urls.slice(0, 3).join(", ")}`);
  console.log(`   portrait: ${photo ?? "none found"}`);

  if (DOWNLOAD && photo) {
    try {
      const res = await fetch(photo, { headers: { "User-Agent": UA } });
      const type = (res.headers.get("content-type") || "").split(";")[0];
      const ext = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[type];
      const buf = Buffer.from(await res.arrayBuffer());
      if (ext && buf.length > 4000) {
        await writeFile(resolve(OUT, `${slug(p.name)}.${ext}`), buf);
        console.log(`   saved public/images/collaborators/${slug(p.name)}.${ext}`);
      }
    } catch {
      console.log("   download failed");
    }
  }
  await sleep(300);
}
