import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY, type GalleryPhoto } from "../content/site";
import { Container, PageHero, Reveal, SectionHeading } from "../components/ui";
import { ArrowLeft, ArrowRight, Close } from "../components/Icons";
import { publicUrl } from "../lib/publicUrl";

/* -------------------------------------------------------------- lightbox */

function Lightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Keyboard: Escape closes, arrows step, Tab cycles within the dialog. Focus
  // lands on the close button so the dialog is reachable without a mouse, and
  // the page cannot scroll behind.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])"
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        const inside = dialogRef.current?.contains(active) ?? false;
        if (e.shiftKey && (active === first || !inside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !inside)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, onStep]);

  const navButton =
    "flex h-11 w-11 items-center justify-center rounded-full border border-edge bg-ink/70 text-charcoal backdrop-blur transition hover:border-gold hover:text-gold";

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ?? photo.alt}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className={`${navButton} absolute right-4 top-4 sm:right-6 sm:top-6`}
      >
        <Close />
      </button>

      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            aria-label="Previous photo"
            className={`${navButton} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            aria-label="Next photo"
            className={`${navButton} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
          >
            <ArrowRight />
          </button>
        </>
      )}

      <figure
        className="flex max-h-full max-w-6xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={photo.src}
          src={publicUrl(photo.src)}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="max-h-[80vh] w-auto max-w-full rounded-xl border border-edge object-contain"
        />
        <figcaption className="mt-4 text-center text-sm text-neutral-300">
          {photo.caption && <span className="font-medium text-charcoal">{photo.caption}</span>}
          <span className="ml-3 text-neutral-500">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ grid */

