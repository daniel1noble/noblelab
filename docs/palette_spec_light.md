# Noble Lab palette specification — light theme

Written 2026-08-28 by the light-theme agent, replacing the dark-first table in
`palette_spec.md` after Daniel's feedback that the first build sat too close to
Patrice Pottier's near-black-and-amber site. Structure, motion, fonts (Inter
body, Space Grotesk display) and the photo-fade treatment are unchanged; the
page is now warm bone paper with terracotta, sage/olive, ochre and rust.

The same values live in three places that must be changed together:

- `noblelab-site/tailwind.config.cjs` — Tailwind tokens (`gold`, `cyan`, …, `ink`, `panel`, `edge`, new `charcoal`) and the overridden `neutral` scale
- `noblelab-site/src/index.css` — `:root` CSS variables (`--gold`, `--cyan`, `--ember`, `--crimson`, `--ink`, `--charcoal`, `--accent`, `--brand-stops`), the html/body colours, `::selection`, focus ring, scrollbar and `.card`
- `noblelab-site/src/content/palette.ts` — `PALETTE`, `NEUTRAL`, `BRAND_STOPS`, `MAP_STOPS`, `GLOW`, `BODY_TEXT`, `TERRACOTTA_DARK` for inline styles and props

Plus `noblelab-site/public/favicon.svg` (paper rounded square, terracotta N,
olive underline).

## 1. Token table

Token names are unchanged so the existing class usages retint by value alone.
Values differ slightly from the orchestrator's first suggestions (`gold`
#B94E2A, `cyan` #5F7A4E, `ember` #A67A24, `neutral-500` #6B7160) because those
fell just short of 4.5:1 on the bone page (4.45, 4.25, 3.43 and 4.48
respectively); each was darkened until it passed.

| Tailwind token | Role on the light page | Dark value (old) | Light value (new) | palette.ts name |
|---|---|---|---|---|
| `gold` | primary accent: links, eyebrows, hover, `--accent`, active pills | `#DA7448` | `#B04826` | `terracotta` |
| `cyan` | secondary accent: sage/olive green | `#9DB08A` | `#587248` | `sage` |
| `ember` | tertiary accent: ochre | `#C76841` | `#8C6518` | `ochre` |
| `crimson` | alert / emphasis: rust | `#AD4533` | `#8F3620` | `rust` |
| `deep` | deep olive, first gradient stop, dark fills and the "Media" chip | `#4F5D3A` | `#3E4A2E` | `oliveDeep` |
| `mint` | pale sage tint, fills only | `#C9D5B5` | `#DCE5D0` | `sageLight` |
| `sand` | pale terracotta tint, fills only | `#EDE4CC` | `#F3DCCB` | `sand` |
| `brick` | dark terracotta: hover state, GradientButton hover fill | `#A94E2D` | `#9A3F22` | `TERRACOTTA_DARK` |
| `ink` | page ground: warm bone paper | `#171A12` | `#F5F1E7` | `ink` |
| `panel` | card surface: near-white warm | `#20241A` | `#FFFDF8` | `panel` |
| `edge` | hairline olive-grey border | `#33392A` | `#DED7C6` | `edge` |
| `charcoal` (new) | primary text: headings, wordmark "Lab", body default | — | `#1F2419` | `charcoal` |
| — (palette.ts only) | light olive, 40% gradient stop; map ramp | `#6B7A4B` (olive) | `#7A9060` | `olive` |

CSS variables in `index.css`: `--gold #b04826`, `--cyan #587248`,
`--ember #8c6518`, `--crimson #8f3620`, `--ink #f5f1e7`, `--charcoal #1f2419`,
`--accent #b04826`.

Gradient (`--brand-stops`, six stops, no pale stop because bone would vanish
on paper): deep olive → sage → light olive → ochre → terracotta → rust.

```
#3e4a2e 0%, #587248 22%, #7a9060 40%, #8c6518 58%, #b04826 78%, #8f3620 100%
```

Choropleth ramp for the collaborator map (`MAP_STOPS`, pale sage → light
olive → ochre → terracotta → rust): `#DCE5D0, #7A9060, #8C6518, #B04826,
#8F3620`. Ocean is `ink`, countries with no co-authors are `panel`, borders
are `edge`, the selected country is outlined in `charcoal`.

Other fixed colours in `index.css`: `::selection` is ink text on `--gold`;
focus ring `--gold`; scrollbar track `#f5f1e7` (ink), thumb `#ded7c6` (edge),
thumb hover `--gold`; `.card` is `panel` with an `edge` border and shadows
`0 1px 2px rgba(31,36,25,.06), 0 8px 24px rgba(31,36,25,.06)` (slightly
deeper on hover, border `gold/50`). `GLOW` (GradientButton hover halo) is
`rgba(176,72,38,0.45)`. The `.feather-edges` mask gradients stay pure black:
they are alpha masks and now dissolve photographs into the paper.

