export type TocItemId =
  | "profile"
  | "experience"
  | "projects"
  | "writing"
  | "skills"
  | "contact";

export type TocItem = {
  id: TocItemId;
  label: string;
};

export const TOC_ITEMS: TocItem[] = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function tocHref(id: TocItemId) {
  return `#${id}`;
}


