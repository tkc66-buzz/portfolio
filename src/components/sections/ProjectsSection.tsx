import { getPortfolio } from "@/content/portfolio";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export async function ProjectsSection() {
  const { projects } = await getPortfolio();
  return (
    <section
      id={projects.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
          {projects.heading}
        </h2>
        <span className="text-xs uppercase tracking-[0.3em] text-fami-gold">CASE FILES</span>
      </header>

      <p className="mt-3 text-sm [font-family:var(--font-noto)]">
        具体的な事例をまとめています。公開が難しい情報は伏せております。
        詳細は面談などで話せる範囲で共有できます。
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {projects.items.map((project) => (
          // `visibility` defaults to "public" if omitted
          // Private items should avoid disclosing sensitive details.
          <article
            key={project.title}
            id={project.anchorId}
            className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-4 text-fami-ivory"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
                {project.title}
              </h3>
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

            <p className="mt-3 text-xs text-fami-gold [font-family:var(--font-noto)]">
              Problem / Approach
            </p>
            <p className="mt-2 break-words text-sm leading-relaxed [font-family:var(--font-noto)]">
              {project.visibility === "private"
                ? "NDA等に配慮し、公開できる範囲のみ記載しています。詳細は面談で共有できます。"
                : project.summary}
            </p>

            {project.visibility === "private" ? (
              <div className="mt-3 text-xs [font-family:var(--font-noto)]">
                <div className="flex flex-wrap gap-1">
                  <span className="nes-badge is-warning text-[0.55rem]">
                    <span>Backend/Infra</span>
                  </span>
                  <span className="nes-badge is-warning text-[0.55rem]">
                    <span>Migration</span>
                  </span>
                  <span className="nes-badge is-warning text-[0.55rem]">
                    <span>Reliability</span>
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-fami-ivory/90">
                  話せる範囲: 役割/設計観点/意思決定/学び（固有名詞や数値は非公開）
                </p>
              </div>
            ) : (
              <dl className="mt-3 space-y-3 text-xs [font-family:var(--font-noto)]">
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
          </article>
        ))}
      </div>
    </section>
  );
}
