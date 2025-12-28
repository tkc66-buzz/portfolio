export type TocItemId =
  | "profile"
  | "work"
  | "writing"
  | "activities"
  | "skills"
  | "contact";

export type TocItem = {
  id: TocItemId;
  label: string;
};

export const TOC_ITEMS: TocItem[] = [
  { id: "profile", label: "Profile" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "activities", label: "Activities" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function tocHref(id: TocItemId) {
  return `#${id}`;
}
