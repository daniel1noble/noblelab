import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HIGHLIGHTED_DOIS, LINKS } from "../content/site";
import { NEUTRAL, PALETTE } from "../content/palette";
import { titleKey, usePublications, useScholar, type Publication } from "../lib/useData";
import { Chip, Container, GhostButton, PageHero, Reveal } from "../components/ui";
import { Icon } from "../components/Icons";

/**
 * Articles take terracotta, preprints ochre and chapters sage, so the
 * three kinds stay apart at a glance.
 */
const KIND_COLOUR: Record<string, string> = {
  article: PALETTE.terracotta,
  preprint: PALETTE.ochre,
  chapter: PALETTE.sage,
  other: NEUTRAL[500],
};

const KIND_LABEL: Record<string, string> = {
  article: "article",
  preprint: "preprint",
  chapter: "chapter",
  other: "other",
};

/* ------------------------------------------------------------ author line */

/** Marks the PI so a reader can find him without reading every name. */
function Authors({ pub, max = 12 }: { pub: Publication; max?: number }) {
  const shown = pub.authors.slice(0, max);
  const hidden = pub.authors.length - shown.length;

  return (
    <p className="text-sm leading-relaxed text-neutral-400">
      {shown.map((a, i) => (
        <span key={`${a.name}-${i}`}>
          <span className={a.isSelf ? "font-semibold text-gold" : undefined}>{a.name}</span>
          {i < shown.length - 1 ? ", " : ""}
        </span>
      ))}
      {hidden > 0 && <span className="text-neutral-500"> … and {hidden} more</span>}
    </p>
  );
}

/* ---------------------------------------------------------------- links */

/**
 * The preprint link earns its place only when it is the sole free route to the
 * paper. A published, open-access article does not need it, and beside a pinned
 * paper it reads as though the work were still unpublished, so the highlights
 * switch it off outright.
 */
function PubLinks({ pub, showPreprint = true }: { pub: Publication; showPreprint?: boolean }) {
  const preprintIsUseful = showPreprint && Boolean(pub.preprintUrl) && !pub.isOA;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      {pub.url && (
        <a
          href={pub.url}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-gold transition hover:text-brick"
        >
          {pub.doi ? "DOI" : "Link"}
        </a>
      )}
      {pub.oaUrl && (
        <a
          href={pub.oaUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-cyan transition hover:text-charcoal"
        >
          Full text
        </a>
      )}
      {preprintIsUseful && (
        <a
          href={pub.preprintUrl!}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-neutral-400 transition hover:text-charcoal"
        >
          Preprint
        </a>
      )}
    </div>
  );
}

/* ----------------------------------------------------------- highlights */

/** Pinned papers are all one colour: contour, top rule and citation figure. */
const HIGHLIGHT_BORDER = PALETTE.ochre;

/** How many selected papers the section shows at most (Daniel, 29 Aug 2026). */
const HIGHLIGHT_LIMIT = 6;

function Highlight({ pub, index }: { pub: Publication; index: number }) {
  const colour = HIGHLIGHT_BORDER;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="card relative flex h-full flex-col overflow-hidden p-6"
      style={{ borderColor: HIGHLIGHT_BORDER, borderWidth: 1.5 }}
    >
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: colour }} />

      <div className="flex items-baseline justify-end gap-2">
        <span className="font-display text-3xl font-bold leading-none" style={{ color: colour }}>
          {pub.citations}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          citations
        </span>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
        {pub.journal} · {pub.year}
      </p>

      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-charcoal">
        {pub.url ? (
          <a href={pub.url} target="_blank" rel="noreferrer" className="transition hover:text-gold">
            {pub.title}
          </a>
        ) : (
          pub.title
        )}
      </h3>

      <div className="mt-3 flex-1">
        <Authors pub={pub} max={4} />
      </div>

      <PubLinks pub={pub} showPreprint={false} />
    </motion.article>
  );
}

/* ------------------------------------------------------------------- card */

