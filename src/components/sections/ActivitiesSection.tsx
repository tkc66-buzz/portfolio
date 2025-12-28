import { getPortfolio } from "@/content/portfolio";
import { PixelIcon } from "@/components/PixelIcon";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

// Activities link button invariant:
// - consistent height/typography across items
// - never wrap (wrapping increases height and looks uneven)
const ACTIVITIES_LINK_BTN_CLASS =
  "nes-btn is-small shrink-0 whitespace-nowrap text-[0.7rem] leading-none focus:outline-none focus-visible:ring-4 focus-visible:ring-fami-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]";

export async function ActivitiesSection() {
  const { activities } = await getPortfolio();

  return (
    <section
      id={activities.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2
        className="flex items-center gap-2 text-xl text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        <PixelIcon src="/assets/pixel/icons/activities.svg" decorative size="md" />
        <span>{activities.heading}</span>
      </h2>

      <p className="mt-3 text-sm [font-family:var(--font-noto)]">
        登壇・執筆・コミュニティ活動・受賞/実績をまとめています。
      </p>

      <div className="mt-5 space-y-6">
        {activities.groups.map((group) => (
          <div key={group.name}>
            <h3
              className="text-xs uppercase tracking-[0.3em] text-fami-gold"
              style={{ fontFamily: "var(--font-press)" }}
            >
              {group.name}
            </h3>

            {group.items.length === 0 ? (
              <p className="mt-3 text-sm [font-family:var(--font-noto)]">Coming soon</p>
            ) : (
              <ul className="mt-3 space-y-3 text-sm [font-family:var(--font-noto)]">
                {group.items.map((item) => (
                  <li key={`${group.name}:${item.year}:${item.title}`} className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="nes-badge is-warning text-[0.6rem]">
                            <span>{item.year}</span>
                          </span>
                          <span className="truncate">{item.title}</span>
                        </div>
                        {item.context ? (
                          <p className="mt-1 text-xs text-fami-ivory/90">{item.context}</p>
                        ) : null}
                      </div>

                      {item.link ? (
                        <a
                          className={ACTIVITIES_LINK_BTN_CLASS}
                          href={item.link.href}
                          target={isExternalHttpHref(item.link.href) ? "_blank" : undefined}
                          rel={isExternalHttpHref(item.link.href) ? "noreferrer" : undefined}
                        >
                          {item.link.label}
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
