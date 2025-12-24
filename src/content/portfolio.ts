import "server-only";

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
  level: number;
};

export type SectionContent = {
  id: TocItemId;
  heading: string;
};

export type Profile = SectionContent & { body: string };
export type Experience = SectionContent & { highlights: ExperienceHighlight[] };
export type Projects = SectionContent & { items: Project[] };
export type Skills = SectionContent & { items: Skill[] };
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
    items: [
      { label: "TypeScript", level: 90 },
      { label: "Next.js", level: 85 },
      { label: "Design Systems", level: 80 },
      { label: "Motion & Micro UX", level: 70 },
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
  const merged: Portfolio = {
    profile: { ...base.profile, ...(patch.profile ?? {}) },
    experience: { ...base.experience, ...(patch.experience ?? {}) },
    projects: { ...base.projects, ...(patch.projects ?? {}) },
    skills: { ...base.skills, ...(patch.skills ?? {}) },
    contact: { ...base.contact, ...(patch.contact ?? {}) },
  };

  merged.contact.links = normalizeLinks(merged.contact.links);
  return merged;
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

  const fetchWithAuth = async (targetUrl: string, signal: AbortSignal) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    return await fetch(targetUrl, {
      headers,
      method: "POST",
      body: token ? JSON.stringify({ token }) : JSON.stringify({}),
      // Apps Script Web Apps don't reliably expose Authorization headers to `doGet(e)`.
      // We avoid query params (leaky) and instead send the token in POST body.
      // NOTE: Apps Script must implement `doPost(e)` and validate JSON body.
      // Cache private portfolio responses on the server to reduce load on the upstream.
      // (Next.js fetch cache) default is cacheable; we set an explicit revalidate window.
      next: { revalidate },
      redirect: "manual",
      signal,
    });
  };

  // Apps Script Web App often redirects from `script.google.com` → `script.googleusercontent.com`.
  // Many HTTP clients (and fetch) will drop Authorization on cross-origin redirects.
  // We follow redirects manually to preserve Bearer auth.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  let currentUrl = url;
  let res: Response | null = null;
  try {
    for (let i = 0; i < 3; i++) {
      res = await fetchWithAuth(currentUrl, controller.signal);
      const isRedirect = res.status >= 300 && res.status < 400;
      if (!isRedirect) break;
      const location = res.headers.get("location");
      if (!location) break;
      currentUrl = new URL(location, currentUrl).toString();
    }
  } finally {
    clearTimeout(timer);
  }

  if (!res || !res.ok) return null;
  const parsed: unknown = await res.json();
  return isPortfolioPatch(parsed) ? (parsed as Partial<Portfolio>) : null;
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
