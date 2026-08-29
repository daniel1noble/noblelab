import { TEACHING } from "../content/site";
import { Container, GhostButton, PageHero, Reveal } from "../components/ui";
import { ArrowRight } from "../components/Icons";

export default function Teaching() {
  const { intro, workshop } = TEACHING;

  return (
    <>
      <PageHero
        eyebrow="Teaching"
        title="Teaching"
        image="/images/bg-teaching-red-frog.jpg"
        /* Bright red frog with blue legs on a mossy trunk, cropped at native pixels to the
           left 1440px of the frame so the frog sits at about 65-80% across, head in view
           and well clear of the title. y steers the desktop band, x steers phones. */
        imageOpacity={0.85}
        imagePosition="70% 44%"
        height="min-h-[400px]"
      />

      <Container className="pb-16 pt-8">
        <Reveal>
          <div className="prose-dark max-w-3xl">
            {intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="card mt-10 overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-6 p-7 sm:p-9">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {workshop.description}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
                  {workshop.title}
                </h2>
              </div>
              <GhostButton href={workshop.href}>
                Open in new tab <ArrowRight />
              </GhostButton>
            </div>

            {workshop.embed && (
              /* Hidden on small screens: the workshop site's own responsive
                 layout does not fit a phone-width frame, and the button above
                 already opens it. */
              <div className="hidden border-t border-edge bg-panel md:block">
                <iframe
                  src={workshop.href}
                  title={workshop.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="block h-[80vh] min-h-[640px] w-full"
                />
              </div>
            )}
          </article>
        </Reveal>
      </Container>
    </>
  );
}
