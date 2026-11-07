import { getPortfolio } from "@/content/portfolio";
import { ActivitiesOutputGrid } from "@/components/sections/ActivitiesOutputGrid";
import { SectionShell } from "@/components/sections/SectionShell";

export async function ActivitiesSection() {
  const { activities } = await getPortfolio();

  return (
    <SectionShell
      id={activities.id}
      heading={activities.heading}
      icon="/assets/pixel/icons/activities.svg"
      lead="登壇・コミュニティ運営・受賞/実績。新しい順に並んでいます。"
    >
      <ActivitiesOutputGrid groups={activities.groups} />
    </SectionShell>
  );
}
