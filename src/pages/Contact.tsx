import { LINKS, PI, SITE } from "../content/site";
import { ArrowRight, Icon } from "../components/Icons";
import { Container, GhostButton, GradientButton, PageHero, Reveal, SectionHeading } from "../components/ui";
import { publicUrl } from "../lib/publicUrl";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        image="/images/bg-contact-karst-lake.jpg"
        imagePosition="50% 60%"
        height="min-h-[380px]"
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div>
              {PI.photo && (
                <img
                  src={publicUrl(PI.photo)}
                  alt={`Portrait of ${PI.name}`}
                  className="mb-8 w-full max-w-xs rounded-2xl border border-edge object-cover"
                />
              )}
              <SectionHeading title={PI.name} lead={PI.role} />

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Email
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-lg font-medium text-gold transition hover:text-brick"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Address
                  </dt>
                  <dd className="mt-1.5 space-y-0.5 text-[16px] leading-relaxed text-neutral-300">
                    {SITE.address.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-9">
                <GradientButton href={`mailto:${SITE.email}`}>
                  Send an email <ArrowRight />
                </GradientButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="font-display text-xl font-semibold text-charcoal">Elsewhere on the web</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card group flex items-center gap-4 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-edge bg-ink text-neutral-400 transition group-hover:border-gold/50 group-hover:text-gold">
                      <Icon name={l.icon} size={18} />
                    </span>
                    <span className="text-sm font-medium text-neutral-200 transition group-hover:text-charcoal">
                      {l.label}
                    </span>
                  </a>
                ))}
              </div>

              <div className="card mt-6 border-cyan/40 bg-cyan/[0.04] p-6 hover:border-cyan">
                <h3 className="font-display text-lg font-semibold text-cyan">
                  Prospective students, postdocs and visitors
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  We welcome new students, postdocs and lab visitors. Have a look at the research
                  themes, then send a short email with your interests.
                </p>
                <div className="mt-4">
                  <GhostButton to="/opportunities">Join the lab</GhostButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
