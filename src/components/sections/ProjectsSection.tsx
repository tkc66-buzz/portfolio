import { projects } from "@/content/portfolio";

export function ProjectsSection() {
  return (
    <section
      id={projects.id}
      className="scroll-mt-6 frame bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <header className="flex items-baseline justify-between">
        <h2
          className="text-xl text-fami-gold"
          style={{ fontFamily: "var(--font-press)" }}
        >
          {projects.heading}
        </h2>
        <span className="text-xs uppercase tracking-[0.3em] text-fami-gold">
          GRID VIEW
        </span>
      </header>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {projects.items.map((project) => (
          <article
            key={project.title}
            className="frame bg-[#1b1b1b] p-4 text-fami-ivory"
          >
            <div className="flex items-center justify-between">
              <h3
                className="text-sm text-fami-gold"
                style={{ fontFamily: "var(--font-press)" }}
              >
                {project.title}
              </h3>
              {project.status ? (
                <span className="nes-badge is-primary text-[0.6rem]">
                  <span>{project.status}</span>
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-sm [font-family:var(--font-noto)]">
              {project.summary}
            </p>

            <dl className="mt-3 space-y-2 text-xs [font-family:var(--font-noto)]">
              <div className="flex gap-2">
                <dt className="w-20 text-fami-gold">Role</dt>
                <dd>{project.role}</dd>
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
                <dt className="w-20 text-fami-gold">Outcome</dt>
                <dd>{project.outcomeOrLearning}</dd>
              </div>
            </dl>

            {project.link ? (
              <a
                className="nes-btn mt-4 w-full text-center"
                href={project.link.href}
                target={project.link.href.startsWith("http") ? "_blank" : undefined}
                rel={project.link.href.startsWith("http") ? "noreferrer" : undefined}
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


