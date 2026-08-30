# Noble Lab palette specification

Written 2026-08-28 by the palette agent. Source of truth for the site's colour
system. The same values live in three places that must be changed together:

- `noblelab-site/tailwind.config.cjs` — Tailwind tokens (`gold`, `cyan`, …, `ink`, `panel`, `edge`) and the overridden `neutral` scale
- `noblelab-site/src/index.css` — `:root` CSS variables (`--gold`, `--cyan`, `--ember`, `--crimson`, `--accent`, `--brand-stops`) and the html/body colours
- `noblelab-site/src/content/palette.ts` — `PALETTE`, `NEUTRAL`, `BRAND_STOPS`, `GLOW`, `OLD_TO_NEW` for inline styles and props

Brief (Daniel): keep the structure, motion and photo-fade treatment; earthy
sage/olive + terracotta; dark-first. Fonts stay Inter (body) + Space Grotesk
(display) from Google Fonts. The Adobe Typekit link and "congenial" are gone.

## 1. Token table

Token names are unchanged so the ~140 existing class usages retint by value
alone, exactly as the source author did for his own palette swap.

| Tailwind token | Role | Old value | New value | New colour name (palette.ts) |
|---|---|---|---|---|
| `gold` | primary accent: links, eyebrows, hover, `--accent` | `#EE9B00` amber | `#DA7448` | `terracotta` |
| `cyan` | secondary accent | `#0A9396` teal | `#9DB08A` | `sage` |
| `ember` | tertiary accent | `#CA6702` dark amber | `#C76841` | `clay` |
| `crimson` | alert / emphasis | `#AE2012` red | `#AD4533` | `rust` |
| `deep` | darkest gradient stop, fills only | `#005F73` dark teal | `#4F5D3A` | `oliveDeep` |
| `mint` | light fill | `#94D2BD` pale teal | `#C9D5B5` | `sageLight` |
| `sand` | light fill | `#E9D8A6` pale sand | `#EDE4CC` | `bone` |
| `brick` | dark fill | `#BB3E03` red-orange | `#A94E2D` | `TERRACOTTA_DARK` |
| `ink` | page background | `#0A0A0A` near-black | `#171A12` | `ink` (olive-charcoal) |
| `panel` | card surface | `#141414` | `#20241A` | `panel` (warm olive) |
| `edge` | hairline border | `#242424` | `#33392A` | `edge` (muted olive) |
| — (CSS only) | body text on html/body/#root | `#f2f2f2` cold white | `#F2EDE0` | `BODY_TEXT` (warm bone) |
| — (palette.ts only) | mid olive, 2nd gradient stop | — | `#6B7A4B` | `olive` |
| — (palette.ts only) | ochre, 5th gradient stop | — | `#D9A441` | `ochre` |

CSS variables in `index.css`: `--gold #da7448`, `--cyan #9db08a`,
`--ember #c76841`, `--crimson #ad4533`, `--accent #da7448`.

Gradient (`--brand-stops`, eight stops, deep olive → olive → sage → bone → ochre → terracotta → clay → rust):

```
#4f5d3a 0%, #6b7a4b 14%, #9db08a 29%, #ede4cc 43%, #d9a441 57%, #da7448 71%, #c76841 86%, #ad4533 100%
```

Old ramp, for reference: `#005f73 0%, #0a9396 14%, #94d2bd 29%, #e9d8a6 43%, #ee9b00 57%, #ca6702 71%, #bb3e03 86%, #ae2012 100%`.

Other fixed colours in `index.css`: `::selection` text `#171a12` on `--gold`;
focus ring `--gold`; scrollbar track `#171a12`, thumb `#45473a` (neutral-700),
thumb hover `--gold`. The `.feather-edges` mask gradients stay pure black
(they are alpha masks, not colours).

## 2. Neutral scale

