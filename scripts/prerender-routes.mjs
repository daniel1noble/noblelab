/**
 * Writes one real directory per route, plus the sitemap.
 *
 * GitHub Pages has no server-side rewrite. Copying index.html to 404.html makes
 * a deep link *render*, but Pages still answers with HTTP 404, and a crawler
 * drops a 404 whatever the body contains. Every route except "/" was therefore
 * unindexable, including the seven listed in the sitemap.
 *
 * Emitting dist/people/index.html and friends makes each URL a real file, so
 * Pages answers 200. Each copy also carries its own title, description and
 * canonical, which means the correct metadata is there before any JavaScript
 * runs. PageMeta in src/App.tsx then keeps it right during client-side
 * navigation.
 *
 * Routes come from src/content/route-meta.json, the same file the app reads, so
 * a new page cannot appear in the sitemap without a directory to back it.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(HERE, "..", "dist");

const meta = JSON.parse(
  await readFile(resolve(HERE, "..", "src", "content", "route-meta.json"), "utf8"),
);
const { siteUrl, routes, notFound } = meta;

const shell = await readFile(resolve(DIST, "index.html"), "utf8");

/** Replaces the first match, and fails loudly if the pattern has gone stale. */
function swap(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: no ${label} found in dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

/**
 * Pages redirects /people to /people/, so the trailing-slash form is the URL it
 * settles on, and the only one a canonical or a sitemap should name.
 */
function urlFor(path) {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}/`;
}

function pageFor(path, { title, description }, { canonical = true } = {}) {
  const url = urlFor(path);
  let html = shell;
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, "title");
  html = swap(
    html,
    /(<meta\s+name="description"\s+content=")[^"]*(")/s,
    `$1${description}$2`,
    "description",
  );
  html = swap(
    html,
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${title}$2`,
    "og:title",
  );
  html = swap(
    html,
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/s,
    `$1${description}$2`,
    "og:description",
  );
  html = swap(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, "og:url");

  if (canonical) {
    html = swap(
      html,
      /(<link rel="canonical" href=")[^"]*(")/,
      `$1${url}$2`,
      "canonical link",
    );
  } else {
    // A fallback page must not claim to be a real one, and must not be indexed.
    html = html.replace(/<link rel="canonical" href="[^"]*" \/>\s*/, "");
    html = html.replace(/<title>/, '<meta name="robots" content="noindex" />\n    <title>');
  }
  return html;
}

const written = [];
for (const [path, routeMeta] of Object.entries(routes)) {
  const out = path === "/" ? resolve(DIST, "index.html") : resolve(DIST, `.${path}`, "index.html");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, pageFor(path, routeMeta));
  written.push(path);
}

// 404.html is what Pages serves for anything genuinely missing.
await writeFile(resolve(DIST, "404.html"), pageFor("/404", notFound, { canonical: false }));

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(routes)
  .map((p) => `  <url>\n    <loc>${urlFor(p)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join("\n")}
</urlset>
`;
await writeFile(resolve(DIST, "sitemap.xml"), sitemap);

console.log(
  `Pre-rendered ${written.length} routes (${written.join(", ")}), a noindex 404, and sitemap.xml.`,
);
