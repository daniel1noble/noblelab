# Data pipeline report — noblelab-site

Date: 2026-08-28. Working copy: `_admin/drafts/website/noblelab-site/`.
Source of every identity fact: `.claude/context/identity.md`, `content/phase1_critique.md` §0.3 (ORCID 0000-0001-9460-8743), the Google Site's own Scholar link (`w69ezLIAAAAJ`).

## 0. What did not work / needs a decision

- **Nothing failed.** ORCID, OpenAlex, Crossref and Google Scholar all answered; the pipeline exited 0 in 100 s.
- **Four ORCID works carry no DOI** and therefore never reach the site (they cannot be looked up in OpenAlex or Crossref). Add a DOI to each on ORCID and they will appear at the next nightly run:
  - 2017 "Does social environment influence learning ability in a family-living lizard"
  - 2017 "Physiological plasticity in lizard embryos exposed to high-altitude hypoxia"
  - 2016 "Influence of prior contest experience and level of escalation on contest outcome"
  - 2016 "The role of non-genetic inheritance in evolutionary rescue: epigenetic buffering, heritable bet hedging and epigenetic traps"
- **`MAILTO = daniel.noble@anu.edu.au`** is sent to ORCID, OpenAlex and Crossref as the polite-pool contact (and in the User-Agent). It is the address the orchestrator supplied; `[CONFIRM: that this is the address he wants exposed to those three APIs]`.
- **`FIRST_YEAR = 2012`** as instructed. His earliest ORCID-listed paper is 2007 (Genome), so 2007–2011 citations (a few dozen) are simply not plotted. Nothing on the front end currently reads `metrics.json` (`useMetrics` is unused), so this only matters if a citations chart is added.
- OpenAlex totals (7 489 citations, h 40, i10 91) are lower than Google Scholar's (8 761, h 44, i10 100); that is the normal OpenAlex/Scholar gap, not an error. The site shows the higher of the two per paper (`Publications.tsx` takes the Scholar count when larger).

## 1. What changed (diff summary)

`git diff --stat 8ea9c6e -- scripts/ .github/`: `collaborator-info.mjs` +2/−2, `fetch-data.mjs` +104/−55 (approx.), `preprint-merges.json` −3, `scholar_refresh.py` +1/−1. `.github/workflows/*` untouched.

### `scripts/fetch-data.mjs`

