# Noble Lab website — plan (draft, 28 Aug 2026)

## What Patrice's site actually is

Source is public: https://github.com/p-pottier/lab_website (README: "You are
welcome to read the code or borrow from it... take it"). Not Squarespace/Wix.

- React 19 + Vite 7 + Tailwind 3 + framer-motion, TypeScript. Static build,
  deployed to GitHub Pages on every push to `main` (`.github/workflows/pages.yml`).
  Custom domain via `public/CNAME`.
- **All hand-written content in one file**: `src/content/site.ts` (lab name,
  tagline, links, research themes, people, news, positions). Pages are
  `src/pages/{Home,Research,People,Publications,News,Opportunities,Outreach,Contact}.tsx`.
- **Publications are never edited by hand.** `scripts/fetch-data.mjs` runs
  nightly (`refresh-data.yml`, 04:12 UTC) and rebuilds `public/data/*.json`:
  ORCID = spine (what counts as his), Crossref = metadata + preprint→article
  matching, OpenAlex = citation counts, abstracts, OA links, co-author
  affiliations (collaborator map). No API keys. The action commits the JSON if
  anything changed, which triggers a redeploy.
- **Google Scholar** has no API and blocks bots/iframes. `scripts/scholar_refresh.py`
  uses the `scholarly` package to read the profile into `public/data/scholar.json`
  (citations, h-index, i10, per-paper counts). Run **by hand every few weeks**
  (his docstring: nightly runs from shared IPs get CAPTCHA-blocked). Site works
  without it; when present, each paper shows its Scholar count next to OpenAlex.
- Fonts: Inter (body) + Space Grotesk (headings), both free Google Fonts;
  headings *prefer* "Congenial" from a paid Adobe Fonts kit, falling back to
  Space Grotesk.
- Look: near-black page (#0a0a0a / panels #141414), eight-stop gradient
  teal→sand→amber→red used for gradient text and rules; hero photo full-bleed
  with three overlapping dark gradient washes + parallax + slow zoom; images
  elsewhere use `.feather-edges` (radial + linear CSS masks) so photos dissolve
  into the page on every side. Cards: 1px border, translucent panel, backdrop blur.

## Recommendation

**Fork Patrice's repo and restyle it**, rather than rebuilding in Quarto/Jekyll.
The look, the fade treatment, the responsive layout and the whole publication
pipeline already exist and are permitted for reuse. Day-to-day edits (add a
student, a news item, a job ad) are edits to `site.ts`; nobody needs to touch
React. Credit him in README/footer and drop him a note.

Trade-off: local preview needs Node ≥ 20. Done 28 Aug 2026: `brew install node`
installed Node 26 at /opt/homebrew/bin (the old Node 16 at /usr/local/bin is
still there but /opt/homebrew/bin comes first on PATH). GitHub Actions builds
the site anyway, so it can be edited on GitHub without ever building locally.

## Domain — "noblelab"

RDAP (registry) lookups, 28 Aug 2026:

| Domain | Status |
|---|---|
| noblelab.com | TAKEN (registered 2005, expires 2027-05-01) |
| noblelab.net | TAKEN (GoDaddy, exp 2027-03-04) |
| **noblelab.org** | AVAILABLE |
| **noblelab.au** | AVAILABLE (needs Australian presence — you qualify) |
| noblelab.io, .science, .bio, .info | AVAILABLE |
| noblelab.com.au / .org.au | AVAILABLE but need ABN / incorporated non-profit |
| noblelab.dev / .co / .xyz, nobledan.com | lookup rate-limited (429); nobledan.com has no DNS A record, so it may have lapsed |

Suggest **noblelab.org** as the canonical domain (+ optionally noblelab.au
redirecting to it). Register at any registrar (~AU$15–30/yr each), point a
CNAME/ALIAS at `daniel1noble.github.io`, add `noblelab.org` in the repo's
Pages settings, and Pages issues the HTTPS certificate. Nothing else changes.

## Existing assets

- GitHub: `daniel1noble/noblelab` exists (public, Pages on, legacy Jekyll build
  from `main`, last push 2022-07-01, no custom domain). Local clone at
  `ANU_Website/noblelab/` (placeholder Jekyll content). Reuse this repo: replace
  contents, switch Pages to "GitHub Actions" source.
- Identity: ORCID 0000-0001-9460-8743 (136 works; links to the Google Site) —
  the spine for the pipeline. Scholar ID w69ezLIAAAAJ (from current site).
- Current Google Site pages to migrate: Home, Research (themes + selected
  papers), People, Publications (only a Scholar link), Research Photos,
  Meta-analysis Workshop, Software (orchaRd, metaDigitise, shinyDigitise).
- Photos: `ANU_Lab Photos/` (33 jpg, 2023 lizard shoot), `ANU_Profile_Pics/`.
  Google Site photos would need downloading. Patrice's photos cannot be reused.

## Known adaptation needed

OpenAlex has split Daniel's author record: the ORCID-linked OpenAlex author
(A5140596643) lists 1 work, whereas `works?filter=authorships.author.orcid:`
returns the real list. `fetch-data.mjs` resolves the author via
`authors?filter=orcid:` (line 158) — swap that for the works filter, or rely on
the per-DOI OpenAlex lookup (line 181) that already exists. Also set `ORCID`,
`MAILTO`, `SCHOLAR_ID`, `FIRST_YEAR`, and clear `preprint-merges.json`.

## Decisions needed from Daniel

1. Colour direction ("very different" from black + amber). Options:
   A. Light: warm off-white paper, ink text, deep eucalyptus green + ochre accents.
   B. Dark cool: deep navy/ink-blue page, coral/sunset-orange + sand accents.
   C. Earth: sage/olive with terracotta and bone.
2. Display font: keep Space Grotesk (free, what most of Patrice's fallback shows)
   or an alternative sharp geometric (Manrope, Sora, Instrument Sans, Bricolage Grotesque).
3. Domain: noblelab.org (+ .au?) — Daniel registers; nothing is bought by an agent.
4. Pages to keep: Patrice has Home/Research/People/Publications/News/
   Opportunities/Outreach/Contact. Add Software and Workshop/Teaching? Drop
   Outreach? Keep Research Photos as a gallery?
5. Lab name/acronym on the hero (Patrice uses "PEACE"; Noble Lab has none).

## Build steps (once decided)

1. `brew install node` (or edit only on GitHub).
2. Fork/copy repo → `ANU_Website/website/noblelab-site/`, strip his content
   and images, set palette/fonts, rewrite `site.ts` from the Google Site text.
3. Adapt `fetch-data.mjs`; run `npm run data`; check the publication list against ORCID.
4. `pip install scholarly`; run `scholar_refresh.py` once.
5. Push to `daniel1noble/noblelab`, set Pages source = GitHub Actions, add CNAME.
6. Register domain, point DNS, enable HTTPS. Retire the Google Site with a redirect note.
