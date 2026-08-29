import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  RESEARCH_COLLAGE,
  RESEARCH_INTRO,
  THEMES,
  THEME_PAPERS,
  type Theme,
} from "../content/site";
import { Container, PageHero, Reveal } from "../components/ui";
import { publicUrl } from "../lib/publicUrl";

/** The fourth theme heads its list differently on the Google Site. */
const PAPERS_HEADING: Record<string, string> = {
  "statistics-and-software": "Relevant publications",
};

/** How long each figure holds before the next one fades up, and how long that
 *  crossfade takes. Seven seconds is long enough to read a figure's panels. */
const FIGURE_MS = 7000;
const FIGURE_FADE_S = 0.7;

/** One reading of the media query, shared by every carousel on the page. */
function usePrefersReducedMotion() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return still;
}

/**
 * The photographs beside the introduction: a three-by-three mosaic in which
 * the first photograph takes a two-by-two block and the other five take single
 * cells. The container is square and its rows are equal, so every cell is a
 * square and the square source crops need no object-position of their own.
 *
 * The photographs are decoration for the paragraphs beside them rather than
 * evidence, so they carry short alt text and no captions.
 */
function IntroCollage() {
  return (
    <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-2.5 sm:gap-3">
      {RESEARCH_COLLAGE.map((photo, i) => (
        <Reveal key={photo.src} delay={0.06 * i} y={14} className={photo.span ?? ""}>
          <figure className="group h-full overflow-hidden rounded-xl border border-edge bg-panel shadow-[0_1px_2px_rgba(31,36,25,0.06),0_10px_26px_-14px_rgba(31,36,25,0.45)]">
            <img
              src={publicUrl(photo.src)}
              alt={photo.alt}
              width={900}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

/**
 * The scientific figures the Google Site showed for one theme, rotating in
 * place: a padded near-white panel, the figure inside it whole
 * (object-contain, never cropped), crossfading to the next every seven
 * seconds. Hovering or tabbing in holds it still, a reader who has asked for
 * reduced motion gets a still panel, and the dots below both report the
 * position and jump to it.
 *
 * The panel is padded and given a soft shadow rather than a feathered mask:
 * these figures carry titles, panel letters and axis labels right at their
 * edges, and any fade wide enough to read as soft erased them. The figure is
 * multiplied onto the panel (which isolates its own stacking context) so its
 * white ground becomes the panel's warm near-white instead of printing a
 * visible white rectangle inside it.
 *
 * Its height is the height the tallest of the theme's figures would take at
 * the full width of the column, clamped, so that figure fills the panel and
 * the others letterbox inside the same box. The height therefore never changes
 * as the figures rotate, and nothing on the page moves.
 */
function ThemeFigures({ theme }: { theme: Theme }) {
  // Memoised so the preload effect below does not see a new array on every
  // render: every theme in fact has figures, the fallback is only a guard.
  const figures = useMemo(
    () =>
      theme.images.length > 0
        ? theme.images
        : [{ src: theme.image, alt: "", width: 4, height: 3 }],
    [theme.image, theme.images],
  );
  const total = figures.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const still = usePrefersReducedMotion();

  useEffect(() => {
    if (still || paused || total < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), FIGURE_MS);
    return () => window.clearInterval(id);
  }, [still, paused, total]);

  // Warm the next figure, so a crossfade never lands on an empty panel while
  // its file is still on the wire.
  useEffect(() => {
    if (total < 2) return;
    new Image().src = publicUrl(figures[(index + 1) % total].src);
  }, [figures, index, total]);

  const current = figures[index];
  const stageAspect = Math.min(...figures.map((f) => f.width / f.height));

  return (
    <div
      className="relative"
      aria-roledescription={total > 1 ? "carousel" : undefined}
      aria-label={total > 1 ? `Figures for ${theme.title}` : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <a
        href={publicUrl(current.src)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open the full-size figure${current.alt ? `: ${current.alt}` : ""}`}
        className="isolate block rounded-2xl p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      >
        <span
          aria-live="off"
          className="relative block max-h-[22rem] min-h-[14rem] w-full lg:max-h-[30rem] lg:min-h-[22rem]"
          style={{ aspectRatio: `${stageAspect}` }}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={current.src}
              src={publicUrl(current.src)}
              alt={current.alt}
              width={current.width}
              height={current.height}
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: still ? 0 : FIGURE_FADE_S, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </AnimatePresence>
        </span>
      </a>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2.5">
          {figures.map((figure, i) => (
            <button
              key={figure.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show figure ${i + 1} of ${total}`}
              aria-current={i === index}
              className="h-2.5 w-2.5 rounded-full border transition duration-300 hover:scale-125"
              style={{
                backgroundColor: i === index ? theme.accent : "transparent",
                borderColor: i === index ? theme.accent : "#DED7C6",
              }}
            />
          ))}
        </div>
      )}

      <div
        className="mx-auto mt-3 h-1 w-24 rounded-full"
        style={{ backgroundColor: theme.accent }}
      />
    </div>
  );
}

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="What we do?"
        image="/images/bg-research-rock-lizard.jpg"
        imageOpacity={0.8}
        imagePosition="0% 32%"
      />

      <Container className="pb-16 pt-8">
        {/* The introduction and the animals it describes, side by side from
            the large breakpoint up and stacked below it. */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <div className="prose-dark max-w-2xl">
              {RESEARCH_INTRO.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <IntroCollage />
        </div>

        <div className="mt-16 space-y-20">
          {THEMES.map((t, i) => {
            const papers = THEME_PAPERS[t.id] ?? [];
            return (
              <section key={t.id} id={t.id} className="scroll-mt-28">
                <Reveal>
                  <div
                    className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-12 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <ThemeFigures theme={t} />

                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="text-xs font-semibold uppercase tracking-[0.2em]"
                          style={{ color: t.accent }}
                        >
                          Theme {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
                        {t.title}
                      </h2>

                      <p className="mt-4 text-[16px] leading-relaxed text-neutral-400">{t.lead}</p>

                      {t.questions.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            Questions we are asking
                          </h3>
                          <ul className="mt-3 space-y-2.5">
                            {t.questions.map((q) => (
                              <li
                                key={q}
                                className="flex gap-3 text-[15px] leading-relaxed text-neutral-300"
                              >
                                <span
                                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: t.accent }}
                                />
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {papers.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            {PAPERS_HEADING[t.id] ?? "Selected publications"}
                          </h3>
                          <ul className="mt-3 space-y-2.5">
                            {papers.map((p) => (
                              <li
                                key={p.href}
                                className="flex gap-3 text-[14.5px] leading-relaxed text-neutral-300"
                              >
                                <span
                                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: t.accent }}
                                />
                                <a
                                  href={p.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="transition hover:text-gold"
                                >
                                  {p.citation}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
