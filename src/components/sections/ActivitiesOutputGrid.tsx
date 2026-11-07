"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ActivityGroup, ActivityItem, ExternalLink } from "@/content/portfolio";

const FILTERS = ["All", "Talks", "Community", "Achievements"] as const;
const YEAR_PATTERN = /\d{4}/g;
type Filter = (typeof FILTERS)[number];

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

function ExternalAnchor({ link, className }: { link: ExternalLink; className: string }) {
  const external = isExternalHttpHref(link.href);
  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
    >
      {link.label} ↗
    </a>
  );
}

function CardMeta({ item }: { item: Output }) {
  return (
    <div className="flex items-center gap-2">
      <span className="chip uppercase">{item.category}</span>
      <time className="font-pixel text-fami-gold type-label">{item.year}</time>
    </div>
  );
}

function CardLinks({ item }: { item: Output }) {
  if (!item.link && !item.slides) return null;
  const cls =
    "border-fami-gold/50 text-fami-ivory hover:border-fami-gold hover:bg-fami-gold/15 hover:text-fami-gold rounded-md border bg-black/40 px-3 py-1.5 type-label no-underline transition-colors";
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {item.link ? <ExternalAnchor link={item.link} className={cls} /> : null}
      {item.slides ? <ExternalAnchor link={item.slides} className={cls} /> : null}
    </div>
  );
}

function OutputCard({ item, featured, index }: { item: Output; featured: boolean; index: number }) {
  const style = { ["--stagger" as never]: `${Math.min(index, 8) * 60}ms` };

  if (item.image) {
    return (
      <li
        className={`card card-hover animate-fade-up group flex flex-col overflow-hidden ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
        style={style}
      >
        <div
          className={`relative overflow-hidden ${featured ? "aspect-[16/9] sm:aspect-auto sm:min-h-[18rem] sm:flex-1" : "aspect-[16/9]"}`}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 66vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={
              item.image.objectPosition ? { objectPosition: item.image.objectPosition } : undefined
            }
            priority={featured}
            loading={featured ? "eager" : undefined}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0e1118] to-transparent"
          />
        </div>
        <article className="flex flex-col p-5 sm:p-6">
          <CardMeta item={item} />
          <h3 className="type-title mt-3">{item.title}</h3>
          {item.context ? (
            <p className="font-body type-body text-fami-ivory/75 mt-2 line-clamp-3">
              {item.context}
            </p>
          ) : null}
          <CardLinks item={item} />
        </article>
      </li>
    );
  }

  return (
    <li className="card card-hover animate-fade-up flex flex-col p-5 sm:p-6" style={style}>
      <CardMeta item={item} />
      <h3 className="type-title mt-3">{item.title}</h3>
      {item.context ? (
        <p className="font-body type-body text-fami-ivory/75 mt-2 line-clamp-3 flex-1">
          {item.context}
        </p>
      ) : (
        <div className="flex-1" />
      )}
      <CardLinks item={item} />
    </li>
  );
}

export function ActivitiesOutputGrid({ groups }: { groups: ActivityGroup[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const outputs = useMemo(() => toOutputs(groups), [groups]);
  const visibleOutputs =
    filter === "All" ? outputs : outputs.filter((item) => item.category === filter);

  return (
    <div>
      <div data-reveal className="mb-8 flex flex-wrap gap-2" aria-label="Activity categories">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={`font-pixel focus-visible:ring-fami-gold type-label rounded-md border px-3 py-2 tracking-[0.05em] uppercase transition-colors focus:outline-none focus-visible:ring-2 ${filter === option ? "border-fami-blue bg-fami-blue text-fami-ivory shadow-[3px_3px_0_#a20000]" : "border-fami-gold/30 text-fami-ivory/70 hover:border-fami-gold hover:text-fami-ivory bg-black/30"}`}
          >
            {option}
          </button>
        ))}
      </div>

      {visibleOutputs.length > 0 ? (
        <ul
          key={filter}
          className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleOutputs.map((item, i) => (
            <OutputCard
              key={`${item.category}:${item.year}:${item.title}`}
              item={item}
              index={i}
              featured={i === 0 && Boolean(item.image)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-fami-ivory/70 type-label py-10 text-center">Coming soon</p>
      )}
    </div>
  );
}
