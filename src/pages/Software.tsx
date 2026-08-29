import { SOFTWARE, SOFTWARE_INTRO, type SoftwarePackage } from "../content/site";
import { PALETTE } from "../content/palette";
import { Container, GhostButton, GradientButton, PageHero, Reveal } from "../components/ui";
import { ArrowRight, Icon } from "../components/Icons";
import { publicUrl } from "../lib/publicUrl";

const ACCENTS = [PALETTE.terracotta, PALETTE.sage, PALETTE.ochre];

/** CRAN version, in the accent of the card. Chip is not reused because it
 *  upper-cases its label, which would render "v2.2.1" as "V2.2.1". */
function VersionPill({ version, accent }: { version: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em]"
      style={{ color: accent, borderColor: `${accent}59`, backgroundColor: `${accent}14` }}
    >
      v{version}
    </span>
  );
}

function PackageCard({ pkg, accent }: { pkg: SoftwarePackage; accent: string }) {
  // A package whose website is its repository gets one button, not two: the
  // repository becomes the primary action instead of being repeated.
  const siteIsRepo = pkg.href === pkg.github;

  return (
    <article className="card overflow-hidden">
      <div className={`grid gap-8 p-7 sm:p-9 ${pkg.video || pkg.figure ? "lg:grid-cols-[1fr_1.1fr]" : ""}`}>
        <div>
          <div className="flex items-start gap-5">
            {pkg.hex && (
              <img
                src={publicUrl(pkg.hex)}
                alt={`${pkg.name} hex sticker`}
                width={259}
                height={300}
                loading="lazy"
                decoding="async"
                className="w-[76px] shrink-0 sm:w-[92px]"
              />
            )}
            <div className="min-w-0">
              <div className="mb-4 h-1 w-10 rounded-full" style={{ backgroundColor: accent }} />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h2 className="font-display text-3xl font-bold text-charcoal">{pkg.name}</h2>
                {pkg.version && <VersionPill version={pkg.version} accent={accent} />}
              </div>
            </div>
          </div>

          <p className="mt-4 text-[16px] leading-relaxed text-neutral-300">{pkg.description}</p>

          {pkg.authors && (
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
              Authors: {pkg.authors}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            {siteIsRepo ? (
              <GradientButton href={pkg.github}>
                <Icon name="github" size={16} /> GitHub
              </GradientButton>
            ) : (
              <>
                <GradientButton href={pkg.href}>
                  Website <ArrowRight />
                </GradientButton>
                <GhostButton href={pkg.github}>
                  <Icon name="github" size={16} /> GitHub
                </GhostButton>
              </>
            )}
            {pkg.cran && (
              <GhostButton href={pkg.cran}>
                CRAN <ArrowRight />
              </GhostButton>
            )}
          </div>
        </div>

        {!pkg.video && pkg.figure && (
          <a
            href={pkg.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center self-center"
            title={`Open the ${pkg.name} website`}
          >
            <img
              src={publicUrl(pkg.figure.src)}
              alt={pkg.figure.alt}
              loading="lazy"
              decoding="async"
              className="max-h-[30rem] w-auto max-w-full object-contain"
            />
          </a>
        )}

        {pkg.video && (
          <div className="overflow-hidden rounded-2xl border border-edge bg-ink">
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${pkg.video}`}
              title={pkg.videoTitle ?? `${pkg.name} video`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </article>
  );
}

export default function Software() {
  return (
    <>
      <PageHero
        eyebrow="Software"
        title="Software"
        lead={SOFTWARE_INTRO}
        image="/images/bg-software-broad-headed-snake.jpg"
        /* The green snake was soft even in its sharpest frame, so it is replaced by a
           broad-headed snake from Morton National Park (2010-07-05 05.51.43, 3888x2592),
           which is tack sharp and carries far more contrast for a band this pale: a black
           body banded in yellow on flat grey ground. Cut from the left 3600x1000px of the
           native file - the band's own 3.6:1 - so the whole coil lands in frame, running
           from about 30% to 86% across with the flattened head at 82%, right of the title
           and above the bottom fade. Opacity is 0.95 rather than 0.85 because at 0.85 the
           bands on the body dissolved into the grey ground. y is inert at this ratio; x
           steers phones. */
        imagePosition="82% 50%"
        imageOpacity={0.95}
        height="min-h-[400px]"
      />

      <Container className="pb-16 pt-4">
        <div className="space-y-6">
          {SOFTWARE.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <PackageCard pkg={pkg} accent={ACCENTS[i % ACCENTS.length]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
