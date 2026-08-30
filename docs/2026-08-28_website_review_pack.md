# Noble Lab website — review pack (draft build v2, 28 Aug 2026, late afternoon)

> **29 Aug, 09:05 — round 3 built, NOT yet pushed** (3 local commits: `0ddfd57`,
> `15e361b`, `56f4345`): bigger wordmark; every background repositioned on the
> animal's face (two re-crops: home hero, Software); tighter title-to-text gap;
> Gallery opens with a slowly rotating trio + "See all 35 photos"; ANU logo in
> the footer and the home intro; PI portrait now the garden photo (IMG_6889).
> Decisions for Daniel: (a) Software band is a crocodile (low-contrast, weak
> face) — keep, revert to the beetle, or pick another animal (dart frog
> suggested); (b) "Join the Lab!" band is now a pygmy bluetongue in an open hand
> (all sleepy-lizard frames are gaping); (c) carousel pace: each photo holds 6 s;
> (d) phones show one carousel photo, tablets two, desktop three.

> **28 Aug, 22:20 — the site is LIVE at https://www.noblelab.org** (deployed via
> ChatGPT from this same working copy; canonical host is `www`, the bare
> `noblelab.org` redirects to it; HTTPS enforced). The deployment section
> below is therefore historical. A review pass on the live version found two
> real bugs (mobile menu overlapping the header; transparent menu overlay), a
> feather mask that clips figure labels, and one caption with a name not in any
> source ("Fonti Kar" — the old site said "Dr. Kar"); fixes are being applied
> locally and will be pushed once you say so.

**Changed since v1 (your feedback):** light theme — bone paper page, charcoal
text, terracotta / sage / ochre accents (no longer resembles the dark PEACE Lab
site); animal photographs behind every page title and the home hero (painted
dragon on red rock; alternatives `bg-hero-scales.jpg`, `bg-hero-lizard-mesh.jpg`);
research themes show one old-site figure each, feathered beside the text, no
emoji; footer credit removed (README keeps one sentence); Xingyi Xiu moved to
PhD Students; new "Lab alumni" group with Pablo Recio (past PhD student, now a
postdoctoral researcher at Flinders University), Amelia Peardon and Aidan Lowe
(past Honours students). Review agents have NOT yet re-audited v2 (usage limit until 6 pm) —
that pass is queued.

Nothing has been published. The site exists only in
`ANU_Website/website/noblelab-site/` (a local git repo, 4 commits) and
nothing has been pushed to GitHub or registered.

## How to look at it

- **Live preview on this Mac:** `cd ANU_Website/website/noblelab-site && export PATH=/opt/homebrew/bin:$PATH && npm run preview`
  then open http://localhost:4173 (the agent may have left this running already).
- **Screenshots** (desktop 1440 px and mobile 390 px of every page):
  `ANU_Website/website/content/screenshots/`
- **Edit content:** everything hand-written is in `src/content/site.ts`
  (people, research themes, software, gallery captions, join text). Colours in
  `tailwind.config.cjs` + `src/index.css` (token table in `content/palette_spec.md`).

## What was built

- Fork of Patrice Pottier's open-source site (React/Vite/Tailwind, GitHub Pages),
  restyled: olive-charcoal ground, sage / bone / terracotta accents, warm greys,
  Inter + Space Grotesk. Every contrast ratio checked (body text 10.4:1).
- Pages: Home, Research, People, Publications, Software, Teaching (meta-analysis
  workshop embed + link), Gallery (Fieldwork + Lab facilities, lightbox),
  Join us, News (auto "latest papers" until you add items), Contact, 404.
- All text verbatim from the Google Site, with these typo fixes only:
  Principle→Principal Investigator, challanges, Bluetounge, MOre, BIology,
  reciprocol, shinyDigise→shinyDigitise, "extraordinaireand"→"extraordinaire and".
- Photos: 3 hero candidates + 9 theme images + 29 gallery frames from
  `ANU_Lab Photos` (EXIF stripped, ≤400 KB), 7 fieldwork photos and 11 member
  portraits from the Google Site, your 2025 Academy of Science portrait as PI photo.
