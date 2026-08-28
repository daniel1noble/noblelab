import { LINKS, SITE, type IconName } from "../content/site";
import { Icon } from "./Icons";
import { Wordmark } from "./Header";
import { publicUrl } from "../lib/publicUrl";
import LogoMark from "./LogoMark";
import { Container } from "./ui";

/**
 * The two link columns, named by icon so they follow whatever LINKS holds.
 * Email is appended because it is a mailto rather than a profile.
 */
const COLUMN_ONE: IconName[] = ["scholar", "orcid", "github"];
const COLUMN_TWO: IconName[] = ["bluesky", "x"];

const ORCID_URL = LINKS.find((l) => l.icon === "orcid")?.href ?? "https://orcid.org/";

function LinkColumn({ icons, withEmail = false }: { icons: IconName[]; withEmail?: boolean }) {
  const items = icons
    .map((icon) => LINKS.find((l) => l.icon === icon))
    .filter((l): l is (typeof LINKS)[number] => Boolean(l));

  return (
    <ul className="space-y-2.5">
      {items.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 text-sm text-neutral-300 transition hover:text-gold"
          >
            <span className="text-neutral-500 transition group-hover:text-gold">
              <Icon name={l.icon} size={16} />
            </span>
            {l.label}
          </a>
        </li>
      ))}
      {withEmail && (
        <li>
          <a
            href={`mailto:${SITE.email}`}
            className="group inline-flex items-center gap-2.5 text-sm text-neutral-300 transition hover:text-gold"
          >
            <span className="text-neutral-500 transition group-hover:text-gold">
              <Icon name="mail" size={16} />
            </span>
            Email
          </a>
        </li>
      )}
    </ul>
  );
}

const SMALL_LINK =
  "text-neutral-400 underline decoration-neutral-700 underline-offset-2 transition hover:text-gold";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-edge bg-panel">
      <div className="brand-gradient absolute inset-x-0 top-0 h-[2px] opacity-60" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            {/* matches the header wordmark exactly */}
            <div className="flex items-center gap-3.5">
              <LogoMark size={62} />
              <div>
                <Wordmark className="text-[27px]" />
                <p className="mt-1 text-[11px] font-medium leading-tight tracking-wide text-charcoal">
                  {SITE.strapline}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-neutral-500">
              {SITE.address.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 inline-block text-sm text-neutral-400 transition hover:text-gold"
            >
              {SITE.email}
            </a>
            <a
              href="https://www.anu.edu.au/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-fit opacity-90 transition hover:opacity-100"
            >
              <img
                src={publicUrl("/images/anu-logo.png")}
                alt="The Australian National University"
                width={576}
                height={221}
                loading="lazy"
                className="h-14 w-auto"
              />
            </a>
          </div>

          <div className="md:pt-1">
            <LinkColumn icons={COLUMN_ONE} />
          </div>

          <div className="md:pt-1">
            <LinkColumn icons={COLUMN_TWO} withEmail />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-edge pt-6 text-xs text-neutral-500 sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name} · Daniel Noble · {SITE.university}
          </p>
          <div className="sm:max-w-[60%] sm:text-right">
            <p>
              Publications and collaborators update automatically from{" "}
              <a href={ORCID_URL} target="_blank" rel="noreferrer" className={SMALL_LINK}>
                ORCID
              </a>
              ,{" "}
              <a href="https://www.crossref.org/" target="_blank" rel="noreferrer" className={SMALL_LINK}>
                Crossref
              </a>{" "}
              and{" "}
              <a href="https://openalex.org/" target="_blank" rel="noreferrer" className={SMALL_LINK}>
                OpenAlex
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
