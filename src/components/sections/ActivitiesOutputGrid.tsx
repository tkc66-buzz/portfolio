"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ActivityGroup, ActivityItem } from "@/content/portfolio";

const FILTERS = ["All", "Talks", "Community", "Achievements"] as const;
const YEAR_PATTERN = /\d{4}/g;
type Filter = (typeof FILTERS)[number];

const CATEGORY_CLASSES: Record<string, string> = {
  Talks: "border-fami-blue/50 bg-fami-blue/15 text-fami-blue",
  Books: "border-fami-blue/50 bg-fami-blue/15 text-fami-blue",
  Articles: "border-fami-blue/50 bg-fami-blue/15 text-fami-blue",
  Community: "border-fami-blue/50 bg-fami-blue/15 text-fami-blue",
  Achievements: "border-fami-blue/50 bg-fami-blue/15 text-fami-blue",
};

type Output = ActivityItem & { category: Exclude<Filter, "All"> };

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function latestActivityYear(year: string) {
  const years = year.match(YEAR_PATTERN)?.map(Number) ?? [];
  return Math.max(0, ...years);
}

/**
 * Numeric sort key (`YYYYMMDD`) used to order activities newest-first.
 * Prefers an explicit `date` (`YYYY-MM-DD` / `YYYY-MM`) so same-year items sort
 * by month/day; otherwise falls back to the latest year in `year` (month/day 0),
 * ranking dated entries above year-only entries within the same year.
 */
function activitySortKey(item: ActivityItem) {
  if (item.date) {
    const [y, m = "0", d = "0"] = item.date.split("-");
    const year = Number(y);
    if (Number.isFinite(year)) {
      return year * 10000 + Number(m) * 100 + Number(d);
    }
  }
  return latestActivityYear(item.year) * 10000;
}

function toOutputs(groups: ActivityGroup[]): Output[] {
  return groups
    .flatMap((group) =>
      group.items.map((item) => ({ ...item, category: group.name as Output["category"] })),
    )
    .toSorted((a, b) => activitySortKey(b) - activitySortKey(a));
}

function OutputCard({ item, priority }: { item: Output; priority?: boolean }) {
  return (
    <li className="border-fami-gold/25 hover:border-fami-gold/70 group min-w-0 overflow-hidden rounded-lg border bg-[#171717] transition-colors">
      {item.image ? (
        <div className="border-fami-gold/25 relative aspect-[16/9] overflow-hidden border-b">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            style={
              item.image.objectPosition ? { objectPosition: item.image.objectPosition } : undefined
            }
            priority={priority}
            loading={priority ? "eager" : undefined}
          />
        </div>
      ) : null}

      <article className="flex h-full flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.08em] uppercase ${CATEGORY_CLASSES[item.category]}`}
          >
            {item.category}
          </span>
          <time className="text-fami-ivory/60 text-xs">{item.year}</time>
        </div>

        <h3 className="text-fami-ivory flex items-start gap-2 text-sm leading-relaxed font-bold">
          {item.link ? (
            <a
              href={item.link.href}
              target={isExternalHttpHref(item.link.href) ? "_blank" : undefined}
              rel={isExternalHttpHref(item.link.href) ? "noreferrer" : undefined}
              className="hover:text-fami-gold flex-1 transition-colors"
            >
              {item.title}
            </a>
          ) : (
            <span className="flex-1">{item.title}</span>
          )}
          {item.link ? (
            <span aria-hidden="true" className="text-fami-gold shrink-0">
              ↗
            </span>
          ) : null}
        </h3>

        {item.context ? (
          <p className="section-body-muted mt-2 flex-1 leading-relaxed">{item.context}</p>
        ) : null}

        {item.link || item.slides ? (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {item.link ? (
              <a
                href={item.link.href}
                target={isExternalHttpHref(item.link.href) ? "_blank" : undefined}
                rel={isExternalHttpHref(item.link.href) ? "noreferrer" : undefined}
                className="text-fami-gold text-xs underline underline-offset-4"
              >
                {item.link.label} ↗
              </a>
            ) : null}
            {item.slides ? (
              <a
                href={item.slides.href}
                target={isExternalHttpHref(item.slides.href) ? "_blank" : undefined}
                rel={isExternalHttpHref(item.slides.href) ? "noreferrer" : undefined}
                className="text-fami-gold text-xs underline underline-offset-4"
              >
                {item.slides.label} ↗
              </a>
            ) : null}
          </div>
        ) : null}
      </article>
    </li>
  );
}

export function ActivitiesOutputGrid({ groups }: { groups: ActivityGroup[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const outputs = useMemo(() => toOutputs(groups), [groups]);
  const visibleOutputs =
    filter === "All" ? outputs : outputs.filter((item) => item.category === filter);

  return (
    <div className="mt-6">
      <div className="mb-6 flex flex-wrap gap-2" aria-label="Activity categories">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={`focus-visible:ring-fami-gold rounded-full border px-3 py-1.5 text-xs font-bold transition-colors focus:outline-none focus-visible:ring-4 ${filter === option ? "border-fami-blue bg-fami-blue text-fami-ivory" : "border-fami-gold/30 text-fami-ivory/70 hover:border-fami-gold hover:text-fami-ivory bg-black/20"}`}
          >
            {option}
          </button>
        ))}
      </div>

      {visibleOutputs.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 [font-family:var(--font-noto)] sm:grid-cols-2">
          {visibleOutputs.map((item, i) => (
            <OutputCard
              key={`${item.category}:${item.year}:${item.title}`}
              item={item}
              priority={i === 0}
            />
          ))}
        </ul>
      ) : (
        <p className="text-fami-ivory/70 py-10 text-center [font-family:var(--font-noto)] text-sm">
          Coming soon
        </p>
      )}
    </div>
  );
}
