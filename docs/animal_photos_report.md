# Animal photo backgrounds and research-theme figures

Produced 28 Aug 2026 for the light ("bone paper") redesign. All outputs are in
`noblelab-site/public/images/` and are listed at the end of
`public/images/manifest.json` (`use: "background"` / `"theme-figure"`).
Nothing outside `public/images/`, `content/theme_images.json` and this file was
written; the originals in `ANU_Lab Photos/` were only read.

## What did not go to plan

- `theme-1-1.png` (research_02, the transparent "coupled mechanistic models"
  schematic) is 1,075 KB as a truecolour PNG at 1600 px. It must stay PNG
  (62 % of its pixels are transparent). It has been **quantised to 256
  colours** (207 KB); a side-by-side of a text-dense region showed no visible
  difference. If the wiring agent prefers the truecolour file, rerun
  `scratchpad/make_animal_bgs.py` and skip the quantise step.
- Three backgrounds needed JPEG quality below 80 to stay under 450 KB:
  `bg-hero-scales.jpg` (q68), `bg-research-rock-lizard.jpg` (q64),
  `bg-teaching-spotted-frogs.jpg` (q68). They are shown at 60 % opacity behind
  a wash, so this is not visible, but they are the first to swap if a page
  looks soft.
- The Google Site copies are 2048 px wide at most, so every background except
  `bg-hero-lizard-mesh.jpg` (from the 6336 px original) is 2048 px or less.
  Nothing was upscaled. On a 4K display they will be stretched by the browser;
  acceptable for faded backgrounds.
- The old site's photos_04 (skink on mesh) is the **same frame** as the lab
  original 20230111_Lizards-03338, so it is used once only (hero option C),
  and the Software page got the green beetle instead.
- The old site never captioned photos_01 (the lizard on the red rock) or the
  Research Systems lizards/frogs, so their alt text says "lizard"/"frog", not a
  species. Only the four Site-captioned animals are named (painted dragon,
  sleepy lizard, sand monitor, pygmy bluetongue); the sand monitor and pygmy
  bluetongue photos were not used (the monitor is not visible at banner size;
  the bluetongue is in a hand).

## Candidates considered

Ratings are for use as a faded page background on pale paper: A = use, B =
usable, C = weak, X = unsuitable. "Left quiet" = left third free of the subject
(needed for the home hero text).

| Source | Content (visible) | Size | Left quiet | Rating | Verdict |
|---|---|---|---|---|---|
| photos_01_banner | small pale lizard on red rock, blurred orange ground | 2048x1360 | yes | A | **Home hero (recommended)** |
| home_01_banner | reptile scales macro, all-over texture | 2048x1174 | n/a (uniform) | A | Home hero option B; alt for Software |
| ANU_Lab Photos/20230111_Lizards-03338 | lizard emerging from pipe onto green mesh | 6336x6336 | yes (blurred mesh) | A | Home hero option C (enclosure, not field) |
| home_03 | large spotted lizard under red rock overhang | 2048x1360 | no (subject centre-left) | A | Research |
| home_02 | small lizard on rock in dry grass | 2048x1360 | partly | A | People |
| home_05 | two spotted frogs on wet rock | 2048x1536 | no | B+ | Teaching |
| home_04 | dark frog on rock at night | 2048x1536 | no | C | too dark for a pale page |
| photos_02 (caption "Painted Dragon") | dragon on weathered log, red sand | 1536x2048 portrait | - | A | Gallery (band crop) |
| photos_28 (caption "Sleepy lizard") | sleepy lizard on red soil, mouth open | 1536x2048 portrait | - | A | Join us (band crop) |
| photos_23 (caption "Unhappy Sleepy Lizard") | sleepy lizard on red sand, mouth open | 1536x2048 portrait | - | B | duplicate subject of photos_28; not used |
| photos_21 | camouflaged frog on green leaf | 2048x1536 | partly | A | Publications |
| photos_12 | metallic green beetle on mossy bark | 2048x1536 | partly | A- | Software |
| photos_15 | karst hills reflected in a lake | 2048x1536 | yes (sky/water) | A | Contact |
| photos_26 (caption "Maria Island, Tasmania") | grassland panorama to coastal hills | 2048x600 | yes | A | News |
| photos_07, photos_14 | karst lake / karst bay | 2048x1536 | yes | B | spare landscapes |
| photos_19 | crested lizard on plant at night | 2048x1536 | no | C | black background muddies on paper |
| photos_03 | red-and-blue frog on mossy trunk | 2048x1536 | no | C | dark; frog is very small in frame |
| photos_08 | pale snake coiled on vine | 2048x1536 | no | C | low contrast, busy |
| photos_10 / photos_20 | green snake and lizard on leaf | 2048x1536 | partly | B | spare; near-duplicates |
| photos_13 | small crocodilian on bare ground | 1768x1229 | no | B- | spare |
| photos_17 | brown-and-white butterfly on concrete | 2048x1536 | partly | B- | spare |
| photos_27 | lizard on rock among vegetation | 1536x2048 portrait | - | C | subject hard to read |
| photos_24 (caption "Sand Monitor") | red sandy track; monitor not visible | 1536x2048 | - | X | subject not visible |
| photos_25 (caption "Pygmy Bluetounge") | small skink in an open hand | 1536x2048 | - | X | hand (person) |
| photos_04 | skink on green mesh (same frame as 03338) | 2048x2048 | - | - | superseded by the original |
| ANU_Lab Photos/03249 | lizard under bark in a tub | 9504x6336 | - | C | reads as lab (paper towel, pipe) |
| ANU_Lab Photos/03304, 03168 | hatchling in cup / lizard in hand | 9504x6336 | - | X | hands (people) |

