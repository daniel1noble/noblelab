# Phase 4 fix log — review defects applied

Site: `_admin/drafts/website/noblelab-site` · built and shot from
`http://localhost:4173` · 29 August 2026 · nothing pushed.

## Read this first

**One fix changes which animal appears on a page, and it needs your word.**
The "Join the Lab!" band no longer uses the sleepy lizard. All three frames of
that animal on the site catch it mid-gape with its blue tongue out
(`bg-opportunities-sleepy-lizard.jpg`, `gallery-field-23-unhappy-sleepy-lizard.jpg`,
which the site itself captions "Unhappy Sleepy Lizard", and
`gallery-field-28-sleepy-lizard.jpg`), so there was no calm frame of it to crop
— the review had suggested frame 28, but I opened it and it is gaping too. The
band is now a crop of the pygmy bluetongue resting in an open hand
(`gallery-field-25-pygmy-bluetongue.jpg`, already on the site in the Fieldwork
section). Look at `content/screenshots/opportunities-desktop.png` and
`opportunities-mobile.png` and tell me if you want a different animal there.

**Two things I did not change, because they are your call, not defects:**

1. **Carousel speed.** One of the three photographs still changes every 2
   seconds, so a given photograph holds its place for 6 seconds. You asked for
   "rotating slowly". Say the word and `STEP_MS` at `src/pages/Gallery.tsx:181`
   goes to 4000 or 5000.
2. **The old photographs are still on disk.** `bg-opportunities-sleepy-lizard.jpg`
   and `bg-hero-red-rock-lizard-mobile.jpg` are unused now but nothing was
   deleted, so either can be put back in one line.

**One limit worth knowing.** On a phone the home hero's copy runs from y=162 to
y=647 of a 776px band, so there is no part of that photograph that text does not
cross. The lizard's head is now about two and a half times the width it was and
sits where the two washes are thinnest, but it still reads as a background, not
a portrait. Making it more prominent than that means lightening the washes over
the copy, which is a legibility trade I did not make on my own.

## Applied

| # | Where | What was wrong | What I did |
|---|---|---|---|
| 1 | `src/pages/Opportunities.tsx:18-31` | Blocker. The recruiting band was a sleepy lizard in a defensive gape, its open mouth beside "Join the Lab!" and its chin cut by the band's bottom edge. | New band `public/images/bg-opportunities-pygmy-bluetongue.jpg` — a 1200x370 crop of `gallery-field-25-pygmy-bluetongue.jpg`, head at 61% of the width so the face sits well right of the h1. `imagePosition="67% 50%"`. |
| 2 | `src/pages/Gallery.tsx:186,320-338` | Major. The carousel crossfaded captions on top of each other, so for most of a second the words were doubled — `gallery-desktop.png` had caught "Pygmy Bluetongueania". | The caption now swaps instead of crossfading: `<AnimatePresence mode="wait">` with its own `CAPTION_FADE_S = 0.25`, so the outgoing caption is gone before the next arrives. Sampled the live page 10 times at 600ms: never two captions on one card. |
| 3 | `src/pages/Software.tsx:66-77` | Major. The crocodile read as scales across the whole band; the jaw was cut at the band bottom at 1440 and the snout ran off the right edge at 390. | `imagePosition="100% 62%"`, `imageOpacity={0.72}`. 62% lifts the head into the strip where the wash is thinnest and lets the jaw feather out rather than end on a cut; 100% keeps the snout on screen below 500px, where x is the axis that bites. |
| 4 | `src/pages/Home.tsx:44-56` | Major. The hero was re-cropped for desktop only; the phone still loaded the old file and the face sat behind the strapline at 69px wide. | New phone crop `public/images/bg-hero-red-rock-lizard-mobile-face.jpg`, 573x1141 — within a pixel of the aspect of a 390x776 hero, so the whole crop shows and neither axis of `object-position` is doing any work. Head about two and a half times its old width, near the middle of the screen. |
| 5 | `src/components/Header.tsx:86` | Minor, legibility. The wordmark grew 27→34px on desktop but only 27→28px on a phone. | Base size `text-[28px]` → `text-[31px]`. The brand link is 144px wide at 390 and the hamburger starts near x=340, so there is room. |
| 6 | `src/pages/Gallery.tsx:311-341` | Minor, legibility. A fixed 36px caption bar sat under every card, and only 15 of the 35 photographs carry a caption, so 20 of them showed an empty white strip. | The caption is now an overlay on the bottom of the photograph, on a paper scrim, rendered only when there is one. No blank strip, no layout shift (the card is a fixed 4:3 box either way), and the cards are 36px shorter. |
| 7 | `src/pages/Gallery.tsx:275,286` | Minor. "Three photos at once" only held from 1024px. | Three from 768px (`md`) rather than 1024px (`lg`). Measured: 390 → 1 card, 700 → 2, 768 → 3 at 224px wide, 900 → 3, 1024 → 3. A phone still gets one — three 110px thumbnails there would be worse than one. |
| 8 | `src/pages/Gallery.tsx:362-374,428-431,471-475` | Minor, spacing. Pressing "See all 35 photos" inserted ~2600px above the button, so the control the reader had just pressed jumped 2586px down the page and they were left looking at the same screen. | The button now scrolls the photographs into view on the way open (`scroll-mt-28` under the fixed header, and `behavior: "auto"` for readers who ask for reduced motion). Measured: click takes scrollY 0 → 458 with the first grid heading on screen. |
| 9 | `src/pages/Gallery.tsx:467-470` | Minor, accessibility. `aria-controls` pointed at `#all-photos`, which holds both section headings and both intros and is on screen either way, so `aria-expanded="false"` misdescribed the page. | Dropped `aria-controls`; `aria-expanded` now describes the button alone. |

## Not applied, and why

- **Carousel step of 2s** (`Gallery.tsx:181`) — timing, your call. See above.
- **Three photographs on a phone** (`Gallery.tsx:275`) — taking the third card
  down to 390px would leave three ~110px thumbnails. One card on a phone, three
  from 768px.
- **An expand icon on each carousel card** — the review suggested one so touch
  readers can see the cards are clickable. That is a new design element rather
  than a defect, so I left it. Each card is a real button with an "Open photo:"
  label, and the whole set opens from the button below.

## Checks

`npm run lint`, `npm run typecheck` and `npm run build -- --base=./` all clean;
the postbuild prerender wrote all 10 routes, the noindex 404 and the sitemap.

No horizontal overflow and no broken images at 390 or 1440 on any of the four
changed routes.

Screenshots re-shot into `content/screenshots/` (same names): every mobile page,
because the wordmark change touches all of them, plus the four changed desktop
pages, the hero and carousel viewport shots and the open mobile menu.

Committed as `15e361b` "Apply phase 4 review fixes" on `main`. **Not pushed** —
the remote is the live site. Two images that were already sitting untracked in
`public/images/` before this work (`anu-logo.png`,
`people-daniel-noble-garden.jpg`) are still untracked: nothing in the site
refers to either, so I left them for you rather than committing them.
