import type { WorkEntry } from "@/content/portfolio";

export type WorkTimelineEntryVM = {
  key: string;
  period: string;
  company: string;
  kind: "main" | "side";
  /** Fractional years, e.g. 2018 → 2018.0; "現在" → now. */
  start: number;
  end: number;
  /** True when the period runs to now ("現在"). */
  ongoing: boolean;
  summary: string;
  tech: string[];
  links: WorkEntry["links"];
  projects: WorkEntry["projects"];
};

export type WorkTimelineVM = {
  minYear: number;
  maxYear: number; // exclusive axis end
  now: number;
  entries: WorkTimelineEntryVM[];
  initialKey: string | null;
};

function parsePeriod(
  period: string,
  now: number,
): { start: number; end: number; ongoing: boolean } {
  const years = period.match(/\d{4}/g)?.map(Number) ?? [];
  const start = years[0] ?? Math.floor(now);
  const ongoing = /現在|present|now/i.test(period) || years.length < 2;
  // A closed range "2018-2019" ends at the start of the last year's spring
  // hand-off, so consecutive jobs meet without overlapping.
  const end = ongoing ? now : (years[years.length - 1] ?? start) + 0.25;
  return { start: start + 0.25, end: Math.max(end, start + 0.5), ongoing };
}

export function buildWorkTimelineVm(items: WorkEntry[], nowDate = new Date()): WorkTimelineVM {
  const now = nowDate.getFullYear() + nowDate.getMonth() / 12;
  const entries = items
    .map((e) => {
      const { start, end, ongoing } = parsePeriod(e.period, now);
      return {
        key: e.key,
        period: e.period,
        company: e.company,
        kind: e.kind ?? "main",
        start,
        end,
        ongoing,
        summary: e.summary,
        tech: e.tech ?? [],
        links: e.links ?? [],
        projects: e.projects,
      } satisfies WorkTimelineEntryVM;
    })
    // Chronological order drives the detail panel's prev/next navigation.
    .toSorted((a, b) => a.start - b.start);

  const minYear = Math.floor(Math.min(...entries.map((e) => e.start), now));
  const maxYear = Math.floor(Math.max(...entries.map((e) => e.end), now)) + 1;
  const latestMain = entries
    .filter((e) => e.kind === "main")
    .toSorted((a, b) => b.start - a.start)[0];

  return { minYear, maxYear, now, entries, initialKey: latestMain?.key ?? entries[0]?.key ?? null };
}
