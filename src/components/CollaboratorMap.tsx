import { useEffect, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import { useCollaborators, useWorldAtlas, type Collaborator } from "../lib/useData";
import { LINKS } from "../content/site";
import { MAP_STOPS, NEUTRAL, PALETTE } from "../content/palette";
import { StatTile } from "./ui";

const WIDTH = 980;
const HEIGHT = 500;

/**
 * Pale sage through ochre and terracotta to rust for the busiest countries.
 * Imported from palette.ts so the map's fills and the palette cannot drift
 * apart.
 */
const STOPS = MAP_STOPS;

function rampColour(t: number) {
  const x = Math.max(0, Math.min(1, t)) * (STOPS.length - 1);
  const i = Math.min(Math.floor(x), STOPS.length - 2);
  const f = x - i;
  const a = hexToRgb(STOPS[i]);
  const b = hexToRgb(STOPS[i + 1]);
  const mix = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${mix.join(",")})`;
}

function hexToRgb(hex: string): number[] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * OpenAlex names institution countries slightly differently from the Natural
 * Earth atlas. Every right-hand value was checked against countries-110m.json.
 */
const NAME_FIXES: Record<string, string> = {
  "United States": "United States of America",
  "The Netherlands": "Netherlands",
  USA: "United States of America",
  UK: "United Kingdom",
  "Czech Republic": "Czechia",
  "Republic of Korea": "South Korea",
  "Korea, Republic of": "South Korea",
  "Russian Federation": "Russia",
  "Viet Nam": "Vietnam",
  "Iran (Islamic Republic of)": "Iran",
  "Tanzania, United Republic of": "Tanzania",
  "Bolivia (Plurinational State of)": "Bolivia",
  "Venezuela (Bolivarian Republic of)": "Venezuela",
  "Ivory Coast": "Côte d'Ivoire",
  "North Macedonia": "Macedonia",
  "Democratic Republic of the Congo": "Dem. Rep. Congo",
  "Congo, Democratic Republic of the": "Dem. Rep. Congo",
  "Bosnia and Herzegovina": "Bosnia and Herz.",
};

const canon = (name: string | null) => (name ? NAME_FIXES[name] ?? name : "");

export default function CollaboratorMap() {
  const data = useCollaborators();
  const world = useWorldAtlas();
  const [hover, setHover] = useState<{ name: string; n: number; x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // The ORCID record the publication list is built from, if the site links one.
  const orcid = LINKS.find((l) => l.icon === "orcid");

  // Close the country panel on Escape, the expected keyboard behaviour.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const [country, n] of Object.entries(data?.byCountry ?? {})) {
      const key = canon(country);
      m.set(key, (m.get(key) ?? 0) + n);
    }
    return m;
  }, [data]);

  const maxCount = useMemo(() => Math.max(1, ...counts.values()), [counts]);

  const features = useMemo(() => {
    if (!world) return [];
    return (topojson.feature(world, world.objects.countries) as any).features as any[];
  }, [world]);

  const projection = useMemo(
    () => geoNaturalEarth1().fitSize([WIDTH, HEIGHT - 20], { type: "Sphere" } as any),
    []
  );
  const path = useMemo(() => geoPath(projection), [projection]);

  const inCountry: Collaborator[] = useMemo(() => {
    if (!selected || !data) return [];
    return data.collaborators
      .filter((c) => canon(c.country) === selected)
      .sort((a, b) => b.works - a.works);
  }, [selected, data]);

  if (!data) {
    return (
      <div className="card flex h-[420px] items-center justify-center">
        <p className="text-neutral-500">Loading collaborator network…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <StatTile value={data.total} label="Co-authors" color={PALETTE.sage} />
        <StatTile value={data.institutions} label="Institutions" color={PALETTE.terracotta} />
        <StatTile value={data.countries} label="Countries" color={PALETTE.ochre} />
      </div>

      <div
        ref={wrapRef}
        className="relative mt-5 overflow-hidden rounded-2xl border border-edge bg-panel"
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          role="img"
          aria-label="World map showing the countries of the group's co-authors"
          className="block"
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="legendRamp" x1="0%" x2="100%">
              {STOPS.map((c, i) => (
                <stop key={c} offset={`${(i / (STOPS.length - 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
          </defs>

          {/* ocean is the page paper; countries without co-authors are the panel white */}
          <rect width={WIDTH} height={HEIGHT} fill={PALETTE.ink} />

          <g>
            {features.map((f, i) => {
              const name: string = f?.properties?.name ?? "";
              const n = counts.get(name) ?? 0;
              const fill =
                n === 0 ? PALETTE.panel : rampColour(Math.log1p(n) / Math.log1p(maxCount));
              const isSel = selected === name;
              return (
                <path
                  key={i}
                  d={path(f) || ""}
                  fill={fill}
                  stroke={isSel ? PALETTE.charcoal : PALETTE.edge}
                  strokeWidth={isSel ? 1.4 : 0.4}
                  vectorEffect="non-scaling-stroke"
                  style={{ cursor: n > 0 ? "pointer" : "default", transition: "fill 0.25s" }}
                  onMouseMove={(e) => {
                    if (!n) return setHover(null);
                    const box = wrapRef.current?.getBoundingClientRect();
                    if (!box) return;
                    setHover({
                      name,
                      n,
                      x: e.clientX - box.left,
                      y: e.clientY - box.top,
                    });
                  }}
                  onClick={() => n > 0 && setSelected(isSel ? null : name)}
                />
              );
            })}
          </g>

          {/* legend */}
          <g transform={`translate(${WIDTH - 210}, ${HEIGHT - 42})`}>
            <text x={0} y={-6} fontSize="11" fill={NEUTRAL[400]} fontWeight={600}>
              Co-authors per country
            </text>
            <rect width={170} height={9} rx={4} fill="url(#legendRamp)" />
            <text x={0} y={22} fontSize="10" fill={NEUTRAL[500]}>
              1
            </text>
            <text x={158} y={22} fontSize="10" fill={NEUTRAL[500]}>
              {maxCount}
            </text>
          </g>
        </svg>

        {hover && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] rounded-lg border border-gold/40 bg-panel/95 px-3 py-2 text-xs shadow-lg"
            style={{ left: hover.x, top: hover.y }}
          >
            <div className="font-semibold text-charcoal">{hover.name}</div>
            <div className="text-neutral-400">
              {hover.n} co-{hover.n === 1 ? "author" : "authors"}
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="card mt-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-charcoal">{selected}</h3>
              <p className="mt-1 text-sm text-neutral-500">
                {inCountry.length} co-{inCountry.length === 1 ? "author" : "authors"}
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-gold hover:text-gold"
            >
              Close
            </button>
          </div>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {inCountry.map((c) => (
              <li key={c.name} className="rounded-lg border border-edge bg-ink/60 p-3">
                {c.orcid ? (
                  <a
                    href={c.orcid}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-charcoal transition hover:text-gold"
                  >
                    {c.name}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-charcoal">{c.name}</span>
                )}
                <p className="mt-0.5 text-xs leading-snug text-neutral-500">{c.institution}</p>
                <p className="mt-1 text-[11px] text-neutral-600">
                  {c.works} joint {c.works === 1 ? "work" : "works"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-neutral-500">
        Click a country to list its researchers. This map is generated automatically from every
        co-authored work on record, using the institution each co-author reported on the paper.
        Publications come from{" "}
        {orcid ? (
          <a
            href={orcid.href}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-neutral-700 underline-offset-2 transition hover:text-gold"
          >
            ORCID
          </a>
        ) : (
          "ORCID"
        )}{" "}
        and Crossref; co-authors and affiliations come from{" "}
        <a
          href="https://openalex.org/"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-neutral-700 underline-offset-2 transition hover:text-gold"
        >
          OpenAlex
        </a>
        . Last updated {data.updated}.
      </p>
    </div>
  );
}
