# Adaptation map: PEACE Lab source → Noble Lab site

Working copy read: `_admin/drafts/website/noblelab-site` (git commit 8ea9c6e, "Import of p-pottier/lab_website (source, minus his images/data) as starting point").
Reference copy (for data shapes and the original assets): scratchpad `patrice_repo_src`. `diff -rq` of `src/`, `scripts/`, `index.html`, `package.json`, `README.md` between the two copies reports no differences, so every file:line below applies to both.

Nothing in the working copy was modified. All line numbers are as of 2026-08-28.

**Things noticed during the read that are not mine and are not covered by the task**

- Untracked files appeared in the working copy while this map was being written (something else is populating the repo in parallel; none of them are mine and none were touched): `public/data/scholar.json` (11:05, `scholarId: w69ezLIAAAAJ`, 139 publications, 8761 citations) `[CONFIRM: that w69ezLIAAAAJ is Daniel's Google Scholar ID — read from that untracked file, not from any source of his]`; an empty `public/images/` (11:01); and at 11:09 `publications.json`, `metrics.json`, `collaborators.json` for ORCID `0000-0001-9460-8743`. **Those 11:09 files show the §6 problem live**: `metrics.json` reports 142 works / 8018 citations / h 42 (the polluted OpenAlex author record A5028073300), `publications.json` has publication years running **1847-2026**, and only 76 of its 142 entries have any author marked `isSelf` (the `isSelf` fallback at `fetch-data.mjs:118-120` still looks for "Pottier"). They were produced by the unpatched pipeline and should be regenerated after the patch in §6, not published.
- `scripts/collaborator-info.mjs:2,40` reads a `MAIN_COLLABORATORS` export from `src/content/site.ts` that does not exist in `site.ts`. The helper is dead code in this snapshot.
- `useData.ts:30-48` declares `Metrics.software` and `Metrics.worksByYear`, but `scripts/fetch-data.mjs:562-576` never writes them and the reference `metrics.json` does not have them. Harmless: `useMetrics()` (`useData.ts:106`) is never called anywhere in `src/` (grep), so `metrics.json` is dead on the front end despite the `FIRST_YEAR` comment at `fetch-data.mjs:39` saying it feeds "the home page".

---

## 1. IDENTITY STRINGS

Grep terms: Patrice, Pottier, PEACE, Gothenburg, Sweden/Swedish, gu.se, patricepottierlab, gg1rV3IAAAAJ, 0000-0003-2106-6597, p-pottier, Natrium, Medicinaregatan, Thermal Ecology Alliance / `"tea"` / TEA, cv.pdf / CV_URL, posters, Owlstown, plus bioenv, bsky, researchgate, theconversation, SORTEE, Jutfelt, Kristineberg, Vetenskapsrådet, Wenner-Gren, UNSW, Bamfield, freqTLS. Scope: every file except `node_modules/`, `.git/`, `package-lock.json`, `public/data/`. The `.github/workflows/*.yml` files contain **no** identity strings (only "OpenAlex" in a comment and a commit message) and need no edit. `vite.config.ts`, `tsconfig.json`, `postcss.config.cjs`, `eslint.config.js`, `src/main.tsx`, `src/pages/NotFound.tsx`, `src/pages/Research.tsx` (no names, but see the prose note below) contain none.

### `package.json`
- 2: `"name": "peace-lab-website"`

### `public/CNAME`
- 1: `patricepottierlab.com` — copied verbatim into `dist/` (`.github/workflows/pages.yml:45-47`). Must be replaced or deleted before any deploy, otherwise Pages claims his domain.

### `public/robots.txt`
- 8: `Sitemap: https://patricepottierlab.com/sitemap.xml`

### `.gitignore`
- 14-16: comment about "the old Owlstown site" and ignored `source-images` folder.

### `README.md` (15 lines)
- 3: `<img src="public/images/logo-mark.png" alt="PEACE Lab logo">`
- 5: `# The PEACE Lab`; 7: expansion
- 9-10: department / "University of Gothenburg, Sweden"
- 12, 23, 51, 62, 77: `patricepottierlab.com` links
- 23: "led by Patrice Pottier"
- 29-48: his ten research themes (content, not identity, but all his)
- 53-62: "Join us" — Gothenburg positions, Swedish Research Council, deadline 21 September 2026
- 78: Scholar `gg1rV3IAAAAJ`; 79: ORCID `0000-0003-2106-6597`; 80: Bluesky; 81: Thermal Ecology Alliance; 83: `patrice.pottier@bioenv.gu.se`

### `index.html` (35 lines)
- 10: `<title>PEACE Lab | Patrice Pottier, University of Gothenburg</title>`
- 11-14: meta description; 15: `meta name="author" content="Patrice Pottier"`
- 16: canonical `https://patricepottierlab.com/`
- 19: `og:site_name` "PEACE Lab"; 20: `og:url`; 21: `og:title`; 22-25: `og:description`
- 28, 31: `og:image` / `twitter:image` = `https://patricepottierlab.com/images/fish-eggs.jpg`; 29 alt text
- 33-35: comment "Gothenburg staff page"
- 36-74: Person JSON-LD — 40-42 name/givenName/familyName, 43 url, 44 image `patrice-pottier.jpg`, 45 jobTitle "Associate senior lecturer", 46 email, 47-51 worksFor University of Gothenburg / gu.se, 52-55 affiliation, 56-62 knowsAbout, 63-72 identifier + sameAs (ORCID, Scholar, gu.se staff page, github.com/p-pottier, ResearchGate, Bluesky, The Conversation)
- 76-96: ResearchOrganization JSON-LD — 80 name, 81 alternateName (expansion), 82 url, 83 logo, 84 founder, 85-88 parentOrganization, 89-94 address "Medicinaregatan 7B, Natrium", Gothenburg, SE
- 104-106: comment "Patrice's Adobe Fonts web project" + `https://use.typekit.net/wnv4xgu.css` (his personal Typekit kit id; see §3)

### `src/content/route-meta.json` (every entry)
- 2: `"siteUrl": "https://patricepottierlab.com"`
- 5-6, 9-10, 13-14, 17-18, 21-22, 25-26, 29-30, 33-34: every route title is `… | PEACE Lab | Patrice Pottier`, every description names him and/or Gothenburg (22 also says "posters"; 26 "Funded PhD and postdoctoral positions … University of Gothenburg")
- 38-39: notFound title

### `src/content/seo.ts`
- 10-11: comment "Every title carries "Patrice Pottier"…"

