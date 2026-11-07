import { HeroAvatar } from "@/components/HeroAvatar";
import { PixelIcon } from "@/components/PixelIcon";
import { getPortfolio } from "@/content/portfolio";

const SOCIAL_ICONS: Record<string, string> = {
  GitHub: "/assets/pixel/icons/github.svg",
  X: "/assets/pixel/icons/x.svg",
  LinkedIn: "/assets/pixel/icons/linkedin.svg",
};

export async function Hero() {
  const { profile, work, contact } = await getPortfolio();
  const socials = contact.links.filter((l) => SOCIAL_ICONS[l.label]);

  return (
    <section
      id={profile.id}
      className="relative isolate flex min-h-[100svh] scroll-mt-[var(--menu-offset)] items-center overflow-hidden px-5 pt-20 pb-24 sm:px-8"
    >
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 text-center lg:flex-row lg:gap-12 lg:text-left">
        {/* Bounded by width and viewport height so the whole hero fits one screen. */}
        <HeroAvatar
          src="/assets/profile/profile.png"
          alt="Pixel-art portrait of Takeshi Watanabe"
          className="aspect-square w-[min(92vw,30rem,calc(100svh-24rem))] shrink-0 sm:w-[min(32rem,calc(100svh-22rem))] lg:w-[min(46vw,40rem,calc(100svh-12rem))]"
        />

        <div className="flex min-w-0 flex-col items-center lg:items-start">
          <h1 className="text-shine type-display">Takeshi Watanabe</h1>
          <p className="mt-3 flex items-baseline gap-3">
            <span className="text-fami-ivory/60 type-label">a.k.a.</span>
            <span
              className="text-fami-gold type-display"
              style={{ textShadow: "4px 4px 0 #a20000" }}
            >
              BUZZ
            </span>
          </p>
          <p className="text-fami-blue type-label mt-4 tracking-[0.15em]">
            SENIOR SOFTWARE ENGINEER @ EUREKA
          </p>
          <p className="font-body type-lead text-fami-ivory/70 mt-4 max-w-2xl">{profile.body}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {socials.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="border-fami-gold/30 hover:border-fami-gold hover:bg-fami-gold/10 focus-visible:ring-fami-gold inline-flex h-14 w-14 items-center justify-center rounded-lg border bg-black/30 transition-colors focus:outline-none focus-visible:ring-2"
              >
                <PixelIcon src={SOCIAL_ICONS[link.label]} decorative size="xl" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <a
        href={`#${work.id}`}
        className="text-fami-ivory/70 hover:text-fami-gold focus-visible:ring-fami-gold type-label absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-md px-3 py-1 tracking-[0.3em] focus:outline-none focus-visible:ring-2"
      >
        SCROLL
        <span className="scroll-cue text-fami-gold type-title" aria-hidden="true">
          ▼
        </span>
      </a>
    </section>
  );
}
