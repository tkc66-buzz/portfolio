import { getPortfolio } from "@/content/portfolio";

const EVIDENCE_DELIM = " / Evidence: ";

function splitEvidence(text: string): { main: string; evidence?: string } {
  const parts = text.split(EVIDENCE_DELIM);
  if (parts.length <= 1) return { main: text };
  const [main, ...rest] = parts;
  const evidence = rest.join(EVIDENCE_DELIM).trim();
  return { main: main.trim(), evidence: evidence.length > 0 ? evidence : undefined };
}

export async function ExperienceSection() {
  const { experience, projects } = await getPortfolio();
  const anchorByTitle = new Map(
    projects.items
      .filter((p) => typeof p.anchorId === "string" && p.anchorId.length > 0)
      .map((p) => [p.title, p.anchorId as string]),
  );

  return (
    <section
      id={experience.id}
      className="frame scroll-mt-[var(--menu-offset)] bg-[#1b1b1b] p-6 text-fami-ivory"
    >
      <h2 className="text-xl text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
        {experience.heading}
      </h2>
      <p className="mt-3 text-sm [font-family:var(--font-noto)]">
        職務の軸（役割/責務/判断の癖）を時系列でまとめています。具体例は Projects に載せています。
      </p>
      <ul className="mt-4 space-y-4 text-sm [font-family:var(--font-noto)]">
        {experience.highlights.map((item) => {
          const { main, evidence } = splitEvidence(item.text);
          const anchor = evidence ? anchorByTitle.get(evidence) : undefined;
          return (
            <li key={item.year} className="flex gap-3">
              <span className="shrink-0">
                <span className="nes-badge is-warning text-[0.6rem]">
                  <span>{item.year}</span>
                </span>
              </span>
              <div className="min-w-0">
                <p className="leading-relaxed">{main}</p>
                {evidence ? (
                  <p className="mt-1 text-xs text-fami-ivory/90">
                    <span className="text-fami-gold">Evidence</span>:{" "}
                    {anchor ? (
                      <a className="underline" href={`#${anchor}`}>
                        {evidence}
                      </a>
                    ) : (
                      <span>{evidence}</span>
                    )}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