### `src/content/site.ts` (108 matching lines; effectively the whole file is his content)
- 9-24 `SITE`: 10 shortName "PEACE Lab", 11 acronym, 12 expansion, 13 tagline, 14 institution, 15 university, 16 city "Gothenburg, Sweden", 17 email, 18-23 address (21 "Medicinaregatan 7B, Natrium", 22 "Box 463, SE-405 30 Gothenburg, Sweden"). `SITE.acronym`, `.expansion`, `.tagline`, `.shortName` are **not referenced anywhere in src** (grep of `SITE.`); `.university`, `.city`, `.email`, `.institution`, `.address` are.
- 29-37 `IconName` union includes `"tea"` (32) and `"researchgate"` (34)
- 39-54 `LINKS`: 42 Scholar `gg1rV3IAAAAJ`, 45 ORCID, 46 Thermal Ecology Alliance (`icon: "tea"`), 47 `github.com/p-pottier`, 48-52 ResearchGate `Patrice-Pottier`, 53 Bluesky `patricepottier.bsky.social`
- 56-57 `CV_URL = "/cv.pdf"` (file absent from working copy; used by `People.tsx:5,182`)
- 71-222 `THEMES` (ten themes, all his text; `image` and `accent` per theme — see §2c and §4)
- 237-248 `PI`: name, role "Associate senior lecturer", affiliation, photo `patrice-pottier.jpg`, links (Scholar 244, ORCID 245, email 246)
- 251-252 `PI_INTRO`; 255-260 `PI_BIO` (four paragraphs; 256 mentions UNSW, ANU, Gothenburg, Wenner-Gren, Swedish Research Council, Jutfelt and "Daniel Noble (postdoc supervisor)"; 257-258 Thermal Ecology Alliance, SORTEE)
- 263-276 `PI_PHOTOS` (three `patrice-*.jpg` with captions naming him)
- 278-306 `CURRENT_MEMBERS` (Leon Pfeufer 280-287 `@bioenv.gu.se`; Xinyi Liu 289-296 "co-supervised with Daniel Noble"; Emil Larsson 298-305); 308-320 `PAST_MEMBERS` (Joelle Zürcher, `@student.gu.se`)
- 328-334 `HIGHLIGHTED_DOIS` (five of his DOIs)
- 361-384 `RESEARCH_DIRECTIONS` / `DIRECTIONS_BLOCK`; 386-428 `POSITIONS` (391/411 "University of Gothenburg, Sweden", 392/412 deadline "21 September 2026", 397/417 Swedish Research Council, 400/421 Jutfelt / Natrium / Kristineberg, 403-404 and 424-425 reachmee.com apply URLs, 420 Thermal Ecology Alliance)
- 430-462 `WHO_WE_LOOK_FOR` (430 comment "Gothenburg advertisements")
- 466-473 `Fellowship` type: `scope: "Sweden" | "Europe" | "Global"` (469) — keyed by `Opportunities.tsx:22-26`
- 480-577 `FELLOWSHIPS` (12 schemes; 506-544 are Swedish funders: Vetenskapsrådet ×2, FORMAS, Wenner-Gren, Carl Tryggers)
- 593-664 `SHORT_VISITS` (598 Fulbright Sweden, 623-628 Helge Ax:son Johnson)
- 677-698 `CONFERENCES` (his planned SEB 2027, ESEB 2027 Gothenburg, ICBF 2028)
- 719-780 `NEWS` (seven items, all his: 721-728 positions, 730-752 Bamfield / FIN club / ICBF with "Patrice attended…" titles, 754-762 Vetenskapsrådet grant with `vr-logo.svg`, 764-770 "The PEACE Lab starts…", 772-779 Thermal Ecology Alliance)
- 792-823 `OUTREACH` (794-800 Thermal Ecology Alliance, 802-808 SORTEE "where Patrice served…")
- 828-847 `MEDIA` (FrogLog, two Conversation pieces)
- 849-885 `POSTERS` (three `/posters/*.jpg|pdf`, "Presented by Patrice Pottier." 866/874/883)
- 900-949 `TALKS`, 951-998 `WORKSHOPS` (957 "Co-organised with Daniel Noble. Lund, Sweden."), 1000-1011 `TEACHING` (Gothenburg BIO515, nine UNSW units), 1013-1088 `SERVICE` (SORTEE board, UNSW committees, journals list)
- 1091-1094 `OUTREACH_PHOTO` (`seb2024-young-scientist-award.jpg`), 1100-1104 `CONFERENCE_PHOTO` (alt names "Patrice Pottier and Kyle Morrison")

### `src/components/Header.tsx`
- 19-23 comment "spell PEACE out in gold"
- 24-79 `Acronym` component: 37-43 `LINE_ONE`/`LINE_TWO` hard-code P-lasticity / E-cological / A-daptations / C-hanging / E-nvironments (the PEACE expansion). Called from `Header.tsx:134-138`, `Footer.tsx:73`, `Home.tsx:93-97`. Either delete the component and its three call sites, or rewrite for a Noble-Lab strapline.
- 122: `aria-label="PEACE lab, home"`; 126-128: wordmark text `PEACE`; 129-131: `lab`
- 190: comment "ties the site to the TEA identity"
- 230: `{SITE.university} · {SITE.city}` (data-driven, fine)

### `src/components/Footer.tsx`
- 11-12: `COLUMN_ONE = ["scholar","orcid","github"]`, `COLUMN_TWO = ["tea","bluesky"]` — icon names that pick rows from `LINKS`
- 65-67: `PEACE`; 68-70: `lab`; 73: `<Acronym …/>`
- 79-81: institution/university/city from `SITE` (fine)
- 90-99: `https://www.gu.se/en` link + `/images/gu-logo.png` alt "University of Gothenburg"
- 113: `© {year} PEACE Lab · Patrice Pottier · {SITE.university}`
- 118: `https://orcid.org/0000-0003-2106-6597`

### `src/components/Icons.tsx`
- 32-37 `"researchgate"` glyph, 44-50 `"tea"` glyph (a globe; only used by the TEA link). Keep or delete together with the `IconName` union in `site.ts:29-37`.

### `src/components/CollaboratorMap.tsx`
- 255: `https://orcid.org/0000-0003-2106-6597` in the map footnote

### `src/components/ui.tsx`
- 87: comment "the TEA house style"

### `src/index.css`
- 105: comment "The brand ramp used across TEA"

### `src/pages/Home.tsx`
- 48: comment `/images/hero-leaf-insect.jpg`; 50-51: hero `fish-eggs.jpg` + alt "Developing fish embryos…"
- 83: `{SITE.university} · Sweden` (**"Sweden" hard-coded**)
- 89: `The <span …>PEACE</span> lab`; 93-97 `<Acronym …/>`
- 101-104: hero paragraph (his mission text); 110-117: "The lab is led by {PI.name} at the {SITE.university}." (data-driven)
- 124: `Join the PEACE lab`
- 157-163, 170-192: Mission heading and three paragraphs (186 "In the PEACE lab…")
- 198-213: three method cards (211 "Thermal Ecology Alliance")
- 233-236: `wordcloud.png`, alt "the group's papers"
- 258-259: collaboration blurb (his wording)
- 300: `… funded positions in Gothenburg`; 303: "We are recruiting a PhD student and a postdoctoral researcher!"

### `src/pages/People.tsx`
- 5, 182-184: `CV_URL` → "Curriculum vitae" GradientButton
- 121: PageHero lead "The PEACE lab aims to foster…"
- 185-188: GhostButtons to thermalecologyalliance.org and sortee.org
- 204-206: "We are recruiting a PhD student and a postdoctoral researcher…"

### `src/pages/Contact.tsx`
- 21-22: `/images/patrice-portrait.jpg`, alt "Patrice Pottier"
- 26-27: `SectionHeading title="Patrice Pottier" lead="Associate senior lecturer, PEACE lab"`
- 55-65: gu.se link + `gu-logo.png` alt "University of Gothenburg"
- 104-107: "Two funded positions are currently open…"
- 111-127: whole "Joining the Thermal Ecology Alliance" card

### `src/pages/Opportunities.tsx`
- 22-26: `SCOPE_COLOUR = { Sweden, Europe, Global }`
- 136: PageHero title "Join the PEACE lab"; 137: lead "Two funded positions are open in Gothenburg…"
- 146-147: "N open positions" + lead "Both positions are funded by the Swedish Research Council…"
- 267: "…visit the PEACE lab for a short stay…"

### `src/pages/Outreach.tsx`
- 7, 112-160: `POSTERS` import and the whole Posters section (links to `/posters/*.pdf`)
- 55-58: PageHero lead (his wording); 65-69: intro paragraph

### `src/pages/Research.tsx`
- No names, but 16-36 are three hard-coded paragraphs of his research statement and 105-106 his "Working across taxa" closing card.

### `src/pages/Publications.tsx`
- No identity strings (reads `LINKS`, `HIGHLIGHTED_DOIS`). 28 comment "Marks the PI so a reader can find him".

### `scripts/fetch-data.mjs`
- 35: `ORCID = "0000-0003-2106-6597"`; 36: `MAILTO = "patrice.pottier@bioenv.gu.se"`; 37: `UA = PEACE-lab-website/1.0`
- 118-120: `isSelf` — falls back to `surname === "pottier"` and first name `/^(patrice|p\.?)$/i` when the author has no ORCID. **Must become "noble" / `/^(daniel|d\.?)$/i`** (or ORCID-only) or none of Daniel's un-ORCIDed authorships will be highlighted and `metrics.firstAuthor` (572) will be 0.

### `scripts/preprint-merges.json`
- 4-7: four preprint→article DOI pairs that are his papers. Delete, leave only `_comment`.

### `scripts/scholar_refresh.py`
- 27: `SCHOLAR_ID = "gg1rV3IAAAAJ"`

### `scripts/collaborator-info.mjs`
- 24-25: `MAILTO` / `UA` as above; 2, 40 `MAIN_COLLABORATORS` (dead, see top)

### `scripts/grab-images.mjs`
- 1: "pulls the photographs off the old Owlstown site"