| Area | Before (Pottier) | After |
|---|---|---|
| Config | `ORCID 0000-0003-2106-6597`, `MAILTO patrice.pottier@bioenv.gu.se`, `UA PEACE-lab-website/1.0`, `FIRST_YEAR 2020` | `ORCID 0000-0001-9460-8743`, `MAILTO daniel.noble@anu.edu.au`, `UA noble-lab-website/1.0 (mailto:…)`, `FIRST_YEAR 2012`, `OPENALEX_BATCH 50`, `SELF_OPENALEX_IDS {A5028073300, A5140596643}` |
| OpenAlex fetch | `authors?filter=orcid:` → `results[0]` → all works of that author id (cursor paging) | **Removed.** `fetchOpenAlexWorksByDOI(dois)`: `works?filter=doi:a\|b\|c` in batches of ≤50, `encodeURIComponent` per DOI, 200 ms between calls. The author route returns two records for this ORCID, and the larger one carries another Daniel Noble's 1846–1968 psychiatry papers, datasets and peer reviews (see `adaptation_map.md` §6). |
| Spine | Union of OpenAlex-author works ∪ ORCID DOIs; nothing filtered on `onOrcid` | **ORCID is the spine.** `byDoi` is seeded from ORCID only; OpenAlex records are attached to those DOIs; an OpenAlex hit whose DOI is not on ORCID is logged and ignored. ORCID entries without a DOI are listed in the log. |
| `isSelf` | surname `pottier` + first token `/^(patrice\|p\.?)$/i` | ORCID match, **or** surname `noble` + first token `/^(daniel\|d\.?\|d\.?w\.?a?\.?)$/i`. Tested with `node -e`: matches "Daniel W. A. Noble", "Daniel W.A. Noble", "Daniel W A Noble", "Daniel Noble", "Daniel WA Noble", "D. W. A. Noble", "D.W.A. Noble", "D W A Noble", "D. NOBLE", "DWA Noble"; rejects "Daniela Noble", "Dan Noble", "Mark D. Noble", "Daniel Nobles", "Donald Noble", "David Noble", "J. Noble". Only "Noble, Daniel" (surname-first) would miss, and neither API emits that form. |
| Exclusions (`isExcluded`) | supplementary files, CRAN, Zenodo, figshare, Crossref dataset/software/component/peer-review/grant, OpenAlex dataset/libguides/peer-review/grant, figshare/zenodo "journal", The Conversation, EGU abstracts | Same, plus titles starting `data and code for`, `data for`, `code for`, `raw data for` → "data/code deposit". ("Supplementary material from …" and figshare DOIs were already covered.) |
| Preprint test (`isPreprintish`) | any Crossref `posted-content` counted as a preprint | `posted-content` counts only when the DOI prefix is a preprint server: `PREPRINT_SERVER = /^10\.(32942\|64898\|1101\|22541\|31219\|31222\|7287)\//` (EcoEvoRxiv, openRxiv/bioRxiv, Authorea, OSF ×2, PeerJ Preprints). OpenAlex/ORCID `preprint` type and journal-name test unchanged. A `posted-content` record kept as an article is logged with `!`. |
| Author names | as delivered | `tidyName()` collapses runs of whitespace, including the non-breaking spaces Crossref put in one "Daniel W. A. Noble" (would otherwise have shown as `Daniel\xa0W.\xa0A. Noble` in the author line). |
| Collaborators | `buildCollaborators(oaWorks, author.display_name)`; skipped self by display-name equality or ORCID | `buildCollaborators(oaWorks)` over the ORCID-DOI works only; skips self by OpenAlex author id, ORCID, or `isSelf` name test. |
| Metrics | `citations`, `hIndex`, `i10Index` from the OpenAlex author record | Computed from the ORCID-listed works' `cited_by_count` (the author record's 8 018 includes misattributed papers). `citationsByYear` still summed from `counts_by_year`, years ≥ `FIRST_YEAR`. |
| Header comment | — | Explains why the author route is avoided. |

Unchanged: `getJSON` (retries, UA header), Crossref lookup (350 ms polite delay), `findPublishedVersion` (bibliographic search with ≥3 shared authors, ≥60 % coverage, Dice ≥0.3), local title match (Dice ≥0.75, ≥3 shared authors), de-duplication on sorted title tokens, Altmetric (skipped without `ALTMETRIC_KEY`), output shapes.

### `scripts/preprint-merges.json`
Removed the three Pottier-only pairs (`10.32942/x2sp92`, `10.31222/osf.io/n3cta`, `…/n3cta_v2`). Kept `_comment`. **One pair kept**, verified against the Crossref records the script fetches:

| Preprint | Article | Evidence |
|---|---|---|
| `10.22541/au.164573834.49438532/v1` "Developmental plasticity in thermal tolerance is insufficient to compensate for rising temperatures: a meta-analysis" (Authorea, 24 Feb 2022) | `10.1111/ele.14083` "Developmental plasticity in thermal tolerance: Ontogenetic variation, persistence, and future directions" (Ecology Letters, 25 Aug 2022) | Identical seven-author list in the same order: Pottier, Burke, Zhang, Noble, Schwanz, Drobniak, Nakagawa. Both DOIs are on his ORCID. Retitled in review, so neither the title match nor the Crossref search finds it; the manual pair now merges it (log line "manual list"). |

No other pair added. The dry run's "Interpreting prediction intervals…" ×3 and "Maternal investment and early thermal conditions…" preprints were OpenAlex-author-record works **not on ORCID**; with ORCID as the spine they never enter the pipeline (the published *Maternal investment…* article `10.1093/beheco/arae035` is on ORCID and is included as an article). The only remaining preprint, `10.64898/2026.07.16.738378` (July 2026), has no journal version in Crossref yet (searched by title; top hits unrelated).

### `scripts/scholar_refresh.py`
`SCHOLAR_ID = "w69ezLIAAAAJ"`. Docstring warning about Scholar blocking retained verbatim.

### `scripts/collaborator-info.mjs`
`MAILTO`/`UA` changed to the Noble strings. It still uses `authors?filter=orcid:` → `results[0]` for *lab members'* affiliations; that is a dev-time helper for `src/content/site.ts`, not part of the nightly pipeline, and the ambiguity documented above is specific to Daniel's record. Left as is.