function PhotoGrid({ photos, onOpen }: { photos: GalleryPhoto[]; onOpen: (i: number) => void }) {
  return (
    // CSS columns give a masonry-like flow without any layout library; each
    // thumbnail keeps its own aspect ratio through width/height.
    <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
      {photos.map((p, i) => (
        <button
          key={p.src}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={p.caption ? `Open photo: ${p.caption}` : `Open photo: ${p.alt}`}
          className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-edge bg-panel text-left transition hover:border-gold/60"
        >
          <img
            src={publicUrl(p.thumb)}
            alt={p.alt}
            width={p.width}
            height={p.height}
            loading="lazy"
            className="h-auto w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
          {p.caption && (
            <span className="block px-3 py-2 text-xs font-medium text-neutral-300">
              {p.caption}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------- moving gallery */

/** Every photograph on the page, in section order. The moving gallery draws
 *  from all of it, and so does the lightbox it opens. */
const ALL_PHOTOS: GalleryPhoto[] = GALLERY.flatMap((s) => s.photos);

/** Three photographs on screen at once. One slot changes every STEP_MS, so a
 *  given photograph holds its place for SLOTS * STEP_MS = 6 s and the three
 *  never turn over together. */
const SLOTS = 3;
const STEP_MS = 2000;
const FADE_S = 0.9;

/** A tiny deterministic generator. The opening three photographs are therefore
 *  identical in the prerendered HTML and in the first client render, so no
 *  hydration mismatch is possible; the rest of the order is reshuffled once the
 *  page is live (see the effect in MovingGallery). */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items: number[], rand: () => number): number[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    const swap = a[i];
    a[i] = a[j];
    a[j] = swap;
  }
  return a;
}

const INITIAL_ORDER = shuffle(
  ALL_PHOTOS.map((_, i) => i),
  mulberry32(ALL_PHOTOS.length),
);

/** Three photographs, one of which quietly changes every couple of seconds.
 *  Hovering or tabbing into it holds it still, and a reader who has asked for
 *  reduced motion gets three photographs that never move at all. */
function MovingGallery({ onOpen }: { onOpen: (photoIndex: number) => void }) {
  const total = ALL_PHOTOS.length;

  // `order` is a permutation of indices into ALL_PHOTOS; `slots` holds the
  // position in that order each of the three boxes is showing, and `head` is
  // the next position to hand out.
  const [order, setOrder] = useState<number[]>(INITIAL_ORDER);
  const [rot, setRot] = useState(() => ({
    slots: Array.from({ length: SLOTS }, (_, i) => i % total),
    head: SLOTS % total,
    tick: 0,
  }));
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);

  // Reshuffle everything the three opening boxes are not already showing, so
  // the run of photographs differs from load to load without anything swapping
  // under the reader at hydration.
  useEffect(() => {
    setOrder((prev) => [...prev.slice(0, SLOTS), ...shuffle(prev.slice(SLOTS), Math.random)]);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // Warm the photograph that is next in the queue, so a crossfade never lands
  // on an empty box while its thumbnail is still on the wire.
  useEffect(() => {
    const upcoming = ALL_PHOTOS[order[rot.head]];
    if (upcoming) new Image().src = publicUrl(upcoming.thumb);
  }, [order, rot.head]);

  useEffect(() => {
    if (still || paused || total <= SLOTS) return;
    const id = window.setInterval(() => {
      setRot(({ slots, head, tick }) => {
        const next = slots.slice();
        next[tick % SLOTS] = head;
        return { slots: next, head: (head + 1) % total, tick: tick + 1 };
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [still, paused, total]);

  // One box on a phone, two on a small tablet, three from large up. The hidden
  // boxes stay in the DOM so the rotation keeps its rhythm.
  const visibility = ["", "hidden sm:block", "hidden lg:block"];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="A rotating selection of photographs from the lab and the field"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rot.slots.map((position, slot) => {
          const photo = ALL_PHOTOS[order[position]];
          return (
            <div key={slot} aria-live="off" className={visibility[slot]}>
              <button
                type="button"
                onClick={() => onOpen(order[position])}
                aria-label={
                  photo.caption ? `Open photo: ${photo.caption}` : `Open photo: ${photo.alt}`
                }
                className="group block w-full overflow-hidden rounded-xl border border-edge bg-panel text-left transition hover:border-gold/60"
              >
                {/* A fixed 4:3 box, so nothing on the page moves when the
                    photograph inside it changes. */}
                <span className="relative block aspect-[4/3] w-full overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={photo.src}
                      src={publicUrl(photo.thumb)}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: still ? 0 : FADE_S, ease: "easeInOut" }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </AnimatePresence>
                </span>
                {/* The caption bar keeps its height whether or not this
                    photograph carries a caption. */}
                <span className="relative block h-9">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={photo.src}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: still ? 0 : FADE_S, ease: "easeInOut" }}
                      className="absolute inset-x-3 top-2.5 block truncate text-xs font-medium text-neutral-300"
                    >
                      {photo.caption ?? ""}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

/** Which set of photographs the lightbox is stepping through: one section's,
 *  or every photograph on the page when it was opened from the carousel. */
type Opened = { scope: "all" | number; index: number };

function photosIn(o: Opened): GalleryPhoto[] {
  return o.scope === "all" ? ALL_PHOTOS : GALLERY[o.scope].photos;
}

export default function Gallery() {
  const [open, setOpen] = useState<Opened | null>(null);
  const [showAll, setShowAll] = useState(false);
  const lastTrigger = useRef<HTMLElement | null>(null);

  // #all opens the full grid straight away, so the whole set stays linkable.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#all") setShowAll(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    // Hand focus back to the thumbnail that opened the lightbox.
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setOpen((o) => {
      if (!o) return o;
      const n = photosIn(o).length;
      return { ...o, index: (o.index + delta + n) % n };
    });
  }, []);

  const rememberTrigger = (e: MouseEvent<HTMLElement>) => {
    const btn = (e.target as HTMLElement).closest("button");
    if (btn) lastTrigger.current = btn;
  };

  // GhostButton in ui.tsx only renders a link, and this control is a toggle, so
  // its classes are repeated here rather than the component reused.
  const ghost =
    "inline-flex items-center gap-2 rounded-full border border-neutral-600 px-6 py-3 text-[15px] font-medium text-neutral-200 transition hover:border-gold hover:text-gold";

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Research photos"
        image="/images/bg-gallery-painted-dragon.jpg"
        mobileImage="/images/bg-gallery-painted-dragon-mobile.jpg"
        imagePosition="0% 1%"
        height="min-h-[380px]"
      />

      <Container className="pt-8 pb-16">
        <Reveal>
          <div onClickCapture={rememberTrigger}>
            <MovingGallery onOpen={(index) => setOpen({ scope: "all", index })} />
          </div>
        </Reveal>

        <div id="all-photos" className={`mt-14 ${showAll ? "space-y-20" : "space-y-12"}`}>
          {GALLERY.map((section, s) => (
            <section key={section.section}>
              <Reveal>
                <SectionHeading eyebrow="Photos" title={section.section} />
                {section.intro.length > 0 && (
                  <div className="prose-dark mt-6 max-w-3xl">
                    {section.intro.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
              </Reveal>
              {showAll && (
                <Reveal delay={0.1}>
                  <div className="mt-8" onClickCapture={rememberTrigger}>
                    <PhotoGrid
                      photos={section.photos}
                      onOpen={(index) => setOpen({ scope: s, index })}
                    />
                  </div>
                </Reveal>
              )}
            </section>
          ))}
        </div>

        {/* The reveal sits AFTER both section intros, not under the moving
            gallery: with the grids collapsed a mid-page button left two
            headings standing over empty space, which read as an unfinished
            page. Here the intros describe the two sets and the button opens
            them. */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className={ghost}
            aria-expanded={showAll}
            aria-controls="all-photos"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Hide photos" : `See all ${ALL_PHOTOS.length} photos`}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <Lightbox
            photos={photosIn(open)}
            index={open.index}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </>
  );
}
