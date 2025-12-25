import { getPortfolio } from "@/content/portfolio";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export async function WritingSection() {
  const { writing } = await getPortfolio();
  return (
    <section id={writing.id} className="frame scroll-mt-6 bg-[#1b1b1b] p-6 text-fami-ivory">
      <h2 className="text-xl text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
        {writing.heading}
      </h2>

      <p className="mt-3 text-sm [font-family:var(--font-noto)]">
        記事（Writing）は文章のまとめ。登壇/書籍/コミュニティは Activities に分けています。
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {writing.items.map((link) => {
          const isExternal = isExternalHttpHref(link.href);
          return (
            <a
              key={link.href}
              className="nes-btn is-primary"
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
