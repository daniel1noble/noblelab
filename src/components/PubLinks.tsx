import { publicUrl } from "../lib/publicUrl";
import { pdfKey, usePdfs, type Publication } from "../lib/useData";

/**
 * The link row under every paper, on the Publications page and in the home
 * page's Latest papers. Daniel's rule (6 Sep 2026): a paper must never appear
 * without an active DOI link and an active full-text link. So DOI falls back
 * to the DOI itself when a record has no url, and Full text goes to the
 * open-access copy OpenAlex knows about, otherwise the PDF hosted on this
 * site (see scripts/build-pdf-index.mjs), otherwise the publisher page.
 */
export function PubLinks({
  pub,
  showPreprint = true,
  compact = false,
}: {
  pub: Publication;
  showPreprint?: boolean;
  compact?: boolean;
}) {
  const pdfs = usePdfs();
  const key = pdfKey(pub.doi);
  const pdf = key ? pdfs?.pdfs?.[key] : undefined;
  const doiHref = pub.url || (pub.doi ? `https://doi.org/${pub.doi}` : null);
  const pdfHref = pdf ? publicUrl(pdf.file) : null;
  const fullText = pub.oaUrl || pdfHref || doiHref;
  const preprintIsUseful = showPreprint && Boolean(pub.preprintUrl) && !pub.isOA;
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${compact ? "mt-3 text-xs" : "mt-4 text-sm"}`}
    >
      {doiHref && (
        <a
          href={doiHref}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-gold transition hover:text-brick"
        >
          {pub.doi ? "DOI" : "Link"}
        </a>
      )}
      {pdfHref && pdf && (
        <a
          href={pdfHref}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-gold transition hover:text-brick"
          title={`Download the PDF (${Math.max(1, Math.round((pdf.bytes / 1048576) * 10) / 10)} MB)`}
        >
          PDF
        </a>
      )}
      {fullText && (
        <a
          href={fullText}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-cyan transition hover:text-charcoal"
        >
          Full text
        </a>
      )}
      {preprintIsUseful && (
        <a
          href={pub.preprintUrl!}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-neutral-400 transition hover:text-charcoal"
        >
          Preprint
        </a>
      )}
    </div>
  );
}
