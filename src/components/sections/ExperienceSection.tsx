import { getPortfolio } from "@/content/portfolio";

// Prefer "Detail" in the UI, but keep backwards compatibility with existing "Evidence" authoring.
// Accept minor formatting variations, e.g. "/ Detail:", " /Detail: ", "/ Evidence:", etc.
const DETAIL_SPLIT_RE = /\s*\/\s*(?:Detail|Evidence):\s*/;

function normalizeEvidenceKey(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function splitEvidence(text: string): { main: string; evidence?: string } {
  const parts = text.split(DETAIL_SPLIT_RE);
  if (parts.length <= 1) return { main: text };
  const [main, ...rest] = parts;
  const evidence = rest.join(" / Detail: ").trim();
  return { main: main.trim(), evidence: evidence.length > 0 ? evidence : undefined };
}

export async function ExperienceSection() {
  const { experience, projects } = await getPortfolio();
  const anchorByTitle = new Map(
    projects.items
      .filter((p) => typeof p.anchorId === "string" && p.anchorId.length > 0)
      .map((p) => [normalizeEvidenceKey(p.title), p.anchorId as string]),
  );
  const anchorIdSet = new Set(
    projects.items
      .map((p) => p.anchorId)
      .filter((id): id is string => typeof id === "string" && id.length > 0),
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
        経歴を時系列で簡単にまとめています。詳細は Projects に載せています。
      </p>
      <ul className="mt-4 space-y-4 text-sm [font-family:var(--font-noto)]">
        {experience.highlights.map((item) => {
          const { main, evidence } = splitEvidence(item.text);
          const normalizedEvidence = evidence ? normalizeEvidenceKey(evidence) : undefined;
          const anchor =
            normalizedEvidence?.startsWith("#")
              ? anchorIdSet.has(normalizedEvidence.slice(1))
                ? normalizedEvidence.slice(1)
                : undefined
              : normalizedEvidence
                ? anchorByTitle.get(normalizedEvidence)
                : undefined;
          return (
            <li key={item.year} className="flex gap-3">
              <span className="shrink-0">
                <span className="nes-badge is-warning text-[0.75rem] sm:text-[0.8rem]">
                  <span>{item.year}</span>
                </span>
              </span>
              <div className="min-w-0">
                <p className="break-words whitespace-pre-line leading-relaxed">{main}</p>
                {normalizedEvidence ? (
                  <p className="mt-1 text-xs text-fami-ivory/90">
                    <span className="text-fami-gold">Detail</span>:{" "}
                    {anchor ? (
                      <a className="underline" href={`#${anchor}`}>
                        {normalizedEvidence}
                      </a>
                    ) : (
                      <span>{normalizedEvidence}</span>
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
