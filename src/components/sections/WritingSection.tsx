import { getPortfolio } from "@/content/portfolio";
import { PixelIcon } from "@/components/PixelIcon";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export async function WritingSection() {
  const { writing } = await getPortfolio();
  return (
    <section
      id={writing.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2
        className="font-display flex items-center gap-2 text-xl text-fami-gold"
      >
        <PixelIcon src="/assets/pixel/icons/writing.svg" decorative size="md" />
        <span>{writing.heading}</span>
      </h2>

      <p className="section-body-muted mt-3">
        記事（Writing）は文章のまとめ。登壇/書籍/コミュニティは Activities に分けています。
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {writing.items.map((link) => {
          const isExternal = isExternalHttpHref(link.href);
          return (
            <a
              key={link.href}
                    className="nes-btn is-primary btn-game"
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
