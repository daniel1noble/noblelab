import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CV_URL,
  MEMBER_GROUPS,
  PI,
  PI_BIO,
  PI_INTRO,
  PI_PHOTOS,
  type Person,
} from "../content/site";
import { PALETTE } from "../content/palette";
import CollaboratorMap from "../components/CollaboratorMap";
import {
  Container,
  GhostButton,
  GradientButton,
  IconLink,
  PageHero,
  Reveal,
  SectionHeading,
} from "../components/ui";
import { ArrowRight, Icon } from "../components/Icons";
import { publicUrl } from "../lib/publicUrl";

/** Initials stand in where the site has no photograph. */
function Avatar({ person, large = false }: { person: Person; large?: boolean }) {
  const initials = person.name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  const size = large ? "max-w-[240px]" : "max-w-[180px]";

  if (person.photo) {
    return (
      <img
        src={publicUrl(person.photo)}
        alt={`Portrait of ${person.name}`}
        loading={large ? "eager" : "lazy"}
        className={`aspect-square w-full ${size} rounded-2xl border border-edge object-cover object-top`}
      />
    );
  }
  return (
    <div
      className={`flex aspect-square w-full ${size} items-center justify-center rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/15 to-cyan/10 font-display text-4xl font-bold text-gold`}
      aria-hidden
    >
      {initials}
    </div>
  );
}

/**
 * Profile links as a row of round icon buttons (Daniel, 29 Aug 2026), for the
 * PI and for every member card alike. IconLink draws the glyph where the label
 * has one — Google Scholar, ORCID, Email, ResearchGate — and falls back to a
 * small text pill for anything it does not recognise, so a new label is never
 * lost.
 */
function PersonLinks({ person }: { person: Person }) {
  if (!person.links || person.links.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {person.links.map((l) => (
        <IconLink key={l.href} label={l.label} href={l.href} />
      ))}
    </div>
  );
}

/** One card per group member: photo, name, years, co-advisor note, biography. */
function MemberCard({ person, accent }: { person: Person; accent: string }) {
  // Bios start collapsed to three lines with a "Learn more" toggle, as on the
  // PI card, so the grid stays tight (Daniel, 30 Aug 2026). Short bios that fit
  // in three lines get no toggle.
  const [open, setOpen] = useState(false);
  const bio = person.bio ?? [];
  const longBio = bio.length > 1 || (bio[0]?.length ?? 0) > 110;
  return (
    <div className="card h-full overflow-hidden">
      <div className="grid gap-6 p-6 sm:grid-cols-[180px_1fr] sm:p-7">
        <div>
          <Avatar person={person} />
          <PersonLinks person={person} />
        </div>

        <div>
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {person.role}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
            {person.name}
          </h3>
          {person.years && <p className="mt-1 text-sm text-neutral-500">{person.years}</p>}
          {person.note && <p className="mt-1 text-sm text-neutral-400">{person.note}</p>}
          {person.now && <p className="mt-1 text-sm text-neutral-400">{person.now}</p>}

          {bio.length > 0 && (
            <div className="mt-5">
              <div className={`space-y-3 ${open ? "" : "line-clamp-3"}`}>
                {bio.map((p) => (
                  <p key={p} className="text-[15px] leading-relaxed text-neutral-300">
                    {p}
                  </p>
                ))}
              </div>
              {longBio && (
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition hover:text-charcoal"
                >
                  {open ? "Show less" : "Learn more"}
                  <ArrowRight
                    className={`transition-transform duration-300 ${
                      open ? "rotate-90" : "group-hover:translate-x-1"
                    }`}
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- PI */

function PrincipalInvestigator() {
  const [bioOpen, setBioOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[240px_1fr]">
        <div>
          <Avatar person={PI} large />
          <PersonLinks person={PI} />
        </div>

        <div>
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: PALETTE.terracotta }}
          >
            {PI.role}
          </span>
          <h3 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">{PI.name}</h3>
          {PI.affiliation && <p className="mt-2 text-sm text-neutral-500">{PI.affiliation}</p>}

          <div className="prose-dark mt-6">
            <p>{PI_INTRO}</p>
          </div>

          {PI_BIO.length > 0 && (
            <>
              <button
                onClick={() => setBioOpen((v) => !v)}
                aria-expanded={bioOpen}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition hover:text-charcoal"
              >
                {bioOpen ? "Show less" : "Learn more"}
                <ArrowRight
                  className={`transition-transform duration-300 ${
                    bioOpen ? "rotate-90" : "group-hover:translate-x-1"
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {bioOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="prose-dark mt-5 border-l-2 border-cyan/30 pl-5">
                      {PI_BIO.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      {PI_PHOTOS.length > 0 && (
                        <div className="mt-7 grid gap-3 sm:grid-cols-3">
                          {PI_PHOTOS.map((photo) => (
                            <img
                              key={photo.src}
                              src={publicUrl(photo.src)}
                              alt={photo.alt}
                              loading="lazy"
                              className="aspect-[3/4] w-full rounded-xl border border-edge object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* The CV button appears only once a file is published (CV_URL). */}
          {CV_URL && (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <GradientButton href={CV_URL}>
                <Icon name="cv" size={16} /> Curriculum vitae
              </GradientButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- page */

/** Current groups take terracotta; the "Past …" and "Lab alumni" groups take
    sage. Same predicate as CURRENT_MEMBERS in content/site.ts. */
const groupAccent = (name: string) =>
  /^(past|lab alumni)/i.test(name) ? PALETTE.sage : PALETTE.terracotta;

export default function People() {
  return (
    <>
      <PageHero
        eyebrow="People"
        title="Our research group"
        image="/images/bg-people-grass-lizard-right.jpg"
        /* Cropped from x=100px of the frame so the lizard's head sits at ~84%
           across and the body fills the band right of the title; the band is
           a little taller than elsewhere (440px) so head and body show; the
           feet run into the bottom fade so the title-to-text gap stays
           consistent with the other pages. y steers desktop, x phones. */
        imagePosition="75% 22%"
        imageOpacity={0.85}
        height="min-h-[440px]"
      />

      <Container className="relative -mt-24 pb-16 pt-0">
        <section>
          <Reveal>
            <SectionHeading eyebrow="Principal investigator" title="Lab head" />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8">
              <PrincipalInvestigator />
            </div>
          </Reveal>
        </section>

        {/* A group with nobody in it renders nothing, so an empty heading never
            appears when the last member of a cohort moves to the alumni. */}
        {MEMBER_GROUPS.filter((g) => g.members.length > 0).map((group) => (
          <section key={group.name} className="mt-20">
            <Reveal>
              <SectionHeading eyebrow="Members" title={group.name} />
            </Reveal>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {group.members.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.06} className="h-full">
                  <MemberCard person={m} accent={groupAccent(group.name)} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        <Reveal>
          <div className="card mt-10 border-dashed p-7 sm:p-9">
            <h3 className="font-display text-xl font-semibold text-gold">Join the Lab!</h3>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-400">
              We welcome new students, postdocs and lab visitors.
            </p>
            <div className="mt-5">
              <GhostButton to="/opportunities">How to join us</GhostButton>
            </div>
          </div>
        </Reveal>

        {/* -------------------------------------------------- collaborators */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Collaborators"
              title="A global collaborative network"
              lead="Generated automatically from every co-authored work on record."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <CollaboratorMap />
            </div>
          </Reveal>
        </section>
      </Container>
    </>
  );
}
