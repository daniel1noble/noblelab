# Phase 5 fix log — 29 August 2026

Fixes applied to the phase 5 review of the seven changes Daniel asked for on
29 Aug. Commit `d625a6e` ("Apply phase 5 review fixes"), on `main`, **committed
locally and not pushed** — `origin` is the live site.

---

## What I did not fix, first

**1. The affiliation is still stated twice in the home hero.** Not applied —
this is Daniel's call, not mine.

`src/content/site.ts:543` (HOME_INTRO line 2) reads:

> "We are located in the Division of Ecology and Evolution in the Research
> School of Biology at the Australian National University (ANU)"

and the ANU logo caption immediately beneath it (`src/pages/Home.tsx:128-135`,
rendering `SITE.institution` / `SITE.university`) reads:

> "Division of Ecology & Evolution, Research School of Biology /
> The Australian National University"

Request 1 replaced the PI sentence but left the prose affiliation line, so the
same fact now sits twice inside a twelve-line block. Deleting a line of
Daniel's own site copy is not a change I should make on my own judgement.
**Question for Daniel below.**

**2. The collaborator map itself is still small on a phone** (about 350x178 px).
I fixed the two legibility problems around it — see below — but not the map's
own size. The SVG carries a fixed `viewBox` of 980x500 and scales uniformly to
the container width, so a taller box would letterbox the map with empty space
rather than enlarge it. Genuinely enlarging it on a phone needs a separate
mobile projection fit, which is a design change to a component shared with the
People page, not a spacing fix. Left as is and flagged.

**3. The shinyDigitise "blank video panel" needed no code change** — confirmed,
and it is now gone from the screenshots. It was never a site bug. See
"Screenshots" below for what actually caused it.

---

## Fixes applied

### `src/pages/Software.tsx` — hex stickers would have 404'd on GitHub Pages

The hex sticker was the only `<img>` on the site whose `src` bypassed
`publicUrl()`:

```diff
-                src={pkg.hex}
+                src={publicUrl(pkg.hex)}
```

plus the matching import. `src/lib/publicUrl.ts` prefixes `/noblelab/` when the
hostname ends in `.github.io` and `/` otherwise, so without it both stickers
resolved to `https://<user>.github.io/images/hex-*.png` and would have 404'd on
the GitHub Pages fallback URL. Invisible on www.noblelab.org and on localhost,
which is why no screenshot caught it.

Verified in the built bundle: the render site is now `src: Ye(n.hex)` (the
minified `publicUrl`). `grep -rn 'src={' src/` now returns only three
matches, all external iframe URLs (two YouTube embeds and the Teaching
workshop frame), which correctly do not take a site base.

### `src/components/CollaboratorMap.tsx` — legible on a phone

Both changes are scoped below the `sm` breakpoint, so **the desktop home and
People pages are byte-identical**. Confirmed: `home-desktop.png` and
`people-desktop.png` re-shot at exactly their previous heights (5813 px and
6175 px).

- **Stat tiles.** `grid-cols-3` had no responsive variant, so at 390 px the
  three tiles were about 105 px wide and "Co-authors" wrapped onto two lines.
  Now `grid-cols-2 gap-4 sm:grid-cols-3`, with the Countries tile spanning both
  columns below `sm` — two up plus one. All three labels now sit on one line.
- **Legend.** The in-SVG legend scaled with the 980-wide `viewBox`, rendering
  its 11 px type at under 4 px on a phone — a smudge, not text. That `<g>` is
  now `hidden sm:block`, and the same key is restated under the map as real
  HTML type (`sm:hidden`): the caption, a gradient bar built from the same
  `MAP_STOPS` array so the colours cannot drift, and the `1` / `183` endpoints.

Home and People at 390 px both now report `scrollWidth == clientWidth == 390`
— no horizontal overflow introduced.

---

## Screenshots

**All 26 screenshots in `content/screenshots/` now depict the current site.**
Nineteen were re-shot from the current `dist`; the originals are backed up in
the session scratchpad at `screenshots-backup-prefix5/`.

### Re-shot because they predated the footer change (12)

The review was right: these showed a footer with no ANU logo at all. Every one
changed height, which is the proof:

| Page | Desktop before → after | Mobile before → after |
|---|---|---|
| research | 4453 → **4490** | 7406 → **7510** |
| teaching | 1885 → **1922** | 1664 → **1768** |
| contact | 1812 → **1690** | 2934 → **2879** |
| news | 3563 → **3601** | 5274 → **5378** |
| opportunities | 1593 → **1550** | 2155 → **2179** |
| notfound | 1115 → **1152** | 1400 → **1504** |

The fresh `contact-desktop.png` is 1690 px and shows the ANU logo bottom-right
beneath the two link columns, matching request 6.

### Re-shot because the map changed (4)

`home-desktop` and `people-desktop` are unchanged in height (as intended —
the fix is mobile-only). `home-mobile` 7901 → 8068 and `people-mobile`
10665 → 10832, both +167 px, the same delta from the same component.

### Re-shot for the video panel (2)

`software-desktop.png` and `software-mobile.png`. **Both YouTube posters now
render.** The blank panel was a Chrome headless artefact, not a site bug:
`captureBeyondViewport` does not composite out-of-process iframes that sit
below the viewport.

The fix is a capture method, not a code change: measure the page, then resize
the *viewport* to the full page height so every embed is genuinely on screen,
then take a plain viewport screenshot. Script:
`scratchpad/shoot-software.mjs`. This is only safe on a page with no
viewport-height-dependent layout — I checked, and the software page has none,
whereas Home (`min-h-[92vh]`), Teaching (`h-[80vh]`) and NotFound
(`min-h-[70vh]`) do, so those keep the original `cdp.mjs` method.

Page height was identical under both methods (1440x2716, 390x3859), so the
only difference is that the embeds now appear.

### Re-shot for the wordmark (1)

`home-mobile-menu.png`, which predated the 31 px mobile wordmark. All ten
links present.

### Verified current without re-shooting (7)

`publications-desktop/mobile`, `gallery-desktop/mobile`,
`gallery-carousel-t0/t8`, `home-hero`. I did not take these on trust: I
measured the footer logo region of every desktop shot and the footer band of
every mobile shot. All are pixel-identical to the freshly re-shot ones
(desktop stdev 47.4 / min 78; mobile stdev 29.5 / min 65), so they already
carried the current footer. `home-hero.png` is a 1440x900 hero crop with no
footer in frame and nothing in it changed.

---

## Checks

- `npm run lint` — clean
- `npm run typecheck` — clean
- `npm run build -- --base=./` — clean, 10 routes pre-rendered plus the
  noindex 404 and sitemap
- Preview on :4173 confirmed serving the new bundle (`index-k-QRNWkX.js`)
- No horizontal overflow at 390 px on home or people

---

## For Daniel

1. **The home hero states the affiliation twice** (prose line, then the logo
   caption). Drop HOME_INTRO's second line now that the logo carries it, or
   keep both? One-line change either way, but it is your copy.
2. **The collaborator map is small on a phone** (~350x178). Worth a mobile
   layout of its own, or fine as a thumbnail with the country list a tap away?
   It is shared with the People page, so it would change both.
