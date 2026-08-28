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

function pageFor(path, { title, description }, { canonical = true, assetPrefix } = {}) {
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

  // Vite emits relative entry assets so one artifact works both below the
  // GitHub project path and at the custom-domain root. Real route documents
  // sit one directory below index.html, so their entry assets move up once.
  if (assetPrefix === "runtime") return runtimeAssets(html);
  const prefix = assetPrefix ?? (path === "/" ? "./" : "../");
  html = html.replace(
    /((?:src|href)=")\.\/(?=(?:assets\/|favicon\.svg))/g,
    `$1${prefix}`,
  );
  return html;
}

/**
 * 404.html is served at whatever path was missing, so a relative "./assets/"
 * would resolve below that path (/people/foo -> /people/assets/...) and the
 * page would stay blank. The entry assets are instead written by an inline
 * script that picks the site base from the hostname, mirroring
 * src/lib/publicUrl.ts: "/noblelab/" on the GitHub project host, "/" on the
 * custom domain. A <base> element was rejected because it would also redirect
 * in-page links such as the skip link's "#main".
 */
const GITHUB_PROJECT_BASE = "/noblelab/";
function runtimeAssets(html) {
  const tags = [];
  const tagPattern =
    /<(?:script|link)\b[^>]*\b(?:src|href)="\.\/(?:assets\/|favicon\.svg)[^"]*"[^>]*>(?:<\/script>)?/g;
  html = html.replace(tagPattern, (tag) => {
    tags.push(tag);
    return tags.length === 1 ? "__RUNTIME_ASSETS__" : "";
  });
  if (tags.length === 0) {
    throw new Error("prerender: no relative entry assets found for 404.html");
  }
  const lines = tags.map((tag) => {
    const withBase = tag.replace(/((?:src|href)=")\.\//g, "$1__BASE__");
    const literal = JSON.stringify(withBase)
      .split("__BASE__")
      .join('" + base + "')
      .replace(/<\/script>/g, "<\\/script>");
    return `      document.write(${literal});`;
  });
  const loader = [
    "<script>",
    `      var base = location.hostname.endsWith(".github.io") ? ${JSON.stringify(GITHUB_PROJECT_BASE)} : "/";`,
    ...lines,
    "    </script>",
  ].join("\n");
  return html.replace("__RUNTIME_ASSETS__", loader);
}

const written = [];
for (const [path, routeMeta] of Object.entries(routes)) {
  const out = path === "/" ? resolve(DIST, "index.html") : resolve(DIST, `.${path}`, "index.html");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, pageFor(path, routeMeta));
  written.push(path);
}

// 404.html is what Pages serves for anything genuinely missing, at any depth.
await writeFile(
  resolve(DIST, "404.html"),
  pageFor("/404", notFound, { canonical: false, assetPrefix: "runtime" }),
);

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