### `scripts/smoke.mjs`
- 101: junk-title regex includes `freqTLS` (one of his packages); 108-110: asserts ≥ 2 poster PDFs on `/outreach`; 92: asserts > 20 publication `<article>`s; 115: > 100 map paths.

---

## 2. COLOUR SYSTEM

### (a) Token definitions

`tailwind.config.cjs:15-27` (`theme.extend.colors`):

| name | value | role (comment) |
|---|---|---|
| gold | `#EE9B00` | primary accent |
| cyan | `#0A9396` | secondary accent |
| ember | `#CA6702` | tertiary accent |
| crimson | `#AE2012` | alert / emphasis |
| deep | `#005F73` | darkest stop, fills only |
| mint | `#94D2BD` | |
| sand | `#E9D8A6` | |
| brick | `#BB3E03` | |
| ink | `#0A0A0A` | page background |
| panel | `#141414` | card surface |
| edge | `#242424` | hairline border |

Lines 6-14 are a comment recording the previous palette (`gold #FAD103 cyan #02B8A6 ember #FA6A03 crimson #B80502`).

`src/index.css:6-18` (`:root`): `--gold #ee9b00`, `--cyan #0a9396`, `--ember #ca6702`, `--crimson #ae2012` (7-10); `--accent #ee9b00` (13, read by `SectionHeading` and `PageHero` eyebrows in `ui.tsx:68,71,267,270` and by `Home.tsx:96,113`); `--brand-stops` eight-stop ramp `#005f73 0%, #0a9396 14%, #94d2bd 29%, #e9d8a6 43%, #ee9b00 57%, #ca6702 71%, #bb3e03 86%, #ae2012 100%` (16-17), consumed by `.brand-gradient` (106-108), `.brand-text` (111-116), `.brand-title` (119-126). Lines 20-31 keep the old palette in a comment.

Other fixed colours in `index.css`: 42-43 `html,body,#root` background `#0a0a0a` / text `#f2f2f2`; 63 `::selection` text `#0a0a0a`; 77 scrollbar track `#0a0a0a`; 80 thumb `#2e2e2e`; 136-150 mask gradients in pure black (device-neutral, leave).

Also stale: `public/favicon.svg:2-11` still uses the **old** palette (`#0A0A0A` tile, `#FAD103` "P", ramp `#02B8A6/#FAD103/#FA6A03/#B80502`) and the letter "P"; and `ui.tsx:106` GradientButton hover glow `rgba(250,209,3,0.6)` = old gold `#FAD103`.

### (b) Tailwind colour-class usage per file

Grep of `(text|bg|border|from|via|to|decoration|placeholder|focus|hover|group-hover)-<token>` including alpha suffixes. Totals across `src/` + `index.html`: **gold 60, ink 28, cyan 20, panel 15, edge 12, ember 6; crimson/deep/mint/sand/brick 0** (those five are reached only through inline hex, §2c). `text-white` 48, `border-white/10` 9, `border-white/5` 8, `bg-white/[0.03]` 5, `bg-white/[0.04]` 2, `from-white/[0.05]` 1, `bg-black` 1. Neutral greys: 122 (see §2d).

- `src/index.css`: text-neutral-300 1, text-gold 1, hover:decoration-gold 1, decoration-gold/40 1, border-gold/50 1, border-edge 1, bg-panel/70 1, bg-panel 1 (all inside `.card` 155-160 and `.prose-dark` 183-191)
- `index.html`: none
- `src/App.tsx`: bg-ink 1 (82)
- `src/components/Header.tsx`: text-gold 3, bg-current 3, text-white 2, text-neutral-200 2, to-transparent 1, text-neutral-500 1, text-neutral-300 1, hover:text-white 1, hover:text-gold 1, hover:border-gold 1, from-ink/80 1, focus:text-ink 1, focus:bg-gold 1, border-white/5 1, border-white/10 1, border-transparent 1, border-neutral-700 1, bg-ink/98 1, bg-ink/90 1
- `src/components/Footer.tsx`: hover:text-gold 6, text-neutral-500 4, text-neutral-400 4, decoration-neutral-700 3, text-white 2, text-neutral-300 2, group-hover:text-gold 2, border-white/5 1, border-white/10 1, bg-ink 1
- `src/components/ui.tsx`: text-white 2, text-neutral-300 2, from-ink 2, via-ink/70 1, to-transparent 1, to-ink/25 1, text-neutral-500 1, text-neutral-400 1, text-neutral-200 1, hover:text-gold 1, hover:border-gold 1, group-hover:text-ink 1, group-hover:bg-transparent 1, border-neutral-700 1, bg-ink 1
- `src/components/CollaboratorMap.tsx`: text-white 4, text-neutral-500 4, hover:text-gold 4, decoration-neutral-700 2, text-neutral-600 1, text-neutral-400 1, text-neutral-300 1, hover:border-gold 1, border-white/5 1, border-neutral-700 1, border-gold/40 1, border-edge 1, bg-ink/95 1, bg-ink/50 1 (+ `bg-[#111]` at 127)
- `src/components/Icons.tsx`, `LogoMark.tsx`, `src/content/*`, `src/lib/useData.ts`, `src/main.tsx`: none
- `src/pages/Home.tsx`: text-white 7, text-neutral-400 4, from-ink 3, text-neutral-500 2, text-neutral-300 2, via-panel 1, via-ink/80 1, via-ink/25 1, to-transparent 1, to-panel 1, to-ink/75 1, to-ink/15 1, from-white/[0.05] 1, border-white/10 1, border-neutral-600 1, bg-white/[0.04] 1, bg-ink/60 1
- `src/pages/Research.tsx`: text-white 1, text-neutral-500 1, text-neutral-400 1, text-neutral-300 1, border-white/10 1, border-edge 1, bg-panel/50 1
- `src/pages/People.tsx`: text-neutral-400 2, text-gold 2, border-white/10 2, to-cyan/10 1, text-white 1, text-neutral-600 1, text-neutral-500 1, text-neutral-300 1, text-cyan 1, hover:text-white 1, hover:text-gold 1, from-gold/15 1, border-gold/25 1, border-cyan/30 1
- `src/pages/Publications.tsx`: text-neutral-500 10, hover:text-white 6, text-white 4, text-neutral-400 4, text-gold 3, text-cyan 3, border-neutral-700 3, bg-gold 3, text-neutral-300 2, text-ink 2, hover:text-gold 2, hover:border-neutral-500 2, border-gold 2, to-transparent 1, placeholder:text-neutral-600 1, from-gold/40 1, focus:border-gold 1, border-white/10 1, border-gold/40 1, bg-panel 1, bg-ink/90 1
- `src/pages/Outreach.tsx`: border-edge 5, text-white 3, text-neutral-500 3, text-neutral-400 3, text-neutral-200 3, hover:bg-white/[0.03] 3, border-white/5 3, text-ember 2, text-cyan 2, group-hover:text-gold 2, from-panel 2, bg-panel 2, to-transparent 1, to-ink 1, text-gold/30 1, text-gold 1, bg-black 1
- `src/pages/Opportunities.tsx`: text-neutral-500 11, text-neutral-400 8, text-white 5, border-edge 4, text-neutral-300 3, text-cyan 3, hover:text-gold 2, hover:bg-white/[0.03] 2, border-white/5 2, bg-panel 2, to-panel/90 1, to-panel 1, text-neutral-200 1, text-gold 1, text-cyan/70 1 (`marker:`), lg:to-panel 1, hover:text-white 1, from-transparent 1, from-gold/[0.07] 1, border-gold/25 1, border-cyan/50 1, border-cyan/30 1, bg-cyan/[0.08] 1
- `src/pages/News.tsx`: text-neutral-500 3, text-white 2, to-transparent 1, text-neutral-400 1, text-neutral-300 1, text-ink 1, hover:text-white 1, hover:border-neutral-500 1, from-gold/40 1, border-neutral-700 1, border-gold 1, bg-white/[0.04] 1, bg-gold 1
- `src/pages/Contact.tsx`: text-neutral-400 3, text-neutral-500 2, text-cyan 2, hover:text-white 2, border-white/10 2, text-white 1, text-neutral-300 1, text-neutral-200 1, text-gold 1, text-ember 1, hover:border-ember 1, hover:border-cyan 1, group-hover:text-white 1, group-hover:text-gold 1, group-hover:border-gold/50 1, border-ember/40 1, border-cyan/40 1, bg-ink 1, bg-ember/[0.04] 1, bg-cyan/[0.04] 1
- `src/pages/NotFound.tsx`: text-white 1, text-neutral-400 1, text-gold/25 1

