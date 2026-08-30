# Noble Lab Google Site — content extraction report

Date: 2026-08-28. Agent extraction; nothing here has been checked by Daniel.

Outputs (all under `_admin/drafts/website/content/`):

| File | What |
|---|---|
| `google_site_content.json` | every hand-written text item on the seven pages, verbatim, each with a `source` HTML file |
| `gs_images/` | 86 image files (89 image slots on the site; 3 are byte-identical duplicates saved once) |
| `gs_images/manifest.json` | one record per image slot: file, page, nearest heading/caption/alt, `subject` (from the HTML only), pixel size, plus `observed_by_agent` (my visual description, not a source fact) |
| this file | what worked, what did not, every external link with its HTTP status, gaps |

Sources read: the seven rendered pages archived in the scratchpad (`noblelab.html`, `gs_people.html`, `gs_research.html`,
`gs_publications.html`, `gs_software.html`, `gs_research-photos.html`, `gs_meta-analysis-workshop.html`),
`ANU_Website/biography.docx` (via `pandoc -t plain`) and `.claude/context/identity.md`.

## 1. What did not work, or needed a workaround

1. **Image URLs in the archived HTML had expired.** Google Sites serves images from `lh3.googleusercontent.com/sitesv/…` with a
   per-page-load token that dies within a few minutes; every archived URL returned Google's 403 page regardless of size suffix.
   Workaround: each page was re-fetched live from `https://sites.google.com/view/noblelab/<page>` and its images downloaded
   immediately, one page at a time, with the `=s0` (original size) suffix. The live pages were diffed against the archived
   ones: text and image order identical on all seven pages (only the per-load YouTube/embed tokens differ). All 89 image
   slots were downloaded; every file verified with PIL and `file`.
2. **Google caps most stored images at 2048 px** on the long side (`=s0` and `=w16383` return the same bytes), so "full
   resolution" means 2048 px for most photos. Exceptions: `people_07_amelia-peardon.jpg` is 7311x6095 (7.9 MB); several
   portraits are tiny (Xingyi Xiu 214x177, Essie Rodgers 225x225, Patrice Pottier 258x259, Pablo Recio 300x281).
3. **Three image slots are byte-identical to another slot** and were saved once: Software banner and Workshop banner = `home_01_banner.jpg`;
   Research Photos slide 30 = `photos_22_fieldwork-uncaptioned.jpg`. `home_09` and `research_03` are also identical files
   (both kept, noted in the manifest). Several Home "Join the Lab" carousel photos are re-encodes of Research Photos lab shots (noted).
4. **The publication list is not in the HTML.** The Publications page is (a) a Google Scholar logo linked to the profile,
   (b) three journal covers, (c) a link card to JEB issue 227(24), and (d) a **BibBase embed**
   `<script src="https://bibbase.org/show?bib=https://bibbase.org/network/files/oxuAnDjKhRevfGxrx&noBootstrap=1&jsonp=1">`.
   The .bib behind it (`https://bibbase.org/network/files/oxuAnDjKhRevfGxrx`, HTTP 200) was not downloaded — it is a
   publication-pipeline input, not site copy. Worth grabbing when the ORCID/Crossref pipeline is set up.
5. **The workshop material is an iframe**, not text: a whole-page embed of `https://daniel1noble.github.io/meta-workshop/`
   (aria-label "Whole page embed, Introduction to Meta-Analysis in Comparative Physiology"). Only the one intro sentence is site copy.
6. **Social icons were skipped** (three `xbGufb` icon images with alt text `X`, `Link`, `GitHub`, repeated on every page).
   Their target URLs are recorded in the JSON.
7. **Link checking with curl is only partly meaningful**: Wiley, Cell, PNAS, Science and ResearchGate return 403 to any
   non-browser client (see table). Those links are not necessarily broken; they need a browser check.
8. **Scholar ID / ORCID.** Scholar user `w69ezLIAAAAJ` is on the site. ORCID is not on the site at all; it is left as `[CONFIRM]`
   (the website plan of 2026-08-28 records 0000-0001-9460-8743 — Daniel to confirm).

## 2. What was captured (counts)

| Page | Text captured | Images |
|---|---|---|
| Home | title, tagline, 2 intro lines, 3 sections (Research Systems, Research Questions, Join the Lab!) each with 2 lines and a button, 1 captioned photo, 1 YouTube embed, Follow-us links | banner + 17 carousel slides (captions hidden) + 1 photo = 19 |
| Research | "What we do?" + 5 paragraphs; 4 themes, 1 paragraph each, 18 cited papers with URLs (one paper cited twice) | banner + 9 carousel slides = 10 |
| People | PI (name, title, email, 3 bio lines); 3 groups, 12 members with years and bios verbatim | banner + 12 portraits = 13 (Aidan Lowe has no photo) |
| Publications | Scholar link, JEB issue link, BibBase embed; no list text | 5 (Scholar logo, 3 covers, JEB link thumbnail) |
| Software | intro line; 3 packages (name, description, URL); 2 YouTube embeds | banner (= home banner) + 3 logos/figures |
| Research Photos | Fieldwork (3 lines), Lab facilities (3 lines); 36 slides, 13 with captions | banner + 27 + 9 = 37 |
| Meta-analysis Workshop | 1 sentence + iframe link | banner (= home banner) |

