import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "../content/site";
import LogoMark from "./LogoMark";

/** Home is reached through the wordmark, so it has no item of its own. */
const NAV = [
  { to: "/research", label: "Research" },
  { to: "/people", label: "People" },
  { to: "/publications", label: "Publications" },
  { to: "/software", label: "Software" },
  { to: "/teaching", label: "Teaching" },
  { to: "/gallery", label: "Gallery" },
  { to: "/opportunities", label: "Join us" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

/**
 * The lab name as a wordmark: "Noble" in the brand gradient, "Lab" plain.
 * `className` styles the whole mark (size, weight, tracking); `accentClassName`
 * replaces the gradient on "Noble" where a page wants it in a flat colour.
 */
export function Wordmark({
  className = "",
  accentClassName = "brand-title",
}: {
  className?: string;
  accentClassName?: string;
}) {
  return (
    <span className={`inline-flex items-baseline gap-[0.3em] whitespace-nowrap ${className}`}>
      <span className={`font-display font-black leading-none tracking-tight ${accentClassName}`}>
        Noble
      </span>
      <span className="font-display font-normal leading-none text-charcoal">Lab</span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // The bar is always fixed; past 24px it gains a background so text stays legible.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Stop the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-edge bg-ink/70 shadow-[0_1px_2px_rgba(31,36,25,0.05)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/80 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-[96px] w-full max-w-content items-center justify-between px-5 sm:px-8">
          {/* Colours stay put on hover; only the weight changes. */}
          <Link to="/" className="group flex items-center gap-3.5" aria-label="Noble Lab, home">
            <LogoMark size={62} priority />
            <span className="block">
              <Wordmark className="text-[31px] sm:text-[34px]" />
              <span className="mt-1 hidden whitespace-nowrap text-[11px] font-medium leading-tight tracking-wide text-charcoal transition-all duration-200 group-hover:font-semibold sm:block">
                {SITE.strapline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `link-underline whitespace-nowrap text-[14px] font-medium transition-colors xl:text-[15px] ${
                    isActive ? "text-gold" : "text-neutral-300 hover:text-charcoal"
                  }`
                }
              >
                {({ isActive }) => (
                  <span data-active={isActive} className="link-underline">
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600 text-neutral-200 transition hover:border-gold hover:text-gold lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-[2px] w-5 bg-current transition-all duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>

        {/* the brand-gradient hairline that runs under the header on every page */}
        <div className="brand-gradient h-[2px] w-full opacity-70" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Starts below the 98px fixed header and scrolls if the list is taller
                than the viewport, so every link is reachable on a short phone. */}
            <nav className="flex min-h-full flex-col justify-start gap-0.5 px-8 pb-10 pt-[116px]">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
              >
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `block border-b border-edge py-2.5 font-display text-2xl font-semibold ${
                      isActive ? "text-gold" : "text-neutral-200"
                    }`
                  }
                >
                  Home
                </NavLink>
              </motion.div>
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.095 + i * 0.045, duration: 0.4 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block border-b border-edge py-2.5 font-display text-2xl font-semibold ${
                        isActive ? "text-gold" : "text-neutral-200"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.p
                className="mt-8 text-sm text-neutral-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {SITE.university} · {SITE.city}
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
