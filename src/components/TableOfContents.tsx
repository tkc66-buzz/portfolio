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
      className="topnav fixed inset-x-0 top-0 z-50 hidden bg-[#0b0d12]/80 backdrop-blur-md sm:flex"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-8 px-5 py-4 sm:px-8">
        <a
          href="#profile"
          data-toc-id="profile"
          className="font-pixel text-fami-gold focus-visible:ring-fami-gold type-label inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent leading-none tracking-[0.15em] uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d12]"
          aria-label="Profile"
        >
          <PixelIcon src="/assets/pixel/icons/profile.svg" decorative size="lg" />
          BUZZ
        </a>

        <ul className="!mb-0 ml-auto flex items-center gap-4 lg:gap-7">
          {TOC_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                data-toc-id={item.id}
                className="nav-link focus-visible:ring-fami-gold type-label inline-flex items-center gap-2 border-b-2 border-transparent py-1 leading-none tracking-wide uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d12]"
                href={tocHref(item.id)}
              >
                {/* Icons only on lg+: at sm/md the labels alone need all the width. */}
                <span className="hidden lg:inline-flex">
                  <PixelIcon src={tocIconSrc(item.id)} decorative size="lg" />
                </span>
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
