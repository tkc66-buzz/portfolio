import "server-only";

import { unstable_cache } from "next/cache";

import type { TocItemId } from "@/components/toc";

const CURRENT_YEAR = new Date().getFullYear();

export type ExternalLink = {
  label: string;
  href: string;
};

export type Visibility = "public" | "private";

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
  link?: ExternalLink;
  status?: string;
};

export type ExperienceHighlight = {
  year: string;
  text: string;
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
export type Experience = SectionContent & { highlights: ExperienceHighlight[] };
export type Projects = SectionContent & { items: Project[] };
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
  experience: Experience;
  projects: Projects;
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
      "Machine Learning Engineer、Data Scientist、Infrastructure Engineer、Platform Engineer などの職種を経験してきました。現在は Backend Engineer として開発に携わっています。\n\n" +
      "プロダクト価値・運用・開発体験をつなぐ改善を、設計〜実装〜運用まで一貫して進めるのが得意です。",
  },
  experience: {
    id: "experience",
    heading: "Experience",
    highlights: [],
  },
  projects: {
    id: "projects",
    heading: "Projects",
    // Copy checklist (public):
    // - Problem: why it mattered
    // - Action: what you did (and key tradeoffs)
    // - Result/Learning: what changed (or what you learned if metrics can't be shared)
    items: [],
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
            title: "Tech Conference Talk",
            context: "技術イベントで登壇しました（詳細は非公開）。",
          },
          {
            year: "2024",
            title: "Tech Conference Talk",
            context: "技術イベントで登壇しました（詳細は非公開）。",
          },
        ],
      },
      {
        name: "Books",
        items: [
          {
            year: "2024",
            title: "Technical Book (Co-author)",
            context: "技術書の執筆に関わりました（詳細は非公開）。",
          },
        ],
      },
      {
        name: "Community",
        items: [
          {
            year: "2024",
            title: "Tech Community Staff",
            context: "技術コミュニティの運営に関わりました（詳細は非公開）。",
          },
          {
            year: "2019-2025",
            title: "Tech Community Staff",
            context: "技術コミュニティの運営に関わりました（詳細は非公開）。",
          },
          {
            year: "2022-2025",
            title: "Tech Community Staff",
            context: "技術コミュニティの運営に関わりました（詳細は非公開）。",
          },
        ],
      },
      {
        name: "Achievements",
        items: [
          {
            year: "2019",
            title: "新卒のIT研修で同期内トップ評価を獲得。",
          },
          {
            year: "2020",
            title: "クラウド領域のアワード受賞。",
          },
          {
            year: "2021",
            title: "クラウド関連の上位資格を取得。",
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
          skillRange("Observability", 2019, CURRENT_YEAR),
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
      { label: "Email", href: "worktkc2018@gmail.com" },
      { label: "X / Twitter", href: "https://x.com/buzz_tkc" },
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
    "experience" in value ||
    "projects" in value ||
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
    experience: { ...base.experience, ...(patch.experience ?? {}) },
    projects: { ...base.projects, ...(patch.projects ?? {}) },
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

async function loadPrivatePortfolioFromUrl(): Promise<Partial<Portfolio> | null> {
  const url = process.env.PORTFOLIO_PRIVATE_URL;
  if (!url) return null;

  const isDev = process.env.NODE_ENV === "development";
  const warnDev = (msg: string) => {
    if (isDev) console.warn(`[portfolio/private] ${msg}`);
  };
  const token = process.env.PORTFOLIO_PRIVATE_URL_BEARER;
  const revalidateSeconds = Number(process.env.PORTFOLIO_PRIVATE_REVALIDATE_SECONDS ?? "86400");
  const revalidate = Number.isFinite(revalidateSeconds) ? Math.max(0, revalidateSeconds) : 86400;
  const timeoutMs = Number(process.env.PORTFOLIO_PRIVATE_TIMEOUT_MS ?? "3000");
  const timeout = Number.isFinite(timeoutMs) ? Math.max(0, timeoutMs) : 3000;

  const postForExecution = async (targetUrl: string, signal: AbortSignal) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    return await fetch(targetUrl, {
      headers,
      method: "POST",
      body: token ? JSON.stringify({ token }) : JSON.stringify({}),
      // Apps Script Web Apps don't reliably expose Authorization headers to `doGet(e)`.
      // We avoid query params (leaky) and instead send the token in POST body.
      // NOTE: Apps Script must implement `doPost(e)` and validate JSON body.
      redirect: "manual",
      signal,
      ...(isDev ? ({ cache: "no-store" } as const) : {}),
    });
  };

  const getContent = async (targetUrl: string, signal: AbortSignal) => {
    return await fetch(targetUrl, {
      method: "GET",
      redirect: "manual",
      signal,
      ...(isDev ? ({ cache: "no-store" } as const) : {}),
    });
  };

  const fetchPrivatePatch = async () => {
    // Apps Script Web Apps typically respond with a 302 to a content URL on
    // `script.googleusercontent.com`. That content URL only supports GET/HEAD.
    //
    // So we:
    // 1) POST to the /exec URL (execute script + auth)
    // 2) Follow redirects with GET to retrieve the actual JSON content
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    let res: Response | null = null;
    let lastUrl = url;
    try {
      // Step 1: Execute (POST)
      res = await postForExecution(url, controller.signal);

      // Step 2: Follow redirects with GET
      for (let i = 0; i < 5 && res; i++) {
        const isRedirect = res.status >= 300 && res.status < 400;
        if (!isRedirect) break;
        const location = res.headers.get("location");
        if (!location) break;
        const nextUrl = new URL(location, url).toString();
        lastUrl = nextUrl;
        res = await getContent(nextUrl, controller.signal);
      }
    } finally {
      clearTimeout(timer);
    }

    if (!res) {
      warnDev(`No response (likely timeout after ${timeout}ms). Falling back to public defaults.`);
      return null;
    }
    if (!res.ok) {
      warnDev(
        `Request failed: ${res.status} ${res.statusText} (lastUrl=${lastUrl}). Falling back to public defaults.`,
      );
      return null;
    }

    let parsed: unknown;
    try {
      parsed = await res.json();
    } catch {
      warnDev(`Response was not valid JSON (lastUrl=${lastUrl}). Falling back to public defaults.`);
      return null;
    }
    if (!isPortfolioPatch(parsed)) {
      warnDev(
        `Response JSON did not match Portfolio patch contract (lastUrl=${lastUrl}). Falling back to public defaults.`,
      );
      return null;
    }
    return parsed as Partial<Portfolio>;
  };

  // Note: Next.js fetch cache does not reliably cache non-GET requests.
  // We use unstable_cache to cache the resolved patch for the configured window.
  if (isDev) {
    // Local dev should always reflect the latest spreadsheet edits on a normal reload.
    // Bypass unstable_cache entirely to avoid stale private patch data during development.
    return await fetchPrivatePatch();
  }

  const cached = unstable_cache(fetchPrivatePatch, ["portfolio-private-url", url, token ?? ""], { revalidate });
  return await cached();
}

/**
 * Returns portfolio data with optional private overrides.
 *
 * Private data MUST NOT be committed to the repo. Provide it via either:
 * - PORTFOLIO_PRIVATE_JSON (JSON string)
 * - PORTFOLIO_PRIVATE_URL (+ optional PORTFOLIO_PRIVATE_URL_BEARER)
 * - PORTFOLIO_PRIVATE_REVALIDATE_SECONDS (default: 86400)
 * - PORTFOLIO_PRIVATE_TIMEOUT_MS (default: 3000)
 */
export async function getPortfolio(): Promise<Portfolio> {
  const source = process.env.PORTFOLIO_PRIVATE_SOURCE; // "env" | "url" | undefined
  const isDev = process.env.NODE_ENV === "development";
  try {
    const patch =
      source === "url"
        ? await loadPrivatePortfolioFromUrl()
        : source === "env"
          ? await loadPrivatePortfolioFromEnv()
          : await loadPrivatePortfolioFromEnv();
    if (!patch) {
      if (isDev && source) {
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
export const experience = publicPortfolio.experience;
export const projects = publicPortfolio.projects;
export const writing = publicPortfolio.writing;
export const activities = publicPortfolio.activities;
export const skills = publicPortfolio.skills;
export const contact = publicPortfolio.contact;