## Recommended assignment

| Page | File | Why |
|---|---|---|
| Home hero (desktop) | `bg-hero-red-rock-lizard.jpg` | Terracotta ground is the palette itself; blurred left third takes the wordmark and headline; lizard at x 40-60 %, y 30-60 %. object-position 55% 45%. |
| Home hero (mobile) | `bg-hero-red-rock-lizard-mobile.jpg` | Same frame, 1080x1360, lizard centred. |
| Home hero, option B | `bg-hero-scales.jpg` | The old site's own banner; pure texture, no focal point, works under text anywhere. |
| Home hero, option C | `bg-hero-lizard-mesh.jpg` | Only true 2400 px frame; sage-green mesh; quiet blurred left third. Shows an enclosure, so less "field" than A. |
| Research | `bg-research-rock-lizard.jpg` | Strongest reptile frame, red rock; object-position 60% 55%. |
| People | `bg-people-grass-lizard.jpg` | Sage grass + terracotta rock; object-position 55% 60%. |
| Publications | `bg-publications-leaf-frog.jpg` | Bright green leaf, calm; object-position 55% 60%. |
| Software | `bg-software-green-beetle.jpg` | Iridescent pattern on lichen; object-position 50% 45%. (`bg-hero-scales.jpg` is the alternative if not used as hero.) |
| Teaching | `bg-teaching-spotted-frogs.jpg` | Two frogs fill the frame; any position. |
| Gallery | `bg-gallery-painted-dragon.jpg` | Captioned species; band-cropped so the dragon is mid-frame; object-position 45% 50%. |
| Join us (Opportunities) | `bg-opportunities-sleepy-lizard.jpg` | Captioned, charismatic, red soil; object-position 35% 45%. |
| News | `bg-news-maria-island.jpg` | Captioned 3.4:1 panorama, already banner-shaped; object-position 30% 50% on phones. |
| Contact | `bg-contact-karst-lake.jpg` | Calm water and sky; object-position 50% 60%. |

All backgrounds: JPEG, EXIF/ICC stripped (Pillow), progressive, all under
450 KB (largest 446 KB). Sizes and bytes are in `manifest.json`.

## Research-theme figures (from the old site's carousels)

Mapping per `google_site_content.json` `research.themes[].carousel_images`,
in the old site's order; details in `content/theme_images.json`.

| Theme | k | File | Source | Size | Bytes | Format |
|---|---|---|---|---|---|---|
| 1 Predicting the effects of extreme heat on organisms | 1 | `theme-1-1.png` | research_02 | 1600x1120 | 207 KB | PNG, transparent, 256-colour |
| 1 | 2 | `theme-1-2.jpg` | research_03 | 1600x705 | 247 KB | JPEG q85 (PNG 717 KB) |
| 2 Early developmental environments | 1 | `theme-2-1.jpg` | research_04 | 1305x1600 | 272 KB | JPEG q85 (PNG 663 KB) |
| 2 | 2 | `theme-2-2.jpg` | research_05 | 1600x1312 | 328 KB | JPEG q85 (PNG 808 KB) |
| 3 Plasticity vs adaptive genetic evolution | 1 | `theme-3-1.jpg` | research_06 | 1121x1600 | 141 KB | JPEG q85 (source was JPEG) |
| 3 | 2 | `theme-3-2.png` | research_07 | 540x425 | 24 KB | PNG, native size (not upscaled) |
| 3 | 3 | `theme-3-3.png` | research_08 | 1600x895 | 334 KB | PNG, transparent margins kept |
| 4 Statistics and software for meta-analysis | 1 | `theme-4-1.png` | research_09 | 1600x774 | 201 KB | PNG |
| 4 | 2 | `theme-4-2.jpg` | research_10 | 1600x1268 | 194 KB | JPEG q85 (PNG 418 KB) |

Rule applied: PNG kept where the figure has transparency or the PNG is under
400 KB; otherwise JPEG q85 composited on white. No output is over 400 KB.

### Legibility at card size (show these `object-contain`, not cropped)

- `theme-1-1.png` (research_02): dense schematic, many small labels. Poor at
  card size; contain, and ideally open in a lightbox. Transparent
  background will show the card colour.
- `theme-1-2.jpg` (research_03): five panels, 2.3:1, axis text tiny. Poor;
  contain.
- `theme-2-1.jpg` (research_04): portrait 0.82:1 flow diagram; a 4:3
  `object-cover` crop would lose the top and bottom rows. Contain.
- `theme-3-1.jpg` (research_06): portrait 0.7:1, two stacked panels. Contain.
- `theme-3-2.png` (research_07): only 540x425; will blur if scaled above
  ~540 px wide. Contain at natural size or small.
- `theme-3-3.png` (research_08): two line plots with small beta labels;
  legible only at full width. Contain.
- `theme-4-1.png` (research_09): 2.1:1 wide diagram with small italic
  labels. Contain.
- `theme-2-2.jpg` (research_05) and `theme-4-2.jpg` (research_10) are the
  most legible at card size (large text and silhouettes), and are the best
  choice if each theme card shows one figure: use k=2 for themes 2 and 4,
  k=1 for theme 1 (as an image, not for its text), k=2 for theme 3 only if
  shown small.

Alt text for every figure starts with "Figure:" and describes what the
figure shows, taken from the extraction agent's observation in
`gs_images/manifest.json` (`observed_by_agent`), not from any paper title.
