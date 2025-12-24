import type { TocItemId } from "@/components/toc";

export type ExternalLink = {
  label: string;
  href: string;
};

export type Project = {
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

export const profile: SectionContent & { body: string } = {
  id: "profile",
  heading: "Profile",
  body:
    "ファミコン時代のときめきを UI/UX に落とし込むフロントエンドエンジニア。レトロな見た目と、今のプロダクトに必要な体験設計を両立させます。",
};

export const experience: SectionContent & { highlights: ExperienceHighlight[] } = {
  id: "experience",
  heading: "Experience",
  highlights: [
    { year: "2025", text: "プロダクトの体験設計と実装を横断してリード" },
    { year: "2024", text: "デザインシステム/コンポーネント整備で開発速度を改善" },
    { year: "2023", text: "Next.js を中心にフロント基盤を刷新" },
  ],
};

export const projects: SectionContent & { items: Project[] } = {
  id: "projects",
  heading: "Projects",
  items: [
    {
      title: "Retro Commerce",
      summary: "NES感UIのEC体験。",
      role: "Front-end",
      tech: ["TypeScript", "Next.js", "Tailwind"],
      outcomeOrLearning: "UIの一貫性と可読性を崩さずにスピードを出す型を作れた。",
      link: { label: "Details", href: "#" },
      status: "2024",
    },
    {
      title: "Arcade CMS",
      summary: "レトロテーマの管理画面。",
      role: "Design Systems",
      tech: ["React", "Component Design"],
      outcomeOrLearning: "運用し続けられるコンポーネント粒度を学んだ。",
      link: { label: "Details", href: "#" },
      status: "2023",
    },
  ],
};

export const skills: SectionContent & { items: Skill[] } = {
  id: "skills",
  heading: "Skills",
  items: [
    { label: "TypeScript", level: 90 },
    { label: "Next.js", level: 85 },
    { label: "Design Systems", level: 80 },
    { label: "Motion & Micro UX", level: 70 },
  ],
};

export const contact: SectionContent & { blurb: string; links: ExternalLink[] } = {
  id: "contact",
  heading: "Contact",
  blurb: "中身はあとで本番の連絡先に差し替えます。今は NES ボタンだけ配置。",
  links: [
    { label: "Email", href: "mailto:worktkc66@gmail.com" },
    { label: "GitHub", href: "https://github.com/tkc66-buzz" },
    { label: "X / Twitter", href: "https://x.com/buzz_tkc" },
  ],
};


