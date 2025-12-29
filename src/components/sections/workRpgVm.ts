import type { ExternalLink, WorkEntry } from "@/content/portfolio";
import { createWorkRpgQuestId } from "@/components/sections/workRpgId";

export type WorkRpgQuestVM = {
  id: string;
  anchorId?: string;
  title: string;
  summary: string;
  role: string;
  tech: string[];
};

export type WorkRpgStats = {
  projectsCount: number;
  uniqueTechCount: number;
};

export type WorkRpgEntryVM = {
  key: string;
  header: { period: string; company: string };
  body: { summary: string; techTags: string[]; links: ExternalLink[] };
  stats: WorkRpgStats;
  quests: WorkRpgQuestVM[];
  initialSelectedQuestId: string | null;
};

function uniqueCount(values: string[]) {
  return new Set(values.map((v) => v.trim()).filter(Boolean)).size;
}

export function buildWorkRpgEntryVm(entry: WorkEntry): WorkRpgEntryVM {
  const usedIds = new Map<string, number>();

  const quests: WorkRpgQuestVM[] = entry.projects.map((p) => {
    const id = createWorkRpgQuestId({ anchorId: p.anchorId, title: p.title, used: usedIds });

    return {
      id,
      anchorId: p.anchorId,
      title: p.title,
      summary: p.summary,
      role: p.role,
      tech: p.tech,
    };
  });

  const techTags = entry.tech ?? [];
  const allTech = [
    ...techTags,
    ...quests.flatMap((q) => q.tech),
  ];

  const stats: WorkRpgStats = {
    projectsCount: quests.length,
    uniqueTechCount: uniqueCount(allTech),
  };

  return {
    key: entry.key,
    header: { period: entry.period, company: entry.company },
    body: { summary: entry.summary, techTags, links: entry.links ?? [] },
    stats,
    quests,
    initialSelectedQuestId: quests[0]?.id ?? null,
  };
}


