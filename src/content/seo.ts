/**
 * Per-route titles and descriptions.
 *
 * The data lives in route-meta.json rather than here, because two things
 * outside the bundle need it: scripts/prerender-routes.mjs writes one real
 * directory per route so GitHub Pages answers 200 instead of 404, and the same
 * script builds sitemap.xml. A JSON file is the only form all three can read,
 * so the route list cannot drift between the app, the pages and the sitemap.
 *
 * Every title carries "Noble Lab" and "Daniel Noble", because the queries the
 * site most needs to win are the lab and the PI's name, and the title is the
 * strongest signal a page controls.
 *
 * PageMeta in App.tsx writes these into the document on each navigation.
 */
import meta from "./route-meta.json";

export type RouteMeta = { title: string; description: string };

export const SITE_URL: string = meta.siteUrl;

export const ROUTE_META: Record<string, RouteMeta> = meta.routes;

/** Unknown paths get a title but no canonical, so they cannot dilute a real page. */
export const NOT_FOUND_META: RouteMeta = meta.notFound;

/**
 * Drops a trailing slash so a path can be looked up in ROUTE_META.
 *
 * GitHub Pages serves /people from people/index.html and redirects /people to
 * /people/, so the running app sees the slashed form while the keys here do not
 * carry one. Without this, every deep link matched the not-found metadata.
 */
export function normalisePath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

/** The URL Pages actually settles on, which is the one a canonical must name. */
export function canonicalUrl(pathname: string): string {
  const path = normalisePath(pathname);
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}
