/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      /*
       * Noble Lab palette, light theme (28 Aug 2026): warm bone paper with
       * terracotta, sage/olive, ochre and rust. Photographs fade into the
       * pale page; cards are near-white panels with a hairline olive edge.
       *
       * The eleven token names are kept from the source project so nothing
       * had to be renamed across the components; only their values changed.
       * Role mapping (token -> role on the light page):
       *   gold    -> terracotta, primary accent: links, eyebrows, hover, --accent
       *   cyan    -> sage/olive green, secondary accent
       *   ember   -> ochre, tertiary accent
       *   crimson -> rust, alert and emphasis
       *   deep    -> deep olive, first gradient stop; fills and dark accents
       *   mint    -> pale sage tint, fills only
       *   sand    -> pale terracotta tint, fills only
       *   brick   -> dark terracotta, hover state and solid buttons
       *   ink     -> page ground, warm bone paper
       *   panel   -> card surface, near-white warm
       *   edge    -> hairline olive-grey border
       *   charcoal (new) -> primary text, deep olive-charcoal
       * Contrast ratios live in src/content/palette.ts.
       */
      colors: {
        gold: "#B04826", // primary accent: terracotta (4.9:1 on ink)
        cyan: "#587248", // secondary accent: sage/olive (4.8:1 on ink)
        ember: "#8C6518", // tertiary accent: ochre (4.7:1 on ink)
        crimson: "#8F3620", // alert and emphasis: rust (6.9:1 on ink)
        deep: "#3E4A2E", // deep olive: first gradient stop, dark fills (8.4:1 on ink)
        mint: "#DCE5D0", // pale sage tint, fills only
        sand: "#F3DCCB", // pale terracotta tint, fills only
        brick: "#9A3F22", // dark terracotta: hover, solid buttons (6.0:1 on ink)
        ink: "#F5F1E7", // page ground: warm bone paper
        panel: "#FFFDF8", // card surface: near-white warm
        edge: "#DED7C6", // hairline border: olive-grey
        charcoal: "#1F2419", // primary text: deep olive-charcoal (14.1:1 on ink)
        /*
         * Dark olive-greys replacing Tailwind's zero-saturation neutral scale,
         * so the ~120 text-neutral-* usages read as dark olive text on the
         * bone page without touching a single class. The scale is inverted
         * relative to a dark theme: low numbers are dark text, high numbers
         * are pale surfaces.
         * neutral-300 on ink 8.8:1, neutral-400 6.3:1, neutral-500 4.8:1.
         */
        neutral: {
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
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.09)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "slow-zoom": "slow-zoom 22s ease-out forwards",
        shimmer: "shimmer 7s linear infinite",
      },
    },
  },
  plugins: [],
};
