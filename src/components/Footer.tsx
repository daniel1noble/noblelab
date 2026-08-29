import { LINKS, SITE } from "../content/site";
import { Icon } from "./Icons";
import { Wordmark } from "./Header";
import { publicUrl } from "../lib/publicUrl";
import LogoMark from "./LogoMark";
import { Container } from "./ui";

/**
 * Every profile in LINKS, in its own order, plus email at the end because it is
 * a mailto rather than a profile. One list, one column (Daniel, 29 Aug 2026).
 */
function LinkList() {
  const items = LINKS;
  const cls =
    "group inline-flex items-center gap-2.5 text-sm text-neutral-300 transition hover:text-gold";
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-1">
      {items.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noreferrer" className={cls}>
            <span className="text-neutral-500 transition group-hover:text-gold">
              <Icon name={l.icon} size={16} />
            </span>
            {l.label}
          </a>
        </li>
      ))}
      <li>
        <a href={`mailto:${SITE.email}`} className={cls}>
          <span className="text-neutral-500 transition group-hover:text-gold">
            <Icon name="mail" size={16} />
          </span>
          Email
        </a>
      </li>
    </ul>
  );
}

const ORCID_URL = LINKS.find((l) => l.icon === "orcid")?.href ?? "https://orcid.org/";

const SMALL_LINK =
  "text-neutral-400 underline decoration-neutral-700 underline-offset-2 transition hover:text-gold";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-edge bg-panel">
      <div className="brand-gradient absolute inset-x-0 top-0 h-[2px] opacity-60" />
      <Container className="py-14">
        {/* Three columns (Daniel, 29 Aug 2026): the lab, every link, the ANU crest. */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:items-center">
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
          </div>

          <div className="md:justify-self-center">
            <LinkList />
          </div>

          <a
            href="https://www.anu.edu.au/"
            target="_blank"
            rel="noreferrer"
            className="block w-fit opacity-90 transition hover:opacity-100 md:justify-self-end"
          >
            <img
              src={publicUrl("/images/anu-logo.png")}
              alt="The Australian National University"
              width={576}
              height={221}
              loading="lazy"
              className="h-16 w-auto sm:h-20 lg:h-24"
            />
          </a>
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