## 2. Neutral scale

Tailwind's `neutral` scale is overridden with dark olive-greys so the
`text-neutral-*` usages read as dark text on the bone page without touching a
class. The scale is inverted relative to the dark build: low numbers are dark
text, high numbers are pale surfaces.

| Shade | Dark build | Light build | Typical use |
|---|---|---|---|
| 50 | `#F7F4EB` | `#F7F3EA` | — |
| 100 | `#EFEBDD` | `#F4EFE4` | — |
| 200 | `#E0DAC6` | `#2C3125` | menu items, ghost-button labels, row titles |
| 300 | `#CDC7B0` | `#3F4536` | body copy (`.prose-dark p`), nav links, leads |
| 400 | `#A6A38D` | `#545A49` | card copy, author lines |
| 500 | `#8C8A74` | `#666C5B` | captions, dates, table headers, footer |
| 600 | `#62604F` | `#7F8474` | placeholders, faint metadata |
| 700 | `#45473A` | `#9A9E90` | ghost-button borders, filter pills, link decorations |
| 800 | `#30332A` | `#C9C4B4` | — |
| 900 | `#22251D` | `#E4DFD0` | — |
| 950 | `#14160F` | `#F0EBDF` | — |

## 3. Contrast ratios (WCAG 2.x relative luminance)

Computed with `contrast_light.py` (scratchpad); rounded to two decimals. Every
pair the brief required passes: neutral-300/400/500 on ink ≥ 4.5:1 (300 ≥
7:1), gold on ink ≥ 4.5:1, cyan on ink ≥ 4.5:1, ink text on gold and brick
buttons ≥ 4.5:1, charcoal on panel ≥ 12:1.

| Pair | Colours | Ratio | Target | Result |
|---|---|---|---|---|
| neutral-300 on ink (body copy, .prose-dark p, leads) | `#3F4536` on `#F5F1E7` | 8.80:1 | 7 | pass |
| neutral-200 on ink (menu items, ghost buttons) | `#2C3125` on `#F5F1E7` | 11.84:1 | 7 | pass |
| neutral-400 on ink (card copy, author lines) | `#545A49` on `#F5F1E7` | 6.34:1 | 4.5 | pass |
| neutral-500 on ink (captions, dates) | `#666C5B` on `#F5F1E7` | 4.82:1 | 4.5 | pass |
| neutral-600 on ink (placeholders, faint metadata) | `#7F8474` on `#F5F1E7` | 3.41:1 | 3 | pass |
| neutral-700 on ink (ghost-button borders, decorative) | `#9A9E90` on `#F5F1E7` | 2.43:1 | none | pass |
| charcoal on ink (headings, body default) | `#1F2419` on `#F5F1E7` | 14.06:1 | 12 | pass |
| charcoal on panel (headings inside cards) | `#1F2419` on `#FFFDF8` | 15.59:1 | 12 | pass |
| neutral-300 on panel | `#3F4536` on `#FFFDF8` | 9.76:1 | 7 | pass |
| neutral-400 on panel | `#545A49` on `#FFFDF8` | 7.04:1 | 4.5 | pass |
| neutral-500 on panel | `#666C5B` on `#FFFDF8` | 5.35:1 | 4.5 | pass |
| gold / terracotta on ink (links, eyebrows) | `#B04826` on `#F5F1E7` | 4.90:1 | 4.5 | pass |
| gold / terracotta on panel (chips, links in cards) | `#B04826` on `#FFFDF8` | 5.43:1 | 4.5 | pass |
| cyan / sage on ink | `#587248` on `#F5F1E7` | 4.76:1 | 4.5 | pass |
| cyan / sage on panel | `#587248` on `#FFFDF8` | 5.28:1 | 4.5 | pass |
| ember / ochre on ink | `#8C6518` on `#F5F1E7` | 4.67:1 | 4.5 | pass |
| ember / ochre on panel | `#8C6518` on `#FFFDF8` | 5.18:1 | 4.5 | pass |
| crimson / rust on ink | `#8F3620` on `#F5F1E7` | 6.85:1 | 4.5 | pass |
| deep / deep olive on ink | `#3E4A2E` on `#F5F1E7` | 8.37:1 | 4.5 | pass |
| brick / dark terracotta on ink | `#9A3F22` on `#F5F1E7` | 5.99:1 | 4.5 | pass |
| olive (40% gradient stop) on ink, large gradient text only | `#7A9060` on `#F5F1E7` | 3.11:1 | 3 | pass |
| ink text on gold (active filter pills, skip link) | `#F5F1E7` on `#B04826` | 4.90:1 | 4.5 | pass |
| ink text on brick (GradientButton hover) | `#F5F1E7` on `#9A3F22` | 5.99:1 | 4.5 | pass |
| panel text on gold | `#FFFDF8` on `#B04826` | 5.43:1 | 4.5 | pass |
| white on gold (not used; reference) | `#FFFFFF` on `#B04826` | 5.52:1 | 4.5 | pass |
| charcoal on ember (gradient stop, reference) | `#1F2419` on `#8C6518` | 3.01:1 | 3 | pass |
| charcoal on olive (gradient stop, reference) | `#1F2419` on `#7A9060` | 4.52:1 | 3 | pass |
| edge against ink (hairline visibility) | `#DED7C6` on `#F5F1E7` | 1.27:1 | none | pass |
| edge against panel | `#DED7C6` on `#FFFDF8` | 1.41:1 | none | pass |
| panel against ink (card lift) | `#FFFDF8` on `#F5F1E7` | 1.11:1 | none | pass |
| mint against ink (fill) | `#DCE5D0` on `#F5F1E7` | 1.15:1 | none | pass |
| sand against ink (fill) | `#F3DCCB` on `#F5F1E7` | 1.17:1 | none | pass |

