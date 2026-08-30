# Noble Lab website — photo curation report

Date: 2026-08-28. Prepared as a draft for Daniel to check.

Outputs: `_admin/drafts/website/noblelab-site/public/images/` (72 JPEGs, 8.3 MB total, largest 391 KB) plus `manifest.json` in the same folder. Every output was re-saved with Pillow with no EXIF and no ICC profile (verified by re-opening each file: 0 EXIF tags, no embedded profile). `exiftool` is not installed on this machine; verification used Pillow.

## What did not work / needs a decision

1. **Nothing was deleted from the output folder.** `research-enclosures.jpg` (from 03145) was produced before the online-only file 03225 (eggs) downloaded; the eggs image is the stronger "incubation/development" card, so there are now **nine** research images rather than the 6–8 asked for. Drop `research-enclosures.jpg` if only eight are wanted.
2. **Ten source files were Dropbox online-only** (03225, 03259, 03272, DSC03156, IMG_5832.HEIC, dan-noble2.jpg, the four SATS_2025 files). They were downloaded on demand during this run and are now local; nothing was modified in the source folders.
3. **Species** are not identified anywhere; the alt text says "small lizard" / "hatchling lizard". [CONFIRM: species names if wanted in captions]
4. **Eggs**: 03225 and the incubator cups (03151, DSC03154) look like lizard eggs in vermiculite but that is inferred from context. [CONFIRM: these are lizard eggs, and that an image of eggs is fine to publish]
5. **People**: none of the lab-shoot photos show Daniel; they show two lab members who are not named in any file. Alt text says "a researcher". [CONFIRM: consent to publish the two lab members' photos, and whether to caption them]
6. **Group photo** `gallery-29-lab-outing.jpg` (from `IMG_5832.HEIC`, iPhone, file date 2020-09-11, an escape-room outing in Canberra; the source carried 15 GPS tags, now stripped). It is a phone snapshot, lower quality than the rest. [CONFIRM: OK to publish, date/occasion, who is pictured]
7. **Academy of Science portraits** (`ANU_Profile_Pics/ANU_AcademyOfSciencesPhotos/SATS_2025_*.jpg`, Canon EOS R5, dated 2025-09-03) are the best portraits of Daniel on disk. [CONFIRM: usage rights / photo credit required by the Australian Academy of Science]
8. **Silhouette licences**: all silhouette packs are Shutterstock/VectorStock stock files. [CONFIRM: the licence bought covers use as a website logo mark]
9. The `.ai`/`.eps` files were rasterised with Ghostscript to preview them; no SVG exists on disk. A vector logo mark would need the `.eps`/`.ai` opened in Illustrator/Inkscape and the chosen lizard exported as SVG.

## Recommended hero

**`hero-lab-shelving.jpg`** (source `ANU_Lab Photos/DSC03148.jpg`, 9210 x 6140, Sony ILCE-7RM4, 2023-01-11 shoot).

Why: it is the widest, most atmospheric frame in the set — shelving of clear enclosures lit by strip lights and warm heat lamps running diagonally to the right, with the left third falling off into a soft, blurred room. Faded and feathered onto a deep olive ground the warm lamp glow will read as earthy rather than clinical, and the blurred left third gives clean room for the title and strapline. It contains no people and no legible labels, so there is nothing to caption or get consent for.

Alternatives, in order:

- `hero-animal-room.jpg` (03266) — wide, sharp view of the animal room; busier on the left, so it needs a heavier fade behind text.
- `hero-heat-lamps.jpg` (03191) — close, cool-blue abstract of tubs and lamps; strong texture, less "place".
- Not produced as a hero but worth knowing: 03202 (a researcher checking tubs) has a plain wall across the whole left half — ideal text space — if a person in the hero is wanted.

## Portrait

- `people-daniel-noble.jpg` (from `ANU_Profile_Pics/dan-noble.jpg`, Canon 5D Mk IV, 2021-03-11, Adobe RGB converted to sRGB) — 617 x 900, as specified.
- `people-daniel-noble-2025.jpg` (from `SATS_2025_1150.jpg`, Display P3 converted to sRGB) — 600 x 900. **Recommended**: newer, sharper, better lit, formal grey jacket on white. `SATS_2025_1149.jpg` is the same sitting holding a medal in its case; `SATS_2025_1467/1468.jpg` show the medal being presented in front of an Australian Academy of Science banner (the presenter is not named in any file) — usable for a news item, not produced.
- `dan-noble2.jpg` is the same frame as `dan-noble.jpg` at a smaller file size (2072 x 3024, 466 KB vs 1.0 MB) — nothing gained.
- `IMG_6889.jpg` / `.heic` (iPhone 12 Pro, 2021-01) — outdoor head shot against green foliage, smiling, natural light. Good casual alternative, but it carries GPS data and would need stripping before use. Not produced.

## Rating table

Ratings: 3 = strong, 2 = usable, 1 = weak, – = not suitable. H = hero (wide, atmospheric, text room on the left), R = research-theme card, P = people-page banner, G = gallery. All lab-shoot files are Sony ILCE-7RM4 JPEGs from the 2023-01-11 shoot, sRGB, no GPS. Source folder: `ANU_Lab Photos/`.

| File | Orientation | Pixels | What is visible | Quality | H | R | P | G | Used as |
|---|---|---|---|---|---|---|---|---|---|
| 20230111_Lizards-03145 | landscape | 9263 x 6175 | Shelf of labelled clear enclosure tubs with record cards, strip lights | sharp, shallow DOF | 1 | 2 | – | 3 | research-enclosures, gallery-04 |
| 20230111_Lizards-03151 | landscape | 9504 x 6336 | Incubator racks of labelled cups of vermiculite under film | sharp | 1 | 3 | – | 3 | research-egg-cups, gallery-10 |
| 20230111_Lizards-03168 | landscape | 9008 x 6005 | Small lizard held between a person's fingers, blurred background | sharp on lizard | 2 | 3 | – | 3 | research-handling, gallery-08 |
| 20230111_Lizards-03186 | portrait | 6179 x 9269 | Tall shelving of tubs and heat lamps from below | good | – | 1 | – | 2 | gallery-05 |
| 20230111_Lizards-03191 | landscape | 9504 x 6336 | Close rows of tubs under strip lights and heat lamps, blue cast | good | 3 | 2 | – | 3 | hero-heat-lamps, gallery-03 |
| 20230111_Lizards-03199 | landscape | 9353 x 6235 | Researcher at bench in the animal room, tub labelled "Autoclaved Bark for Lizards", shelves all round | sharp | 2 | 1 | 3 | 3 | gallery-15 |
| 20230111_Lizards-03202 | landscape | 9504 x 6336 | Same researcher looking down at tubs, plain wall left | sharp | 2 | – | 2 | 2 | gallery-16 |
| 20230111_Lizards-03208 | landscape | 9389 x 6259 | Researcher reaching into a shelf holding a small tub | sharp | – | – | 2 | 3 | gallery-17 |
| 20230111_Lizards-03214 | landscape | 9409 x 6273 | Same researcher smiling, stack of tubs, warm light | sharp | – | – | 3 | 3 | gallery-18 |
| 20230111_Lizards-03218 | landscape | 9398 x 6265 | Two researchers preparing tubs at a sink bench | sharp | 1 | – | 3 | 3 | gallery-19 |
| 20230111_Lizards-03225 | landscape | 9504 x 6336 | Four small white eggs on vermiculite in a tub | sharp | 1 | 3 | – | 3 | research-eggs, gallery-25 |
| 20230111_Lizards-03239 | landscape | 9504 x 6336 | Crickets in a plastic container | sharp | – | 2 | – | 2 | research-crickets, gallery-14 |
| 20230111_Lizards-03249 | landscape | 9504 x 6336 | Small lizard under bark beside a PVC pipe hide | sharp | 1 | 3 | – | 3 | research-lizard-bark, gallery-06 |
| 20230111_Lizards-03253 | square | 6336 x 6336 | Square crop of the same frame as 03249 | sharp | – | 2 | – | dup | excluded (duplicate) |
| 20230111_Lizards-03259 | square | 5881 x 5881 | Wide view of the animal room, shelving units, trolley | sharp | – | 2 | 1 | 3 | gallery-26 |
| 20230111_Lizards-03266 | landscape | 9504 x 6336 | Wide view of shelving units of labelled tubs | sharp | 3 | 2 | – | 3 | hero-animal-room, gallery-02 |
| 20230111_Lizards-03272 | landscape | 9504 x 6336 | Two researchers at the sink bench, different angle to 03218 | sharp | 1 | – | 3 | 2 | gallery-27 |
| 20230111_Lizards-03281 | landscape | 9504 x 6336 | Researcher facing camera holding a stack of tubs | sharp | – | – | 2 | dup | excluded (near-duplicate of 03284) |
| 20230111_Lizards-03284 | landscape | 9504 x 6336 | As 03281, slightly wider | sharp | – | – | 2 | 3 | gallery-20 |
| 20230111_Lizards-03304 | landscape | 9504 x 6336 | Hand holding a labelled cup with a hatchling lizard on vermiculite | sharp | 1 | 3 | – | 3 | research-hatchling, gallery-09 |
| 20230111_Lizards-03306 | landscape | 9504 x 6336 | Researcher examining a cup beside incubators (label "ZXSD-R1160") | sharp | – | 2 | 2 | 3 | gallery-12 |
| 20230111_Lizards-03308 | landscape | 9504 x 6336 | Researcher placing cups into an incubator | sharp | – | 2 | 2 | 3 | gallery-13 |
| 20230111_Lizards-03320 | landscape | 9504 x 6336 | Researcher looking at a stack of tubs | sharp | – | – | 2 | 2 | gallery-21 |
| 20230111_Lizards-03328 | landscape | 9504 x 6336 | Researcher facing camera with stack of tubs | sharp | – | – | 2 | dup | excluded (near-duplicate of 03284) |
| 20230111_Lizards-03331 | landscape | 9504 x 6336 | Researcher in profile, smiling, hands together; plain wall left | sharp | 1 | – | 1 | 2 | gallery-22 |
| 20230111_Lizards-03338 | square | 6336 x 6336 | Small lizard emerging from a pipe hide onto green mesh | sharp | – | 3 | – | 3 | research-lizard-pipe, gallery-07 |
| 20230111_Lizards-03348 | landscape | 9504 x 6336 | Researcher smiling, holding a small cup, shelves behind | sharp | – | – | 2 | dup | excluded (near-duplicate of 03356) |
| 20230111_Lizards-03356 | landscape | 9143 x 6095 | As 03348 with more space on the left | sharp | – | – | 3 | 3 | gallery-23 |
| 20230111_Lizards-03359 | landscape | 9294 x 6196 | Doorway with hazard stripes, room beyond | ordinary | – | – | – | 1 | excluded (weak) |
| 20230111_Lizards-03361 | portrait | 6183 x 9274 | Doorway into room G.31, shelving visible | ordinary | – | – | – | 2 | gallery-24 |
| DSC03148 | landscape | 9210 x 6140 | Shelving of tubs with strip lights and heat lamps, blurred room left | sharp | 3 | 2 | – | 3 | hero-lab-shelving, gallery-01 |
| DSC03154 | landscape | 9504 x 6336 | Hands adjusting labelled cups on an incubator rack | sharp | 1 | 3 | – | 3 | research-incubator, gallery-11 |
| DSC03156 | landscape | 9504 x 6336 | Researcher beside an incubator, gesturing | sharp | – | 1 | 1 | 2 | gallery-28 |
| IMG_5832.HEIC | landscape | 4032 x 3024 | Seven people, Daniel included, in front of a "Riddle Room Canberra" wall (iPhone, 2020-09-11, GPS present in source) | phone snapshot | – | – | 2 | 2 | gallery-29 |

Profile pictures, folder `ANU_Profile_Pics/`:

| File | Orientation | Pixels | What is visible | Quality | Portrait |
|---|---|---|---|---|---|
| dan-noble.jpg | portrait | 2072 x 3024 | Head and shoulders, check shirt, white background (Canon 5D Mk IV, 2021-03-11, Adobe RGB) | good studio | 2 — produced |
| dan-noble2.jpg | portrait | 2072 x 3024 | Same frame as dan-noble.jpg, smaller file | good | 2 — duplicate |
| IMG_6889.jpg / .heic | ~square | 2293 x 2318 | Outdoor head shot, green foliage, smiling (iPhone 12 Pro, 2021-01; GPS present) | good casual | 2 — not produced |
| IMG_6889_lowres.jpg | ~square | 2293 x 2318 | Same, re-saved smaller | good | – |
| ANU_AcademyOfSciencesPhotos/SATS_2025_1149.jpg | portrait | 4000 x 5997 | Three-quarter length, grey jacket, holding a medal in its case, white background (Canon EOS R5, 2025-09-03) | excellent | 3 |
| ANU_AcademyOfSciencesPhotos/SATS_2025_1150.jpg | portrait | 4000 x 5997 | Head and shoulders, grey jacket, white shirt, white background | excellent | 3 — produced as people-daniel-noble-2025.jpg |
| ANU_AcademyOfSciencesPhotos/SATS_2025_1467.jpg | portrait | 4000 x 5996 | Medal presentation handshake in front of an Australian Academy of Science banner | good event shot | – (news item) |
| ANU_AcademyOfSciencesPhotos/SATS_2025_1468.jpg | portrait | 4000 x 5997 | As 1467, both facing camera | good event shot | – (news item) |

## Output naming

- Hero (2400 px wide, q80): `hero-lab-shelving.jpg`, `hero-animal-room.jpg`, `hero-heat-lamps.jpg`.
- Research (1600 px wide, q80): `research-eggs`, `research-hatchling`, `research-lizard-pipe`, `research-lizard-bark`, `research-egg-cups`, `research-incubator`, `research-handling`, `research-crickets`, `research-enclosures`.
- Gallery (1600 px longest side, q80) `gallery-01` … `gallery-29` with matching `-thumb.jpg` at 600 px. Ordered facility → animals → incubation → people.
- Portraits (900 px longest side, q85): `people-daniel-noble.jpg`, `people-daniel-noble-2025.jpg`.

People-page banner: no separate file was produced; `gallery-19-lab-bench.jpg` (03218) is the best banner, with `gallery-15-animal-room-work.jpg` (03199) and `gallery-18-stack-of-tubs.jpg` (03214) as alternatives. Say the word and I will cut a 2400-px banner from any of them.

## Silhouette / logo-mark candidates

Folder: `ANU_NobleLab/reptile_sillouette/`. Nothing on disk is SVG; the packs are `.eps`/`.ai`/`.pdf` with a `.jpg` (and sometimes a transparent `.png`) render. I rasterised the vector sheets with Ghostscript at 200 dpi and split them into single animals (scratchpad `previews/sil/parts/`, numbered as on the contact sheets `previews/sil/contact_*.jpg`). All paths below are under the scratchpad `/private/tmp/claude-501/-Users-noble-Library-CloudStorage-Dropbox-ANU/92180328-e7d1-4f49-b8da-a7a06698844e/scratchpad/previews/sil/`.

Best single marks (transparent PNG previews, dark fill):

1. **Slender lizard with a long curling tail** — `parts/shutterstock_129441956_03.png` (2190 x 1049). Source `shutterstock_129441956.eps` (six lizards incl. a gecko and a monitor). Elegant, reads well small, clearly a skink-like lizard rather than a gecko. My first pick.
2. **Side-view skink** — `parts/shutterstock_111493793_06.png` (730 x 411) and the long-tailed **`parts/shutterstock_111493793_03.png`** (828 x 462). Source `shutterstock_111493793.eps` (eight lizards: skinks, dragons, a gecko). Simple outlines; the eps is small (189 KB) so easy to open for an SVG export.
3. **Classic gecko** — `parts/vectorstock_16153627_geckos_03.png` (1930 x 1382). Source `vectorstock_download (1)/geckos/vectorstock_16153627.{eps,ai,pdf,png}`; the pack's own `.png` already has transparency (2792 x 3002, four geckos). The most "logo-like" shape, but it says gecko, not skink.
4. **Dragon-type lizards** — `parts/shutterstock_42342673_09.png` (bearded-dragon-like, 453 x 315), `_05.png`, `_11.png` and a slender skink `_02.png` (753 x 184). Source `shutterstock_42342673.eps` (twelve lizards incl. a chameleon).

Other sheets looked at and set aside: `shutterstock_41377984.jpg` (greyscale raster only, ~24 lizards and snakes — good variety but no vector), `shutterstock_26063137.jpg` (one large iguana/crocodile-like silhouette, raster), `shutterstock_429987850.eps` (crocodile), `shutterstock_85212085.eps` (turtles), `shutterstock_11720941.eps`, `shutterstock_27138001.eps` and `Jackson'sChamleons.ai` (dense mixed reptile/amphibian sheets, small figures), `shutterstock_424407085.eps` (tiny coloured icons, not silhouettes), `all_animals/vectorstock_202262` (hundreds of mixed animals). The remaining subfolders (plants, birds, mammals, marine, cacti, mitochondria, etc.) contain no reptiles.

Preview PNGs of the full candidate sheets: `hires_shutterstock_129441956.png`, `hires_shutterstock_111493793.png`, `hires_shutterstock_42342673.png`, `hires_vectorstock_16153627.png`; low-res renders of every eps/ai are `eps_*.png`.
