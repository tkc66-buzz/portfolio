import "server-only";

import { unstable_cache } from "next/cache";

import type { TocItemId } from "@/components/toc";

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
      { year: "2025", text: "プロダクトの体験設計と実装を横断してリード" },
      { year: "2024", text: "デザインシステム/コンポーネント整備で開発速度を改善" },
      { year: "2023", text: "Next.js を中心にフロント基盤を刷新" },
    ],
  },
  projects: {
    id: "projects",
    heading: "Projects",
    items: [
      {
        visibility: "public",
        title: "Retro Commerce",
        summary: "NES感UIのEC体験。",
        role: "Front-end",
        tech: ["TypeScript", "Next.js", "Tailwind"],
        outcomeOrLearning: "UIの一貫性と可読性を崩さずにスピードを出す型を作れた。",
        link: { label: "Details", href: "#" },
        status: "2024",
      },
      {
        visibility: "public",
        title: "Arcade CMS",
        summary: "レトロテーマの管理画面。",
        role: "Design Systems",
        tech: ["React", "Component Design"],
        outcomeOrLearning: "運用し続けられるコンポーネント粒度を学んだ。",
        link: { label: "Details", href: "#" },
        status: "2023",
      },
    ],
  },
  skills: {
    id: "skills",
    heading: "Skills",
    // Backward compatible: `items` can still be used by external overrides.
    items: [
      { label: "Go", years: 3 },
      { label: "TypeScript", years: 3 },
      { label: "AWS", years: 3 },
      { label: "Terraform", years: 3 },
      { label: "Observability", years: 4 },
    ],
    categories: [
      {
        name: "Backend (Go / TypeScript)",
        items: [
          { label: "Go", years: 3 },
          { label: "TypeScript", years: 3 },
          { label: "API Design", years: 4 },
          { label: "SQL / Data modeling", years: 4 },
          { label: "Performance / Profiling", years: 3 },
        ],
      },
      {
        name: "Infrastructure",
        items: [
          { label: "AWS", years: 3 },
          { label: "GCP", years: 2 },
          { label: "Terraform", years: 3 },
          { label: "Observability", years: 4 },
          { label: "CI/CD", years: 3 },
        ],
      },
      {
        name: "Data / ML",
        items: [
          { label: "Data Analysis", years: 2 },
          { label: "ML Engineering", years: 2 },
        ],
      },
      {
        name: "Frontend",
        items: [
          { label: "TypeScript", years: 3 },
          { label: "React / Next.js", years: 3 },
          { label: "Design Systems", years: 3 },
        ],
      },
    ],
  },
  contact: {
    id: "contact",
    heading: "Contact",
    blurb: "お気軽にご連絡ください。",
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
  const skillsValid = validateSkills(mergedCandidate.skills);
  const merged: Portfolio = skillsValid
    ? mergedCandidate
    : { ...mergedCandidate, skills: base.skills };

  merged.contact.links = normalizeLinks(merged.contact.links);
  return merged;
}

function validateSkills(skills: Skills): boolean {
  const isValidYears = (y: unknown) =>
    typeof y === "number" && Number.isFinite(y) && y >= 0;

  const validateItems = (items: Skill[]) => items.every((s) => isValidYears(s.years));

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
