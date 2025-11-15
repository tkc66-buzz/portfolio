const skills = [
  { label: "TypeScript", level: 90 },
  { label: "Next.js", level: 85 },
  { label: "Design Systems", level: 80 },
  { label: "Motion & Micro UX", level: 70 },
];

export function Skills() {
  return (
    <section className="nes-container with-title bg-black/40 text-fami-ivory">
      <h2 className="title text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
        Skills
      </h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.label}>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-fami-gold">
              <span>{skill.label}</span>
              <span>{skill.level}%</span>
            </div>
            <progress
              className="nes-progress is-warning"
              value={skill.level}
              max={100}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
