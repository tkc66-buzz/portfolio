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
export type Contact = SectionContent & { blurb: string; links: ExternalLink[] };

export type Portfolio = {
  profile: Profile;
  experience: Experience;
  projects: Projects;
  skills: Skills;
  contact: Contact;
};

function yearsFromRangeInclusive(firstUsedYear: number, lastUsedYear: number): number {
  return Math.max(0, lastUsedYear - firstUsedYear + 1);
}

function skillRange(
  label: string,
  firstUsedYear: number,
  lastUsedYear: number,
): Skill {
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
  experience: {
    id: "experience",
    heading: "Experience",
    highlights: [
      {
        year: "2025",
        text:
          "Backend Engineer (Go)。運用・開発体験・プロダクト価値の三点をつなぐ改善をリード（設計〜実装〜運用）。",
      },
      {
        year: "2024",
        text:
          "信頼性と速度のトレードオフを解消するために、監視/アラート/オンコール運用を整備し、障害対応の再現性を上げた。",
      },
      {
        year: "2019–2023",
        text:
          "ML/Data/Platform/Infra領域を横断。要件が曖昧な段階から仕組みに落として運用に乗せる（PoCで終わらせない）を得意領域にした。",
      },
    ],
  },
  projects: {
    id: "projects",
    heading: "Projects",
    items: [
      {
        visibility: "public",
        title: "Goによるバックエンド刷新",
        summary:
          "既存システムの制約を踏まえつつ、段階移行でリスクを抑えながら置き換えを推進。",
        role: "Tech Lead / Backend",
        tech: ["Go", "AWS", "SQL", "Observability"],
        outcomeOrLearning:
          "移行の設計（分割/切替/ロールバック）と、運用を含めた品質担保の型を作れた。",
        status: "2024–2025",
      },
      {
        visibility: "public",
        title: "監視・運用改善（Datadog中心）",
        summary:
          "障害対応の属人性を下げるため、観測性の底上げとアラート設計を見直し。",
        role: "Infrastructure / Platform",
        tech: ["Datadog", "AWS", "SLO", "Incident Response"],
        outcomeOrLearning:
          "“見える化”だけで終わらせず、アクションに繋がるメトリクス/アラートに落とす重要性を再確認。",
        status: "2019–2025",
      },
      {
        visibility: "public",
        title: "ゼロからのインフラ基盤構築（副業）",
        summary:
          "サービス立ち上げ初期から、環境分離/CI/CD/IaCを揃え、継続運用できる土台を構築。",
        role: "Infra / Full-stack (TypeScript)",
        tech: ["AWS", "Terraform", "CI/CD", "TypeScript"],
        outcomeOrLearning:
          "最初に“運用の標準”を置くことで、後からの速度と安全性が両立できることを実感。",
        status: "2021–2025",
      },
    ],
  },
  skills: {
    id: "skills",
    heading: "Skills",
    // Backward-compatible: keep `items` but do not manually maintain it.
    // It will be derived from categories by `normalizeSkills()`.
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
        items: [
          skillRange("Data Analysis", 2019, 2022),
          skillRange("ML Engineering", 2019, 2022),
        ],
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
    blurb:
      "採用・協業・技術相談など、目的に合わせてご連絡ください。\n\n" +
      "連絡してほしい内容の例:\n" +
      "・Backend/Infra の設計・実装・運用改善\n" +
      "・既存システムの段階移行（リプレース/移行設計/リスク管理）\n" +
      "・Observability（Datadog等）/SLO/障害対応の仕組み化\n" +
      "・TypeScript のフルスタック開発\n\n" +
      "返信目安: 24–48時間以内（状況により前後します）",
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
  const isValidYears = (y: unknown) =>
    typeof y === "number" && Number.isFinite(y) && y >= 0;

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
    });
  };

  const getContent = async (targetUrl: string, signal: AbortSignal) => {
    return await fetch(targetUrl, {
      method: "GET",
      redirect: "manual",
      signal,
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
        res = await getContent(nextUrl, controller.signal);
      }
    } finally {
      clearTimeout(timer);
    }

    if (!res || !res.ok) return null;
    const parsed: unknown = await res.json();
    return isPortfolioPatch(parsed) ? (parsed as Partial<Portfolio>) : null;
  };

  // Note: Next.js fetch cache does not reliably cache non-GET requests.
  // We use unstable_cache to cache the resolved patch for the configured window.
  const cached = unstable_cache(fetchPrivatePatch, ["portfolio-private-url", url, token ?? ""], {
    revalidate,
  });

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
  try {
    const patch =
      source === "url"
        ? await loadPrivatePortfolioFromUrl()
        : source === "env"
          ? await loadPrivatePortfolioFromEnv()
          : await loadPrivatePortfolioFromEnv();
    if (!patch) return mergePortfolio(publicPortfolio, {});
    return mergePortfolio(publicPortfolio, patch);
  } catch {
    // Safety: never crash the site due to private data issues; fall back to public.
    return mergePortfolio(publicPortfolio, {});
  }
}

// Backwards-compatible named exports (public-only). Prefer getPortfolio().
export const profile = publicPortfolio.profile;
export const experience = publicPortfolio.experience;
export const projects = publicPortfolio.projects;
export const skills = publicPortfolio.skills;
export const contact = publicPortfolio.contact;
