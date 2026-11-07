import { getPortfolio, type WritingItem } from "@/content/portfolio";
import { SectionShell } from "@/components/sections/SectionShell";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function WritingCard({ item, index }: { item: WritingItem; index: number }) {
  const title = item.title ?? item.label;
  const isExternal = isExternalHttpHref(item.href);

  return (
    <li
      data-reveal
      className="card card-hover min-w-0"
      style={{ ["--reveal-delay" as never]: `${index * 90}ms` }}
    >
      <a
        className="focus-visible:ring-fami-gold text-fami-ivory group flex h-full flex-col rounded-[inherit] p-5 no-underline focus:outline-none focus-visible:ring-2 sm:p-6"
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="chip uppercase">{item.label}</span>
          {item.year ? (
            <time className="font-pixel text-fami-gold type-label">{item.year}</time>
          ) : null}
        </div>
        <h3 className="type-title mt-4">{title}</h3>
        {item.context ? (
          <p className="font-body type-body text-fami-ivory/70 mt-2 flex-1">{item.context}</p>
        ) : (
          <div className="flex-1" />
        )}
        <span
          aria-hidden="true"
          className="font-pixel text-fami-gold type-label mt-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        >
          READ ▶
        </span>
      </a>
    </li>
  );
}

export async function WritingSection() {
  const { writing } = await getPortfolio();
  return (
    <SectionShell
      id={writing.id}
      heading={writing.heading}
      icon="/assets/pixel/icons/writing.svg"
      lead="ブログ・技術書・外部メディアでのアウトプット。"
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {writing.items.map((item, i) => (
          <WritingCard key={item.href} item={item} index={i} />
        ))}
      </ul>
    </SectionShell>
  );
}