Tailwind's `neutral` scale is overridden in `tailwind.config.cjs` with warm,
olive-tinted greys so the 122 `text-neutral-*` / `border-neutral-*` usages
(adaptation_map §2d) read as bone and sage-grey without touching a class.

| Shade | Old (Tailwind default) | New | Typical use in the source |
|---|---|---|---|
| 50 | `#fafafa` | `#F7F4EB` | — |
| 100 | `#f5f5f5` | `#EFEBDD` | — |
| 200 | `#e5e5e5` | `#E0DAC6` | menu items, row titles |
| 300 | `#d4d4d4` | `#CDC7B0` | primary body copy (`.prose-dark p`), nav links |
| 400 | `#a3a3a3` | `#A6A38D` | leads, card copy |
| 500 | `#737373` | `#8C8A74` | captions, dates, table headers |
| 600 | `#525252` | `#62604F` | placeholders, faint metadata |
| 700 | `#404040` | `#45473A` | ghost-button borders, filter pills, link decorations, scrollbar thumb |
| 800 | `#262626` | `#30332A` | — |
| 900 | `#171717` | `#22251D` | — |
| 950 | `#0a0a0a` | `#14160F` | — |

## 3. Contrast ratios (WCAG 2.x relative luminance)

Computed with a small Python script (scratchpad `contrast.py`); rounded to two
decimals. The four ratios the brief required are the first block of bold rows.

| Pair | Colours | Ratio | Target | Result |
|---|---|---|---|---|
| Body text (#F2EDE0) on ink | `#F2EDE0` on `#171A12` | 15.06:1 | 7:1 | pass |
| neutral-300 on ink (body copy, .prose-dark p) | `#CDC7B0` on `#171A12` | 10.39:1 | 7:1 | pass |
| neutral-200 on ink | `#E0DAC6` on `#171A12` | 12.59:1 | 7:1 | pass |
| neutral-400 on ink (leads, card copy) | `#A6A38D` on `#171A12` | 6.91:1 | 4.5:1 | pass |
| neutral-500 on ink (captions, dates) | `#8C8A74` on `#171A12` | 5.03:1 | 4.5:1 | pass |
| neutral-600 on ink (placeholders) | `#62604F` on `#171A12` | 2.77:1 | none (decorative) | pass |
| gold / terracotta on ink (links) | `#DA7448` on `#171A12` | 5.51:1 | 4.5:1 | pass |
| ink on gold / terracotta (button labels) | `#171A12` on `#DA7448` | 5.51:1 | 4.5:1 | pass |
| cyan / sage on ink | `#9DB08A` on `#171A12` | 7.55:1 | 4.5:1 | pass |
| ember / clay on ink | `#C76841` on `#171A12` | 4.60:1 | 4.5:1 | pass |
| crimson / rust on ink (large text, fills) | `#AD4533` on `#171A12` | 3.08:1 | 3:1 | pass |
| mint / pale sage on ink | `#C9D5B5` on `#171A12` | 11.46:1 | 4.5:1 | pass |
| sand / bone on ink | `#EDE4CC` on `#171A12` | 13.89:1 | 4.5:1 | pass |
| ochre on ink | `#D9A441` on `#171A12` | 7.83:1 | 4.5:1 | pass |
| ink on ochre (gradient stop) | `#171A12` on `#D9A441` | 7.83:1 | 4.5:1 | pass |
| ink on cyan / sage (gradient stop) | `#171A12` on `#9DB08A` | 7.55:1 | 4.5:1 | pass |
| ink on ember / clay (gradient stop) | `#171A12` on `#C76841` | 4.60:1 | 4.5:1 | pass |
| ink on olive (gradient stop, 14%) | `#171A12` on `#6B7A4B` | 3.78:1 | 3:1 | pass |
| ink on deep olive (gradient stop, 0%) | `#171A12` on `#4F5D3A` | 2.48:1 | 3:1 | FAIL |
| neutral-300 on panel | `#CDC7B0` on `#20241A` | 9.33:1 | 7:1 | pass |
| neutral-400 on panel | `#A6A38D` on `#20241A` | 6.21:1 | 4.5:1 | pass |
| neutral-500 on panel | `#8C8A74` on `#20241A` | 4.52:1 | 4.5:1 | pass |
| gold / terracotta on panel | `#DA7448` on `#20241A` | 4.95:1 | 4.5:1 | pass |
| white on gold / terracotta (GradientButton rest state is white on ink; hover is ink on gradient) | `#FFFFFF` on `#DA7448` | 3.19:1 | 3:1 | pass |
| edge against ink (hairline visibility) | `#33392A` on `#171A12` | 1.47:1 | n/a | pass |
| panel against ink | `#20241A` on `#171A12` | 1.11:1 | n/a | pass |

Notes:

- The only failing pair is ink on the **deep-olive 0% gradient stop**, which
  matters only for `GradientButton`'s hover state (dark text over the full
  ramp). The source design had the same weakness at the same place (ink on
  its dark-teal 0% stop was 2.72:1). The olive 14% stop is already 3.78:1 and
  everything from 29% onwards is ≥ 4.5:1. If Daniel wants it fixed, lift
  `deep`/`oliveDeep` to about `#5E6D44` (that also changes the token used
  for fills) or start the ramp at `olive`.
