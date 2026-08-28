import { useCallback, useEffect, useRef, useState } from "react";
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

/* ------------------------------------------------------------------ page */

export default function Gallery() {
  const [open, setOpen] = useState<{ section: number; index: number } | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

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

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Research photos"
        image="/images/bg-gallery-painted-dragon.jpg"
        imagePosition="45% 50%"
        height="min-h-[380px]"
      />

      <Container className="py-16">
        <div className="space-y-20">
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
              <Reveal delay={0.1}>
                <div
                  className="mt-8"
                  onClickCapture={(e) => {
                    const btn = (e.target as HTMLElement).closest("button");
                    if (btn) lastTrigger.current = btn;
                  }}
                >
                  <PhotoGrid
                    photos={section.photos}
                    onOpen={(index) => setOpen({ section: s, index })}
                  />
                </div>
              </Reveal>
            </section>
          ))}
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
