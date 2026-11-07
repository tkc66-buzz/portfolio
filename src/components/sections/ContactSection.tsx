import { PixelIcon } from "@/components/PixelIcon";
import { SectionShell } from "@/components/sections/SectionShell";
import { getPortfolio } from "@/content/portfolio";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

const ICONS: Record<string, string> = {
  Email: "/assets/pixel/icons/email.svg",
  GitHub: "/assets/pixel/icons/github.svg",
  X: "/assets/pixel/icons/x.svg",
  LinkedIn: "/assets/pixel/icons/linkedin.svg",
};

export async function ContactSection() {
  const { contact } = await getPortfolio();

  return (
    <SectionShell
      id={contact.id}
      heading={contact.heading}
      icon="/assets/pixel/icons/contact.svg"
      className="pb-12 sm:pb-16"
    >
      <div
        data-reveal
        className="card relative overflow-hidden p-8 sm:p-12"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(79,134,198,0.25), transparent 70%), linear-gradient(180deg, rgba(20,24,34,0.95), rgba(14,17,24,0.95))",
        }}
      >
        <p className="font-body type-heading max-w-3xl font-bold whitespace-pre-line">
          {contact.blurb}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
          {contact.links.map((link) => {
            const isExternal = isExternalHttpHref(link.href);
            const iconSrc = ICONS[link.label];
            return (
              <a
                key={link.href}
                className={`btn-game ${link.label === "X" ? "nes-btn is-error" : "nes-btn is-primary"}`}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                <span className="inline-flex items-center gap-3">
                  {iconSrc ? <PixelIcon src={iconSrc} decorative size="lg" /> : null}
                  <span>{link.label}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
      <footer className="font-pixel text-fami-ivory/50 type-label mt-16 text-center tracking-[0.2em]">
        © {new Date().getFullYear()} TAKESHI WATANABE
      </footer>
    </SectionShell>
  );
}
