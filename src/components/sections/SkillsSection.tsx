import { getPortfolio } from "@/content/portfolio";
import { SectionShell } from "@/components/sections/SectionShell";
import { SkillLevelBar } from "@/components/sections/SkillLevelBar";

const CURRENT_YEAR = new Date().getFullYear();

function formatUsageRange(skill: { firstUsedYear?: number; lastUsedYear?: number }) {
  if (typeof skill.firstUsedYear === "number" && typeof skill.lastUsedYear === "number") {
    if (skill.lastUsedYear >= CURRENT_YEAR) {
      return skill.firstUsedYear < CURRENT_YEAR ? `${skill.firstUsedYear}–` : null;
    }
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

  const tiles = categories
    ? categories.flatMap((c) => c.items.map((skill) => ({ category: c.name, skill })))
    : skills.items.map((skill) => ({ category: "Skill", skill }));

  return (
    <SectionShell
      id={skills.id}
      heading={skills.heading}
      icon="/assets/pixel/icons/skills.svg"
      lead="実務で触った経験年数ベースのステータス。"
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {tiles.map(({ category, skill }, i) => (
          <SkillLevelBar
            key={`${category}:${skill.label}`}
            category={category}
            label={skill.label}
            years={skill.years}
            max={maxYears}
            rangeLabel={formatUsageRange(skill)}
            delayMs={i * 60}
          />
        ))}
      </ul>
    </SectionShell>
  );
}
