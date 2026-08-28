import { SOFTWARE, SOFTWARE_INTRO, type SoftwarePackage } from "../content/site";
import { PALETTE } from "../content/palette";
import { Container, GhostButton, GradientButton, PageHero, Reveal } from "../components/ui";
import { ArrowRight, Icon } from "../components/Icons";

const ACCENTS = [PALETTE.terracotta, PALETTE.sage, PALETTE.ochre];

function PackageCard({ pkg, accent }: { pkg: SoftwarePackage; accent: string }) {
  // A package whose website is its repository gets one button, not two.
  const repoIsSite = pkg.repo === pkg.href;
  const siteIsGitHub = /github\.com/.test(pkg.href);

  return (
    <article className="card overflow-hidden">
      <div className={`grid gap-8 p-7 sm:p-9 ${pkg.video ? "lg:grid-cols-[1fr_1.1fr]" : ""}`}>
        <div>
          <div className="mb-4 h-1 w-10 rounded-full" style={{ backgroundColor: accent }} />
          <h2 className="font-display text-3xl font-bold text-charcoal">{pkg.name}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-300">{pkg.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <GradientButton href={pkg.href}>
              {siteIsGitHub ? (
                <>
                  <Icon name="github" size={16} /> GitHub
                </>
              ) : (
                <>
                  Website <ArrowRight />
                </>
              )}
            </GradientButton>
            {pkg.repo && !repoIsSite && (
              <GhostButton href={pkg.repo}>
                <Icon name="github" size={16} /> GitHub
              </GhostButton>
            )}
          </div>
        </div>

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
        image="/images/bg-software-face.jpg"
        /* The crocodile lies diagonally with its head to the right: the
           jawline and tooth row run from about 65% to 97% of the width and
           45% to 78% of the height, the shoulder and back fill the left half.
           From ~500px up the band uses the photograph's full width and only y
           bites; 62% lifts the head into the strip where the wash is thinnest,
           so it reads as a head rather than as scales, and lets the jaw feather
           out at the bottom instead of ending on a cut. Below ~500px only x
           bites, and 100% keeps the snout on screen. Opacity is up from the
           0.6 default because this animal is grey on a grey-brown creek bank. */
        imagePosition="100% 62%"
        imageOpacity={0.72}
        height="min-h-[380px]"
      />

      <Container className="pb-16 pt-8">
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
