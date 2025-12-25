import { getPortfolio } from "@/content/portfolio";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export async function ContactSection() {
  const { contact } = await getPortfolio();
  return (
    <section
      id={contact.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2 className="text-xl text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
        {contact.heading}
      </h2>
      <p className="mt-3 whitespace-pre-line text-sm [font-family:var(--font-noto)]">
        {contact.blurb}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {contact.links.map((link) => {
          const isExternal = isExternalHttpHref(link.href);
          return (
            <a
              key={link.href}
              className={link.label === "Email" ? "nes-btn is-error" : "nes-btn is-primary"}
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
