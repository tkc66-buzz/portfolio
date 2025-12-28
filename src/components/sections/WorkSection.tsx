import { PixelIcon } from "@/components/PixelIcon";
import { getPortfolio } from "@/content/portfolio";
import Image from "next/image";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export async function WorkSection() {
  const { work } = await getPortfolio();

  return (
    <section
      id={work.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <header className="flex items-baseline justify-between">
        <h2
          className="flex items-center gap-2 text-xl text-fami-gold"
          style={{ fontFamily: "var(--font-press)" }}
        >
          <PixelIcon src="/assets/pixel/icons/work.svg" decorative size="md" />
          <span>{work.heading}</span>
        </h2>
        <span className="pixel-float text-xs uppercase tracking-[0.3em] text-fami-gold">WORK LOG</span>
      </header>

      <p className="section-body-muted mt-3">
        会社/組織ごとに1つの文章で概要をまとめ、配下に具体的な取り組み（Projects）を載せています。
      </p>

      <div className="mt-4 space-y-6 [font-family:var(--font-noto)]">
        {work.items.map((entry) => (
          <article key={entry.key} className="frame bg-[#1b1b1b] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="nes-badge is-primary text-[0.6rem]">
                    <span>{entry.period}</span>
                  </span>
                  <h3 className="truncate text-sm text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
                    {entry.company}
                  </h3>
                </div>
              </div>
              {entry.tech && entry.tech.length > 0 ? (
                <div className="flex flex-wrap justify-end gap-1 text-xs">
                  {entry.tech.map((t) => (
                    <span key={t} className="nes-badge is-warning text-[0.55rem]">
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <p className="section-body mt-3 break-words whitespace-pre-line text-fami-ivory/95">
              {entry.summary}
            </p>

            {entry.links && entry.links.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {entry.links.map((l) => (
                  <a
                    key={`${l.label}:${l.href}`}
                    className="underline decoration-fami-gold/60 underline-offset-4"
                    href={l.href}
                    target={isExternalHttpHref(l.href) ? "_blank" : undefined}
                    rel={isExternalHttpHref(l.href) ? "noreferrer" : undefined}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.25em] text-fami-gold">PROJECTS</p>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {entry.projects.map((project) => (
                  <section
                    key={`${entry.key}:${project.title}`}
                    id={project.anchorId}
                    className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-4"
                  >
                    {project.asset ? (
                      <div className="mb-3 overflow-hidden rounded-sm border-2 border-fami-gold/60 bg-[#111]">
                        {/* Use next/image for optimization (even for SVG) */}
                        <Image
                          src={project.asset.src}
                          alt={project.asset.alt}
                          width={960}
                          height={540}
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    ) : null}
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        {project.visibility === "private" ? (
                          <span className="nes-badge is-error text-[0.6rem]">
                            <span>PRIVATE</span>
                          </span>
                        ) : null}
                        {project.status ? (
                          <span className="nes-badge is-primary text-[0.6rem]">
                            <span>{project.status}</span>
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-fami-gold">Problem / Approach</p>
                    <p className="mt-2 break-words text-sm leading-relaxed">
                      {project.visibility === "private"
                        ? "NDA等に配慮し、公開できる範囲のみ記載しています。詳細は面談で共有できます。"
                        : project.summary}
                    </p>

                    {project.visibility === "private" ? null : (
                      <dl className="mt-3 space-y-3 text-xs">
                        <div className="flex gap-2">
                          <dt className="w-20 text-fami-gold">Role</dt>
                          <dd className="break-words font-medium">{project.role}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-20 text-fami-gold">Tech</dt>
                          <dd className="flex flex-wrap gap-1">
                            {project.tech.map((t) => (
                              <span key={t} className="nes-badge is-warning text-[0.55rem]">
                                <span>{t}</span>
                              </span>
                            ))}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-20 text-fami-gold">Result</dt>
                          <dd className="break-words leading-relaxed">{project.outcomeOrLearning}</dd>
                        </div>
                      </dl>
                    )}

                    {project.visibility === "private" ? null : project.link ? (
                      <a
                        className="nes-btn mt-4 w-full text-center"
                        href={project.link.href}
                        target={isExternalHttpHref(project.link.href) ? "_blank" : undefined}
                        rel={isExternalHttpHref(project.link.href) ? "noreferrer" : undefined}
                      >
                        {project.link.label}
                      </a>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


