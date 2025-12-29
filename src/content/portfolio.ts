import "server-only";

import type { TocItemId } from "@/components/toc";

const CURRENT_YEAR = new Date().getFullYear();

export type ExternalLink = {
  label: string;
  href: string;
};

export type Project = {
  /**
   * Optional in-page anchor id for direct linking (e.g. from Experience evidence hints).
   * Keep stable once published.
   */
  anchorId?: string;
  title: string;
  summary: string;
  role: string;
  tech: string[];
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
   * Keep it as a single paragraph (avoid line breaks).
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

// Work label conventions:
// - `primary` is the set of public labels for main career entries (render as separate WorkEntry blocks).
// - `side` is the public label for side work (render as its own WorkEntry block).
const WORK_LABELS = {
  primary: ["大手金融系SIer", "独立系SIer", "株式会社Eureka"],
  side: "Startup",
} as const;

export const publicPortfolio: Portfolio = {
  profile: {
    id: "profile",
    heading: "Profile",
    body:
      "Machine Learning Engineer、Data Scientist、Infrastructure Engineer、Platform Engineer などの職種を経験してきました。現在は株式会社エウレカで、Go を中心にバックエンド開発に携わっています。" +
      "副業では、サービス立ち上げ初期からインフラ基盤をゼロから構築したり、TypeScript を用いたフルスタック開発にも取り組んでいます",
  },
  work: {
    id: "work",
    heading: "Work",
    items: [
      {
        key: "company-sier-finance",
        period: "2018-2019",
        company: WORK_LABELS.primary[0],
        summary:
          "3カ月間のIT研修で、最優秀システム開発賞を受賞。第一希望である国際システム部に配属。銀行海外支部のための、業務アプリ開発に携わる。",
        projects: [
          {
            anchorId: "project-bank-business-app-development",
            title: "海外銀行業務アプリ開発",
            summary:
              "3カ月間のIT研修で、最優秀システム開発賞を受賞。第一希望である国際システム部に配属。銀行海外支部のための、業務アプリ開発に携わる。",
            role: "developer",
            tech: ["Java", "MySQL", "HTML/CSS/JavaScript"],
          },
        ],
      },
      {
        key: "company-sier-independent",
        period: "2019-2022",
        company: WORK_LABELS.primary[1],
        summary:
          "独立系SIerで、複数領域（アプリ/データ/基盤）を横断しながら、現場の制約下での改善や意思決定を経験。仕様・運用・体制の“現実”に合わせて最適解を作る力を鍛えました。",
        projects: [
          {
            anchorId: "project-mlops-infra-and-api-development",
            title: "画像認識システムをサーバーレスで実現し、SageMakerを使用したMLOps基盤を構築",
            summary:
              "主にCI/CDパイプラインの構築、API開発、MLOps基盤並びに独自モデルの生成、モニタリング基盤の構築を行いました。",
            role: "developer",
            tech: ["Python", "AWS(Lambda StepFunction DynaboDB SageMaker)"],
          },
          {
            anchorId: "project-next-generation-core-network-development",
            title: "OpenShiftを活用した大規模ネットワークの構築",
            summary:
              "大規模ネットワークの提供を行いました。従来のネットワークとは異なり、柔軟性・拡張性・自動化をKubernetesを使用することで実現しています。それらのInfra部分をOpenShiftとAnsibleで実現しました。",
            role: "developer",
            tech: ["OpenShift", "Python", "Elastic Stack", "Ansible"],
          },
          {
            anchorId: "project-next-generation-core-network-development",
            title: "KeycloatとCognitoを使用したハイブリットSSO認証基盤の構築",
            summary:
              "各サービスで登録とログインが必要という課題がありました。そこで、KeycloakをECSに立てスケールできる横断認証基盤として構築導入を行いました。",
            role: "developer",
            tech: ["Keycloak", "Java", "Node.js", "AWS（Lambda、Cognito、ECSなど）"],
          },
        ],
      },
      {
        key: "company-eureka",
        period: "2022-現在",
        company: WORK_LABELS.primary[2],
        summary:
          "大規模サービスのBackend領域で、Global Application基盤の開発を担当しています。",
        projects: [
          {
            anchorId: "project-global-application-backend-kr-development",
            title: "Global Application Backend KRの開発",
            summary:
              "Pairs韓国展開のBackend APIの開発を行いました。",
            role: "developer",
            tech: ["Go", "AWS", "MySQL", "Observability"],
          },
        ],
      },
      {
        key: "company-side",
        period: "2023-現在",
        company: WORK_LABELS.side,
        summary:
          "サービス立ち上げ初期から技術選定インフラ基盤の構築、フルスタックのアプリケーション開発を担当しています。",
        projects: [
          {
            anchorId: "project-greenfield-infra-and-full-stack-application-development",
            title: "ゼロからのインフラ基盤構築とフルスタックのアプリケーション開発",
            summary:
              "立ち上げ初期に環境分離と自動化を整え、継続運用できるインフラ基盤をゼロから構築しました。また、フルスタックのアプリケーション開発を担当しています。",
            role: "developer",
            tech: ["AWS", "Google Cloud","Terraform", "TypeScript"],
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
          {
            year: "2025",
            title: "4半期MVPを受賞しました。",
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
          skillRange("API Design", 2019, CURRENT_YEAR),
          skillRange("MySQL/PostgreSQL/NoSQL", 2018, CURRENT_YEAR),
          skillRange("Python", 2019, 2022),
        ],
      },
      {
        name: "Platform / Infrastructure",
        items: [
          skillRange("AWS", 2019, CURRENT_YEAR),
          skillRange("Terraform", 2021, CURRENT_YEAR),
          skillRange("Observability", 2019, CURRENT_YEAR),
          skillRange("CI/CD", 2019, CURRENT_YEAR),
          skillRange("GCP", 2022, CURRENT_YEAR),
        ],
      },
      {
        name: "Data / ML",
        items: [
          skillRange("Data Analysis", 2019, 2022),
          skillRange("ML Engineer", 2019, 2022),
        ],
      },
      {
        name: "Frontend",
        items: [
          skillRange("TypeScript", 2023, CURRENT_YEAR),
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

const normalizedPublicPortfolio: Portfolio = {
  ...publicPortfolio,
  skills: normalizeSkills(publicPortfolio.skills),
  contact: { ...publicPortfolio.contact, links: normalizeLinks(publicPortfolio.contact.links) },
};

/** Returns portfolio data sourced from committed content only. */
export async function getPortfolio(): Promise<Portfolio> {
  return normalizedPublicPortfolio;
}

// Backwards-compatible named exports (public-only). Prefer getPortfolio().
export const profile = normalizedPublicPortfolio.profile;
export const work = normalizedPublicPortfolio.work;
export const writing = normalizedPublicPortfolio.writing;
export const activities = normalizedPublicPortfolio.activities;
export const skills = normalizedPublicPortfolio.skills;
export const contact = normalizedPublicPortfolio.contact;
