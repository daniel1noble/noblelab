# Photo focus: putting the animal's face in every band

Prepared 29 Aug 2026 for Daniel's request 2 ("every animal background photo
positioned so the animal's FACE is the focus"). Machine-readable version:
`photo_focus.json`. Nothing was wired — no `.tsx` file was touched. Two new
image files were added to `noblelab-site/public/images/`.

## What did not work

**1. On desktop the horizontal position of a face cannot be changed at all.**
Every band is proportionally wider than every photo, so `object-fit: cover`
scales the photo by WIDTH and there is no horizontal overflow to slide. The `x%`
in `object-position` is dead at 1440 wide — on the PageHero band (1440×320,
4.5:1) and on the home hero (1440×~830, 1.74:1) alike. Where a face is left of
centre in the photograph it stays left of centre on screen, and the only remedy
is a new crop. This is why two files were re-cropped rather than repositioned.

The compensation is that the `y%` is *fully* effective: at 1440 wide the band
shows only a 320px slice of a photo that scales to 956–1080px tall, so the
vertical position picks which third of the animal you see. That is where the
current site is going wrong — every page is showing flank, back or rock.

**2. The Software page's beetle has no face.** Its head is a small, dark,
out-of-focus wedge at x 38%, y 56%, pointing away from the lens. No position
makes a face of it. A replacement is proposed below; the choice is Daniel's.

**3. On mobile the Gallery dragon's head lands inside the top wash and cannot be
moved.** The head sits at 14% of the image *height*; on a 390px-wide band the
`y%` is inert, so it lands at y 14% — under the 128px `h-32 from-ink` navigation
wash, which erases it. Fixing this needs a portrait variant and a `<picture>` in
`PageHero`, which is a component change, not a position change. Flagged, not done.

**4. The home hero's left wash still holds the lizard back.** Even after the
re-crop the face lands at x 59.5%, where the wash
(`from-ink from-20% via-ink/90 via-45% to-ink/10`) is still ~69% ink. The crop
roughly triples how much of the lizard shows, but to make the face genuinely
read, that `via-45%` stop wants pulling back to about `via-32%`. That is a CSS
change in `src/pages/Home.tsx`, outside my remit — raising it for whoever wires
this.

## How each position was chosen

The band's clearest strip is at **y ≈ 40%**. Below the 128px navigation wash and
above the heavy bottom of `bg-gradient-to-t from-ink via-ink/70 to-ink/25`, about
39% of the photograph transmits there, against 30% at mid-height and 28% at
y 20%. Every face was therefore aimed at y 40% of the band. The title glyphs were
measured on the live build at x 162–521, y 183–260 in a 320px band, so y 40%
(=128px) also puts the face clear above the text.

Every recommendation was checked by cropping the real file to the real band
geometry and looking at it, then again with all three wash gradients composited
over it in the real bone-paper colour (`#F5F1E7`). Crops are in
`scratchpad/previews/focus/` — `W-*.jpg` are the washed previews, `FINAL-*` the
unwashed desktop/mobile pairs.

**One string serves both breakpoints.** Because the `x%` is inert above roughly
430–480px viewport width and the `y%` is inert below it, a single
`imagePosition="x% y%"` steers desktop by its y and mobile by its x. No
responsive class is needed for `PageHero`. The home hero uses a Tailwind class:
`object-[55%_45%]` becomes `object-[20%_50%]`.

| Page | Current | Recommended | Face lands (desktop) | File |
|---|---|---|---|---|
| Home | `object-[55%_45%]` | `object-[20%_50%]` | 60%, 41% | **bg-hero-face.jpg (new)** |
| Research | `42% 50%` | `0% 32%` | 34%, 41% | unchanged |
| People | `55% 60%` | `0% 46%` | 53%, 40% | unchanged |
| Publications | `55% 60%` | `70% 50%` | 70%, 40% | unchanged |
| Software | `50% 45%` | `55% 48%` | 65%, 41% | **bg-software-face.jpg (new)** |
| Teaching | `50% 50%` | `0% 34%` | 43%, 39% | unchanged |
| Gallery | `45% 50%` | `0% 1%` | 54%, 40% | unchanged |
| Opportunities | `35% 45%` | `0% 88%` | 49%, 40% | unchanged |
| News | `30% 50%` | `15% 50%` | landscape | unchanged |
| Contact | `50% 60%` | `50% 31%` | landscape | unchanged |

