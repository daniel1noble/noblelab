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
        image="/images/bg-software-green-beetle.jpg"
        imagePosition="50% 45%"
        height="min-h-[380px]"
      />

      <Container className="py-16">
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
