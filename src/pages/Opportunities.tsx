import { JOIN, SITE } from "../content/site";
import { PALETTE } from "../content/palette";
import {
  Container,
  GhostButton,
  GradientButton,
  PageHero,
  Reveal,
  SectionHeading,
} from "../components/ui";
import { ArrowRight } from "../components/Icons";

export default function Opportunities() {
  const [primary, ...rest] = JOIN.cta;

  return (
    <>
      {/* Not the sleepy lizard: all three frames of that animal on this site
          (bg-opportunities-sleepy-lizard, gallery-field-23, gallery-field-28)
          catch it mid-gape with the tongue out, which read as a threat display
          beside a headline inviting students to apply. This band is a crop of
          gallery-field-25-pygmy-bluetongue.jpg (the site captions it "Pygmy
          Bluetongue", "A small lizard resting in an open hand"), cut to
          1200x370 with the head at 61% of the width, so the face sits well
          right of the h1. x only bites below ~1024px, y only above it. */}
      <PageHero
        eyebrow="Join us"
        title="Join the Lab!"
        image="/images/bg-opportunities-pygmy-bluetongue.jpg"
        imagePosition="67% 50%"
      />

      <Container className="pb-16 pt-8">
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
      </Container>
    </>
  );
}
