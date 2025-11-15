const placeholderProjects = [
  { title: "Retro Commerce", summary: "NES感UIのEC体験。", status: "2024" },
  { title: "Arcade CMS", summary: "レトロテーマの管理画面。", status: "2023" },
  { title: "Pixel Labs", summary: "8bitアニメ付きブランドサイト。", status: "2022" },
  { title: "Quest Tracker", summary: "RPG風タスク管理PWA。", status: "2021" },
];

export function Projects() {
  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between">
        <h2
          className="text-xl text-fami-gold"
          style={{ fontFamily: "var(--font-press)" }}
        >
          Projects
        </h2>
        <span className="text-xs uppercase tracking-[0.3em] text-fami-gold">
          GRID VIEW
        </span>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {placeholderProjects.map((project) => (
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
              <span className="nes-badge is-primary text-[0.6rem]">
                <span>{project.status}</span>
              </span>
            </div>
            <p className="mt-2 text-sm [font-family:var(--font-noto)]">
              {project.summary}
            </p>
            <button className="nes-btn mt-4 w-full">詳細 coming soon</button>
          </article>
        ))}
      </div>
    </section>
  );
}
