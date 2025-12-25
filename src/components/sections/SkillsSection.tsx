import { getPortfolio } from "@/content/portfolio";

export async function SkillsSection() {
  const { skills } = await getPortfolio();
  const categories =
    skills.categories && skills.categories.length > 0 ? skills.categories : null;
  return (
    <section
      id={skills.id}
      className="scroll-mt-6 frame bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2
        className="text-xl text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        {skills.heading}
      </h2>
      {categories ? (
        <div className="mt-4 space-y-6">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h3
                className="text-xs uppercase tracking-[0.3em] text-fami-gold"
                style={{ fontFamily: "var(--font-press)" }}
              >
                {cat.name}
              </h3>
              <div className="mt-3 space-y-4">
                {cat.items.map((skill) => (
                  <div key={`${cat.name}:${skill.label}`}>
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
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 space-y-4">
          {skills.items.map((skill) => (
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
      )}
    </section>
  );
}


