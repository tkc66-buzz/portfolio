import "server-only";

import type { TocItemId } from "@/components/toc";

const CURRENT_YEAR = new Date().getFullYear();

export type ExternalLink = {
  label: string;
  href: string;
};

export type Visibility = "public" | "private";

export type Asset = {
  src: string; // path under /public, e.g. "/assets/diagrams/go-migration.svg"
  alt: string;
  kind: "diagram" | "screenshot" | "pixel-art";
  width?: number;
  height?: number;
};

export type Project = {
  visibility?: Visibility; // default: "public"
  /**
   * Optional in-page anchor id for direct linking (e.g. from Experience evidence hints).
   * Keep stable once published.
   */
  anchorId?: string;
  title: string;
  summary: string;
  role: string;
  tech: string[];
  outcomeOrLearning: string;
  asset?: Asset;
  link?: ExternalLink;
  status?: string;
};

export type Skill = {
  label: string;
  /**
   * Years of hands-on experience (preferred).
   * Use integer or half steps (e.g. 3.5).
   */
  years: number;
  /**
   * First year you used this skill in practice (optional).
   * If set, `lastUsedYear` must also be set.
   */
  firstUsedYear?: number;
  /**
   * Last year you used this skill in practice (optional).
   * Use the current year if you still use it.
   * If set, `firstUsedYear` must also be set.
   */
  lastUsedYear?: number;
};

export type SkillCategory = {
  name: string;
  items: Skill[];
};

export type SectionContent = {
  id: TocItemId;
  heading: string;
};

export type Profile = SectionContent & { body: string };
export type WorkEntry = {
  /**
   * Stable key for React lists.
   * Use something public-safe (avoid sensitive internal IDs).
   */
  key: string;
  period: string; // display-only (e.g. "2019–2025")
  company: string; // public-safe label
  /**
   * Exactly one paragraph for the company/organization.
   * (Can include line breaks if needed; UI may render with whitespace-pre-line.)
   */
  summary: string;
  projects: Project[]; // nested projects under this company
  tech?: string[]; // optional company-level tags
  links?: ExternalLink[]; // optional company-level links
};

export type Work = SectionContent & { items: WorkEntry[] };
export type Skills = SectionContent & { items: Skill[]; categories?: SkillCategory[] };
export type Writing = SectionContent & { items: ExternalLink[] };

export type ActivityItem = {
  year: string;
  title: string;
  context?: string;
  link?: ExternalLink;
};

export type ActivityGroup = {
  name: "Talks" | "Books" | "Community" | "Achievements";
  items: ActivityItem[];
};

export type Activities = SectionContent & { groups: ActivityGroup[] };
export type Contact = SectionContent & { blurb: string; links: ExternalLink[] };

export type Portfolio = {
  profile: Profile;
  work: Work;
  writing: Writing;
  activities: Activities;
  skills: Skills;
  contact: Contact;
};

function yearsFromRangeInclusive(firstUsedYear: number, lastUsedYear: number): number {
  return Math.max(0, lastUsedYear - firstUsedYear + 1);
}

function skillRange(label: string, firstUsedYear: number, lastUsedYear: number): Skill {
  return {
    label,
    years: yearsFromRangeInclusive(firstUsedYear, lastUsedYear),
    firstUsedYear,
    lastUsedYear,
  };
}

function flattenSkillCategories(categories: SkillCategory[]): Skill[] {
  const byLabel = new Map<string, Skill>();
  for (const cat of categories) {
    for (const skill of cat.items) {
      if (!byLabel.has(skill.label)) byLabel.set(skill.label, skill);
    }
  }
  return [...byLabel.values()];
}

function normalizeSkills(skills: Skills): Skills {
  if (skills.categories && skills.categories.length > 0) {
    return { ...skills, items: flattenSkillCategories(skills.categories) };
  }
  return skills;
}

