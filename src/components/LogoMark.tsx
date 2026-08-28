import { useState } from "react";
import { LOGO_MARK } from "../content/site";
import { publicUrl } from "../lib/publicUrl";

/**
 * Optional logo mark shown beside the wordmark. Drop an export at
 * public/images/logo-mark.png and point LOGO_MARK (site.ts) at it.
 *
 * While LOGO_MARK is null nothing is rendered, so no page requests a file
 * that does not exist or reserves space for it. If the file later goes
 * missing the image removes itself and the wordmark stands alone.
 */
export default function LogoMark({
  size = 56,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const [missing, setMissing] = useState(false);
  if (!LOGO_MARK || missing) return null;

  return (
    <img
      src={publicUrl(LOGO_MARK)}
      alt=""
      aria-hidden
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      onError={() => setMissing(true)}
      className={`shrink-0 select-none object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