- `crimson`/rust is 3.08:1 on ink: fine for large text, fills, rules and
  chips (its only uses in the source are inline accents for research themes,
  the News "Award" tag and one Outreach accent), not for small body text. The
  old crimson was 2.84:1, so this is a slight improvement.
- neutral-500 on panel is exactly 4.52:1; do not darken it further.
- For comparison, the old palette: neutral-300 on ink 13.36, neutral-400 7.85,
  neutral-500 4.18, gold 8.79, ember 5.14, crimson 2.84.

## 4. OLD_TO_NEW: inline literal map

Every inline hex / rgba literal listed in adaptation_map §2c, with the file it
appears in. Both letter cases are in `OLD_TO_NEW` in `palette.ts`; replace
mechanically, preserving the case convention of the surrounding file.

| Old literal | New value | Name | Where it appears (adaptation_map §2c) |
|---|---|---|---|
| `#005F73` / `#005f73` | `#4F5D3A` | `PALETTE.oliveDeep` | Home.tsx ACCENTS.deep; CollaboratorMap STOPS |
| `#0A9396` / `#0a9396` | `#9DB08A` | `PALETTE.sage` | site.ts THEMES/OUTREACH accents; Home ACCENTS.teal, TextLink 271; Publications; News Events; Opportunities Europe, Chip 45; People 87; Outreach 238; CollaboratorMap 120, STOPS |
| `#94D2BD` / `#94d2bd` | `#C9D5B5` | `PALETTE.sageLight` | site.ts THEMES; Home ACCENTS.mint; Publications chapter; News Media; Outreach 289; STOPS |
| `#E9D8A6` / `#e9d8a6` | `#EDE4CC` | `PALETTE.bone` | Home ACCENTS.sand; Publications preprint; STOPS |
| `#EE9B00` / `#ee9b00` | `#DA7448` | `PALETTE.terracotta` | site.ts THEMES/OUTREACH; Home ACCENTS.amber, 388; Publications article; News Paper/Lab; Opportunities Sweden, Chip 44; People 87; Outreach 18, 231; ui.tsx 144/166/197 defaults; CollaboratorMap 121; STOPS; index.css |
| `#CA6702` / `#ca6702` | `#C76841` | `PALETTE.clay` | site.ts THEMES/OUTREACH; Home ACCENTS.rust; Publications HIGHLIGHT_BORDER; News Opportunities; Opportunities Global; Outreach 248; CollaboratorMap 122; STOPS |
| `#BB3E03` / `#bb3e03` | `#A94E2D` | `TERRACOTTA_DARK` | Home ACCENTS.brick; STOPS |
| `#AE2012` / `#ae2012` | `#AD4533` | `PALETTE.rust` | site.ts THEMES/OUTREACH; Home ACCENTS.red; News Award; STOPS |
| `#FAD103` / `#fad103` | `#DA7448` | `PALETTE.terracotta` | favicon.svg (done), config comments |
| `#02B8A6` / `#02b8a6` | `#9DB08A` | `PALETTE.sage` | favicon.svg (done), config comments |
| `#FA6A03` / `#fa6a03` | `#C76841` | `PALETTE.clay` | favicon.svg (done), config comments |
| `#B80502` / `#b80502` | `#AD4533` | `PALETTE.rust` | favicon.svg (done), config comments |
| `rgba(250,209,3,0.6)` | `rgba(218,116,72,0.6)` | `GLOW` | ui.tsx 106 GradientButton hover glow |
| `#6B7280` / `#6b7280` | `#8C8A74` | `NEUTRAL[500]` | Publications.tsx 16, 143; CollaboratorMap 186, 189 |
| `#9CA3AF` / `#9ca3af` | `#A6A38D` | `NEUTRAL[400]` | CollaboratorMap 182 legend text |
| `#0A0A0A` / `#0a0a0a` | `#171A12` | `PALETTE.ink` | index.css (done); CollaboratorMap 159 stroke; favicon (done); scripts/make-favicon.mjs 59; scripts/prepare-logo.mjs 7 comment |
| `#141414` | `#20241A` | `PALETTE.panel` | config (done) |
| `#242424` | `#33392A` | `PALETTE.edge` | config (done) |
| `#111` / `#111111` | `#20241A` | `PALETTE.panel` | CollaboratorMap 127 `bg-[#111]` → use `bg-panel`; 145 sphere fill |
| `#1E1E1E` / `#1e1e1e` | `#33392A` | `PALETTE.edge` | CollaboratorMap 152 empty-country fill |
| `#2e2e2e` | `#45473A` | `NEUTRAL[700]` | index.css scrollbar thumb (done) |
| `#f2f2f2` | `#F2EDE0` | `BODY_TEXT` | index.css body text (done) |
| `#FFFFFF` | unchanged | — | CollaboratorMap 159 stroke |

