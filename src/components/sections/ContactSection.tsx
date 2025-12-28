import { getPortfolio } from "@/content/portfolio";
import { PixelIcon } from "@/components/PixelIcon";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export async function ContactSection() {
  const { contact } = await getPortfolio();

  const iconSrcForLabel = (label: string): string | null => {
    switch (label) {
      case "Email":
        return "/assets/pixel/icons/email.svg";
      case "GitHub":
        return "/assets/pixel/icons/github.svg";
      case "X":
        return "/assets/pixel/icons/x.svg";
      case "LinkedIn":
        return "/assets/pixel/icons/linkedin.svg";
      default:
        return null;
    }
  };

  return (
    <section
      id={contact.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2
        className="flex items-center gap-2 text-xl text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        <PixelIcon src="/assets/pixel/icons/contact.svg" decorative size="md" />
        <span>{contact.heading}</span>
      </h2>
      <p className="mt-3 whitespace-pre-line text-sm [font-family:var(--font-noto)]">
        {contact.blurb}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {contact.links.map((link) => {
          const isExternal = isExternalHttpHref(link.href);
          const iconSrc = iconSrcForLabel(link.label);
          return (
            <a
              key={link.href}
              className={link.label === "Email" ? "nes-btn is-error" : "nes-btn is-primary"}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              <span className="inline-flex items-center gap-2">
                {iconSrc ? <PixelIcon src={iconSrc} decorative size="sm" /> : null}
                <span>{link.label}</span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