### `.github/workflows/`
`refresh-data.yml`: `actions/setup-node@v4` with Node 20, `run: node scripts/fetch-data.mjs`, commits `public/data` if changed. The script uses only `fetch` and `node:fs/promises` (Node ≥18), so no change. Local run used Node 26.7.0. `pages.yml`: `git diff 8ea9c6e` is empty. No secrets added; `ALTMETRIC_KEY` remains an optional repository secret.

## 2. Run log (`node scripts/fetch-data.mjs`, 13:15, 100 s)

```
Fetching ORCID record…
  136 works listed on ORCID
  4 ORCID entries carry no DOI and cannot be looked up:
    ? 2017 Does social environment influence learning ability in a family-liv
    ? 2017 Physiological plasticity in lizard embryos exposed to high-altitud
    ? 2016 Influence of prior contest experience and level of escalation on c
    ? 2016 The role of non-genetic inheritance in evolutionary rescue: epigen
  132 distinct DOIs on ORCID
Fetching OpenAlex records for the ORCID DOIs…
  132/132 DOIs found in OpenAlex
Fetching Crossref metadata…
  132/132 matched in Crossref
  excluded 0 non-publication records
  125 articles, 7 preprints before merging
Resolving preprints against Crossref…
    merged: Extreme Heat as the New Normal: A Methodologic -> Integrative And Comparative Biology (Crossref search, 7 shared authors)
    merged: Temperature variability does not influence phe -> Ecology Letters (Crossref search, 9 shared authors)
    merged: Fluctuating salinity during development impact -> Journal of Animal Ecology (same title, 5 shared authors)
    merged: Developmental plasticity in thermal tolerance  -> Ecology Letters (manual list)
    merged: Maternal behavioural thermoregulation facilita -> Evolution Letters (same title, 6 shared authors)
    merged: Sex and Power: sexual dimorphism in trait vari -> eLife (same title, 11 shared authors)
  recovered 1 published articles missing from both sources:
    + 2026 Integrative And Comparative Biology: Extreme Heat as the New Normal: A Methodological Roadmap I
  1 works remain unpublished preprints
    · 2026 A flexible modelling framework for estimating thermal tolerance an
Fetching Altmetric scores…
  altmetric: skipped (no ALTMETRIC_KEY set)
Building collaborator list…
  419 co-authors across 29 countries

Wrote 126 articles and 1 preprints. h-index 40, 7489 citations.
EXIT 0
```
Full log: scratchpad `pipeline_run3.log`. (`10.1371/journal.pbio.3003653`, missing from OpenAlex when `adaptation_map.md` was written, is now indexed: 132/132.)

Scholar refresh (`scholar_venv/bin/python scripts/scholar_refresh.py`, 13:13): **succeeded** — "139 publications, 8761 citations, h-index 44"; the resulting `scholar.json` is byte-identical in content to the one fetched at 11:48 (same day).

## 3. Verification (python over `public/data/*.json`, all PASS)

`publications.json` — updated 2026-08-28, **127 entries**: 126 articles, 1 preprint.
- Year range **2007–2026**, nothing before 2000, every entry has an integer year. Histogram: 2007 1, 2009 1, 2010 1, 2012 4, 2013 4, 2014 5, 2015 2, 2016 3, 2017 7, 2018 16, 2019 5, 2020 9, 2021 16, 2022 9, 2023 11, 2024 10, 2025 15, 2026 8.
- **Every entry has exactly one `isSelf: true` author.** Self-name variants seen: "D W A Noble", "D. W. A. Noble", "Daniel W A Noble", "Daniel W. A. Noble", "Daniel W.A. Noble", "Daniel WA Noble". No non-self author with surname Noble.
- No title starting "Data and code for" / "Data for" / "Code for" / "Supplementary material from" / "Raw data for"; no `10.6084/m9.figshare` DOI.
- DOIs unique; `id` = `doi`; `url` = `https://doi.org/<doi>`; no empty author list; no non-breaking spaces in names; every article names a journal.
- 6 articles carry a `preprintUrl` (listed in the log above). 95 flagged open access with an `oaUrl`; 24 have no abstract (OpenAlex has none).
- 7 entries with 0 citations, all 2025–2026 (expected for new papers).
- Top cited: PRISMA-EcoEvo 2021 (693), Meta-evaluation of meta-analysis 2017 (576), Methods for testing publication bias 2021 (476).
- Scholar title-key matches: **121/127**. The six with no Scholar match (Scholar titles differ slightly, so those six show the OpenAlex count only): `10.1111/2041-210x.14152`, `10.1093/evlett/qrac002`, `10.1002/ecy.3490`, `10.1002/jrsm.1424`, `10.1111/mec.14031`, `10.1111/bij.12610`.
- All 10 DOIs referenced from `src/content/site.ts` (`THEME_PAPERS` → `HIGHLIGHTED_DOIS`) exist in `publications.json`.

