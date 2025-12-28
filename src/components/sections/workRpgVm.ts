import type { ExternalLink, Project, WorkEntry } from "@/content/portfolio";
import { createWorkRpgQuestId } from "@/components/sections/workRpgId";

export type WorkRpgQuestVM = {
  id: string;
  anchorId?: string;
  title: string;
  visibility: "public" | "private";
  statusBadge?: string;
  summary: string;
  role: string;
  tech: string[];
  outcomeOrLearning: string;
  link?: ExternalLink;
  asset?: Project["asset"];
};

export type WorkRpgStats = {
  projectsCount: number;
  uniqueTechCount: number;
  assetsCount: number;
  linksCount: number;
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
    const visibility = p.visibility ?? "public";

    return {
      id,
      anchorId: p.anchorId,
      title: p.title,
      visibility,
      statusBadge: p.status,
      summary: p.summary,
      role: p.role,
      tech: p.tech,
      outcomeOrLearning: p.outcomeOrLearning,
      link: p.link,
      asset: p.asset,
    };
  });

  const techTags = entry.tech ?? [];
  const allTech = [
    ...techTags,
    ...quests.flatMap((q) => q.tech),
  ];

  const linksCount =
    (entry.links?.length ?? 0) + quests.reduce((acc, q) => acc + (q.link ? 1 : 0), 0);

  const stats: WorkRpgStats = {
    projectsCount: quests.length,
    uniqueTechCount: uniqueCount(allTech),
    assetsCount: quests.reduce((acc, q) => acc + (q.asset ? 1 : 0), 0),
    linksCount,
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