- **Publications, automatic:** `scripts/fetch-data.mjs` — ORCID 0000-0001-9460-8743
  as the spine, Crossref metadata, OpenAlex citations & OA links, batched by DOI
  (the OpenAlex author-record split is bypassed). Nightly GitHub Action commits
  changes. Today: **127 works (126 articles, 1 preprint), 2007–2026, every entry
  has you as author; 7,489 OpenAlex citations, h 40; 419 co-authors in 29
  countries.**
- **Google Scholar:** `scripts/scholar_refresh.py` (run by hand every few weeks;
  Scholar blocks bots) — today 8,761 citations, h 44, i10 100, 139 items;
  per-paper Scholar counts shown beside OpenAlex ones.
- Three reviewers (visual, factual, code) audited the build; 21 findings, 17
  fixed, log in `content/phase2_fix_log.md`.

## Please confirm (nothing below was invented — each is either a gap or a choice)

**Identity**
1. ORCID 0000-0001-9460-8743 and Scholar ID w69ezLIAAAAJ are yours (corroborated, not on the old site).
2. Title "ARC Future Fellow (2023–2027) and Associate Professor" (from the old site) is still current.
3. daniel.noble@anu.edu.au is the address to expose as contact and as the API "polite pool" address in the scripts.

**People**
0. Done: Xingyi Xiu is a PhD student, 2026 – Present. Her bio is still the old MSc sentence ("just finished doing a big meta-analysis…") — send a new line when convenient.
4. Done: Pablo, Amelia and Aidan are in Lab alumni; Xingyi is a PhD student; Niamh O'Kelly is the only current MSc/Honours student.
5. Aidan Lowe has no photo anywhere — supply one or keep the initials placeholder.
6. Small portraits (Patrice 258 px, Xingyi 214 px, Essie 225 px) — larger originals if you have them.
7. Pablo's bio ends "…find out more about my research here." — the old site linked "here" to ResearchGate; now a separate button. Keep, trim, or link inline?

**Photos / consent**
8. The Gallery now shows 22 frames from the Jan 2023 lab shoot that were never online, ~13 with Pablo and/or Amelia visible (the old site captions name them in two frames). OK to publish?
9. The "Riddle Room Canberra" group photo (on the old home page) is staged but hidden — who is pictured, date, and do you want it in the Gallery?
10. "Dr. Kar doing experiments" caption — full name, or keep as is?
11. The 2025 Academy of Science portrait (SATS_2025_1150.jpg) — usage rights / credit line needed?
12. No logo mark exists; the site uses the "Noble Lab" wordmark alone. Want a mark (e.g. a lizard silhouette — the stock packs' licences would need checking)?

**Research page citations (carried verbatim from the old site)**
13. "Radsmera et al. 2020" → Radersma; Whiting et al. 2022 "eabn2414" vs linked abn2415; Crino et al. "2022" but linked to JEB 227(24), Dec 2024; Pottier et al. 2024 links to a Cell search page rather than the article. Fix or leave?

**Content choices**
14. Three YouTube embeds carried over (home talk; two Software videos) — keep?
15. Publications page has no lead sentence (the old site had none) — write one, or leave?
16. Four ORCID works lack DOIs and cannot appear (2016–2017 items, listed in `content/data_pipeline_report.md`) — fine?

**Taste calls the reviewers flagged but left**
17. The hero and page-top photographs are faded hard (the home-page lizard is faint). Say the word and I'll bring the photos forward a notch.

## Deployment — awaiting your go-ahead (I will not push without it)

Repo `daniel1noble/noblelab`: `main` currently holds an untouched 2022 Greene-lab
Jekyll template (the live daniel1noble.github.io/noblelab shows lorem ipsum).
Plan: (1) push the old `main` to a branch `archive/lab-website-template-2022`;
(2) replace `main` with this site's history; (3) in repo Settings → Pages set
Source = GitHub Actions; (4) the deploy workflow builds and publishes on push;
(5) the nightly data refresh starts automatically; (6) noblelab.org is REGISTERED
(Cloudflare, 28 Aug 2026) — add the DNS records per
`2026-08-28_domain_setup_noblelab-org.md`, then set the custom domain in the
repo's Pages settings and enforce HTTPS.

Also: the footer/README credit reads "Site design adapted from Patrice Pottier's
lab website (github.com/p-pottier/lab_website)" — no "with permission" claim;
consider emailing him as a courtesy before go-live.
