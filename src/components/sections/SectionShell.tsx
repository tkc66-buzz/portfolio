import { PixelIcon } from "@/components/PixelIcon";
import type { ReactNode } from "react";

/**
 * Full-width section band with a large pixel heading. Each section keeps a
 * stable `id` for #hash navigation; the header fades in via `data-reveal`.
 */
export function SectionShell({
  id,
  heading,
  icon,
  lead,
  children,
  className = "",
}: {
  id: string;
  heading: string;
  /** Pixel icon shown next to the heading (e.g. /assets/pixel/icons/work.svg). */
  icon?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[var(--menu-offset)] py-20 sm:py-28 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <header data-reveal className="mb-10 flex flex-col gap-3 sm:mb-14">
          <h2
            id={`${id}-heading`}
            className="font-pixel text-fami-gold type-heading flex items-center gap-4"
            style={{ textShadow: "4px 4px 0 #a20000" }}
          >
            {icon ? <PixelIcon src={icon} decorative size="xl" /> : null}
            {heading}
          </h2>
          {lead ? <p className="font-body type-lead text-fami-ivory/70 max-w-3xl">{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
