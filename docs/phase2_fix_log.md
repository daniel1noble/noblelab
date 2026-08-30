# Phase 2 fix log — review defects applied to noblelab-site

Date: 2026-08-28. Fix agent, acting on the three reviewer audits (visual,
facts, code). Rule applied: factual defects are reverted to source wording or
removed, never rephrased; taste-only minors are skipped and listed.

After the edits: `npm run lint`, `npm run typecheck` and `npm run build`
(including the postbuild prerender of 10 routes, noindex 404 and sitemap) all
pass with no warnings. All 24 screenshots in `content/screenshots/` were
retaken from `vite preview` on port 4173 with headless Chrome (same cdp.mjs /
menu.mjs method and sizes as the integration pass) and inspected. Committed as
"Apply review fixes".

## Defects and what was done

| # | Severity | File | Defect | Outcome |
|---|---|---|---|---|
| 1 | major (visual + facts) | `src/components/Footer.tsx`, `README.md` | Credit line claimed the design was adapted "with permission" from "Patrice Pottier's PEACE Lab site"; no source records permission being sought or given, and the lab name is not in any source. | **Fixed.** Both now read "Site design adapted from Patrice Pottier's lab website (github.com/p-pottier/lab_website)." README keeps its second sentence ("The page structure, motion and data pipeline are his; the content, palette and typography are ours."). "with permission" can be restored once Daniel confirms he has asked Patrice (plan line 40: "drop him a note"). |
| 2 | major (visual) | `src/pages/Home.tsx` | "Latest papers" author lines garbled: `line-clamp-3` on a `flex-1` paragraph made WebKit paint partial lines under the ellipsis. | **Fixed.** `flex-1` moved from the `<p>` to a wrapping `<div>` (cards stay equal height). The same pattern in the research-theme cards (`line-clamp-4 flex-1`) was treated identically as a precaution. Verified in the new `home-desktop.png`: card 1 ends "Steven J...." cleanly, card 4 "Julianne O'Reill..." with no sliced glyphs. |
| 3 | major (code) / minor (visual) | `src/components/LogoMark.tsx`, `src/content/site.ts`, `src/pages/Home.tsx` | `/images/logo-mark.png` referenced in the header of every page and the home hero but does not exist: a 404 per page load and a reserved-then-collapsed 190-300 px in the hero. | **Fixed** by gating: `export const LOGO_MARK: string \| null = null` added to `site.ts`; `LogoMark` returns `null` while it is null and otherwise uses it as `src`. No request and no layout shift until a file exists. When a mark is drawn, drop it at `public/images/logo-mark.png` and set `LOGO_MARK` to that path (the `onError` self-removal is kept). `scripts/make-favicon.mjs` still expects the file; unchanged. |
| 4 | minor (facts) | `public/images/manifest.json` (2 entries, copied into `dist/images/manifest.json`) | Alt text for gallery-29 named Daniel Noble by face and inferred "escape-room outing". | **Fixed.** Both alts now describe only what is visible: "Seven people standing in front of a Riddle Room Canberra sign, two of them holding small signs" (checked against the image). The `notes` field still carries "[CONFIRM: date, who is pictured, and consent to publish]". The two gallery-29 files remain on disk and unreferenced by `site.ts` (not deleted, per instructions); see gaps. |
| 5 | minor (visual + facts) | `src/content/site.ts` (Dr. Kris Wild) | "extraordinaireand" carried over from two adjacent spans with no space on the Google Site. | **Fixed** as a permitted markup-artefact typo: "Microclimate modeller extraordinaire and sex-reversal whisperer." with the inline `// typo fixed:` comment matching the other five. Verified in `people-desktop.png`. Daniel to confirm he is happy with the fix. |
| 6 | minor (visual) | `src/pages/Teaching.tsx` | Workshop iframe fixed at 70vh cropped the external page on desktop and showed as a blank white ~590 px block on mobile. | **Fixed.** Wrapper is now `hidden md:block` (the "Open in new tab" button covers phones); iframe is `h-[80vh] min-h-[640px]`. Verified: desktop frame ~720 px, mobile shows the card with the button only. The overlap inside the frame (forest-plot figure over the "maintained by" line) is the external site's own responsive CSS and cannot be fixed here. |
| 7 | minor (code) | `src/pages/Teaching.tsx` | Iframe lacked `referrerPolicy` unlike the YouTube embeds. | **Fixed.** Added `referrerPolicy="strict-origin-when-cross-origin"`. No `sandbox` added (Daniel's own GitHub Pages site; a sandbox would need `allow-scripts allow-same-origin allow-popups` to run it). |
| 8 | minor (code) | `src/pages/Gallery.tsx` | Lightbox had no Tab focus trap. | **Fixed.** The dialog now carries a ref; the keydown handler cycles Tab / Shift+Tab among the dialog's focusable buttons (close, previous, next) and pulls focus back in if it has escaped. Escape, arrows, scroll lock and focus return are unchanged. |
| 9 | minor (code) | `src/lib/useData.ts` | `Metrics` type declared `source`, `software` and `worksByYear`, none written by `fetch-data.mjs`; `useMetrics()` unused. | **Fixed** by aligning the type with what the pipeline writes (`sources: string[]`; `software` and `worksByYear` removed; doc comment added). `useMetrics()` is kept as the typed accessor for `metrics.json` (still unused by any page). |
| 10 | minor (code) | `src/content/palette.ts`, `tailwind.config.cjs` | `OLD_TO_NEW` migration table and config comments still held every old-palette hex. | **Fixed.** `OLD_TO_NEW` (53 lines) and the retint remark on `TERRACOTTA_DARK` deleted; the "Previous values" / "old ramp" comment block removed from `tailwind.config.cjs`. `grep` for the old hexes across `src`, `public/favicon.svg`, `index.html`, `tailwind.config.cjs` and `scripts` now returns nothing. (`content/palette_spec.md` and `adaptation_map.md` still describe the table as documentation.) |
| 11 | minor (code) | `src/pages/Publications.tsx` | Highlight card used `href={pub.url ?? "#"}`. | **Fixed.** Now mirrors the list card: link when `pub.url` exists, plain title otherwise. |
| 12 | minor (code) | `scripts/*.mjs` importing `playwright` | Five optional scripts need an undeclared, uninstalled dependency. | **Fixed by documenting**, not by adding a dependency: README "How the data refresh works" now notes the five scripts need `npm i -D playwright && npx playwright install chromium` and that build, lint and the workflows do not. `package.json` untouched so `package-lock.json` and the workflows stay as they are. |
| 13 | minor (visual) | `src/pages/Software.tsx`, `src/pages/Home.tsx` | YouTube embeds blank in the captures (home video, shinyDigitise). | **No change needed.** Re-captured with a 12 s wait after scrolling the embed into view: the home "How Evolution Meets Ecology" player and the shinyDigitise (ESMARConf) player both paint. The blanks were screenshot timing, not lazy-loading or dead ids. `loading="lazy"` kept on all three. (Opening an embed URL directly in a browser tab shows YouTube "Error 153"; that is YouTube refusing embeds without a referring page and is not a site defect.) |
| 14 | minor (facts) | `index.html`, `route-meta.json`, `README.md`, `public/CNAME`, `robots.txt` | noblelab.org is not registered (NXDOMAIN). | **No code change** (documented decision, not an invented fact). Daniel must register the domain and add the DNS records in `2026-08-28_domain_setup_noblelab-org.md` before deploying; if he picks another domain, update `siteUrl` in `route-meta.json`, `index.html`, `README.md` and `public/CNAME` together. |
| 15 | minor (visual) | `src/content/site.ts` (Pablo Recio) | Bio ends "...find out more about my research here." with "here" no longer a link. | **Skipped — Daniel's call.** The sentence is verbatim from the Google Site; making "here" a link would need inline-link support in bios, and the ResearchGate link already renders as a button under the portrait. Options: leave as is, or trim the final sentence with a "typo fixed"-style comment. |
| 16 | minor (visual) | `src/pages/Publications.tsx` | Page leans terracotta (counts, chips, DOI links, card borders, active pill). | **Skipped — taste only.** Suggested polish if wanted: citation counts to `PALETTE.sage` or the ARTICLE chip to `PALETTE.ochre`. |
| 17 | minor (visual) | `src/pages/NotFound.tsx` | "404" numeral at `text-gold/25` reads muddy brown. | **Skipped — taste only.** Suggested: `text-gold/40` or the gradient-text treatment used for page titles. |
| 18 | minor (code) | `public/images/gallery-29-lab-outing.jpg` (+ thumb), `people-daniel-noble.jpg`, `research-crickets.jpg` | Unreferenced images shipped in `dist/images`; gallery-29 awaits consent. | **Not deleted** (instructions forbid deleting). Alt fixed (#4). Once Daniel confirms date, who is pictured and consent, add a `lab()` entry for gallery-29 in the Lab section of `GALLERY` in `site.ts`; otherwise remove the two files and their manifest entries. The other two are small and harmless. |

## Files changed

- `README.md`
- `public/images/manifest.json`
- `src/components/Footer.tsx`
- `src/components/LogoMark.tsx`
- `src/content/palette.ts`
- `src/content/site.ts`
- `src/lib/useData.ts`
- `src/pages/Gallery.tsx`
- `src/pages/Home.tsx`
- `src/pages/Publications.tsx`
- `src/pages/Teaching.tsx`
- `tailwind.config.cjs`
- `content/screenshots/*.png` (all 24 retaken)