function PubCard({ pub, rank }: { pub: Publication; rank: number }) {
  const [open, setOpen] = useState(false);
  const colour = KIND_COLOUR[pub.kind] ?? NEUTRAL[500];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(rank, 8) * 0.03 }}
      className="card p-5 sm:p-6"
      style={{ borderColor: `${colour}22` }}
    >
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex shrink-0 flex-row items-center gap-4 sm:w-[84px] sm:flex-col sm:items-start">
          <div>
            <div className="font-display text-2xl font-bold leading-none" style={{ color: colour }}>
              {pub.citations}
            </div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
              {pub.citations === 1 ? "citation" : "citations"}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <Chip color={colour}>{KIND_LABEL[pub.kind] ?? pub.kind}</Chip>
            {pub.year && <span className="text-xs text-neutral-500">{pub.year}</span>}
            {pub.isOA && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan">
                Open access
              </span>
            )}
          </div>

          <h3 className="font-display text-[17px] font-semibold leading-snug text-charcoal sm:text-lg">
            {pub.url ? (
              <a href={pub.url} target="_blank" rel="noreferrer" className="transition hover:text-gold">
                {pub.title}
              </a>
            ) : (
              pub.title
            )}
          </h3>

          <div className="mt-2">
            <Authors pub={pub} />
          </div>

          {pub.journal && (
            <p className="mt-2 text-sm italic text-neutral-500">
              {pub.journal}
              {pub.volume ? `, ${pub.volume}` : ""}
              {pub.issue ? `(${pub.issue})` : ""}
              {pub.pages ? `, ${pub.pages}` : ""}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4">
            <PubLinks pub={pub} />
            {pub.abstract && (
              <button
                onClick={() => setOpen((v) => !v)}
                className="mt-4 text-sm font-medium text-neutral-400 transition hover:text-charcoal"
              >
                {open ? "Hide abstract" : "Abstract"}
              </button>
            )}
          </div>

          {open && pub.abstract && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-neutral-400"
            >
              {pub.abstract}
            </motion.p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------- page */

export default function Publications() {
  const data = usePublications();
  const [year, setYear] = useState<number | "all">("all");
  const [query, setQuery] = useState("");

  const scholarData = useScholar();

  /**
   * Google Scholar indexes more sources than OpenAlex, so its counts run
   * higher and are what most readers expect. Use them where a title matches,
   * and fall back to OpenAlex everywhere else.
   */
  const pubs = useMemo(() => {
    const base = data?.publications ?? [];
    if (!scholarData) return base;
    const byKey = new Map(scholarData.publications.map((p) => [p.key, p.citations]));
    return base.map((p) => {
      const hit = byKey.get(titleKey(p.title));
      return hit != null && hit > p.citations ? { ...p, citations: hit } : p;
    });
  }, [data, scholarData]);

  /**
   * Every pinned DOI that resolves against the fetched list, ranked by citation
   * count with the newer paper first where two are level, cut to
   * HIGHLIGHT_LIMIT: three across the feature row and up to three beneath it.
   */
  const highlights = useMemo(() => {
    const resolved = HIGHLIGHTED_DOIS.map((doi) =>
      pubs.find((p) => p.doi === doi.toLowerCase())
    ).filter((p): p is Publication => Boolean(p));

    return resolved
      .sort((a, b) => b.citations - a.citations || (b.year ?? 0) - (a.year ?? 0))
      .slice(0, HIGHLIGHT_LIMIT);
  }, [pubs]);

  const years = useMemo(() => {
    const counts = new Map<number, number>();
    for (const p of pubs) {
      if (p.year) counts.set(p.year, (counts.get(p.year) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[0] - a[0]);
  }, [pubs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pubs
      .filter((p) => year === "all" || p.year === year)
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.authorLine.toLowerCase().includes(q) ||
          (p.journal ?? "").toLowerCase().includes(q)
      )
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || b.citations - a.citations);
  }, [pubs, year, query]);

  const grouped = useMemo(() => {
    const map = new Map<number, Publication[]>();
    for (const p of filtered) {
      const y = p.year ?? 0;
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(p);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const scholar = LINKS.find((l) => l.icon === "scholar");
  const orcid = LINKS.find((l) => l.icon === "orcid");

  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Papers and preprints"
        image="/images/bg-publications-leaf-frog-wide.jpg"
        /* Camouflaged frog on a leaf. Daniel asked (29 Aug 2026) for more frog and less
           leaf, and the old 1800px crop could not give it: the band only ever shows a
           3.6:1 slice, and in that crop the frog was taller than the slice, so raising y
           traded head for haunches. Re-cut wider from the 2304x1728 original instead
           (left 2100x583px, the band's own 3.6:1), which shrinks the frog against the
           frame and lets far more of it through - head, eye, speckled back and flank now
           fill the band from just under the header down to the bottom fade, with the eye
           at 76% across. y is inert at this ratio; x steers phones. */
        imageOpacity={0.85}
        imagePosition="86% 50%"
        height="min-h-[400px]"
      />

      <Container className="relative -mt-20 pb-14 pt-0">
        {/* ------------------------------------------------------ highlights */}
        {highlights.length > 0 && (
          <section className="mb-16">
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Selected papers
                </h2>
              </div>
            </Reveal>
            {/* Three across, then any remainder centred rather than left in a
                row with a gap on the right. */}
            <div className="grid gap-5 md:grid-cols-3">
              {highlights.slice(0, 3).map((p, i) => (
                <Highlight key={p.id} pub={p} index={i} />
              ))}
            </div>

            {highlights.length > 3 && (
              <div className="mt-5 flex flex-wrap justify-center gap-5">
                {highlights.slice(3).map((p, i) => (
                  <div
                    key={p.id}
                    className="w-full md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-2.5rem)/3)]"
                  >
                    <Highlight pub={p} index={i + 3} />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            {scholar && (
              <GhostButton href={scholar.href}>
                <Icon name="scholar" size={16} /> Google Scholar
              </GhostButton>
            )}
            {orcid && (
              <GhostButton href={orcid.href}>
                <Icon name="orcid" size={16} /> ORCID
              </GhostButton>
            )}
            {data && (
              <span className="text-xs text-neutral-500">
                {pubs.length} works · list updated {data.updated} from ORCID, Crossref and
                OpenAlex
                {scholarData && ` · citations from Google Scholar, ${scholarData.updated}`}
              </span>
            )}
          </div>
        </Reveal>

        {/* --------------------------------------------------------- filters */}
        <Reveal delay={0.1}>
          <div className="sticky top-[92px] z-20 -mx-2 mt-8 rounded-2xl border border-edge bg-ink/90 px-4 py-4 shadow-[0_8px_24px_rgba(31,36,25,0.06)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setYear("all")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  year === "all"
                    ? "border-gold bg-gold text-ink"
                    : "border-neutral-600 text-neutral-300 hover:border-neutral-500 hover:text-charcoal"
                }`}
              >
                All years
              </button>
              {years.map(([y, n]) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                    year === y
                      ? "border-gold bg-gold text-ink"
                      : "border-neutral-600 text-neutral-300 hover:border-neutral-500 hover:text-charcoal"
                  }`}
                >
                  {y}
                  <span className={year === y ? "ml-1.5 opacity-70" : "ml-1.5 text-neutral-500"}>
                    {n}
                  </span>
                </button>
              ))}

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, author, journal…"
                className="ml-auto w-full rounded-full border border-neutral-600 bg-panel px-4 py-2 text-sm text-charcoal placeholder:text-neutral-500 focus:border-gold focus:outline-none sm:w-64"
              />
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------------------ list */}
        <div className="mt-10">
          {!data && <p className="py-16 text-center text-neutral-500">Loading publications…</p>}

          {data && filtered.length === 0 && (
            <p className="py-16 text-center text-neutral-500">
              Nothing matches that filter. Try clearing the search.
            </p>
          )}

          {grouped.map(([y, items]) => (
            <section key={y} className="mb-12">
              <div className="mb-5 flex items-center gap-4">
                <h2 className="font-display text-2xl font-bold text-charcoal">{y || "In press"}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                <span className="text-sm text-neutral-500">{items.length}</span>
              </div>
              <div className="space-y-4">
                {items.map((p, i) => (
                  <PubCard key={p.id} pub={p} rank={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
