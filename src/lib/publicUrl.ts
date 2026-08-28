/**
 * GitHub project sites live below /<repository>/ until a custom domain is
 * active. The same artifact must also work at the custom-domain root.
 */
export const siteBase =
  typeof window !== "undefined" && window.location.hostname.endsWith(".github.io")
    ? "/noblelab/"
    : "/";

/** Resolve a root-relative public asset against the active site base. */
export function publicUrl(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${siteBase}${path.slice(1)}`;
}