Embedded videos (titles from iframe `aria-label`): `2f80ttu9vdg` "How Evolution Meets Ecology: A/Prof Daniel Noble on
Biodiversity and Climate Change" (Home); `b9KvRsO8SPY` "ESMARConf2023: {shinyDigitise} tutorial" and `VhDrH2weyAk`
"Scraping the data from graphs with {metaDigitise}" (Software).

Verification: every text string in the JSON was mechanically checked to occur verbatim in its source HTML (0 mismatches).

## 3. Ambiguities and judgement calls (all flagged in the JSON `note` fields)

- **Carousel ↔ heading.** On Home and Research the carousels carry no captions; each is attributed to the heading in the same
  column by document order. Plausible from the layout, not stated by the site.
- **Caption ↔ slide** on Research Photos: the carousel lists 27 slide divs then 27 caption spans (9 and 9 for the lab carousel);
  matched by order. Captions verbatim: "Painted Dragon", "Unhappy Sleepy Lizard", "Sand Monitor", "Pygmy Bluetounge" (sic),
  "Maria Island, Tasmania", "Sleepy lizard", "Pablo tending the eggs", "MOre lizard enclosures" (sic), "Amelia with some eggs",
  "Lizard lab" (x2), "Dr. Kar doing experiments". 23 slides have no caption.
- **Amelia Peardon / Aidan Lowe** share a column: one image precedes Amelia's entry, none precedes Aidan's. Image assigned to Amelia.
- **Pablo Recio** sits under "PhD Students" with years "(2022-2025)"; **Xingyi Xiu** (2023-2024) and **Amelia/Aidan** (2024-2025)
  under "MSc/Honours Students" — current vs past status is Daniel's call.
- **Title/email** for the PI are two adjacent spans with no separator (renders "Associate Professordaniel.noble@anu.edu.au"); split.
- **Kris Wild** bio renders "extraordinaireand" (two spans, no space) — kept verbatim, noted.
- **Roles** per member are derived from the group heading; the site has no per-person role text.
- **Journal covers** on the Publications page have no alt text; identified from the artwork itself in `observed_by_agent`
  (Science Advances 13 May 2022; J. Evol. Biol. 34(3) 2021; JEB 227(24) Dec 2024; Evolutionary Ecology 36(2) 2022).

