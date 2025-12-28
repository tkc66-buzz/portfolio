import { getPortfolio } from "@/content/portfolio";
import { PixelIcon } from "@/components/PixelIcon";

export async function ProfileSection() {
  const { profile } = await getPortfolio();
  return (
    <section
      id={profile.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2
        className="font-display flex items-center gap-2 text-xl text-fami-gold"
      >
        <PixelIcon src="/assets/pixel/icons/profile.svg" decorative size="md" />
        <span>{profile.heading}</span>
      </h2>
      <p className="section-body mt-3">{profile.body}</p>
    </section>
  );
}
