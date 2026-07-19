import { PixelIcon } from "@/components/PixelIcon";
import type { WorkEntry } from "@/content/portfolio";
import { getPortfolio } from "@/content/portfolio";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function WorkTimelineEntry({ entry }: { entry: WorkEntry }) {
  return (
    <article className="work-timeline__entry">
      <div className="work-timeline__node" aria-hidden="true" />

      <div className="work-timeline__company-block">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="nes-badge is-primary year-badge">
            <span>{entry.period}</span>
          </span>
          <h3 className="work-timeline__company-name">{entry.company}</h3>
        </div>

        <p className="section-body text-fami-ivory/95 mt-3 break-words whitespace-pre-line">
          {entry.summary}
        </p>

        {entry.tech && entry.tech.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1">
            {entry.tech.map((t) => (
              <span key={t} className="nes-badge is-warning text-[0.55rem]">
                <span>{t}</span>
              </span>
            ))}
          </div>
        ) : null}

        {entry.links && entry.links.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {entry.links.map((l) => (
              <a
                key={`${l.label}:${l.href}`}
                className="decoration-fami-gold/60 underline underline-offset-4"
                href={l.href}
                target={isExternalHttpHref(l.href) ? "_blank" : undefined}
                rel={isExternalHttpHref(l.href) ? "noreferrer" : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}

        {entry.projects.length > 0 ? (
          <ul className="work-timeline__projects">
            {entry.projects.map((project) => (
              <li
                key={project.anchorId ?? project.title}
                id={project.anchorId}
                className="work-timeline__project-card"
              >
                <p className="work-timeline__project-label">PROJECT</p>
                <h4 className="work-timeline__project-title">{project.title}</h4>

                <p className="text-fami-ivory/90 mt-2 text-sm leading-relaxed break-words whitespace-pre-line">
                  {project.summary}
                </p>

                <dl className="mt-3 space-y-1 text-xs">
                  <div className="flex gap-1.5">
                    <dt className="work-timeline__meta-key">Role</dt>
                    <dd className="text-fami-ivory/90 break-words">{project.role}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="work-timeline__meta-key">Tech</dt>
                    <dd className="text-fami-ivory/90 break-words">{project.tech.join(" / ")}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export async function WorkSection() {
  const { work } = await getPortfolio();

  return (
    <section
      id={work.id}
      className="frame work-timeline text-fami-ivory scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6"
    >
      <header className="flex items-baseline justify-between">
        <h2
          className="text-fami-gold flex items-center gap-2 text-xl"
          style={{ fontFamily: "var(--font-press)" }}
        >
          <PixelIcon src="/assets/pixel/icons/work.svg" decorative size="md" />
          <span>{work.heading}</span>
        </h2>
        <span className="pixel-float text-fami-gold text-xs tracking-[0.3em] uppercase">
          WORK LOG
        </span>
      </header>

      <p className="section-body-muted mt-3">
        会社/組織ごとに取り組んだ具体的な活動を載せています。
      </p>

      <div className="work-timeline__list [font-family:var(--font-noto)]">
        {[...work.items].reverse().map((entry) => (
          <WorkTimelineEntry key={entry.key} entry={entry} />
        ))}
      </div>
    </section>
  );
}
