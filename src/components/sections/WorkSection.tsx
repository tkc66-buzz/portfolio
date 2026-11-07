import { getPortfolio } from "@/content/portfolio";
import { SectionShell } from "@/components/sections/SectionShell";
import { WorkTimeline } from "@/components/sections/WorkTimeline";
import { buildWorkTimelineVm } from "@/components/sections/workTimelineVm";

export async function WorkSection() {
  const { work } = await getPortfolio();
  const vm = buildWorkTimelineVm(work.items);

  return (
    <SectionShell
      id={work.id}
      heading={work.heading}
      icon="/assets/pixel/icons/work.svg"
      lead="キャリアの全体像をタイムラインで。バーを選ぶと、その会社でのプロジェクトが表示されます。"
    >
      <WorkTimeline vm={vm} />
    </SectionShell>
  );
}