Conclusion: changing the eleven values in `tailwind.config.cjs:16-26` and the matching `:root` values in `index.css:7-17` retints ~140 class usages and every gradient. Only the literals in §2c need hand edits.

### (c) Inline hex / rgb literals (hand edits)

`src/content/site.ts` — `THEMES[].accent` (rendered by `Research.tsx:58,67,88`): 86 `#CA6702`, 101 `#EE9B00`, 116 `#AE2012`, 131 `#0A9396`, 146 `#94D2BD`, 161 `#CA6702`, 175 `#94D2BD`, 190 `#0A9396`, 205 `#EE9B00`, 220 `#94D2BD`. `OUTREACH[].accent` (rendered by `Outreach.tsx:90-102`): 799 `#EE9B00`, 807 `#0A9396`, 814 `#CA6702`, 821 `#AE2012`.

`src/pages/Home.tsx`: 25-34 `ACCENTS = { deep #005f73, teal #0a9396, mint #94d2bd, sand #e9d8a6, amber #ee9b00, rust #ca6702, brick #bb3e03, red #ae2012 }` (used at 78, 81, 139, 202, 207, 212, 264-266, 293, 298, 304, 338-345, 356); 271 `TextLink color="#0A9396"`; 388 `?? "#EE9B00"`.

`src/pages/Publications.tsx`: 12-17 `KIND_COLOUR = { article #EE9B00, preprint #E9D8A6, chapter #94D2BD, other #6B7280 }`; 95 `HIGHLIGHT_BORDER = "#CA6702"`; 143 `?? "#6B7280"`.

`src/pages/News.tsx`: 8-15 `TAG_COLOUR = { Paper #EE9B00, Opportunities #CA6702, Events #0A9396, Award #AE2012, Media #94D2BD, Lab #EE9B00 }` (note: `Home.tsx:338-345` has a *different* TAG_COLOUR mapping for the same tags — sand/amber/teal/red/mint/sand).

`src/pages/Opportunities.tsx`: 23-25 `SCOPE_COLOUR = { Sweden #EE9B00, Europe #0A9396, Global #CA6702 }`; 44 `Chip color="#EE9B00"`; 45 `Chip color="#0A9396"`.

`src/pages/People.tsx`: 87 `muted ? "#0A9396" : "#EE9B00"`.

`src/pages/Outreach.tsx`: 18 default `accent = "#EE9B00"`; 231 `#EE9B00`; 238 `#0A9396`; 248 `#CA6702`; 289 `#94D2BD`.

`src/components/ui.tsx`: 106 `rgba(250,209,3,0.6)` (old gold glow); 144, 166, 197 default `color = "#EE9B00"` for `Chip`, `StatTile`, `TextLink`.

`src/components/CollaboratorMap.tsx`: 11-20 `STOPS` (the eight brand stops, duplicated from `--brand-stops`); 120-122 StatTile colours `#0A9396`, `#EE9B00`, `#CA6702`; 127 `bg-[#111]`; 145 `fill="#111111"`; 152 empty-country fill `#1E1E1E`; 159 stroke `#FFFFFF` / `#0A0A0A`; 182 legend text `#9CA3AF` (= Tailwind gray-400); 186, 189 `#6B7280` (= gray-500).

`src/index.css`: 7-17 tokens (above); 42-43, 63, 77, 80 fixed blacks/greys.

`tailwind.config.cjs`: 16-26 tokens (above).

`public/favicon.svg`: 2 `#0A0A0A`, 5 `#FAD103`, 8-11 `#02B8A6 #FAD103 #FA6A03 #B80502` (old palette; regenerate).

`scripts/make-favicon.mjs`: 59 `fillStyle = "#0A0A0A"`, 77 message; `scripts/prepare-logo.mjs:7` comment "#0A0A0A".

`src/pages/Research.tsx`, `Contact.tsx`, `NotFound.tsx`, `Header.tsx`, `Footer.tsx`, `App.tsx`, `Icons.tsx`, `LogoMark.tsx`: no literals.

### (d) Neutral greys

122 `neutral-*` usages in `src/`: neutral-500 ×46 (captions, dates, table headers), neutral-400 ×33 (body copy on cards, leads), neutral-300 ×18 (primary body copy incl. `.prose-dark p` at `index.css:184` and nav links `Header.tsx:151`), neutral-700 ×12 (borders on ghost buttons/filter pills/inputs, link decorations), neutral-200 ×8 (menu items, row titles), neutral-600 ×4 (placeholders, faint metadata). Plus the two gray literals in `CollaboratorMap.tsx:182-189` and `#6B7280` in `Publications.tsx:16,143`.

These are Tailwind's default `neutral` scale (`node_modules/tailwindcss/lib/public/colors.js:68-79`: 200 `#e5e5e5`, 300 `#d4d4d4`, 400 `#a3a3a3`, 500 `#737373`, 600 `#525252`, 700 `#404040`) — zero-saturation greys. Against an olive/terracotta accent set on the near-black `ink` they will read cold. They **would need warming**, and it can be done without touching any of the 122 usages by adding a `neutral:` override under `theme.extend.colors` in `tailwind.config.cjs:15` — e.g. Tailwind's own warm `stone` values (`colors.js:81-92`: 200 `#e7e5e4`, 300 `#d6d3d1`, 400 `#a8a29e`, 500 `#78716c`, 600 `#57534e`, 700 `#44403c`) or a custom olive-tinted ramp. `ink`/`panel`/`edge` (`#0A0A0A/#141414/#242424`) are also neutral blacks and can be warmed in the same place; the `#0a0a0a` literals in `index.css:42,63,77` and `#111/#1E1E1E/#0A0A0A` in `CollaboratorMap.tsx:127,145,152,159` must follow by hand.

Caveat: the whole design is dark-first (`text-white` ×48, `border-white/x` ×17, `bg-white/[0.0x]` ×8, `.card` on `bg-panel`, hero overlays `from-ink`). Swapping accents keeps it dark. Moving to a light/cream page would be a separate, much larger restyle of every `white`/`ink` usage, not a token change.

---

## 3. FONTS

- `index.html:97-98` preconnects to `fonts.googleapis.com` / `fonts.gstatic.com`; `index.html:99-102` loads Google Fonts **Inter** (300-700) and **Space Grotesk** (400-700).
- `index.html:104-106` loads **Congenial** from Patrice's personal Adobe Fonts (Typekit) kit `https://use.typekit.net/wnv4xgu.css`. That kit is licensed to his Adobe account and domain; remove the line (and the comment) — it will not serve the font for a different domain and leaks his kit id.
- `tailwind.config.cjs:28-34`: `fontFamily.sans = ["Inter", system-ui, -apple-system, "Segoe UI", sans-serif]`; `fontFamily.display = ["congenial", "Space Grotesk", "Inter", …]` with comment 30-32 about the Typekit kit.
- `src/index.css:48` body `font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif`; `index.css:53-59` `h1, h2, h3, .font-display { font-family: "Space Grotesk", Inter, … }` in `@layer base`. Note the precedence: elements with the `font-display` utility class get Tailwind's `display` stack (congenial → Space Grotesk) because utilities come after base; bare `h1/h2/h3` without the class (e.g. `PageHero`'s `<h1 className="brand-title …">` at `ui.tsx:276`) get Space Grotesk from this base rule. Change both places together.
- `public/favicon.svg:4` `font-family="Space Grotesk, Inter, sans-serif"` (SVG text; only matters if the SVG favicon is kept).
- No other font references (no `@font-face`, no local font files).

---

## 4. IMAGES

Every path is under `public/` (served at `/…`). In the working copy `public/images/` is empty and `public/posters/`, `public/cv.pdf` do not exist; the reference copy has all of them (list in `patrice_repo_src/public/images` and `/posters`).

