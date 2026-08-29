import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
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

/** Four photographs on screen at once: one standing beside the section's
 *  introduction, three in a row underneath. One slot changes every STEP_MS, so
 *  a given photograph holds its place for SLOTS * STEP_MS = 8 s and the four
 *  never turn over together. */
const SLOTS = 4;
/** The box that sits beside the introduction; 0 to SIDE_SLOT - 1 are the row
 *  underneath. Putting it last in the rotation means the reader's eye is drawn
 *  across the row before the large photograph beside the text changes. */
const SIDE_SLOT = SLOTS - 1;
const STEP_MS = 2000;
const FADE_S = 0.9;
/** The caption is swapped, not crossfaded: two captions at the same opacity
 *  print on top of each other and the words become unreadable. It leaves and
 *  arrives quickly so the pause inside the slower image crossfade is short. */
const CAPTION_FADE_S = 0.25;

/** A tiny deterministic generator. The opening four photographs of a carousel
 *  are therefore identical in the prerendered HTML and in the first client
 *  render, so no hydration mismatch is possible; the rest of the order is
 *  reshuffled once the page is live (see the effect in Carousel). */
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

/** One listener per carousel would be two listeners for the same query; this
 *  keeps the reading in one place and each instance simply asks for it. */
function usePrefersReducedMotion() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return still;
}

/** What the four boxes are showing and what is waiting to come on. Both hold
 *  indices into the section's `photos`. */
type Rotation = {
  /** One photograph index per box; never two the same. */
  slots: number[];
  /** Photographs waiting their turn, in order, none of them on screen. */
  queue: number[];
  /** Counts the changes, and so picks the box that changes next. */
  tick: number;
};

/** Everything that is not on screen, in a fresh random order. Fieldwork has six
 *  photographs for four boxes, so its queue runs dry after two changes; drawing
 *  the next queue from what is off screen is both what keeps two boxes from
 *  showing the same photograph and what stops the run settling into a loop. */
function offScreenQueue(slots: number[], total: number, rand: () => number) {
  const showing = new Set(slots);
  const rest: number[] = [];
  for (let i = 0; i < total; i += 1) if (!showing.has(i)) rest.push(i);
  return shuffle(rest, rand);
}

/** One box of a carousel: a fixed 4:3 frame that crossfades whatever the
 *  rotation has put in it, and opens the lightbox when clicked. */
