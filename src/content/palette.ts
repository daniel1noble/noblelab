/**
 * Noble Lab palette, light theme: warm bone paper with terracotta, sage/olive,
 * ochre and rust.
 *
 * Single source of truth for inline styles. The same values are declared as
 * Tailwind tokens in tailwind.config.cjs (gold = terracotta, cyan = sage,
 * ember = ochre, crimson = rust, deep = oliveDeep, mint = sageLight,
 * sand = sand, brick = terracottaDark, ink / panel / edge / charcoal) and as
 * CSS variables in src/index.css. Change all three together.
 *
 * Prefer the Tailwind classes (text-gold, border-cyan/40, bg-panel) wherever a
 * class will do; reach for PALETTE only where the source passes a colour as a
 * prop or an inline style. Every accent below is dark enough for small text
 * on the page and on a panel, except sageLight, sand and olive, which are
 * fills and gradient stops only.
 */
export const PALETTE = {
  terracotta: "#B04826", // primary accent (Tailwind: gold). 4.9:1 on ink, 5.4:1 on panel.
  ochre: "#8C6518", // tertiary accent (Tailwind: ember). 4.7:1 on ink, 5.2:1 on panel.
  rust: "#8F3620", // alert / emphasis (Tailwind: crimson). 6.9:1 on ink.
  sage: "#587248", // secondary accent (Tailwind: cyan). 4.8:1 on ink, 5.3:1 on panel.
  sageLight: "#DCE5D0", // pale sage tint (Tailwind: mint). Fills only; never text.
  olive: "#7A9060", // light olive; 40% gradient stop and decorative fills. 3.1:1 on ink.
  oliveDeep: "#3E4A2E", // deep olive (Tailwind: deep). First gradient stop; 8.4:1 on ink.
  sand: "#F3DCCB", // pale terracotta tint (Tailwind: sand). Fills only; never text.
  ink: "#F5F1E7", // page ground, warm bone paper.
  panel: "#FFFDF8", // card surface, near-white warm.
  edge: "#DED7C6", // hairline border, olive-grey.
  charcoal: "#1F2419", // primary text, deep olive-charcoal. 14.1:1 on ink.
} as const;

/** Dark terracotta (Tailwind: brick), hover state and solid buttons. 6.0:1 on ink. */
export const TERRACOTTA_DARK = "#9A3F22";

/**
 * Dark olive-greys; these are Tailwind's `neutral` scale in this build. Low
 * numbers are dark text, high numbers are pale surfaces, so text-neutral-300
 * is body copy and neutral-900 is a faint fill.
 */
export const NEUTRAL = {
  50: "#F7F3EA",
  100: "#F4EFE4",
  200: "#2C3125",
  300: "#3F4536",
  400: "#545A49",
  500: "#666C5B",
  600: "#7F8474",
  700: "#9A9E90",
  800: "#C9C4B4",
  900: "#E4DFD0",
  950: "#F0EBDF",
} as const;

/** Body text colour set on html/body/#root in index.css. */
export const BODY_TEXT = PALETTE.charcoal;

/**
 * The six brand-gradient stops, identical to `--brand-stops` in index.css.
 * Deep olive -> sage -> light olive -> ochre -> terracotta -> rust. There is
 * no pale stop: bone would vanish against the paper.
 */
export const BRAND_STOPS: readonly string[] = [
  PALETTE.oliveDeep, // 0%
  PALETTE.sage, // 22%
  PALETTE.olive, // 40%
  PALETTE.ochre, // 58%
  PALETTE.terracotta, // 78%
  PALETTE.rust, // 100%
];

/**
 * Choropleth ramp for CollaboratorMap: pale sage for one co-author through
 * to rust for the most. Lightness falls monotonically so the count reads at
 * a glance on the paper ocean.
 */
export const MAP_STOPS: readonly string[] = [
  PALETTE.sageLight,
  PALETTE.olive,
  PALETTE.ochre,
  PALETTE.terracotta,
  PALETTE.rust,
];

/** Terracotta at 45% alpha, for the GradientButton hover glow (ui.tsx). */
export const GLOW = "rgba(176,72,38,0.45)";
