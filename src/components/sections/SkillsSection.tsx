import { getPortfolio } from "@/content/portfolio";
import { PixelIcon } from "@/components/PixelIcon";

function formatYears(years: number) {
  if (Number.isInteger(years)) return `${years}y`;
  return `${years}y`;
}

function formatUsageRange(skill: { firstUsedYear?: number; lastUsedYear?: number }) {
  if (typeof skill.firstUsedYear === "number" && typeof skill.lastUsedYear === "number") {
    return `${skill.firstUsedYear}–${skill.lastUsedYear}`;
  }
  return null;
}

export async function SkillsSection() {
  const { skills } = await getPortfolio();
  const categories = skills.categories && skills.categories.length > 0 ? skills.categories : null;

  const allSkills = categories ? categories.flatMap((c) => c.items) : skills.items;
  const yearValues = allSkills
    .map((s) => s.years)
    .filter((v): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0);
  const maxYears = yearValues.length > 0 ? Math.max(...yearValues, 5) : 5;

  return (
    <section
      id={skills.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2
        className="flex items-center gap-2 text-xl text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        <PixelIcon src="/assets/pixel/icons/skills.svg" decorative size="md" />
        <span>{skills.heading}</span>
      </h2>
      <p className="section-body-muted mt-3">
        スキルは “経験年数（実務で触った目安）” を軸に、強みの分布が伝わるように整理しています。
      </p>
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
                      <span className="normal-case">
                        {formatYears(skill.years)}
                        {formatUsageRange(skill) ? ` (${formatUsageRange(skill)})` : ""}
                      </span>
                    </div>
                    <progress
                      className="nes-progress is-warning"
                      value={skill.years}
                      max={maxYears}
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
                <span className="normal-case">
                  {formatYears(skill.years)}
                  {formatUsageRange(skill) ? ` (${formatUsageRange(skill)})` : ""}
                </span>
              </div>
              <progress className="nes-progress is-warning" value={skill.years} max={maxYears} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
