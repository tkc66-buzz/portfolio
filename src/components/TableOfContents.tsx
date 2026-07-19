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

/** Full-width fixed top nav bar - only visible on sm+ screens */
export function TableOfContents() {
  return (
    <nav
      id="menu"
      aria-label="Menu"
      tabIndex={-1}
      className="topnav hud fixed inset-x-0 top-0 z-50 hidden bg-[#1b1b1b]/90 backdrop-blur supports-[backdrop-filter]:bg-[#1b1b1b]/70 sm:flex"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-6 px-4 py-5 md:px-8">
        <a
          href="#profile"
          data-toc-id="profile"
          className="text-fami-gold focus-visible:ring-fami-gold inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent text-sm leading-none tracking-[0.15em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
          aria-label="Profile"
        >
          <PixelIcon src="/assets/pixel/icons/profile.svg" decorative size="md" />
          BUZZ
        </a>

        <ul className="!mb-0 flex flex-1 items-center gap-5">
          {TOC_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                data-toc-id={item.id}
                className="nav-link focus-visible:ring-fami-gold inline-flex items-center gap-2 border-b-2 border-transparent text-sm leading-none tracking-wide uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                href={tocHref(item.id)}
              >
                <PixelIcon src={tocIconSrc(item.id)} decorative size="md" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ScrollHud />
    </nav>
  );
}
