import { JOIN, SITE, TEA } from "../content/site";
import { PALETTE } from "../content/palette";
import {
  Container,
  GhostButton,
  GradientButton,
  PageHero,
  Reveal,
  SectionHeading,
} from "../components/ui";
import { ArrowRight, Icon } from "../components/Icons";

export default function Opportunities() {
  const [primary, ...rest] = JOIN.cta;

  return (
    <>
      {/* An insect this time, not another lizard: a grasshopper from the Panama
          album (2006-06-18 15.00.00, 2304x1728), black with orange edging on a
          pale branch against sunlit green - the strongest tonal contrast of any
          invertebrate frame in the local albums, which matters because this band
          renders very pale. 2304px is the widest any insect frame gets: the four
          albums that shoot larger (Alice Springs, both Morton parks, Fowler's
          Gap) hold no insect that works here - their best, a mantid at
          2848x4288, is vertical and cannot fit a 3.6:1 band.
          Cut from the left 2160x600px of the native file - the band's own 3.6:1 -
          so the whole animal lands in frame, antennae to hind foot, with the head
          at 73% across. The band is deepened from 320 to the 400px the other four
          photographic heroes use, because at 320 the band's slice is shorter than
          the insect and clips it top and bottom. y is inert at this ratio; x
          steers phones. */}
      <PageHero
        eyebrow="Join us"
        title="Join the Lab!"
        image="/images/bg-opportunities-grasshopper.jpg"
        imageOpacity={0.85}
        imagePosition="79% 50%"
        height="min-h-[400px]"
      />

      <Container className="relative -mt-20 pb-16 pt-0">
        <Reveal>
          <div className="prose-dark max-w-3xl">
            {JOIN.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
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
        </Reveal>

        <section className="mt-20">
          <Reveal>
            <SectionHeading eyebrow="Next step" title="How to get in touch" />
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="mt-8 rounded-3xl border bg-gradient-to-br from-gold/[0.07] to-panel p-8 sm:p-10"
              style={{ borderColor: `${PALETTE.terracotta}40` }}
            >
              <p className="max-w-2xl text-[16px] leading-relaxed text-neutral-300">
                Have a look at the research themes first, then send a short email describing what
                you are interested in and what you would like to work on.
              </p>
              <p className="mt-3 text-[16px] text-neutral-300">
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-medium text-gold transition hover:text-brick"
                >
                  {SITE.email}
                </a>
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <GhostButton to="/contact">Contact details</GhostButton>
                <GhostButton to="/research">Read about the research</GhostButton>
              </div>
            </div>
          </Reveal>
        </section>
        <section className="mt-20">
          <Reveal>
            <SectionHeading eyebrow={TEA.eyebrow} title={TEA.title} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card mt-8 flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-edge bg-ink text-gold"
                aria-hidden
              >
                <Icon name="tea" size={34} />
              </span>
              <div className="flex-1">
                {TEA.text.map((t) => (
                  <p key={t} className="text-[16px] leading-relaxed text-neutral-300 [&+&]:mt-2">
                    {t}
                  </p>
                ))}
                <div className="mt-5">
                  <GhostButton href={TEA.href}>
                    {TEA.label} <ArrowRight />
                  </GhostButton>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </Container>
    </>
  );
}
