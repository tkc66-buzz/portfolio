import { TOC_ITEMS, tocHref } from "@/components/toc";

export function TableOfContents() {
  return (
    <nav
      id="toc"
      aria-label="Table of contents"
      className="frame bg-[#1b1b1b] p-4 text-fami-ivory"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
          MENU
        </h2>
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-fami-gold">TOC</span>
      </div>

      <ul className="flex flex-wrap gap-2">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              className="nes-btn text-[0.75rem] uppercase tracking-wide focus:outline-none focus-visible:ring-4 focus-visible:ring-fami-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b1b1b]"
              href={tocHref(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
