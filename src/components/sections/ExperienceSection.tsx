import { getPortfolio } from "@/content/portfolio";

export async function ExperienceSection() {
  const { experience } = await getPortfolio();
  return (
    <section id={experience.id} className="frame scroll-mt-6 bg-[#1b1b1b] p-6 text-fami-ivory">
      <h2 className="text-xl text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
        {experience.heading}
      </h2>
      <ul className="mt-4 space-y-3 text-sm [font-family:var(--font-noto)]">
        {experience.highlights.map((item) => (
          <li key={item.year} className="flex gap-3">
            <span className="shrink-0">
              <span className="nes-badge is-warning text-[0.6rem]">
                <span>{item.year}</span>
              </span>
            </span>
            <span className="leading-relaxed">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
