# Phase 1 critique — completeness audit of the three website inputs

Date: 2026-08-28. Written by the completeness critic (an agent). Audit only: nothing in `content/`, `noblelab-site/` or Daniel's source folders was modified. Evidence paths are absolute; scratchpad = `/private/tmp/claude-501/-Users-noble-Library-CloudStorage-Dropbox-ANU/92180328-e7d1-4f49-b8da-a7a06698844e/scratchpad`.

Inputs audited:

- Content: `content/google_site_content.json`, `content/content_extraction_report.md`, `content/gs_images/manifest.json` (+ 86 files)
- Photos: `noblelab-site/public/images/manifest.json` (+ 72 files), `content/photo_curation_report.md`
- Code: `content/adaptation_map.md`

## 0. The three things that matter most

1. **The photo agent's "two unnamed lab members" are named by the Google Site, and the two agents never cross-referenced.** The Site's Research Photos caption "Pablo tending the eggs" (`photos_29`) is the same frame as lab-shoot `20230111_Lizards-03284` (`gallery-20-holding-tubs.jpg`), and "Amelia with some eggs" (`photos_34`) is the same frame as `20230111_Lizards-03356` (`gallery-23-researcher-cup.jpg`). `people_07` (the portrait above Amelia Peardon's People entry) shows the same person, same dress, same room. So the 2023 lab-shoot people are, per the Site's own captions, Pablo Recio and Amelia Peardon; the `people_07 = Amelia` assignment is corroborated, not merely positional; and the "consent to publish two unnamed people" gap becomes "confirm names, and that the Site's existing publication of these frames is consent enough". It also raises a date question the agents did not see: the shoot is dated 2023-01-11 (source EXIF/mtime) while the Site lists Amelia as 2024-2025.
2. **`gallery-29-lab-outing.jpg` (IMG_5832.HEIC) is the same photograph as `home_14` in the Google Site's "Join the Lab!" carousel** — already public. Neither report says so. The photo manifest's alt text "Lab members, including Daniel Noble, at an escape-room outing in Canberra" identifies Daniel by face and infers the occasion; neither is from a source, so that alt text should be `[CONFIRM: …]`, not a statement. (Head-count also disagrees: content manifest says eight people, photo report says seven; I count seven.)
3. **Two of the code agent's `[CONFIRM]` gaps are answerable from the other agents' outputs, and a third is corroborated.** Scholar ID `w69ezLIAAAAJ` is on the Google Site (`gs_publications.html`, the Scholar logo link) — not just in the untracked `scholar.json`. ORCID `0000-0001-9460-8743` is corroborated: its public work list contains all 10 DOI-bearing papers cited on the Site's Research page (`orcid_works.json` vs `gs_research.html` hrefs), and `scholar.json`'s titles match those papers. Both still need Daniel's yes, but they are no longer blind guesses.

Everything else below is smaller. The three outputs are, on the whole, accurate and unusually well-cited; the defects are mostly missed cross-references and a handful of over-assertive captions.

## 1. Verified OK

### 1a. Content JSON vs raw HTML (my own greps of the archived pages, not the agent's walk files)

| Check | Result | Evidence |
|---|---|---|
| All 12 members + PI present, names spelt as on the site | OK | each name greps exactly once in `gs_people.html` (Niamh's apostrophe is `&#39;` in the HTML, decoded to `'` in the JSON — correct) |
| Years per member | OK | `(2023 – Present)`, `(2022-Present)`, `(2024-Present)`, `(2022-2025)`, `2024-2025` x3 (Amelia, Aidan, Patrice), `2025-2026`, `2023-2024`, `(2020-2022)`, `(2022-2023)`, `(2019-2020)` all grep once each (Patrice's is bracketed) in `gs_people.html` |
| Group headings incl. the "Principle Investigator" typo | OK | 1 hit each in `gs_people.html` |
| 4 research themes | OK | the 3 long headings grep once each; the 4th ("Predicting the effects of *extreme heat* on organisms") is split across spans because "extreme heat" is italic — JSON text is right, the emphasis is lost (minor, §2) |
| 18 selected publications, URLs | OK | 17 unique external `href`s in `gs_research.html` = the 17 unique URLs in the JSON; PNAS 2019 is cited under two themes, as the JSON says. "Selected Publications" x3 + "Relevant Publications" x1 headings match |
| 3 software packages, names as spelt (incl. `shinyDigise`) | OK | `gs_software.html` |
| 13 gallery captions, verbatim | OK | 11 distinct strings grep with the right multiplicity ("Lizard lab" x2) in `gs_research-photos.html`; no hidden captions exist on Home/Research (0 occurrences of the caption class `Ecdcnc` in `noblelab.html`/`gs_research.html`, 36 in the photos page) so "captions hidden" is right |
| Nothing on the site missing from the JSON | OK | every `TEXT:` line of the seven DOM walks is a substring of the JSON (52 "misses" are all the walk's own `[[ ]]` link markers or empty heading placeholders) |
| Archived vs live pages | OK | walk diffs ignoring ids/urls: 0 lines on six pages, 2 on Publications (the per-load embed token) |
| Words invented | none found | the only non-site text is clearly labelled: `older_bio_2018` (matches `pandoc -t plain ANU_Website/biography.docx`), `standing_details` (matches `.claude/context/identity.md`), the ORCID `[CONFIRM]` (plan file does record 0000-0001-9460-8743) |

### 1b. Google Site images (`content/gs_images/`)

- 89 manifest slots, 86 unique files, 3 duplicate slots exactly as reported (software banner and workshop banner = `home_01_banner.jpg`; lab slide 3 = `photos_22`). `home_09` and `research_03` are byte-identical (md5 `6ed48823…`).
- Every file opens in PIL and `file(1)` reports image data; width/height/bytes/format all match the manifest (0 mismatches).
- `sips`: `people_07_amelia-peardon.jpg` 7311x6095, `people_09_xingyi-xiu.jpg` 214x177, `home_01_banner.jpg` 2048x1174 — as reported. The 2048-px ceiling is real: 60-odd files sit at exactly 2048 on the long side.
- Portrait associations: DOM order is image → name → years → bio for every member except Aidan Lowe (no image), so the positional assignment is sound; for Amelia it is additionally corroborated by the "Amelia with some eggs" frame (§0.1).

### 1c. Photo outputs (`noblelab-site/public/images/`)

- 72 JPEGs on disk = 72 manifest entries; no orphans either way. Width/height/bytes match the manifest for all 72.
- Largest file 400,080 bytes (= the "391 KB" claimed); total 8,554,267 bytes; nothing over 600 KB.
- Pillow: 0 EXIF tags, no ICC profile, mode RGB, no GPS in `info` for all 72.
- Heroes: three at 2400x1600; `hero-lab-shelving.jpg` viewed — shelving with heat lamps sharp on the right, room falling off soft on the left; a good hero with text room. `people-daniel-noble-2025.jpg` is a clean 600x900 studio portrait.
- Sources untouched: every file in `ANU_Lab Photos/` still has its January 2023 mtime, `IMG_5832.HEIC` Sep 2020, profile pictures 2021/2023/Oct 2025.

### 1d. Adaptation map vs the working copy

- Identity greps (`Pottier`, `PEACE`, `gg1rV3IAAAAJ`, `0000-0003-2106-6597`, `patricepottierlab`, plus Gothenburg/Sweden/p-pottier/bioenv/Natrium/wnv4xgu/Thermal Ecology/SORTEE/Jutfelt) hit exactly the files the map lists; nothing missed. `.github/` has none. The only extra hits are `public/data/publications.json` / `collaborators.json`, where "Pottier" is a legitimate co-author name.
- Hex literals: my `grep -nE '#[0-9a-fA-F]{6}'` over `src/` matches the map's §2c list line for line (site.ts 14 accents; Home 25-34/271/388; Publications 12-17/95/143; News 8-15; Opportunities 23-25/44/45; People 87; Outreach 18/231/238/248/289; ui 144/166/197 + the rgba at 106; CollaboratorMap 11-20/120-122/145/152/159/182/186/189; index.css). Three-digit forms: `#000` in the `index.css:136-150` masks (map calls them "pure black, leave") and `bg-[#111]` at `CollaboratorMap.tsx:127` (listed). `favicon.svg`, `make-favicon.mjs:59`, `prepare-logo.mjs:7` listed. Complete.
- Line references spot-checked and correct: `Header.tsx:24,37-43,122-131`, `Home.tsx:83,89`, `Footer.tsx:113,118`, `index.html:104-106`, `CollaboratorMap.tsx:255`, `fetch-data.mjs:35-40,118-120,157-185,303-306,546,566-568,626-634`, App routes 88-96, NAV 8-17, route-meta keys.
- Claims verified: `SITE.acronym/.expansion/.tagline/.shortName` unreferenced; `useMetrics` defined only; `MAIN_COLLABORATORS` referenced only by `collaborator-info.mjs`; no `LICENSE`; README 64-73 wording; `robots.txt:8` sitemap URL; prerender `swap()` throws; ports 5175 in smoke/shot/render-ai; node v26.7.0; no Playwright in `node_modules` or `~/Library/Caches/ms-playwright`.
- OpenAlex/ORCID numbers re-derived from the responses the agent saved in the scratchpad (`oa_authors.json`, `oa_w1.json` + `oa_w2.json`, `orcid_works.json`): 2 author records (A5028073300: 260 works / 8018 citations / h 42; A5140596643: 1 work); 263 works by ORCID filter; 136 ORCID groups (127 journal-article, 7 preprint, 1 book-chapter, 1 other), 132 with DOI; overlap 131, sole miss `10.1371/journal.pbio.3003653`; 7489 citations over the 131; years 2007-2026; type mix includes 20 datasets and 20 peer-reviews. All as stated. The untracked `public/data/` files reproduce the problem: 142 works, years 1847-2026, 76/142 with any `isSelf`, metrics 8018/42/103.
- The patch is specific (exact lines, code given), internally consistent (every `author.` use in `main()` — lines 305, 306, 546, 566-568 — is covered), and the batch-DOI filter is safe for this record: none of the 132 ORCID DOIs contains characters outside `[A-Za-z0-9./_-:]` (7 have upper case; `cleanDOI` lower-cases).

## 2. Defects (file, what, evidence)

### Content agent

| # | File | What | Evidence |
|---|---|---|---|
| C1 | `gs_images/manifest.json` (`people_07`), `google_site_content.json` (Amelia note) | The Amelia photo assignment is flagged as "by position only" when the Site itself corroborates it: `photos_34` is captioned "Amelia with some eggs" and shows the same person/dress/room as `people_07`. Should be recorded as corroborated, still `[CONFIRM]`. | visual comparison, scratchpad `critic_sheet.jpg`; caption in `gs_research-photos.html` |
| C2 | `gs_images/manifest.json` (`home_14`) | `observed_by_agent` says "group of eight people"; I count seven, and the photo agent (same picture, from `IMG_5832.HEIC`) also says seven. | `critic_sheet.jpg` |
| C3 | `content_extraction_report.md` §3, `google_site_content.json` | Not noted that `home_14` = `ANU_Lab Photos/IMG_5832.HEIC` (Sep 2020) and that `photos_29`/`photos_34`/`photos_32`/`home_13`/`home_15-18` are re-encodes of the 2023 lab shoot (`03284`, `03356`, `03308`, …). The report says "several Home carousel photos are re-encodes of Research Photos lab shots" but never links either to the files on disk, which is what the site build needs (use the 9504-px originals, not the 2048-px Google copies). | `critic_sheet.jpg`; source mtimes in `ANU_Lab Photos/` |
| C4 | `google_site_content.json` research theme 1 | Formatting lost: on the site "extreme heat" in the theme heading is italic (`font-style: italic` span in `gs_research.html`). Text is verbatim; only the emphasis is dropped. Minor. | `grep -o 'Predicting the effects of .{0,200}' gs_research.html` |
| C5 | `google_site_content.json` gallery | Caption "Dr. Kar doing experiments" names a person who is not on the People page; if the caption is reused it needs `[CONFIRM: full name]`. Not flagged. | `gs_research-photos.html` |
| C6 | `content_extraction_report.md` §5 | Gap list omits that the PI portrait on the site (`people_02`, outdoor head-and-shoulders, foliage) is very probably `ANU_Profile_Pics/IMG_6889.jpg` (the photo agent describes that file identically). Not pixel-verified by me; matters only if the old portrait is kept. | `critic_sheet.jpg`; `photo_curation_report.md` profile table |

### Photo agent

| # | File | What | Evidence |
|---|---|---|---|
| P1 | `public/images/manifest.json` (`gallery-29-*`) | Alt text asserts "Lab members, including Daniel Noble … escape-room outing in Canberra". Daniel's presence is a face identification (not from any file); "escape-room" is inferred from the "Riddle Room Canberra" sign. The manifest note does say `[CONFIRM: who is pictured]` but the alt text states it as fact. Rewrite as `[CONFIRM: …]` or neutral ("Seven people in front of a 'Riddle Room Canberra' sign"). | `critic_sheet.jpg` |
| P2 | `photo_curation_report.md` ("People" item 5), `manifest.json` alt texts | "Two lab members who are not named in any file" — they are named on the Google Site (Pablo, Amelia; §0.1). All "a researcher" alt texts for `03199/03202/03208/03214/03284/03306/03308/03320/03331/03356/DSC03156/03218/03272` can be re-captioned once Daniel confirms. Also the 2023 shoot date vs Amelia's 2024-2025 listing needs a `[CONFIRM]`. | `gs_research-photos.html` captions; `critic_sheet.jpg` |
| P3 | `photo_curation_report.md` item 6 | Consent framing for `IMG_5832` ignores that the same photo is already published on the Google Site (`home_14`). Should say so; changes the question from "may we publish" to "already public on the old site — carry over?". | as above |
| P4 | `photo_curation_report.md` item 4 | "Lizard eggs … inferred from context" — the Site captions "Pablo tending the eggs" (`photos_29` = the stacked-tub frame `03284`) and "Amelia with some eggs" (`photos_34` = `03356`, holding a cup) are source evidence that those tubs/cups hold eggs. Still `[CONFIRM]`, but not a bare inference. | `gs_research-photos.html` |
| P5 | scratchpad `IMG_5832_full.jpg` | The intermediate HEIC→JPEG conversion in the scratchpad still carries 11 EXIF tags including the GPS IFD. The published output is clean; this working file must not be copied into the site or `_admin/`. | Pillow `getexif().get_ifd(0x8825)` non-empty |
| P6 | `public/images/` | Nine research images vs the 6-8 asked for; no people-page banner. Both self-reported; listed here so they are not lost. | agent report |

### Code agent

| # | File | What | Evidence |
|---|---|---|---|
| K1 | `adaptation_map.md` gaps | "[CONFIRM: Scholar ID]" is answerable from the content agent's output: `w69ezLIAAAAJ` is the Scholar link on the Google Site (`gs_publications.html`, `google_site_content.json` → `links.scholar`). The map cites only the untracked `scholar.json`. | `gs_publications.html` |
| K2 | `adaptation_map.md` §6 | The claim "the authorship on W7168271250 carries `author.id A5140596643` and his ORCID" cannot be re-verified from the saved responses: `oa_w1.json`/`oa_w2.json` were fetched with `select=` (keys: cited_by_count, counts_by_year, doi, id, publication_year, type — no `authorships`). Plausible, unverified. Re-check when the patch is run. | scratchpad `oa_w1.json` |
| K3 | `adaptation_map.md` §6 step 4 | The patch keeps the `console.log` at line 306 semantics but the proposed replacement text drops the citation total from the log; harmless. More important: the patch never says what happens to works in `oaWorks` that OpenAlex returns for a DOI but with a *different* canonical DOI casing/prefix — `cleanDOI` handles case, fine — and to the 1 ORCID DOI OpenAlex lacks (`10.1371/journal.pbio.3003653`): it will get Crossref metadata and 0 citations. The map says this; OK. No defect beyond K2. | `fetch-data.mjs:72-73` |
| K4 | `adaptation_map.md` §7 vs `2026-08-28_lab_website_plan.md` | The plan file says "this Mac has Node 16 at /usr/local/bin, too old for Vite 7"; the map (correctly, today) says v26.7.0 at `/opt/homebrew/bin`. The plan is stale, not the map; flagging so nobody re-installs Node. | `node -v` |
| K5 | `adaptation_map.md` §1 | Coverage complete against my grep; no misses. (Recorded as a non-defect so the check is visible.) | §1d |

## 3. Consolidated open gaps for Daniel

Deduplicated across the three reports and this audit. Items marked ★ were narrowed or partly answered by cross-referencing; they still need his word.

**Identity and links**
1. `[CONFIRM: ORCID 0000-0001-9460-8743 is yours]` ★ — its public work list contains all ten DOI-cited Research-page papers; not on the Google Site itself.
2. `[CONFIRM: Scholar ID w69ezLIAAAAJ]` ★ — it is the Scholar link on the Google Site's Publications page.
3. `[CONFIRM: current title]` — Site: "ARC Future Fellow (2023–2027) and Associate Professor"; identity.md marks the title unverified.
4. `[CONFIRM: email/User-Agent to expose to ORCID/Crossref/OpenAlex in fetch-data.mjs]` (daniel.noble@anu.edu.au was used only for the agent's checks).
5. `[CONFIRM: FIRST_YEAR for the citations series]` (earliest ORCID work 2007) and whether OpenAlex totals (7489 citations / 131 works after the patch; Scholar says 8761 / 139) are shown at all.

**People**
6. `[CONFIRM: current vs past]` Pablo Recio (PhD, 2022-2025), Xingyi Xiu (2023-2024), Amelia Peardon and Aidan Lowe (2024-2025).
7. `[CONFIRM: people_07 is Amelia Peardon]` ★ — corroborated by the Site's "Amelia with some eggs" frame.
8. `[CONFIRM: the two people in the Jan 2023 lab shoot are Pablo Recio and Amelia Peardon]` ★ — per the Site's captions; note the 2023 date vs Amelia's listed 2024-2025.
9. `[CONFIRM: consent/captions for the lab-shoot people and for the Riddle Room group photo]` ★ — both are already on the Google Site (`photos_29/34`, `home_14`); who is in the group photo (seven people; the agents think you are one of them), and the date/occasion (file dated 2020-09-11).
10. `[CONFIRM: names for home_19 (five people, ASH 2025 Coffs Harbour)]` if a named caption is wanted.
11. `[CONFIRM: photo for Aidan Lowe]` — none on the site.
12. `[CONFIRM: "Dr. Kar" full name]` if that gallery caption is reused.
13. `[CONFIRM: usage rights / credit for the Australian Academy of Science portraits (SATS_2025_*.jpg, 2025-09-03)]` — the recommended new portrait.

**Images and captions**
14. `[CONFIRM: subjects]` of 23 uncaptioned gallery slides and 26 Home/Research carousel slides (species, places, and which paper each figure comes from — `home_06-12`, `research_02-10` are all figures).
15. `[CONFIRM: species]` in the lab-shoot lizard frames (03168, 03249, 03304, 03338) and that the tubs/cups hold lizard eggs (Site captions say "eggs"). ★
16. `[CONFIRM: Shutterstock/VectorStock licences allow a website logo mark]`; no SVG exists — the chosen `.eps` must be exported by hand.
17. `[CONFIRM: drop research-enclosures.jpg (nine produced, 6-8 asked); cut a people-page banner from 03218?]`

**Publications and citations on the Research page**
18. `[CONFIRM: citation details]` — Whiting et al. 2022 "eabn2414" vs linked abn2415; Crino et al. "2022" vs JEB 227(24) Dec 2024; Noble et al. 2018 Biol Rev pages "72-79"; Noble et al. 2025 Func Ecol "1141-1317"; Pottier et al. 2024 links to a Cell search page; "Radsmera" → Radersma.
19. `[CONFIRM: reuse the BibBase .bib (https://bibbase.org/network/files/oxuAnDjKhRevfGxrx) or rely on the ORCID pipeline]`.
20. `[CONFIRM: carry over the three YouTube embeds and the meta-workshop iframe]`.

**Code and licence**
21. `[CONFIRM: exact URL of Patrice's repository (p-pottier/lab_website)]`, whether to tell/ask him before go-live, and whether the Noble repo gets an explicit licence.
22. Design decisions the map needs before the colour work is scoped: dark-first as now vs light page; which of Outreach/Opportunities/News to keep; hero lab name/strapline (the PEACE acronym component must be deleted or rewritten).

## 4. Things I could not check

- External link statuses (no web access in this audit); the content agent's table is taken as read.
- OpenAlex authorship details (K2) — saved responses lack `authorships`.
- Whether `people_02` is pixel-identical to `IMG_6889.jpg` (C6) — visual similarity only.
- No `npm run build` was executed here either; the map's build claims remain code-reading claims.