function Slide({
  photo,
  still,
  onOpen,
}: {
  photo: GalleryPhoto;
  still: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={photo.caption ? `Open photo: ${photo.caption}` : `Open photo: ${photo.alt}`}
      className="group block w-full overflow-hidden rounded-xl border border-edge bg-panel text-left transition hover:border-gold/60"
    >
      {/* A fixed 4:3 box, so nothing on the page moves when the photograph
          inside it changes. The caption rides on the bottom of the photograph
          rather than in a bar below it: only some of the photographs carry one,
          and a reserved bar left an empty strip under the rest that read as a
          fault. */}
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
        <AnimatePresence initial={false} mode="wait">
          {photo.caption && (
            <motion.span
              key={photo.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: still ? 0 : CAPTION_FADE_S, ease: "easeInOut" }}
              className="absolute inset-x-0 bottom-0 block truncate bg-gradient-to-t from-ink from-40% via-ink/85 to-transparent px-3 pb-2 pt-7 text-xs font-medium text-charcoal"
            >
              {photo.caption}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

/** Four photographs drawn from one set, one of which quietly changes every
 *  couple of seconds: the section's introduction and one photograph side by
 *  side, with the other three in a row beneath them. Hovering or tabbing into
 *  it holds it still, and a reader who has asked for reduced motion gets four
 *  photographs that never move at all. `seed` fixes the opening four, so the
 *  two carousels on the page do not start on the same position of their own
 *  lists.
 *
 *  Photograph indices are into `photos`, and that is what `onOpen` hands back,
 *  so the lightbox it opens steps through this section alone. */
function Carousel({
  photos,
  seed,
  label,
  intro,
  onOpen,
}: {
  photos: GalleryPhoto[];
  seed: number;
  label: string;
  intro: ReactNode;
  onOpen: (photoIndex: number) => void;
}) {
  const total = photos.length;

  const [rot, setRot] = useState<Rotation>(() => {
    const deck = shuffle(
      photos.map((_, i) => i),
      mulberry32(seed),
    );
    return {
      // The modulo only bites for a section of fewer than four photographs,
      // which would not rotate anyway.
      slots: Array.from({ length: SLOTS }, (_, i) => deck[i % deck.length]),
      queue: deck.slice(SLOTS),
      tick: 0,
    };
  });
  const [paused, setPaused] = useState(false);
  const still = usePrefersReducedMotion();

  // Reshuffle the queue behind the four opening boxes, so the run of
  // photographs differs from load to load without anything swapping under the
  // reader at hydration.
  useEffect(() => {
    setRot((prev) => ({ ...prev, queue: shuffle(prev.queue, Math.random) }));
  }, []);

  // Top the queue back up the moment it empties, from whatever the four boxes
  // are not showing. It runs between two ticks, so the next tick always has a
  // photograph waiting for it.
  useEffect(() => {
    if (total <= SLOTS || rot.queue.length > 0) return;
    const fresh = offScreenQueue(rot.slots, total, Math.random);
    setRot((prev) => (prev.queue.length === 0 ? { ...prev, queue: fresh } : prev));
  }, [rot, total]);

  // Warm the photograph that is next in the queue, so a crossfade never lands
  // on an empty box while its thumbnail is still on the wire.
  useEffect(() => {
    const upcoming = photos[rot.queue[0]];
    if (upcoming) new Image().src = publicUrl(upcoming.thumb);
  }, [photos, rot.queue]);

  useEffect(() => {
    if (still || paused || total <= SLOTS) return;
    const id = window.setInterval(() => {
      setRot(({ slots, queue, tick }) => {
        // Only if the refill above has not landed yet: hold this beat rather
        // than repeat a photograph that is already on screen.
        if (queue.length === 0) return { slots, queue, tick };
        const next = slots.slice();
        next[tick % SLOTS] = queue[0];
        return { slots: next, queue: queue.slice(1), tick: tick + 1 };
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [still, paused, total]);

  // One box of the row on a phone, two from 640px, three from 768px up. The
  // hidden boxes stay in the DOM so the rotation keeps its rhythm. The
  // photograph beside the text is shown at every width.
  const visibility = ["", "hidden sm:block", "hidden md:block"];

  const slide = (slot: number) => (
    <Slide
      photo={photos[rot.slots[slot]]}
      still={still}
      onOpen={() => onOpen(rot.slots[slot])}
    />
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* The introduction and the fourth photograph side by side on a wide
          screen, stacked on a narrow one. */}
      <div className="grid gap-6 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-10">
        <div>{intro}</div>
        <div aria-live="off">{slide(SIDE_SLOT)}</div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {rot.slots.slice(0, SIDE_SLOT).map((_, slot) => (
          <div key={slot} aria-live="off" className={visibility[slot]}>
            {slide(slot)}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

/** Which section's photographs the lightbox is stepping through, and where in
 *  that section it is. Every thumbnail on the page — carousel or grid — belongs
 *  to exactly one section, so the lightbox never crosses between them. */
type Opened = { section: number; index: number };

/** "Lab facilities" -> "lab-facilities", for the grid ids the reveal buttons
 *  name in aria-controls. */
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Gallery() {
  const [open, setOpen] = useState<Opened | null>(null);
  // One flag per section: the two reveals are independent, so opening the
  // fieldwork grid leaves the lab facilities grid closed.
  const [showAll, setShowAll] = useState<boolean[]>(() => GALLERY.map(() => false));
  const lastTrigger = useRef<HTMLElement | null>(null);

  // #all opens every grid straight away, so the whole set stays linkable.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#all") setShowAll(GALLERY.map(() => true));
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
      const n = GALLERY[o.section].photos.length;
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
        image="/images/bg-gallery-painted-dragon-right.jpg"
        /* Painted dragon on a weathered log. The source is portrait 1536x2048, so the
           widest crop that never upscales is barely a band wide: taking the left 1440px
           pushes the dragon as far right as the pixels allow, head at about 50-64% across
           with only log and sand behind the title. The band is deepened to 400px so the
           head, forelegs and shoulders all clear the fixed header. */
        imageOpacity={0.85}
        imagePosition="30% 37%"
        height="min-h-[400px]"
      />

      <Container className="pt-8 pb-16">
        <div className="space-y-20">
          {GALLERY.map((section, s) => {
            const gridId = `${slug(section.section)}-photos`;
            const isOpen = showAll[s];
            // The introduction is handed to the carousel, which sets it beside
            // the photograph that stands next to it.
            const intro =
              section.intro.length > 0 ? (
                <div className="prose-dark">
                  {section.intro.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              ) : null;
            return (
              <section key={section.section}>
                <Reveal>
                  <SectionHeading eyebrow="Photos" title={section.section} />
                  {/* With no photographs there is no carousel to carry the
                      introduction, so it stays under the heading. */}
                  {section.photos.length === 0 && intro && (
                    <div className="mt-6 max-w-3xl">{intro}</div>
                  )}
                </Reveal>

                {section.photos.length > 0 && (
                  <>
                    <Reveal delay={0.1}>
                      <div className="mt-6" onClickCapture={rememberTrigger}>
                        <Carousel
                          photos={section.photos}
                          seed={s + 1}
                          label={`A rotating selection of ${section.section} photographs`}
                          intro={intro}
                          onOpen={(index) => setOpen({ section: s, index })}
                        />
                      </div>
                    </Reveal>

                    {/* The button sits between the carousel and the grid it
                        opens, so the photographs arrive directly underneath it
                        and the reader is not left looking at the same screen. */}
                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        className={ghost}
                        aria-controls={gridId}
                        aria-expanded={isOpen}
                        onClick={() =>
                          setShowAll((v) => v.map((on, i) => (i === s ? !on : on)))
                        }
                      >
                        {isOpen ? "Hide photos" : `See all ${section.photos.length} photos`}
                      </button>
                    </div>

                    {/* The container is always in the DOM so aria-controls
                        above always names something real; only its contents
                        come and go. */}
                    <div id={gridId} className="scroll-mt-28">
                      {isOpen && (
                        <Reveal delay={0.05}>
                          <div className="mt-10" onClickCapture={rememberTrigger}>
                            <PhotoGrid
                              photos={section.photos}
                              onOpen={(index) => setOpen({ section: s, index })}
                            />
                          </div>
                        </Reveal>
                      )}
                    </div>
                  </>
                )}
              </section>
            );
          })}
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <Lightbox
            photos={GALLERY[open.section].photos}
            index={open.index}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </>
  );
}
