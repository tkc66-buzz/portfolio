import { TOC_ITEMS, tocHref } from "@/components/toc";
import { PixelIcon } from "@/components/PixelIcon";
import { ScrollHud } from "@/components/ScrollHud";

function tocIconSrc(id: (typeof TOC_ITEMS)[number]["id"]) {
  switch (id) {
    case "profile":
      return "/assets/pixel/icons/profile.svg";
    case "work":
      return "/assets/pixel/icons/work.svg";
    case "writing":
      return "/assets/pixel/icons/writing.svg";
    case "activities":
      return "/assets/pixel/icons/activities.svg";
    case "skills":
      return "/assets/pixel/icons/skills.svg";
    case "contact":
      return "/assets/pixel/icons/contact.svg";
  }
}

export function TableOfContents() {
  return (
    <nav
      id="menu"
      aria-label="Menu"
      className="hud frame sticky top-[var(--menu-top)] z-50 bg-[#1b1b1b]/90 p-4 text-fami-ivory backdrop-blur supports-[backdrop-filter]:bg-[#1b1b1b]/70"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
          MENU
        </h2>
      </div>

      <ScrollHud />

      <ul className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              data-toc-id={item.id}
              className="nes-btn is-primary is-small btn-game shrink-0 text-[0.7rem] uppercase tracking-wide focus:outline-none focus-visible:ring-4 focus-visible:ring-fami-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]"
              href={tocHref(item.id)}
            >
              <span className="inline-flex items-center gap-2">
                <PixelIcon src={tocIconSrc(item.id)} decorative size="sm" />
                <span>{item.label}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
