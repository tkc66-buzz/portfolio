import { getPortfolio, type WritingItem } from "@/content/portfolio";
import { PixelIcon } from "@/components/PixelIcon";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function WritingCard({ item }: { item: WritingItem }) {
  const title = item.title ?? item.label;
  const isExternal = isExternalHttpHref(item.href);

  return (
    <li className="border-fami-gold/25 hover:border-fami-blue/70 min-w-0 rounded-lg border bg-black/20 transition-colors">
      <a
        className="focus-visible:ring-fami-blue block h-full p-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset"
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="border-fami-blue/50 bg-fami-blue/15 text-fami-blue rounded-full border px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.08em] uppercase">
            {item.label}
          </span>
          {item.year ? <time className="text-fami-ivory/60 text-xs">{item.year}</time> : null}
        </div>
        <h3 className="text-fami-ivory text-sm leading-relaxed font-bold">{title} ↗</h3>
        {item.context ? (
          <p className="section-body-muted mt-2 leading-relaxed">{item.context}</p>
        ) : null}
      </a>
    </li>
  );
}

export async function WritingSection() {
  const { writing } = await getPortfolio();
  return (
    <section
      id={writing.id}
      className="frame text-fami-ivory scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6"
    >
      <h2
        className="text-fami-gold flex items-center gap-2 text-xl"
        style={{ fontFamily: "var(--font-press)" }}
      >
        <PixelIcon src="/assets/pixel/icons/writing.svg" decorative size="md" />
        <span>{writing.heading}</span>
      </h2>

      <p className="section-body-muted mt-3">
        定期的に更新しているブログ・書籍・外部メディア記事のまとめです。
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-4 [font-family:var(--font-noto)] sm:grid-cols-2">
        {writing.items.map((item) => (
          <WritingCard key={item.href} item={item} />
        ))}
      </ul>
    </section>
  );
}