These hold across band heights: re-checked at 380px and 420px, every face stays
between y 34% and y 48%. Six pages still pass `height="min-h-[380px]"`
(Software, Publications, Teaching, News, Gallery, Contact) while Research and
Opportunities now measure 320px, so the set has to tolerate both, and it does.

## The two new files

**`public/images/bg-hero-face.jpg`** — 1600×1000, 125 KB, no EXIF, no ICC.
The same frame as `bg-hero-red-rock-lizard.jpg`, cropped to (0, 63)–(1600, 1063)
of the 2048×1360 original. Nothing was added, removed or retouched; it is a
straight crop. The lizard's eye moves from x 46.5% to x 59.5% and the animal is
1.28× larger. 1600px is the widest crop that gets the face past 59%, so this is
the limit without upscaling. The existing alt text still describes it.

**`public/images/bg-software-face.jpg`** — 1768×1079, 408 KB, q72, no EXIF, no
ICC. A straight crop, (0, 150)–(1768, 1229), of
`content/gs_images/photos_13_fieldwork-uncaptioned.jpg`: a large crocodilian
lying on bare wet ground among leaf litter. Eye at x 65%, y 45.3%; jaw and snout
fill the right of the band. Quality 72 was needed to stay under 450 KB — the
frame is dense foliage — which is in line with the q64–68 already used for three
other backgrounds.

## Three things that are Daniel's call, not mine

1. **Does a crocodile belong on the Software page?** It has by far the best face
   of the unused photographs and a palette that does not clash with any other
   page. But it is a travel/fieldwork photo with no connection to the lab's study
   systems. The alternative is `photos_10` (a green snake on a leaf, sharp face at
   x 58%) — except that it looks very like the Publications leaf frog, so the two
   pages would read as a pair. Third option: keep the beetle at `0% 58%` and
   accept that this one page has no face.

2. **Should "Join the Lab!" open with a gaping mouth?** Making the sleepy
   lizard's face the focus necessarily brings its wide-open defensive gape to the
   centre of the recruiting page. It is a good photograph and a real face; it is
   also unmistakably a threat display. `gallery-field-28-sleepy-lizard.jpg` is the
   calmer alternative already on disk.

3. **Should the home hero's left wash retreat?** See point 4 above.

## Sources read

- `noblelab-site/src/components/ui.tsx` (PageHero geometry, wash gradients),
  `src/pages/Home.tsx` (hero geometry and washes), the nine page files
  (current `imagePosition` and `imageOpacity` values), `tailwind.config.cjs`
  (`slow-zoom` 1.09, `ink` `#F5F1E7`).
- Live band and title measurements from the preview build at
  `http://localhost:4173` (1440×900 and 390×844).
- `content/animal_photos_report.md` and `content/gs_images/manifest.json` for the
  candidate pool.
- Every `public/images/bg-*.jpg`, read at 900px with a percentage grid overlaid
  to fix each eye position.

## Facts I could not confirm

- **No species names.** `animal_photos_report.md` records that only four animals
  are captioned anywhere in the source material (painted dragon, sleepy lizard,
  sand monitor, pygmy bluetongue). The Research goanna, the People lizard, the
  Publications frog, the Teaching frogs, the home hero lizard and the new
  crocodilian are all uncaptioned. Alt text must say "lizard", "frog",
  "crocodilian" — not a species.
- I did not verify the recommendations in a running browser, because that needs
  the source edits I am not making. Every figure here comes from the measured
  live geometry plus pixel-exact reconstructions of it.