| path | purpose | rendered by |
|---|---|---|
| `/favicon.svg` | tab icon | `index.html:6` (`<link rel="icon" type="image/svg+xml">`) — the only favicon actually linked |
| `/images/logo-mark.png` | logo mark in header (62px), footer (62px), home hero (300px); also `README.md:3` and JSON-LD `logo` `index.html:83` | `LogoMark.tsx:24` → `Header.tsx:123`, `Footer.tsx:62`, `Home.tsx:70-74`. **onError**: `LogoMark.tsx:19-20,30` sets `missing` and the component returns `null`, so a missing file silently removes the mark and the wordmark stands alone. Also the input to `scripts/make-favicon.mjs:16`, which writes `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` (28-30) — none of which `index.html` links. |
| `/images/fish-eggs.jpg` | home hero photo; `og:image` / `twitter:image` (absolute URL) | `Home.tsx:50` (alt at 51); `index.html:28,31`; also NEWS item `site.ts:769` |
| `/images/hero-leaf-insect.jpg` | News page hero | `News.tsx:129` via `PageHero`; mentioned as alternative in `Home.tsx:48` comment |
| `/images/research-warming.jpg` | Research page hero | `Research.tsx:10` |
| `/images/people-lionfish.jpg` | People page hero (opacity 0.85) | `People.tsx:122-123` |
| `/images/chameleon.jpg` | Publications hero | `Publications.tsx:300` |
| `/images/research-bias.jpg` | Outreach hero; theme "bias" card | `Outreach.tsx:58`; `site.ts:189` |
| `/images/portfolio-banner.webp` | Opportunities hero | `Opportunities.tsx:138` |
| `/images/research-plasticity.jpg` | Contact hero; theme "plasticity" card | `Contact.tsx:12`; `site.ts:100` |
| `/images/research-development.jpg` | theme "life-stages" card; PhD position card; NEWS TEA item | `site.ts:85, 405, 778` → `Research.tsx:50-55`, `Opportunities.tsx:37`, News/Home cards |
| `/images/research-reproduction.jpg` | theme card | `site.ts:115` |
| `/images/research-development-frogspawn.jpg` | theme card | `site.ts:130` |
| `/images/research-lab-to-field.jpg` | theme card | `site.ts:145` |
| `/images/research-redistribution.jpg` | theme card | `site.ts:160` |
| `/images/research-knowledge-action.jpg` | theme card | `site.ts:174` |
| `/images/research-synthesis.jpg` | theme card | `site.ts:204` |
| `/images/wordcloud.png` | theme "meta-science" card; home Mission word cloud (feathered) | `site.ts:219`; `Home.tsx:234` |
| `/images/patrice-pottier.jpg` | PI portrait on People; JSON-LD `image` | `site.ts:241` → `People.tsx:34` (`Avatar`); `index.html:44` |
| `/images/patrice-portrait.jpg` | Contact page portrait | `Contact.tsx:21` |
| `/images/patrice-canada.jpg`, `patrice-mushrooms.jpg`, `patrice-cow.jpg` | PI_PHOTOS strip inside the expanded bio | `site.ts:265,269,273` → `People.tsx:166-174` |
| `/images/leon-pfeufer.jpg`, `xinyi-liu.jpg`, `emil-larsson.jpg`, `joelle-zurcher.jpg` | member portraits | `site.ts:283,292,301,313` → `People.tsx:32-39` |
| `/images/opportunities-banner.webp` | postdoc position card; NEWS positions item | `site.ts:426, 727` |
| `/images/news-bamfield-trip.jpg`, `news-fin-club.jpg`, `news-icbf.jpg` | news cards (cover) | `site.ts:735,743,751` → `News.tsx:45-52`, `Home.tsx:377-384` |
| `/images/vr-logo.svg` | news card, `imageFit: "contain"` (logo box) | `site.ts:760-761` → `News.tsx:35-43`, `Home.tsx:367-375` |
| `/images/gu-logo.png` | University of Gothenburg lockup in footer and Contact | `Footer.tsx:98`, `Contact.tsx:60-64` |
| `/images/seb2024-young-scientist-award.jpg` | OUTREACH_PHOTO figure | `site.ts:1092` → `Outreach.tsx:75-79` |
| `/images/seb2024-with-kyle.jpg` | CONFERENCE_PHOTO figure | `site.ts:1101` → `Outreach.tsx:212-217` |
| `/posters/poster-seb2025.jpg|pdf`, `poster-seb2022.jpg|pdf`, `poster-eseb2022.jpg|pdf` | poster thumbnails + PDF links | `site.ts:864-882` → `Outreach.tsx:121-136` (thumbnail optional: 137-141 shows a "PDF" tile if `image` is unset) |
| `/cv.pdf` | CV button | `site.ts:57` `CV_URL` → `People.tsx:182` |

Fallback behaviour when a file is absent: only `LogoMark` handles it. `PageHero` (`ui.tsx:249-254`, `alt=""`) shows the gradient overlays with no picture; `Avatar` (`People.tsx:32-39`) only falls back to initials when `person.photo` is **undefined**, not when the file 404s; theme images (`Research.tsx:50`) and news images show a broken image. `scripts/collaborator-info.mjs:22` writes to `public/images/collaborators/` and `scripts/grab-images.mjs:7` to `public/images/raw/` (both one-off helpers).

---

## 5. ADDING A PAGE

Exact edit list for a new route `/foo`:

1. `src/pages/Foo.tsx` — new component (use `PageHero` + `Container`).
2. `src/App.tsx` — import (lines 6-14) and `<Route path="/foo" element={<Foo />} />` inside `<Routes>` (88-96, before the `*` at 96).
3. `src/components/Header.tsx:8-17` — add `{ to: "/foo", label: "Foo" }` to `NAV`; this single array drives the desktop nav (144-161) and the mobile overlay (204-223).
4. `src/content/route-meta.json:3-36` — add `"/foo": { "title", "description" }` (key without trailing slash; `seo.ts:33-35` strips slashes before lookup). This one entry feeds `PageMeta` (`App.tsx:49-68` via `seo.ts:21`), the prerendered `dist/foo/index.html` (`prerender-routes.mjs:88-93`) and the sitemap (101-103). **Nothing in `prerender-routes.mjs` needs editing**; it reads the JSON (25-28).
5. `scripts/smoke.mjs:13-23` `ROUTES` — optional, add `["/foo", "foo"]` so the smoke test screenshots it.
6. `src/components/Footer.tsx` — **no edit required**: it has no route links, only the external `LINKS` columns (11-12, 103-107) and email.
7. `README.md` — optional mention.

Removing a page is the mirror image; delete the `route-meta.json` entry too or the sitemap will advertise a directory that prerender still creates with a page that 404s in the app.

### Reusable components, `src/components/ui.tsx`

- `Container({ children, className="" })` 8-16 — `mx-auto w-full max-w-content px-5 sm:px-8` (`max-w-content` = 1180px, `tailwind.config.cjs:35-37`).
- `Reveal({ children, delay=0, y=24, className="" })` 21-46 — framer `useInView` once, fades/lifts.
- `SectionHeading({ eyebrow?, title: ReactNode, lead?: ReactNode, align="left"|"center" })` 50-83 — eyebrow rule + label coloured by `var(--accent)`; `h2` white; lead neutral-400.
- `GradientButton({ children, to?, href?, onClick?, className="" })` 88-120 — `brand-gradient` pill shell; `to` → `<Link>`, `href` → `<a target=_blank>` (also for `mailto:`, see `Opportunities.tsx:330`), else `<button>`.
- `GhostButton({ children, to?, href?, className="" })` 122-140 — outlined pill; `href` always opens in a new tab.
- `Chip({ children, color="#EE9B00", className="" })` 142-159 — uppercase pill; colour applied inline with `59`/`14` alpha suffixes.
- `StatTile({ value: ReactNode, label, color="#EE9B00", sub? })` 163-189 — `.card` with a big coloured figure.
- `TextLink({ children, to?, href?, color="#EE9B00" })` 193-216 — inline CTA with `ArrowRight`.
- `PageHero({ eyebrow?, title: string, lead?: string, image: string (required), height="min-h-[420px]", imageOpacity=0.6 })` 221-286 — full-width banner, `pt-[194px]` for the fixed 96px header, `brand-title` gradient `h1`.

