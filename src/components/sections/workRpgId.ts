function slugify(input: string): string {
  const normalized = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const slug = normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return slug || "quest";
}

function normalizeBaseId(anchorId: string | undefined, title: string): string {
  const base = (anchorId || "").trim();
  if (base) return slugify(base);
  return slugify(title);
}

/**
 * Creates a stable, deterministic quest id with a de-dup suffix rule:
 * - first occurrence: "foo"
 * - second occurrence: "foo-2"
 * - third occurrence: "foo-3"
 */
export function createWorkRpgQuestId(opts: {
  anchorId?: string;
  title: string;
  used: Map<string, number>;
}): string {
  const base = normalizeBaseId(opts.anchorId, opts.title);
  const nextCount = (opts.used.get(base) ?? 0) + 1;
  opts.used.set(base, nextCount);
  return nextCount === 1 ? base : `${base}-${nextCount}`;
}


