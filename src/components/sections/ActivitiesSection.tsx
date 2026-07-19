import { getPortfolio } from "@/content/portfolio";
import { PixelIcon } from "@/components/PixelIcon";
import { ActivitiesOutputGrid } from "@/components/sections/ActivitiesOutputGrid";

export async function ActivitiesSection() {
  const { activities } = await getPortfolio();

  return (
    <section
      id={activities.id}
      className="frame activities-toast text-fami-ivory scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6"
    >
      <h2
        className="text-fami-gold flex items-center gap-2 text-xl"
        style={{ fontFamily: "var(--font-press)" }}
      >
        <PixelIcon src="/assets/pixel/icons/activities.svg" decorative size="md" />
        <span>{activities.heading}</span>
      </h2>

      <p className="section-body-muted mt-3">
        登壇・執筆・コミュニティ活動・受賞/実績をまとめています。
      </p>

      <ActivitiesOutputGrid groups={activities.groups} />
    </section>
  );
}
