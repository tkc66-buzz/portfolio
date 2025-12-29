import { getPortfolio } from "@/content/portfolio";
import { PixelIcon } from "@/components/PixelIcon";
import { ActivitiesCollectGate } from "@/components/sections/ActivitiesCollectGate";
import { TalkLinkPreview } from "@/components/TalkLinkPreview";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

// Activities link button invariant:
// - consistent height/typography across items
// - never wrap (wrapping increases height and looks uneven)
const ACTIVITIES_LINK_BTN_CLASS =
  "nes-btn is-small btn-game shrink-0 whitespace-nowrap text-[0.7rem] leading-none focus:outline-none focus-visible:ring-4 focus-visible:ring-fami-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]";

const TALK_CARD_CLASS =
  "nes-container is-rounded w-full border border-fami-gold/40 bg-black/20 p-4 shadow-[3px_3px_0_rgba(162,0,0,0.55)]";

export async function ActivitiesSection() {
  const { activities } = await getPortfolio();

  return (
    <section
      id={activities.id}
      className="frame activities-toast scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2
        className="flex items-center gap-2 text-xl text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        <PixelIcon src="/assets/pixel/icons/activities.svg" decorative size="md" />
        <span>{activities.heading}</span>
      </h2>

      <ActivitiesCollectGate>
        <p className="section-body-muted">
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
                <ul
                  className={[
                    "mt-3 text-sm [font-family:var(--font-noto)]",
                    group.name === "Talks" ? "grid grid-cols-1 gap-3 md:grid-cols-2" : "space-y-3",
                  ].join(" ")}
                >
                  {group.items.map((item) => {
                    const isTalk = group.name === "Talks";

                    if (!isTalk) {
                      return (
                        <li key={`${group.name}:${item.year}:${item.title}`} className="space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="nes-badge is-warning year-badge">
                                  <span>{item.year}</span>
                                </span>
                                <span className="truncate">{item.title}</span>
                              </div>
                              {item.context ? (
                                <p className="section-body-muted mt-1 text-fami-ivory/90">{item.context}</p>
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
                      );
                    }

                    return (
                      <li key={`${group.name}:${item.year}:${item.title}`} className={TALK_CARD_CLASS}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="nes-badge is-warning year-badge">
                                <span>{item.year}</span>
                              </span>
                              <span className="truncate">{item.title}</span>
                            </div>
                            {item.context ? (
                              <p className="section-body-muted mt-2 text-fami-ivory/90">{item.context}</p>
                            ) : null}
                          </div>
                        </div>

                        {item.link ? (
                          <TalkLinkPreview href={item.link.href} label={item.link.label} />
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </ActivitiesCollectGate>
    </section>
  );
}
