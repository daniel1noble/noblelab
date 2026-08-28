import type { ReactNode } from "react";
import type { IconName } from "../content/site";

type SvgProps = {
  width: number;
  height: number;
  viewBox: string;
  fill: string;
  "aria-hidden": true;
};

/**
 * One glyph per icon name. The table is keyed by plain string so that adding a
 * name to `IconName` in site.ts never breaks the build: an unknown name falls
 * back to the generic link glyph rather than to nothing.
 */
function glyph(name: string, common: SvgProps): ReactNode {
  switch (name) {
    case "scholar":
      return (
        <svg {...common}>
          <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      );
    case "orcid":
      return (
        <svg {...common}>
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 18.16H5.63V7.42h1.74v10.74zM6.5 6.24a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02zm5.62 11.92H9.44V7.42h4.19c3.99 0 5.74 2.85 5.74 5.38 0 2.75-2.15 5.36-5.72 5.36h-1.53zm1.4-9.16h-2.34v7.58h2.3c2.66 0 3.98-1.77 3.98-3.79 0-1.85-1.14-3.79-3.94-3.79z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M12 .5C5.73.5.9 5.34.9 11.6c0 4.9 3.17 9.06 7.57 10.53.55.1.75-.24.75-.53v-2.05c-3.08.67-3.73-1.3-3.73-1.3-.5-1.29-1.23-1.63-1.23-1.63-1-.69.08-.68.08-.68 1.11.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.46-.28-5.05-1.24-5.05-5.5 0-1.22.43-2.21 1.15-2.99-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.07 1.14a10.6 10.6 0 0 1 5.6 0c2.12-1.44 3.06-1.14 3.06-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.21-5.07 5.49.4.35.76 1.03.76 2.08v3.08c0 .3.2.64.76.53a11.11 11.11 0 0 0 7.56-10.53C23.1 5.34 18.27.5 12 .5z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
        </svg>
      );
    case "bluesky":
      return (
        <svg {...common}>
          <path d="M5.77 3.15C8.42 5.14 11.27 9.17 12 11.34c.73-2.17 3.58-6.2 6.23-8.19C20.14 1.72 23 .58 23 3.85c0 .65-.37 5.5-.59 6.29-.76 2.74-3.55 3.43-6.04 3.01 4.35.74 5.46 3.2 3.07 5.65-4.54 4.66-6.52-1.17-7.03-2.66-.09-.28-.14-.4-.14-.28 0-.12-.05 0-.14.28-.51 1.49-2.49 7.32-7.03 2.66-2.39-2.45-1.28-4.91 3.07-5.65-2.49.42-5.28-.27-6.04-3.01C1.37 9.35 1 4.5 1 3.85c0-3.27 2.86-2.13 4.77-.7z" />
        </svg>
      );
    case "x":
    case "twitter":
      return (
        <svg {...common}>
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
        </svg>
      );
    case "researchgate":
      return (
        <svg {...common}>
          <path d="M19.59 0H4.41A4.41 4.41 0 0 0 0 4.41v15.18A4.41 4.41 0 0 0 4.41 24h15.18A4.41 4.41 0 0 0 24 19.59V4.41A4.41 4.41 0 0 0 19.59 0zM8.2 14.62c-.53 0-.96-.16-1.29-.48-.33-.32-.5-.75-.5-1.29V9.5c0-.54.17-.97.5-1.29.33-.32.76-.48 1.29-.48.52 0 .95.16 1.28.48.33.32.5.75.5 1.29v.34h-.98V9.5c0-.28-.07-.49-.22-.63-.15-.15-.34-.22-.58-.22s-.44.07-.59.22c-.14.14-.22.35-.22.63v3.35c0 .28.08.49.22.64.15.14.35.21.59.21s.43-.07.58-.21c.15-.15.22-.36.22-.64v-1.1h-.8v-.9h1.78v2c0 .54-.17.97-.5 1.29-.33.32-.76.48-1.28.48zm8.53 2.13-1.62-2.9c-.14.02-.29.03-.44.03h-1.4v2.87h-1.06V7.83h2.46c.94 0 1.66.24 2.16.72.5.48.75 1.14.75 1.98 0 .6-.13 1.11-.4 1.53-.26.42-.64.72-1.14.9l1.83 3.79h-1.14zm-1.99-3.85c.61 0 1.07-.15 1.38-.45.31-.31.46-.75.46-1.32 0-.58-.15-1.01-.46-1.31-.31-.3-.77-.45-1.38-.45h-1.47v3.53h1.47z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "cv":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 2.5h8l4.5 4.5v14.5H6z" />
          <path d="M14 2.5V7h4.5M9 12h6M9 16h6" />
        </svg>
      );
    case "globe":
    case "website":
    case "tea":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3C9.5 5.6 9.5 18.4 12 21" />
        </svg>
      );
    default:
      // Generic chain link for any name without a bespoke glyph.
      return (
        <svg
          {...common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
          <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
        </svg>
      );
  }
}

/** Single-path glyphs, sized by the `size` prop and inheriting currentColor. */
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common: SvgProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };
  return <>{glyph(name, common)}</>;
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Left-pointing twin of ArrowRight, for the gallery lightbox. */
export function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function Close({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