Typos on the site, kept verbatim in the JSON (fix when rewriting): "Principle Investigator", "challanges", "Pygmy Bluetounge",
"MOre", "BIology", "shinyDigise", "reciprocol", "genetic adaption", "an individuals life cycle", "Radsmera et al. 2020"
(the linked paper's first author is Radersma), "we've have the privilege", "I aim testing".

Citation details worth checking against the DOI before reuse: Whiting et al. 2022 is cited as "eabn2414" but linked to
`sciadv.abn2415`; Crino et al. is cited as "2022" with volume "227 (24)" (that issue is December 2024); Noble et al. 2018
Biological Reviews page range "72-79"; Noble et al. 2025 Functional Ecology page range "1141-1317".

## 4. External links and HTTP status

`curl -sI -o /dev/null -w '%{http_code}' -L --max-time 15` (HEAD). Where HEAD gave 403/404/000 a GET with a Chrome
user-agent was also tried (second column).

| HEAD | GET | URL | Where |
|---|---|---|---|
| 200 | | https://study.anu.edu.au/stories/why-canberra-best-city-world-quality-life | Home, "fantastic place to live" |
| 200 | | https://x.com/DanielWANoble | Follow us |
| 404 | 200 | https://bsky.app/profile/danielwanoble.bsky.social | Follow us (HEAD 404 is bsky's SPA; public API confirms handle, displayName "Daniel Noble") |
| 200 | | https://github.com/daniel1noble | Follow us |
| 403 | 403 | https://www.researchgate.net/profile/Pablo-Recio | People, Pablo "here" (ResearchGate blocks non-browsers) |
| 200 | | https://ecoevorxiv.org/repository/view/9667/ | Research, Noble et al. 2025 preprint |
| 403 | 403 | https://onlinelibrary.wiley.com/doi/full/10.1111/gcb.70315 | Research, Arnold et al. 2025 |
| 403 | | https://onlinelibrary.wiley.com/doi/full/10.1111/ele.14083 | Research, Pottier et al. 2022 |
| 200 | | https://academic.oup.com/evlett/article/8/1/172/7455738?login=false | Research, Urban et al. 2024 |
| 403 | | https://onlinelibrary.wiley.com/doi/abs/10.1111/brv.12333 | Research, Noble et al. 2018 |
| 403 | | https://www.cell.com/trends/ecology-evolution/abstract/S0169-5347%2820%2930354-2 | Research, Koch et al. 2021 |
| 200 | | https://link.springer.com/article/10.1007/s10682-022-10160-1 | Research, Kar et al. 2022 |
| 200 | | https://journals.biologists.com/jeb/article/227/24/jeb249234/363429 | Research, Crino et al. |
| 403 | 403 | https://www.pnas.org/doi/abs/10.1073/pnas.1821066116 | Research, Noble et al. 2019 (cited twice) |
| 200 | | https://academic.oup.com/evlett/article/4/4/360/6697532?login=false | Research, Radsmera et al. 2020 |
| 403 | | https://www.science.org/doi/full/10.1126/sciadv.abn2415 | Research, Whiting et al. 2022 |
| 403 | | https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/1365-2435.70031 | Research, Noble et al. 2025 Func Ecol |
| 200 | | https://journals.biologists.com/jeb/article/225/Suppl_1/jeb243225/274278/Meta-analytic-approaches-and-effect-sizes-to | Research, Noble et al. 2022 |
| 403 | | https://www.cell.com/action/doSearch?type=quicksearch&text1=New+Horizons&field1=AllField&journalCode=tree&SeriesKey=tree | Research, Pottier et al. 2024 (a search-results URL, not the article — replace with the DOI) |
| 403 | | https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.14152 | Research, Nakagawa et al. 2023 |
| 403 | | https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/2041-210X.13724 | Research, Nakagawa et al. 2022 |
| 403 | | https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/2041-210X.13755 | Research, O'Dea et al. 2022 |
| 200 | | https://scholar.google.com.au/citations?user=w69ezLIAAAAJ&hl=en | Publications |
| 200 | | https://journals.biologists.com/jeb/issue/227/24 | Publications link card |
| 200 | | https://bibbase.org/show?bib=…oxuAnDjKhRevfGxrx&noBootstrap=1&jsonp=1 | Publications embed |
| 200 | | https://bibbase.org/network/files/oxuAnDjKhRevfGxrx | the .bib behind the embed |
| 200 | | https://daniel1noble.github.io/orchaRd/ | Software |
| 200 | | https://github.com/daniel1noble/metaDigitise | Software |
| 200 | | https://github.com/EIvimeyCook/shinyDigitise | Software |
| 200 | | https://daniel1noble.github.io/meta-workshop/ | Workshop embed |
| 200 | | https://www.youtube.com/watch?v=2f80ttu9vdg | Home video |
| 200 | | https://www.youtube.com/watch?v=b9KvRsO8SPY | Software video |
| 200 | | https://www.youtube.com/watch?v=VhDrH2weyAk | Software video |
| 000 | 000 | http://nobledan.com | biography.docx (no DNS record — lapsed) |
| 200 | | https://sites.google.com/view/noblelab/home | the site itself |

Internal links (`/view/noblelab/research`, `/research-photos`, `/software`, `mailto:daniel.noble@anu.edu.au`) were not checked.

## 5. Gaps — for Daniel

1. `[CONFIRM: ORCID iD]` — not on the site.
2. `[CONFIRM: current title]` — identity.md marks "Associate Professor; ARC Future Fellow; Lab Leader" as unverified; the site says
   "ARC Future Fellow (2023–2027) and Associate Professor".
3. Status of Pablo Recio (listed as PhD student, 2022-2025), Xingyi Xiu (2023-2024), Amelia Peardon and Aidan Lowe (2024-2025): current or alumni?
4. Aidan Lowe has no photo; is one wanted?
5. Confirm the Amelia Peardon photo assignment (by position only).
6. Subjects of the 23 uncaptioned gallery slides and the 26 Home/Research carousel slides (figure sources, photo locations, species).
7. Who/what is in `home_14` (group under a "Riddle Room Canberra" sign) and `home_19` (five people at the ASH 2025 meeting) — names if they are to be captioned.
8. The BibBase .bib file — reuse it, or rely on ORCID/Crossref?
9. Whether the three YouTube videos and the meta-workshop embed carry over to the new site.

## 6. Working files (scratchpad, not for filing)

`/private/tmp/claude-501/-Users-noble-Library-CloudStorage-Dropbox-ANU/92180328-e7d1-4f49-b8da-a7a06698844e/scratchpad/`:
`*_live.html` (fresh page copies used for image download), `*.walk.txt` (ordered text/image dump per page),
`walk.py`, `download2.py`, `build_content.py` (regenerates the JSON and re-runs the verbatim check), `link_status.txt`, `sheet_*.jpg` (contact sheets).
