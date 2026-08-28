import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  HOME_INTRO,
  HOME_SECTIONS,
  HOME_VIDEO,
  HOME_VIDEO_TITLE,
  JOIN,
  NEWS,
  PI,
  SITE,
  THEMES,
} from "../content/site";
import { PALETTE } from "../content/palette";
import { useCollaborators, usePublications, type Publication } from "../lib/useData";
import { publicUrl } from "../lib/publicUrl";
import {
  Chip,
  Container,
  GhostButton,
  GradientButton,
  Reveal,
  SectionHeading,
  StatTile,
  TextLink,
} from "../components/ui";
import { ArrowRight } from "../components/Icons";
import { Wordmark } from "../components/Header";
import LogoMark from "../components/LogoMark";

/* ------------------------------------------------------------------ hero */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // The photograph drifts and dims as the copy scrolls off; a shallow parallax.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        {/* bg-hero-face.jpg is bg-hero-red-rock-lizard.jpg cropped so the
            lizard's head sits at 59% of the frame, clear of the left wash.
            bg-hero-scales.jpg and bg-hero-lizard-mesh.jpg are alternatives.
            Phones get their own crop of the same frame: -mobile-face.jpg is
            573x1141, the aspect of a 390x776 hero, so object-cover shows the
            whole crop and the head lands near the middle of the screen at
            roughly two and a half times the width the older -mobile.jpg gave
            (that file is kept, unused, alongside it). Both axes are inert at
            that size, so the crop, not object-position, does the work. */}
        <picture className="block h-full w-full">
          <source
            media="(max-width: 640px)"
            srcSet={publicUrl("/images/bg-hero-red-rock-lizard-mobile-face.jpg")}
          />
          <img
            src={publicUrl("/images/bg-hero-face.jpg")}
            alt="Small pale lizard perched on a red rock against blurred orange ground"
            className="h-full w-full object-cover object-[20%_50%]"
          />
        </picture>
        {/* Three overlapping washes so the photograph dissolves into the paper
            on every side rather than ending on a visible edge. The left wash
            holds about 90% ink across the width of the copy and thins from
            there; the mid stop was pulled in from 45% to 34% so the lizard's
            head, at 59% of the frame, reads rather than ghosting. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink from-16% via-ink/90 via-34% to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/75" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <Container className="relative pb-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-12"
        >
          {/* Renders only once LOGO_MARK (site.ts) points at a file; see LogoMark.
              hero-mark-bleed carries the leftward pull (index.css). */}
          <LogoMark
            size={300}
            priority
            className="hero-mark-bleed w-[190px] sm:w-[240px] lg:w-[300px]"
          />

          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10" style={{ backgroundColor: PALETTE.terracotta }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.24em]"
                style={{ color: PALETTE.terracotta }}
              >
                {SITE.university} · {SITE.city}
              </span>
            </div>

            <h1 className="text-[3.1rem] leading-[0.98] sm:text-7xl md:text-[5.3rem]">
              <Wordmark />
            </h1>

            <p className="mt-5 max-w-2xl font-display text-xl font-medium leading-snug text-charcoal sm:text-2xl">
              {SITE.strapline}
            </p>

            <div className="mt-6 max-w-xl space-y-3">
              {HOME_INTRO.map((line) => (
                <p key={line} className="text-[17px] leading-relaxed text-neutral-300">
                  {line}
                </p>
              ))}
            </div>

            {/* Names the PI in the hero, so a first-time visitor knows whose lab
                this is without opening the People page. */}
            <p className="mt-5 text-[15px] leading-relaxed text-neutral-400">
              The lab is led by{" "}
              <Link
                to="/people"
                className="font-semibold text-charcoal underline decoration-[color:var(--accent)] decoration-2 underline-offset-4 transition hover:text-[color:var(--accent)]"
              >
                {PI.name}
              </Link>
              .
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <GradientButton to="/research">
                Our research <ArrowRight />
              </GradientButton>
              <GhostButton to="/opportunities">Join the lab</GhostButton>
            </div>
          </div>
        </motion.div>
      </Container>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-neutral-600 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full"
            style={{ backgroundColor: PALETTE.terracotta }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------- overview */

/** The two short home-page columns (Research Systems / Research Questions). */
function Overview() {
  const accents = [PALETTE.sage, PALETTE.terracotta];

  return (
    <section className="relative py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The lab"
            title={
              <>
                How organisms and populations{" "}
                <span className="brand-text">adapt to changing environments</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {HOME_SECTIONS.map((s, i) => (
            <Reveal key={s.heading} delay={0.1 + i * 0.08}>
              <div className="card flex h-full flex-col p-7 sm:p-8">
                <div
                  className="mb-4 h-1 w-10 rounded-full"
                  style={{ backgroundColor: accents[i % accents.length] }}
                />
                <h3 className="font-display text-2xl font-semibold text-charcoal">{s.heading}</h3>
                <div className="prose-dark mt-4 flex-1">
                  {s.text.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <div className="mt-6">
                  <TextLink to={s.cta.to} color={accents[i % accents.length]}>
                    {s.cta.label}
                  </TextLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- themes */

function Themes() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Research" title="Research themes" />
            <TextLink to="/research" color={PALETTE.sage}>
              Read more
            </TextLink>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {THEMES.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <Link
                to={`/research#${t.id}`}
                className="card group flex h-full flex-col overflow-hidden"
              >
                {/* A scientific figure, shown whole on a pale panel rather
                    than cropped like a photograph. */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-edge bg-panel px-5 pb-5 pt-4">
                  <img
                    src={publicUrl(t.image)}
                    alt=""
                    loading="lazy"
                    className="max-h-full w-auto max-w-full object-contain transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: t.accent }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-charcoal">
                    {t.title}
                  </h3>
                  {/* flex-1 sits on the wrapper: a stretched line-clamp paints
                      partial lines below the ellipsis in WebKit. */}
                  <div className="flex-1">
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-neutral-400">
                      {t.lead}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- video */

function Video() {
  if (!HOME_VIDEO) return null;

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Watch" title={HOME_VIDEO_TITLE} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-7 overflow-hidden rounded-2xl border border-edge bg-panel">
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${HOME_VIDEO}`}
              title={HOME_VIDEO_TITLE}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- numbers */

/** Reads public/data/collaborators.json; renders nothing until it arrives. */
function Network() {
  const collab = useCollaborators();
  if (!collab) return null;

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Collaboration" title="A global collaborative network" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatTile value={collab.total} label="Co-authors" color={PALETTE.sage} />
            <StatTile value={collab.institutions} label="Institutions" color={PALETTE.terracotta} />
            <StatTile value={collab.countries} label="Countries" color={PALETTE.ochre} />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6">
            <TextLink to="/people" color={PALETTE.sage}>
              See the network
            </TextLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- papers */

/** The four newest works from public/data/publications.json. */
function LatestPapers() {
  const data = usePublications();
  if (!data) return null;

  const latest: Publication[] = [...data.publications]
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 4);
  if (latest.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Publications" title="Latest papers" />
            <TextLink to="/publications" color={PALETTE.sage}>
              All publications
            </TextLink>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <article className="card flex h-full flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                  {[p.journal, p.year].filter(Boolean).join(" · ")}
                </p>
                <h3 className="mt-2 font-display text-[16px] font-semibold leading-snug text-charcoal">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-gold"
                    >
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <div className="flex-1">
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-400">
                    {p.authorLine}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ join */

function JoinTheLab() {
  const [primary, ...rest] = JOIN.cta;

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-charcoal/5 via-panel to-panel p-8 sm:p-12"
            style={{ borderColor: `${PALETTE.terracotta}4D` }}
          >
            <div className="brand-gradient absolute inset-x-0 top-0 h-[3px]" />
            <div className="max-w-2xl">
              <Chip color={PALETTE.terracotta}>Join the Lab!</Chip>
              <div className="mt-5 space-y-3">
                {JOIN.intro.map((p, i) =>
                  i === 0 ? (
                    <h2
                      key={p}
                      className="font-display text-2xl font-bold leading-tight text-charcoal sm:text-3xl"
                    >
                      {p}
                    </h2>
                  ) : (
                    <p key={p} className="text-[16px] leading-relaxed text-neutral-300">
                      {p}
                    </p>
                  ),
                )}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {primary && (
                  <GradientButton href={primary.href}>
                    {primary.label} <ArrowRight />
                  </GradientButton>
                )}
                {rest.map((c) => (
                  <GhostButton key={c.href} href={c.href}>
                    {c.label}
                  </GhostButton>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ news */

const TAG_COLOUR: Record<string, string> = {
  Paper: PALETTE.terracotta,
  Opportunities: PALETTE.terracotta,
  Events: PALETTE.sage,
  Award: PALETTE.rust,
  Media: PALETTE.oliveDeep,
  Lab: PALETTE.terracotta,
};

/** Only appears once NEWS in site.ts has entries. */
function LatestNews() {
  const items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="News" title="Latest from the group" />
            <TextLink to="/news" color={PALETTE.sage}>
              All news
            </TextLink>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.07}>
              <article className="card group flex h-full flex-col overflow-hidden">
                {n.image &&
                  (n.imageFit === "contain" ? (
                    <div className="flex h-36 items-center justify-center bg-charcoal/5 px-10">
                      <img
                        src={publicUrl(n.image)}
                        alt=""
                        loading="lazy"
                        className="max-h-14 w-full object-contain opacity-90"
                      />
                    </div>
                  ) : (
                    <div className="h-36 overflow-hidden">
                      <img
                        src={publicUrl(n.image)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>
                  ))}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3">
                    <Chip color={TAG_COLOUR[n.tag] ?? PALETTE.terracotta}>{n.tag}</Chip>
                    <time className="text-xs text-neutral-500">
                      {new Date(n.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug text-charcoal">
                    {n.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">{n.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <Themes />
      <Video />
      <LatestPapers />
      <Network />
      <JoinTheLab />
      <LatestNews />
    </>
  );
}
