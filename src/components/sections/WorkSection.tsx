import { PixelIcon } from "@/components/PixelIcon";
import { WorkQuestLog } from "@/components/sections/WorkQuestLog";
import { buildWorkRpgEntryVm } from "@/components/sections/workRpgVm";
import { getPortfolio } from "@/content/portfolio";

export async function WorkSection() {
  const { work } = await getPortfolio();

  return (
    <section
      id={work.id}
      className="frame work-rpg scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
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
        {work.items.map((entry) => {
          const vm = buildWorkRpgEntryVm(entry);
          return (
            <article key={entry.key} className="frame bg-[#1b1b1b] p-4">
              <WorkQuestLog entry={vm} />
            </article>
          );
        })}
      </div>
    </section>
  );
}