Elsewhere: `Icon({ name: IconName, size=20 })` and `ArrowRight({ className })` in `Icons.tsx:4,68`; `LogoMark({ size=56, className, priority })` `LogoMark.tsx:10`; `Acronym(...)` `Header.tsx:24-36` (PEACE-specific); `.card`, `.prose-dark`, `.link-underline`, `.brand-gradient/.brand-text/.brand-title`, `.feather-edges`, `.hero-mark-bleed` utility classes in `index.css:101-191`.

### Page structures

**`Home.tsx`** — five sections in order (413-423): `Hero` 38-147 (parallax photo, LogoMark, PEACE headline, `Acronym`, mission paragraph, "led by {PI.name}", two buttons, scroll cue); `Mission` 151-244 (SectionHeading, three prose paragraphs, three method cards from an inline array 198-213, word cloud); `Network` 248-279 (`useCollaborators()`; **returns `null` while `collaborators.json` is absent**; three StatTiles + TextLink); `OpenPositions` 283-334 (`POSITIONS.filter(status==="open")`; returns `null` if none; card with Chip, heading "N funded positions in Gothenburg", deadline of `open[0]`); `LatestNews` 347-409 (three newest `NEWS`, card with optional image, Chip by `TAG_COLOUR` 338-345).

**`Research.tsx`** — consumes `THEMES` only. `PageHero` 7-11; three hard-coded intro paragraphs 14-38; one alternating image/text `<section id={t.id}>` per theme 40-100 (emoji 64, "Theme 01" label 69, title, lead, "Questions we are asking" bullets 80-93, accent bar under image 56-59) — the ids are deep-link anchors (`scroll-mt-28`); closing `SectionHeading` card 102-109. Each theme needs `id, emoji, title, lead, questions[], image, accent` (`site.ts:61-69`).

**`People.tsx`** — consumes `PI, PI_INTRO, PI_BIO, PI_PHOTOS, CURRENT_MEMBERS, PAST_MEMBERS, CV_URL`. `Avatar` 25-46 (photo or initials); `MemberCard` 53-111 (photo column with links, role label coloured `#EE9B00` or muted `#0A9396`, name, affiliation, `years`, `Now:`, blurb, `children`). Page: `PageHero` 118-124; "Current members" 128-214 = PI card (blurb `PI_INTRO`, "Learn more about me" toggle 138-148 revealing `PI_BIO` paragraphs and the `PI_PHOTOS` strip 150-179, then CV / TEA / SORTEE buttons 181-189) + `CURRENT_MEMBERS` cards 193-197 + a dashed "There is room for you here!" recruiting card 199-212; "Past members" 217-230 (guarded on length, `muted`); "Collaborators" 233-246 rendering `<CollaboratorMap />`.

**`Outreach.tsx`** — consumes `OUTREACH, OUTREACH_PHOTO, POSTERS, CONFERENCES, CONFERENCE_PHOTO, TALKS, WORKSHOPS, TEACHING, MEDIA, SERVICE`. `EngagementTable({ items: Engagement[], accent })` 18-49 is a generic year / kind / title / detail list. Sections: `PageHero` 54-59; intro prose + `OUTREACH_PHOTO` figure 62-85; `OUTREACH` cards 2-col with accent bars and `TextLink` 87-110; Posters grid 113-160 (links to PDFs, no empty-state guard); "Where to find us next" `CONFERENCES` rows 163-203 (no guard); `CONFERENCE_PHOTO` + "Invited talks…" `TALKS` table 206-232 and `WORKSHOPS` 234-239; `TEACHING` 243-250; `MEDIA` 253-281 (guarded by `MEDIA.length > 0`); `SERVICE` 284-291. Every section is independent and can be deleted with its import.

**`News.tsx`** — consumes `NEWS`. `TAG_COLOUR` 8-15 keyed on `NewsTag`; `NewsCard` 25-104 (optional image cover/contain, Chip, date `en-GB` long, title, body, "Read more"/"Learn more" when `href`; whole card wrapped in `<a>` for http or `<Link>` otherwise). Page: `PageHero` 125-131; tag filter pills built from the tags present 110, 135-150; items grouped by year 113-121, 152-169; empty message 171-173.

**`Opportunities.tsx`** — consumes `POSITIONS, WHO_WE_LOOK_FOR, FELLOWSHIPS, SHORT_VISITS, SITE`. `SCOPE_COLOUR` 22-26 must match `Fellowship.scope` (`site.ts:469`). `PositionCard` 28-127: optional image, Chips (`kind` and a hard-coded "Open" chip 45 regardless of `status`), title, summary, Location / Applications close `<dl>`, "What the project involves" toggle over `details` (string paragraphs or `{lead, items[]}` bullet blocks 87-104), Apply (`applyUrl`) and "Ask about this position" mailto 30. Page: `PageHero` 134-139; "N open positions" 143-157 (no empty state — heading reads "0 open positions" if none); traits grid + "Everyone is welcome" panel 160-192; Fellowships table 195-259; Short visits table 262-317; closing CTA with `SITE.email` 320-336.

**`Contact.tsx`** — `PageHero` 9-14; portrait + hard-coded name/role `SectionHeading` 20-28; email/address from `SITE` 30-53; gu.se logo 55-65; email button 69-73; `LINKS` grid 79-97; two hard-coded cards (prospective students 99-109, TEA 111-127).

**`Publications.tsx`** — see §6 for the data flow. Layout: `PageHero` 296-302; "Selected papers" highlights (three across, remainder centred) 306-337; Scholar/ORCID buttons + "N works · list updated …" line 339-359; sticky year/search filter 362-400; list grouped by year 403-426.

---

## 6. DATA PIPELINE

### How `scripts/fetch-data.mjs` works today

Config 35-40: `ORCID`, `MAILTO`, `UA`, `FIRST_YEAR = 2020`. Helpers: `getJSON` 56-70 (3 retries, `allow404`), `cleanDOI` 72-73, `titleTokens`/`dice` 98-113, `surname` 115-116, `isSelf` 118-120, `deInvert` 123-131.

- `fetchOrcidWorks()` 135-153: `GET https://pub.orcid.org/v3.0/{ORCID}/works`; takes the first `work-summary` of each group; DOI from `external-ids`; returns `{doi, title, type, year}`.
- `fetchOpenAlexAuthor()` 157-162: `GET https://api.openalex.org/authors?filter=orcid:{ORCID}` and takes **`results[0]`**, throwing if empty.
- `fetchOpenAlexWorks(authorId)` 164-178: `works?filter=author.id:{id}&per-page=200` with cursor paging.
- `openAlexByDOI(doi)` 180-185: `works/doi:{doi}` (404 tolerated) — used only for articles recovered through preprint merging (461).
- `crossrefWork` 189-195 and `findPublishedVersion` 206-230 (Crossref bibliographic search with author-overlap test).
- `isExcluded` 238-260 (datasets, software, Zenodo, figshare, Conversation pieces, EGU abstracts, supplementary files); `isPreprintish` 262-270.
- `main()` 298-590:
  1. 300-306 fetch ORCID, then OpenAlex author + all works of that author id.
  2. 310-338 **union** keyed by DOI: every OpenAlex work is added first (316-327, carrying the `oa` record, type, title, journal, year); ORCID DOIs are then merged in with `onOrcid: true` (328-337). Despite the header comment (9) calling ORCID "the spine", **nothing later filters on `onOrcid`** — a work only on the OpenAlex author record is kept.
  3. 342-357 Crossref lookup for every DOI (350 ms apart) overriding title/journal/year.
  4. 361-370 exclusions; 374-386 preprint/article split, authors from Crossref else OpenAlex.
  5. 390-480 preprint→article linking: manual `preprint-merges.json`, then local title match (404-414), then Crossref search; recovered articles get `oa` via `openAlexByDOI` (461); article gets `preprintUrl`, `preprintCitations`, abstract fallback.
  6. 484-515 `toPublication`; 522-536 de-duplication on sorted title tokens; 538-540 sort by year then citations; 542-543 Altmetric (skipped without `ALTMETRIC_KEY`).
  7. 546 `buildCollaborators(oaWorks, author.display_name)` 626-717: iterates the **OpenAlex author works** (not the publication list), skips the self name / ORCID (633-634), aggregates per co-author with institutions, geocodes institutions 50 at a time (660-678), returns `{updated, total, countries, institutions, byCountry, collaborators}`.
  8. 551-576 metrics: `citationsByYear` summed from `oaWorks[].counts_by_year` for years ≥ `FIRST_YEAR`; `citations`, `hIndex`, `i10Index` from the **author record** (566-568); counts from `pubs`; `coAuthors`/`countries` from `collab`.
  9. 578-584 writes `publications.json`, `metrics.json`, `collaborators.json`.

