import { useEffect, useState } from "react";
import { publicUrl } from "./publicUrl";

/* ------------------------------------------------------------------ types */

export type Author = { name: string; orcid: string | null; isSelf: boolean };

export type Publication = {
  id: string;
  doi: string | null;
  title: string;
  authors: Author[];
  authorLine: string;
  journal: string | null;
  year: number | null;
  date: string | null;
  volume: string | null;
  issue: string | null;
  pages: string | null;
  kind: "article" | "preprint" | "software" | "chapter" | "other";
  isOA: boolean;
  oaUrl: string | null;
  url: string | null;
  citations: number;
  abstract: string | null;
  concepts: string[];
  preprintUrl?: string;
  altmetric: { score: number; posts: number; accounts: number; url: string | null } | null;
};

/** Shape of public/data/metrics.json as written by scripts/fetch-data.mjs. */
export type Metrics = {
  updated: string;
  /** Data sources the counts were assembled from, e.g. ["ORCID", "Crossref", "OpenAlex"]. */
  sources: string[];
  orcid: string;
  citations: number;
  hIndex: number | null;
  i10Index: number | null;
  works: number;
  articles: number;
  preprints: number;
  firstAuthor: number;
  coAuthors: number;
  countries: number;
  /** Citations received in each calendar year, summed over every work. */
  citationsByYear: { year: number; cited_by_count: number }[];
};

export type Collaborator = {
  name: string;
  orcid: string | null;
  openalex: string | null;
  works: number;
  lastYear: number;
  institution: string | null;
  city: string | null;
  country: string | null;
  countryCode: string | null;
  lat: number | null;
  lon: number | null;
};

export type CollaboratorData = {
  updated: string;
  total: number;
  countries: number;
  institutions: number;
  byCountry: Record<string, number>;
  collaborators: Collaborator[];
};

/* ------------------------------------------------------------------ hook */

const cache = new Map<string, unknown>();

/** Fetches a JSON file from public/data once and memoises it for the session. */
function useJSON<T>(path: string): T | null {
  const [data, setData] = useState<T | null>((cache.get(path) as T) ?? null);

  useEffect(() => {
    if (cache.has(path)) return;
    let live = true;
    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} for ${path}`);
        return r.json();
      })
      .then((json) => {
        cache.set(path, json);
        if (live) setData(json as T);
      })
      .catch((err) => console.error("Data load failed:", err));
    return () => {
      live = false;
    };
  }, [path]);

  return data;
}

export function usePublications() {
  return useJSON<{ updated: string; publications: Publication[] }>(publicUrl("/data/publications.json"));
}

export function useMetrics() {
  return useJSON<Metrics>(publicUrl("/data/metrics.json"));
}

export function useCollaborators() {
  return useJSON<CollaboratorData>(publicUrl("/data/collaborators.json"));
}

export function useWorldAtlas() {
  return useJSON<any>(publicUrl("/data/countries-110m.json"));
}

/* --------------------------------------------------------------- scholar */

export type ScholarData = {
  updated: string;
  source: string;
  scholarId: string;
  citations: number;
  citations5y: number | null;
  hIndex: number | null;
  i10Index: number | null;
  publications: { title: string; key: string; year: number | null; citations: number }[];
};

/**
 * Google Scholar counts, refreshed by hand with scripts/scholar_refresh.py.
 * The file is optional: without it the site falls back to OpenAlex.
 */
export function useScholar() {
  return useJSON<ScholarData>(publicUrl("/data/scholar.json"));
}

const STOP = new Set([
  "a","an","the","of","in","on","for","and","to","with","across","using","from",
  "is","are","by","at","as","that",
]);

/** Same normalisation as the Python script, so the keys line up. */
export function titleKey(title: string) {
  return (title || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
    .join(" ");
}