`metrics.json` — `citations 7489`, `hIndex 40`, `i10Index 91`, `works 127`, `articles 126`, `preprints 1`, `firstAuthor 20`, `coAuthors 419`, `countries 29`, `orcid 0000-0001-9460-8743`, `citationsByYear` 2012 → 2026 (15 points; 2012: 8 … 2025: 1371, 2026: 1008 year-to-date). Counts agree with `publications.json` and `collaborators.json`.

`collaborators.json` — 419 people, 29 countries, 161 institutions; 416/419 geocoded, 3 without a country. **No entry for Daniel Noble** by name or ORCID. Top countries: Australia 183, United States 52, United Kingdom 38, Sweden 22, Germany 21. Top co-authors: Shinichi Nakagawa 45, Martin J. Whiting 32, Malgorzata Lagisz 28.

`scholar.json` — `scholarId w69ezLIAAAAJ`, 8 761 citations, 7 223 (5 y), h 44, i10 100, 139 titles.

## 4. Excluded records

**This run: none.** The ORCID record is already curated to papers, so the exclusion rules found nothing to drop among the 132 DOIs. The rules stay in place as a guard for whatever gets added to ORCID later.

For the record, the earlier dry run (author-record route, 248 DOIs) excluded 54 records — 16 figshare deposits, 20 Crossref peer-review "Author response" items, 9 Zenodo deposits, 4 supplementary files, 3 CRAN package deposits (metadat, metaDigitise, freqTLS), 1 The Conversation article — and still left 10 unpublished "preprints" including "Data and code for: Plasticity takes the lead…" and three copies of "Interpreting prediction intervals…". None of those DOIs is on ORCID, so none now enters. Dry-run log: scratchpad `dryrun/fetch-data.log`.

## 5. Remaining preprints

| Year | DOI | Title |
|---|---|---|
| 2026 | `10.64898/2026.07.16.738378` | A flexible modelling framework for estimating thermal tolerance and sensitivity (Noble, Arnold, Nakagawa, Pottier) |

When it is published, add the DOI to ORCID; the nightly run will merge it by title, or add a pair to `preprint-merges.json` if it is retitled.

## 6. Gaps

1. Four ORCID entries without DOIs (§0) are absent from the site.
2. `MAILTO` address to confirm (§0).
3. 2007–2011 citations are outside the `FIRST_YEAR = 2012` series (§0).
4. Six papers lack a Scholar title match and show OpenAlex counts only (§3).
5. Articles recovered through preprint merging that are not themselves on ORCID (currently one: `10.1093/icb/icag045`, Integrative and Comparative Biology 2026) contribute no co-authors to the collaborator map and no citations to `metrics.json` — pre-existing behaviour; adding the article DOI to ORCID fixes it.
6. Altmetric scores are off (no `ALTMETRIC_KEY`), as in the original.
7. `collaborator-info.mjs` still uses the OpenAlex author route for lab members' affiliations; harmless for the site build, noted only.

## Files owned and touched

- `noblelab-site/scripts/fetch-data.mjs` (patched; this session added `tidyName`)
- `noblelab-site/scripts/preprint-merges.json` (Pottier pairs removed; one verified pair kept)
- `noblelab-site/scripts/scholar_refresh.py` (`SCHOLAR_ID`)
- `noblelab-site/scripts/collaborator-info.mjs` (`MAILTO`, `UA`)
- `noblelab-site/public/data/publications.json`, `metrics.json`, `collaborators.json` (regenerated 13:15), `scholar.json` (refreshed 13:13)
- `.github/workflows/refresh-data.yml`, `pages.yml` — checked, unchanged
- this report