export const publicPortfolio: Portfolio = {
  profile: {
    id: "profile",
    heading: "Profile",
    body:
      "Machine Learning Engineer、Data Scientist、Infrastructure Engineer、Platform Engineer などの職種を経験してきました。現在は株式会社エウレカにて Backend Engineer として、主に Go を用いた開発に携わっています。\n\n" +
      "また、エウレカ以外では副業として、サービス立ち上げ当初からインフラ基盤をゼロから構築したり、TypeScript を用いたフルスタック開発にも取り組んでいます。",
  },
  work: {
    id: "work",
    heading: "Work",
    items: [
      {
        key: "company-main",
        period: "2019–2025",
        company: "Company (Public)",
        summary:
          "Backend/Platform領域を中心に、設計〜実装〜運用まで一貫して改善を推進。信頼性と開発速度の両立を目的に、移行・運用設計・観測性の整備などに取り組んできました。",
        projects: [
          {
            visibility: "public",
            anchorId: "project-go-migration",
            title: "Goによるバックエンド刷新",
            asset: {
              kind: "diagram",
              src: "/assets/diagrams/go-migration.svg",
              alt: "段階移行（切替/ロールバック前提）の概念図",
            },
            summary:
              "課題: 既存システムの制約下での刷新。対応: 段階移行（切替/ロールバック前提）でリスクを抑えつつ置き換えを推進。",
            role: "Tech Lead / Backend",
            tech: ["Go", "AWS", "SQL", "Observability"],
            outcomeOrLearning:
              "結果/学び: 分割・切替・ロールバックを含む移行設計と、運用まで含めた品質担保の型を作れた。",
            status: "2024–2025",
          },
          {
            visibility: "public",
            anchorId: "project-observability",
            title: "監視・運用改善（Datadog中心）",
            summary:
              "課題: 障害対応の属人性と検知ノイズ。対応: 観測性の底上げとアラート設計の見直しで、アクションに繋がる運用へ。",
            role: "Infrastructure / Platform",
            tech: ["Datadog", "AWS", "SLO", "Incident Response"],
            outcomeOrLearning:
              "結果/学び: “見える化”で終わらせず、意思決定と行動に繋がるメトリクス/アラートへ落とす重要性を再確認。",
            status: "2019–2025",
          },
        ],
      },
      {
        key: "company-side",
        period: "2021–2025",
        company: "Side Work",
        summary:
          "サービス立ち上げ初期の不確実性が高い環境で、運用に耐える土台（環境分離、CI/CD、IaCなど）を整えつつ、必要に応じてフルスタックで実装も担当しました。",
        projects: [
          {
            visibility: "public",
            anchorId: "project-greenfield-infra",
            title: "ゼロからのインフラ基盤構築（副業）",
            summary:
              "課題: 立ち上げ初期に“運用前提の土台”がない。対応: 環境分離/CI/CD/IaCを揃え、継続運用できる基盤を構築。",
            role: "Infra / Full-stack (TypeScript)",
            tech: ["AWS", "Terraform", "CI/CD", "TypeScript"],
            outcomeOrLearning:
              "結果/学び: 最初に“運用の標準”を置くことで、後からの速度と安全性が両立できると実感。",
            status: "2021–2025",
          },
        ],
      },
    ],
  },
  writing: {
    id: "writing",
    heading: "Writing",
    items: [
      { label: "Tech (Medium)", href: "https://medium.com/@buzz_tkc" },
      { label: "Casual (sizu.me)", href: "https://sizu.me/buzz" },
    ],
  },
  activities: {
    id: "activities",
    heading: "Activities",
    groups: [
      {
        name: "Talks",
        items: [
          {
            year: "2020",
            title: "AWS Partner Summit Tokyo",
            context:
              "AWS Partner Summit TokyoにAWS ANGEL DOJOでアライアンス賞を受賞したプロダクトを紹介しました",
            link: {
              label: "開催記事",
              href: "https://aws.amazon.com/jp/blogs/psa/aws-partner-summit-tokyo/",
            },
          },
          {
            year: "2024",
            title: "Developpers Summit",
            context:
              "Developper Summit TokyoにPlatform Engineeringについてオフラインで登壇しました",
            link: {
              label: "DS2024",
              href: "https://event.shoeisha.jp/devsumi/20240215/session/4807",
            },
          },
        ],
      },
      {
        name: "Books",
        items: [
          {
            year: "2024",
            title: "Real World Platform Engineering: 現場の知恵とノウハウ",
            context:
              "Platform Engineeringの現場でのノウハウや導入についてMeetup メンバーで書籍を執筆し、技術書典と技書博で発売しました。",
            link: {
              label: "技術書典",
              href: "https://techbookfest.org/product/qunTLHG5hLbL91bBX9dqDU?productVariantID=diV811bQsBeU5YfWhtGym0",
            },
          },
        ],
      },
      {
        name: "Community",
        items: [
          {
            year: "2024",
            title: "Platform Engineering Kaigi Core Staff",
            context: "日本初となるPlatform Engineeringに関するカンファレンス開催に貢献しました。",
            link: { label: "PEK2024", href: "https://www.cnia.io/pek2024/" },
          },
          {
            year: "2019-2025",
            title: "SRE NEXT Core Staff",
            context: "SRE NEXT Core Staffとして、SNS、 会場、 スポンサー、 司会等を担当しました。",
            link: { label: "SRE NEXT", href: "https://sre-next.dev/" },
          },
          {
            year: "2022-2025",
            title: "Cloud Native Days Core Staff",
            context: "Cloud Native Daysの配信担当としてハイブリッドイベント開催に貢献しました。",
            link: { label: "CND Home", href: "https://cloudnativedays.jp/" },
          },
        ],
      },
      {
        name: "Achievements",
        items: [
          {
            year: "2019",
            title: "新卒のIT研修でシステム開発演習があり、同期で1番を取る。",
          },
          {
            year: "2020",
            title: "第一回AWS ANGEL Dojo アライアンス賞受賞。",
            link: { label: "ANGEL Dojo", href: "https://aws.amazon.com/jp/blogs/psa/angel-dojo-season1/" },
          },
          {
            year: "2021",
            title: "AWS Certified DevOps Engineer Professional 取得。",
          },
        ],
      },
    ],
  },
  skills: {
    id: "skills",
    heading: "Skills",
    items: [],
    categories: [
      {
        name: "Backend",
        items: [
          skillRange("Go", 2022, CURRENT_YEAR),
          skillRange("TypeScript", 2023, CURRENT_YEAR),
          skillRange("Python", 2019, 2022),
          skillRange("API Design", 2019, CURRENT_YEAR),
          skillRange("RDB / NoSQL", 2019, CURRENT_YEAR),
        ],
      },
      {
        name: "Infrastructure",
        items: [
          skillRange("AWS", 2019, CURRENT_YEAR),
          skillRange("GCP", 2022, CURRENT_YEAR),
          skillRange("Terraform", 2021, CURRENT_YEAR),
          skillRange("Observability (Datadog)", 2019, CURRENT_YEAR),
          skillRange("CI/CD", 2019, CURRENT_YEAR),
        ],
      },
      {
        name: "Data / ML",
        items: [skillRange("Data Analysis", 2019, 2022), skillRange("ML Engineering", 2019, 2022)],
      },
      {
        name: "Frontend",
        items: [
          skillRange("TypeScript", 2023, CURRENT_YEAR),
          skillRange("React", 2023, CURRENT_YEAR),
        ],
      },
    ],
  },
  contact: {
    id: "contact",
    heading: "Contact",
    blurb: "副業・技術相談など、お気軽にご連絡ください。",
    links: [
      { label: "X", href: "https://x.com/buzz_tkc" },
      { label: "Email", href: "worktkc2018@gmail.com" },
      { label: "GitHub", href: "https://github.com/tkc66-buzz" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/takeshi-watananbe-4736a8285/" },
    ],
  },
};

function normalizeLinks(links: ExternalLink[]): ExternalLink[] {
  return links.map((link) => {
    if (link.label.toLowerCase() === "email" && !link.href.includes(":")) {
      return { ...link, href: `mailto:${link.href}` };
    }
    return link;
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPortfolioPatch(value: unknown): value is Partial<Portfolio> {
  if (!isRecord(value)) return false;
  // Accept only objects that contain at least one known top-level key.
  // This prevents accidentally merging error payloads like { error: "Unauthorized" }.
  return (
    "profile" in value ||
    "work" in value ||
    "writing" in value ||
    "activities" in value ||
    "skills" in value ||
    "contact" in value
  );
}

function mergePortfolio(base: Portfolio, patch: Partial<Portfolio>): Portfolio {
  // Only merge known keys; do not spread arbitrary top-level keys onto Portfolio.
  const mergedCandidate: Portfolio = {
    profile: { ...base.profile, ...(patch.profile ?? {}) },
    work: { ...base.work, ...(patch.work ?? {}) },
    writing: { ...base.writing, ...(patch.writing ?? {}) },
    activities: { ...base.activities, ...(patch.activities ?? {}) },
    skills: { ...base.skills, ...(patch.skills ?? {}) },
    contact: { ...base.contact, ...(patch.contact ?? {}) },
  };

  // Strictness: Skills MUST have exact years. If a private override provides invalid skills,
  // ignore only the skills override (keep the rest).
  const normalizedSkills = normalizeSkills(mergedCandidate.skills);
  const skillsValid = validateSkills(normalizedSkills);
  const merged: Portfolio = skillsValid
    ? { ...mergedCandidate, skills: normalizedSkills }
    : { ...mergedCandidate, skills: normalizeSkills(base.skills) };

  merged.contact.links = normalizeLinks(merged.contact.links);
  return merged;
}

function validateSkills(skills: Skills): boolean {
  const isValidYears = (y: unknown) => typeof y === "number" && Number.isFinite(y) && y >= 0;

  const isValidUsageYear = (y: unknown) =>
    typeof y === "number" && Number.isInteger(y) && y >= 1970 && y <= 2100;

  const validateUsageRange = (s: Skill) => {
    const hasFirst = typeof s.firstUsedYear !== "undefined";
    const hasLast = typeof s.lastUsedYear !== "undefined";
    if (hasFirst !== hasLast) return false;
    if (!hasFirst) return true;
    if (!isValidUsageYear(s.firstUsedYear) || !isValidUsageYear(s.lastUsedYear)) return false;
    return (s.firstUsedYear as number) <= (s.lastUsedYear as number);
  };

  const validateItems = (items: Skill[]) =>
    items.every((s) => isValidYears(s.years) && validateUsageRange(s));

  if (!validateItems(skills.items)) return false;
  if (!skills.categories) return true;
  return skills.categories.every((c) => validateItems(c.items));
}
async function loadPrivatePortfolioFromEnv(): Promise<Partial<Portfolio> | null> {
  const raw = process.env.PORTFOLIO_PRIVATE_JSON;
  if (!raw) return null;
  const parsed: unknown = JSON.parse(raw);
  return isPortfolioPatch(parsed) ? (parsed as Partial<Portfolio>) : null;
}

/**
 * Returns portfolio data with optional private overrides.
 *
 * Private data MUST NOT be committed to the repo. Provide it via either:
 * - PORTFOLIO_PRIVATE_JSON (JSON string)
 */
export async function getPortfolio(): Promise<Portfolio> {
  const source = process.env.PORTFOLIO_PRIVATE_SOURCE; // "env" | "url" | undefined
  const isDev = process.env.NODE_ENV === "development";
  try {
    const patch =
      source === "env"
          ? await loadPrivatePortfolioFromEnv()
          : await loadPrivatePortfolioFromEnv();
    if (!patch) {
      if (isDev && source) {
        if (source === "url") {
          console.warn(
            `[portfolio/private] Private source "url" is currently unsupported (spreadsheet運用停止). Showing public defaults.`,
          );
        }
        console.warn(
          `[portfolio/private] Private source is set (${source}) but no patch was loaded. Showing public defaults.`,
        );
      }
      return mergePortfolio(publicPortfolio, {});
    }
    return mergePortfolio(publicPortfolio, patch);
  } catch {
    // Safety: never crash the site due to private data issues; fall back to public.
    if (isDev && source) {
      console.warn(
        `[portfolio/private] Private load threw an error (source=${source}). Showing public defaults.`,
      );
    }
    return mergePortfolio(publicPortfolio, {});
  }
}

// Backwards-compatible named exports (public-only). Prefer getPortfolio().
export const profile = publicPortfolio.profile;
export const work = publicPortfolio.work;
export const writing = publicPortfolio.writing;
export const activities = publicPortfolio.activities;
export const skills = publicPortfolio.skills;
export const contact = publicPortfolio.contact;