Notes:

- `olive` (`#7A9060`, the 40% gradient stop) is 3.11:1 on ink. It only ever
  appears as a stop inside large gradient headings (`.brand-title`,
  `.brand-text`, the wordmark) and in the map ramp, never as small text.
- The dark build's one failure (ink text on the deep-olive 0% stop under
  `GradientButton` hover) is gone: the button now fills with `brick` on hover
  and shows ink text (5.99:1) instead of letting the ramp show through.
- `neutral-600` is 3.41:1 on ink and is used only for placeholders and the
  faint "n joint works" line in the map's country panel.

## 4. Component conversions made in `src/`

- `text-white` → `text-charcoal` everywhere (45 occurrences). No `text-white`
  remains: the two solid-button states use `text-ink` (paper) on `gold`
  (active filter pills, skip link) or on `brick` (GradientButton hover).
- `hover:text-white` → `hover:text-brick` on terracotta links, otherwise
  `hover:text-charcoal`.
- `bg-white` → `bg-panel` (Teaching iframe surround); `bg-white/[0.04]` →
  `bg-charcoal/5`; `from-white/[0.05]` → `from-charcoal/5` (Join box).
- `border-white/5`, `/10`, `/20` → `border-edge`.
- Header scrolled state: `border-edge bg-ink/70 backdrop-blur-xl` with a
  1px shadow; Footer `bg-panel`.
- Home hero left wash: `from-ink from-20% via-ink/90 via-45% to-ink/10`, so
  the paper holds ~95% across the left third where the copy sits.
- Publications sticky filter bar: `border-edge bg-ink/90` plus a soft shadow.
- Chip / tag colours that were pale on the dark build (`bone`, `sageLight`)
  were remapped to readable accents: preprints → ochre, chapters → sage,
  "Media" tag → deep olive, "Paper"/"Lab" tags → terracotta (matching
  News.tsx). `PALETTE.clay` was renamed `PALETTE.ochre`; the fourth research
  theme accent moved from ochre to rust so the four themes stay distinct
  (terracotta, sage, ochre, rust).
- CollaboratorMap: ocean `ink`, empty countries `panel`, borders `edge`,
  selected outline `charcoal`, ramp `MAP_STOPS`, tooltip `bg-panel/95`.
- NotFound numeral `text-gold/30`.

## 5. Guidance for other agents

Use the Tailwind classes first: `text-charcoal` for headings and strong
text, `text-neutral-300` for body copy, `text-neutral-400/500` for secondary
copy and captions, `text-gold` / `text-cyan` / `text-ember` / `text-crimson`
for accents, `bg-panel` + `border-edge` for surfaces, `bg-ink` for the page.
Never put `text-mint`, `text-sand`, `text-neutral-700` or lighter on the page
as text. Dark text on a solid accent is only safe on `mint`, `sand` and
`olive`; on `gold`, `brick`, `cyan`, `ember`, `crimson` and `deep` use
`text-ink` (paper). Photographs fade into the page through `from-ink`
washes and `.feather-edges`; a photograph with a dark left edge under hero
copy needs the wash raised, not the text lightened.