### Output shapes (reference copy `patrice_repo_src/public/data/`, all dated 2026-08-27)

`publications.json` = `{ updated: "YYYY-MM-DD", publications: Publication[] }` (45 entries). Each: `id` (= doi), `doi`, `title`, `authors: [{name, orcid|null, isSelf}]`, `authorLine`, `journal|null`, `year|null`, `volume|null`, `issue|null`, `pages|null`, `kind` ("article" | "preprint" — only those two occur; `useData.ts:19` also allows software/chapter/other), `isOA`, `oaUrl|null`, `url` (`https://doi.org/…`), `citations` (OpenAlex count + merged preprint's count, 487), `abstract|null`, `preprintUrl|null` (24 of 45 set), `altmetric` (all `null`).

`metrics.json` = `{ updated, sources: ["ORCID","Crossref","OpenAlex"], orcid, citations 1672, hIndex 22, i10Index 28, works 45, articles 39, preprints 6, firstAuthor 11, coAuthors 587, countries 63, citationsByYear: [{year, cited_by_count}] (2020…2026) }`. No `software`, no `worksByYear`.

`scholar.json` = `{ updated, source: "Google Scholar via scholarly", scholarId, citations 2059, citations5y 2044, hIndex 21, i10Index 25, publications: [{title, key, year, citations}] }` (53 entries; `key` is the normalised title from `scholar_refresh.py:36-40`, identical to `useData.ts:145-153 titleKey`).

`collaborators.json` = `{ updated, total 587, countries 63, institutions 287, byCountry: {"Australia": 119, …}, collaborators: [{name, orcid|null, openalex|null, works, lastYear, institution|null, city|null, country|null, countryCode|null, lat|null, lon|null}] }`.

`countries-110m.json` = TopoJSON world atlas with `objects.countries` and `properties.name` (`CollaboratorMap.tsx:91-94,149`); present in the working copy, keep.

### What the front end expects (`src/lib/useData.ts`)

`useJSON(path)` 78-100 fetches `/data/*.json` once at runtime, caches per session, logs `Data load failed: …` to the console on 404 and leaves the hook at `null`. Hooks: `usePublications` (102-104) → `Publications.tsx:230`; `useScholar` (135-137) → `Publications.tsx:234`; `useCollaborators` (110-112) → `Home.tsx:249`, `CollaboratorMap.tsx:67`; `useWorldAtlas` (114-116) → `CollaboratorMap.tsx:68`; `useMetrics` (106-108) → **unused**. The `Metrics` type (30-48) is therefore the only consumer of `citationsByYear`; the "citations per year on the home page" mentioned at `fetch-data.mjs:39` does not exist in this snapshot (Home uses only collaborator totals, 264-266).

Scholar merge: `Publications.tsx:241-249` maps each publication's `titleKey(title)` to a Scholar count and takes it when higher. `HIGHLIGHTED_DOIS` (`site.ts:328-334`) → `Publications.tsx:251-257` finds each DOI (lower-cased) in the merged list, silently dropping misses; the `Highlight` card 97-137 shows citations, journal · year, title, four authors, and hides the preprint link (134).

### The OpenAlex split — verified 2026-08-28 with curl (`&mailto=daniel.noble@anu.edu.au`)

| query | result |
|---|---|
| `authors?filter=orcid:0000-0001-9460-8743` | `meta.count = 2`: **A5028073300** "Daniel W. A. Noble" `works_count 260`, `cited_by_count 8018`, h 42, i10 103, ANU; **A5140596643** "Daniel W.A. Noble" `works_count 1`, `cited_by_count 0`, ANU. `results[0]` was A5028073300 in this call, but nothing guarantees the order. |
| `authors/orcid:0000-0001-9460-8743` and `authors/https://orcid.org/…` (single-entity forms) | both resolve to **A5140596643, works_count 1** — this is the form that reproduces the reported problem. |
| `works?filter=authorships.author.orcid:0000-0001-9460-8743` | **263 works** (247 with a DOI); by author id: A5028073300 → 260, A5140596643 → 1 (W7168271250, `10.1002/brv.70199`, 2026). |
| ORCID `pub.orcid.org/v3.0/0000-0001-9460-8743/works` | **136 groups** (127 journal-article, 7 preprint, 1 book-chapter, 1 other); **132 with a DOI**. |
| overlap | **131 of the 132 ORCID DOIs** are in the 263 ORCID-filtered OpenAlex works (the one miss is `10.1371/journal.pbio.3003653`); those 131 sum to **7489 citations**, years 2007-2026. 116 OpenAlex works with DOIs are **not** on ORCID. |
| A5028073300 contents | types: article 136, preprint 62, dataset 20, peer-review 20, review 8, supplementary-materials 6, software 4, book 2, other 2, book-chapter 1, data-paper 1, erratum 1; publication years run **1846-2026** (e.g. `10.1176/ajp.3.3.262` 1847, `10.1192/bjp.3.22.429` 1857, `10.1038/219767a0` 1968) — the big record is itself polluted with another Daniel Noble. |
| `works?filter=doi:10.1002/brv.70199\|10.1111/ele.14083\|10.1038/s41586-025-08665-0` | batch DOI filter works (3/3 returned; OpenAlex accepts up to 50 `\|`-joined values, the same limit the script already uses for institutions at 662-667). `works/doi:10.1002/brv.70199` also works. |

So the existing code would either (a) take A5028073300 and import 116 non-ORCID works including 19th-century psychiatry papers, datasets and peer reviews into the union at 316-327 and into the collaborator map, or (b) take the 1-work record and lose all citation data. Either is wrong. The fix is to seed from ORCID and look OpenAlex up per DOI.

### Proposed patch (exact lines)

1. **`fetch-data.mjs:35-37`** → `ORCID = "0000-0001-9460-8743"`, `MAILTO = "daniel.noble@anu.edu.au"` `[CONFIRM: address to expose to the three APIs]`, `UA = \`noble-lab-website/1.0 (mailto:${MAILTO})\``. **Line 40** `FIRST_YEAR` → `[CONFIRM: first year for the series; OpenAlex shows his earliest ORCID-listed work in 2007]`.
2. **Lines 118-120 `isSelf`** → `(author.orcid || "").includes(ORCID) || (surname(author.name) === "noble" && /^(daniel|d\.?)$/i.test(author.name.split(/\s+/)[0]))`. Keep the ORCID clause; it is what marks him in Crossref author lists.
3. **Replace lines 157-178** (`fetchOpenAlexAuthor`, `fetchOpenAlexWorks`) with a DOI-batched fetch:
   ```js
   /** OpenAlex records for a list of DOIs, 50 per request (the filter's limit). */
   async function fetchOpenAlexWorksByDOI(dois) {
     const works = [];
     for (let i = 0; i < dois.length; i += 50) {
       const chunk = dois.slice(i, i + 50);
       const d = await getJSON(
         `https://api.openalex.org/works?filter=doi:${chunk.join("|")}` +
           `&per-page=50&mailto=${MAILTO}`
       );
       works.push(...(d?.results || []));
       await sleep(150);
     }
     return works;
   }
   ```
   Keep `openAlexByDOI` (180-185) unchanged; it is still used at 461.
4. **Lines 303-306** in `main()` →
   ```js
   console.log("Fetching OpenAlex records for the ORCID DOIs…");
   const orcidDois = orcid.map((o) => o.doi).filter(Boolean);
   const oaWorks = await fetchOpenAlexWorksByDOI(orcidDois);
   console.log(`  ${oaWorks.length}/${orcidDois.length} DOIs found in OpenAlex`);
   ```
   and delete the `author` variable. Lines 310-337 need no change: the union is now ORCID DOIs ∪ (OpenAlex records of those same DOIs), so `onOrcid` becomes true for every record. (Expected: 132 DOIs → ~131 OpenAlex hits; the PLoS Biology miss still gets Crossref metadata at 342-357 and simply shows 0 citations.) The `for (const w of oaWorks)` loop at 316 already handles a work whose DOI OpenAlex normalises differently because `cleanDOI` lower-cases both.
5. **Line 546** → `buildCollaborators(oaWorks, null)`, and inside `buildCollaborators` (633-634) strengthen the self test so his un-ORCIDed authorships never become a "collaborator":
   ```js
   const SELF_OPENALEX_IDS = new Set(["https://openalex.org/A5028073300", "https://openalex.org/A5140596643"]);
   …
   if (!name) continue;
   if (SELF_OPENALEX_IDS.has(a.author?.id)) continue;
   if ((a.author?.orcid || "").includes(ORCID)) continue;
   if (isSelf({ name, orcid: a.author?.orcid })) continue;
   ```
   (Verified: the authorship on W7168271250 carries `author.id A5140596643` and his ORCID, so both guards fire.) Because `oaWorks` is now restricted to ORCID DOIs, the map counts co-authors on his real papers only — the collaborator map keeps working, on cleaner input. Note the pre-existing gap that articles recovered at 451-464 are not in `oaWorks` and so never contribute co-authors; unchanged.
6. **Metrics 562-576**: `author.cited_by_count` / `author.summary_stats` no longer exist. Replace 566-568 with values computed from `oaWorks`:
   ```js
   const counts = oaWorks.map((w) => w.cited_by_count ?? 0).sort((a, b) => b - a);
   const hIndex = counts.reduce((h, c, i) => (c >= i + 1 ? i + 1 : h), 0);
   …
   citations: counts.reduce((s, c) => s + c, 0),
   hIndex,
   i10Index: counts.filter((c) => c >= 10).length,
   ```
   With today's data that gives 7489 citations over 131 works (the OpenAlex author record's 8018 includes the misattributed works). `[CONFIRM: whether the site should quote OpenAlex totals at all, given `scholar.json` exists and the front end currently reads no metrics]`. `citationsByYear` (551-560) needs no change — it already sums `counts_by_year` over `oaWorks`.
7. **`scripts/preprint-merges.json:4-7`** — delete the four Pottier pairs; keep `{ "_comment": … }`.
8. **`scripts/scholar_refresh.py:27`** — `SCHOLAR_ID` `[CONFIRM: Daniel's Scholar ID — the untracked scholar.json says w69ezLIAAAAJ]`.
9. `.github/workflows/refresh-data.yml` — no change needed (no identity strings; nightly `node scripts/fetch-data.mjs` and commit of `public/data`).

Request budget after the patch: 1 ORCID call, 3 OpenAlex batch calls, ~132 Crossref calls at 350 ms (≈ 50 s), plus institution geocoding — well within a nightly job.

---

## 7. BUILD & TOOLING

`package.json:6-14` scripts: `dev` (vite), `build` (`tsc -b --noEmit && vite build`), `postbuild` (`node scripts/prerender-routes.mjs`, runs automatically after `build`), `preview`, `lint` (eslint .), `typecheck`, `data` (`node scripts/fetch-data.mjs`). Dependencies 15-40: react 19, react-router-dom 7, framer-motion 12, d3-geo, topojson-client; dev: vite `^7.1.6` (lockfile resolves **7.3.6**), tailwindcss 3.4, typescript ~5.8, eslint 9.

**Node**: no `engines` field in `package.json`. `package-lock.json` (`node_modules/vite` block, ~4210-4215) records vite's requirement **`node ^20.19.0 || >=22.12.0`**. This machine has node **v26.7.0** and npm 11.19.0 at `/opt/homebrew/bin` (so node *is* installed), and `node_modules/` is already populated (`.bin/vite`, `.bin/tsc`, `.bin/eslint` present). CI uses `actions/setup-node@v4` with `node-version: 20` (`pages.yml:23-26`, `refresh-data.yml:18-20`), which resolves to a current 20.x ≥ 20.19 — fine.

**Playwright**: `scripts/smoke.mjs:7`, `shot.mjs:2`, `make-favicon.mjs:10`, `prepare-logo.mjs:14`, `render-ai.mjs:10` all `import { chromium } from "playwright"`. Playwright is **not** in `package.json`, **not** in `node_modules/` (0 matches), and there is no `~/Library/Caches/ms-playwright` browser cache. All five scripts fail with `ERR_MODULE_NOT_FOUND` until `npm i -D playwright && npx playwright install chromium`. `render-ai.mjs:27-28` additionally needs `pdfjs-dist` (not installed). `smoke.mjs:10`, `shot.mjs:9` and `render-ai.mjs:43` hard-code a dev server at **`http://localhost:5175`**, whereas `vite` defaults to 5173 — start it with `npx vite --port 5175` or edit those lines. `smoke.mjs` writes screenshots to `./.smoke` (git-ignored, `.gitignore:11-12`).

**Dependence on removed files** (reading the code, not running it):
- `vite build` bundles `src/` and copies `public/` verbatim. Nothing in `src/` imports an image or a data file at build time — every `/images/…`, `/posters/…`, `/cv.pdf`, `/data/*.json` path is a runtime URL string. The only JSON imported by TypeScript is `src/content/route-meta.json` (`seo.ts:15`, `tsconfig.json:10 resolveJsonModule`), which exists. **Build does not fail** with `public/images`, `posters`, `cv.pdf` or `public/data/publications.json` absent.
- `postbuild` (`prerender-routes.mjs`) reads only `dist/index.html` (30) and `route-meta.json` (25-27). Its `swap()` helper (33-38) **throws** ("prerender: no title / description / og:title / og:description / og:url / canonical link found") if any of those tags disappears from `index.html` (currently at 10, 11-14, 21, 22-25, 20, 16). When `index.html` is rewritten for Daniel, keep all six tags in the same attribute order the regexes expect (51-78).
- `public/CNAME` is copied into `dist/` and becomes the Pages custom domain (`pages.yml:45-47`).
- At runtime without `public/data/publications.json` / `collaborators.json` (they were absent at the start of this read; untracked copies from the unpatched pipeline appeared at 11:09, see the note at the top): `useJSON` logs a 404 (`useData.ts:86,93`); `Publications.tsx:404` shows "Loading publications…" indefinitely; `Home.tsx:250` `Network` renders nothing; `CollaboratorMap.tsx:109-115` shows "Loading collaborator network…" indefinitely; the rest of the site works. `scholar.json` is optional by design (`useData.ts:131-134`).
- `smoke.mjs` would currently report FAIL: 404 responses are counted as network failures (38-40); `article` count must exceed 20 (92-95); ≥ 2 poster PDFs (108-110); > 100 map paths (114-116). Restore or rewrite those assertions after the data and content change.
- `eslint.config.js:8` ignores `dist` and `public/data`; `.gitignore` also hides `.claude`, `MAINTENANCE.md` and `source-images`.

---

## 8. LICENCE / ATTRIBUTION

- There is **no `LICENSE` file** in either the working copy or the reference copy (`ls | grep -i licen` empty in both). `package.json` has `"private": true` (3) and no `license` field.
- `README.md:64-73` ("About this repository"): "This repository holds the source of the lab website… **You are welcome to read the code or borrow from it. If something here is useful for your own academic site, take it.**" That is an informal permission from the author, not a licence grant with terms; it does not cover his photographs, posters, CV, logo mark or written content, which the task has already removed.
- The original repository is `p-pottier/lab_website` (git import commit message; GitHub profile `https://github.com/p-pottier` at `index.html:68`, `site.ts:47`). `[CONFIRM: the exact repo URL before publishing a link to it]`.

Recommended credit line (Australian spelling), to add in two places:

- `src/components/Footer.tsx`, inside the small-print row after the "Publications and collaborators update automatically…" paragraph (113-144):
  > Site built on the open-source PEACE Lab website by Patrice Pottier (github.com/p-pottier/lab_website), adapted with his permission.
- `README.md`, "About this repository" section:
  > The site is adapted from Patrice Pottier's lab website (https://github.com/p-pottier/lab_website), whose README invites reuse for other academic sites. Design, data pipeline and page structure are his; content, palette and typography are ours.

`[CONFIRM: whether Daniel wants to tell Patrice / ask before the site goes live, and whether the Noble repo itself should carry an explicit licence (e.g. MIT) so the same courtesy is extended onward]`. Both are his calls; the README permission is broad enough for the adaptation but is not a formal licence.
