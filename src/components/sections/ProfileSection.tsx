import { getPortfolio } from "@/content/portfolio";

export async function ProfileSection() {
  const { profile } = await getPortfolio();
  return (
    <section
      id={profile.id}
      className="scroll-mt-6 frame bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2
        className="text-xl text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        {profile.heading}
      </h2>
      <p className="mt-3 text-sm [font-family:var(--font-noto)]">{profile.body}</p>
    </section>
  );
}