CollaboratorMap's `STOPS` array duplicates the ramp: replace the whole array
with `BRAND_STOPS` from `palette.ts` rather than mapping literal by literal,
because the new ramp inserts `olive` and `ochre` and drops `mint`/`brick`, so
a literal-by-literal swap would leave the map's ramp different from the CSS.

## 5. Guidance for other agents

Use the Tailwind classes first: `text-gold` / `border-gold/40` / `bg-gold`
now mean terracotta, `text-cyan` means sage, `text-ember` means clay,
`bg-panel` / `border-edge` / `bg-ink` are the olive surfaces, and
`text-neutral-300/400/500` are already warm — do not add `stone-*` or
`gray-*` classes. Where the source passes a colour as a prop or inline style
(`accent`, `color`, `KIND_COLOUR`, `TAG_COLOUR`, `SCOPE_COLOUR`, `ACCENTS`,
`STOPS`), `import { PALETTE, NEUTRAL, BRAND_STOPS, GLOW, OLD_TO_NEW } from
"../content/palette"` and use the named value (`PALETTE.terracotta`,
`PALETTE.sage`, …) instead of a hex literal, so the next retint is one file.
Keep rust (`crimson`) to large text, rules and fills; keep dark text
(`text-ink`) only on terracotta, ochre, sage, bone and pale sage, never on
deep olive. Do not reintroduce `congenial` or the Typekit link; the display
stack is Space Grotesk → Inter. When writing new colour into a comment or a
data file, use the uppercase form (`#DA7448`) in TypeScript and lowercase in
CSS, matching the source.
