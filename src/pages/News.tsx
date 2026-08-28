import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NEWS, type NewsItem } from "../content/site";
import { PALETTE } from "../content/palette";
import { usePublications, type Publication } from "../lib/useData";
import { Chip, Container, GhostButton, PageHero, Reveal, SectionHeading } from "../components/ui";
import { ArrowRight } from "../components/Icons";
import { publicUrl } from "../lib/publicUrl";

const TAG_COLOUR: Record<NewsItem["tag"], string> = {
  Paper: PALETTE.terracotta,
  Opportunities: PALETTE.ochre,
  Events: PALETTE.sage,
  Award: PALETTE.rust,
  Media: PALETTE.oliveDeep,
  Lab: PALETTE.terracotta,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const colour = TAG_COLOUR[item.tag];
  const external = item.href?.startsWith("http");

  const body = (
    <article
      className="card group flex h-full flex-col overflow-hidden"
      style={{ borderColor: `${colour}26` }}
    >
      {item.image &&
        (item.imageFit === "contain" ? (
          <div className="flex h-44 items-center justify-center bg-charcoal/5 px-10">
            <img
              src={publicUrl(item.image)}
              alt=""
              loading="lazy"
              className="max-h-16 w-full object-contain opacity-90 transition duration-500 group-hover:opacity-100"
            />
          </div>
        ) : (
          <div className="h-44 overflow-hidden">
            <img
              src={publicUrl(item.image)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          </div>
        ))}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Chip color={colour}>{item.tag}</Chip>
          <time className="text-xs text-neutral-500" dateTime={item.date}>
            {formatDate(item.date)}
          </time>
        </div>

        <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-charcoal">
          {item.title}
        </h2>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neutral-400">{item.body}</p>

        {item.href && (
          <span
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: colour }}
          >
            {external ? "Read more" : "Learn more"}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </article>
  );

  const wrapper = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05 }}
      className="h-full"
    >
      {body}
    </motion.div>
  );

  if (!item.href) return wrapper;
  return external ? (
    <a href={item.href} target="_blank" rel="noreferrer" className="h-full">
      {wrapper}
    </a>
  ) : (
    <Link to={item.href} className="h-full">
      {wrapper}
    </Link>
  );
}

/* -------------------------------------------------------- news feed */

function NewsFeed() {
  const [tag, setTag] = useState<string>("All");

  const sorted = useMemo(() => [...NEWS].sort((a, b) => b.date.localeCompare(a.date)), []);
  const tags = useMemo(() => ["All", ...new Set(sorted.map((n) => n.tag))], [sorted]);
  const shown = tag === "All" ? sorted : sorted.filter((n) => n.tag === tag);

  const years = useMemo(() => {
    const map = new Map<string, NewsItem[]>();
    for (const n of shown) {
      const y = n.date.slice(0, 4);
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(n);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [shown]);

  return (
    <>
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                tag === t
                  ? "border-gold bg-gold text-ink"
                  : "border-neutral-600 text-neutral-300 hover:border-neutral-500 hover:text-charcoal"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 space-y-16">
        {years.map(([year, items]) => (
          <section key={year}>
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-display text-2xl font-bold text-charcoal">{year}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
              <span className="text-sm text-neutral-500">{items.length}</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {items.map((n, i) => (
                  <NewsCard key={n.title} item={n} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-20 text-center text-neutral-500">No items with that tag yet.</p>
      )}
    </>
  );
}

/* ----------------------------------------------------- latest papers */

/** Stands in while NEWS is empty: the twelve newest works from publications.json. */
function LatestPapers() {
  const data = usePublications();

  const latest: Publication[] = useMemo(
    () =>
      [...(data?.publications ?? [])]
        .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
        .slice(0, 12),
    [data],
  );

  return (
    <>
      <Reveal>
        <SectionHeading eyebrow="Publications" title="Latest papers" />
        {/* Shown while NEWS in src/content/site.ts is empty. */}
        <p className="mt-4 max-w-2xl text-sm text-neutral-500">
          The group's most recent papers. The full list is on the Publications page.
        </p>
      </Reveal>

      {!data && <p className="py-16 text-center text-neutral-500">Loading publications…</p>}

      <ol className="mt-10 space-y-4">
        {latest.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={Math.min(i, 8) * 0.04} className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Chip color={p.kind === "preprint" ? PALETTE.ochre : PALETTE.terracotta}>
                  {p.kind}
                </Chip>
                {p.year && <span className="text-xs text-neutral-500">{p.year}</span>}
                {p.journal && (
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                    {p.journal}
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-display text-[17px] font-semibold leading-snug text-charcoal sm:text-lg">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noreferrer" className="transition hover:text-gold">
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{p.authorLine}</p>
              {p.doi && (
                <a
                  href={`https://doi.org/${p.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-gold transition hover:text-brick"
                >
                  DOI: {p.doi}
                </a>
              )}
            </Reveal>
          </li>
        ))}
      </ol>

      {data && (
        <div className="mt-10">
          <GhostButton to="/publications">All publications</GhostButton>
        </div>
      )}
    </>
  );
}

export default function News() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="What is happening"
        image="/images/bg-news-maria-island.jpg"
        imagePosition="30% 50%"
        height="min-h-[380px]"
      />

      <Container className="py-16">{NEWS.length > 0 ? <NewsFeed /> : <LatestPapers />}</Container>
    </>
  );
}
