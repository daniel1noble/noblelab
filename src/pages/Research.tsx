import { RESEARCH_INTRO, THEMES, THEME_PAPERS } from "../content/site";
import { Container, PageHero, Reveal } from "../components/ui";
import { publicUrl } from "../lib/publicUrl";

/** The fourth theme heads its list differently on the Google Site. */
const PAPERS_HEADING: Record<string, string> = {
  "statistics-and-software": "Relevant publications",
};

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
        <Reveal>
          <div className="prose-dark max-w-3xl">
            {RESEARCH_INTRO.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 space-y-20">
          {THEMES.map((t, i) => {
            const papers = THEME_PAPERS[t.id] ?? [];
            return (
              <section key={t.id} id={t.id} className="scroll-mt-28">
                <Reveal>
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* One figure per theme, from the old site, shown whole
                        (object-contain), never cropped, and printed onto the
                        page rather than sitting in a frame: multiply blending
                        turns the figure's white ground into the bone paper,
                        and the padded wrapper feathers into the page on every
                        edge so the fade never reaches the figure's own labels.
                        The wrapper paints and isolates its own bone ground so
                        the blend does not depend on the reveal animation's
                        stacking context. The accent bar keeps each theme's
                        colour. */}
                    <div className="relative">
                      <div className="feather-edges isolate bg-ink p-6 sm:p-8">
                        <img
                          src={publicUrl(t.image)}
                          alt={t.images[0]?.alt ?? ""}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-contain opacity-90 mix-blend-multiply transition duration-700 hover:opacity-100"
                        />
                      </div>
                      <div
                        className="mx-auto mt-2 h-1 w-24 rounded-full"
                        style={{ backgroundColor: t.accent }}
                      />
                    </div>

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
