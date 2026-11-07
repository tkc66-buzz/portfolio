"use client";

import { useState } from "react";
import type { WorkTimelineEntryVM, WorkTimelineVM } from "@/components/sections/workTimelineVm";

const LANES = [
  { kind: "main", label: "MAIN" },
  { kind: "side", label: "SIDE" },
] as const;

function accentOf(entry: WorkTimelineEntryVM) {
  return entry.kind === "side" ? "var(--color-fami-blue)" : "var(--color-fami-gold)";
}

/** Rounded to half years; start/end are approximations, so avoid fake precision. */
function durationLabel(entry: WorkTimelineEntryVM) {
  const years = Math.max(0.5, Math.round((entry.end - entry.start) * 2) / 2);
  return `約${years}年`;
}

/** Company tags first, then project tech, de-duplicated in order. */
function techStack(entry: WorkTimelineEntryVM) {
  return [...new Set([...entry.tech, ...entry.projects.flatMap((p) => p.tech)])];
}

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

/**
 * Gantt-style career timeline: one lane for main career, one for side work.
 * Selecting a bar opens a "callout" panel below: a caret slides under the
 * selected bar and the panel takes the bar's color, so it is obvious which
 * entry is shown. The panel has prev/next buttons (chronological order).
 */
export function WorkTimeline({ vm }: { vm: WorkTimelineVM }) {
  const [selectedKey, setSelectedKey] = useState(vm.initialKey);
  const selectedIndex = Math.max(
    0,
    vm.entries.findIndex((e) => e.key === selectedKey),
  );
  const selected = vm.entries[selectedIndex];

  const span = vm.maxYear - vm.minYear;
  const years = Array.from({ length: span }, (_, i) => vm.minYear + i);
  const pct = (y: number) => `${((y - vm.minYear) / span) * 100}%`;
  const lanes = LANES.filter((l) => vm.entries.some((e) => e.kind === l.kind));

  return (
    <div>
      <div data-reveal className="card p-4 sm:p-6">
        <div>
          <div>
            {/* Year axis */}
            <div className="ml-14 flex sm:ml-20">
              {years.map((y, i) => (
                <span
                  key={y}
                  className={`font-pixel text-fami-ivory/60 type-label min-w-0 flex-1 whitespace-nowrap ${i % 2 ? "invisible sm:visible" : ""}`}
                >
                  {y}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-3">
              {lanes.map((lane) => (
                <div key={lane.kind} className="flex items-center">
                  <span className="font-pixel text-fami-ivory/60 type-label w-14 shrink-0 whitespace-nowrap sm:w-20">
                    {lane.label}
                  </span>
                  <div
                    className="gantt-grid relative h-11 flex-1 rounded-md bg-black/25 sm:h-14"
                    style={{ ["--gantt-cols" as never]: span }}
                  >
                    <span
                      className="bg-fami-red absolute inset-y-0 w-0.5"
                      style={{ left: pct(vm.now) }}
                      aria-hidden="true"
                    />
                    {vm.entries
                      .filter((e) => e.kind === lane.kind)
                      .map((e, i) => (
                        <GanttBar
                          key={e.key}
                          entry={e}
                          left={`calc(${pct(e.start)} + 2px)`}
                          width={`calc(${((e.end - e.start) / span) * 100}% - 4px)`}
                          delay={i * 140}
                          selected={e.key === selected?.key}
                          onSelect={() => setSelectedKey(e.key)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-2 ml-14 h-4 sm:ml-20" aria-hidden="true">
              <span
                className="font-pixel text-fami-red type-label absolute translate-x-[0.4em] tracking-[0.2em] whitespace-nowrap"
                style={{ right: `${100 - ((vm.now - vm.minYear) / span) * 100}%` }}
              >
                NOW ▲
              </span>
            </div>
          </div>
        </div>
      </div>

      {selected ? (
        <>
          {/* Caret under the selected bar (same horizontal frame as the lanes). */}
          <div className="px-4 sm:px-6" aria-hidden="true">
            <div className="relative ml-14 h-4 sm:ml-20">
              <span
                className="work-caret absolute top-1 -translate-x-1/2"
                style={{
                  left: pct((selected.start + selected.end) / 2),
                  ["--accent" as never]: accentOf(selected),
                }}
              />
            </div>
          </div>
          <WorkDetail
            key={selected.key}
            entry={selected}
            position={selectedIndex + 1}
            total={vm.entries.length}
            onPrev={
              selectedIndex > 0
                ? () => setSelectedKey(vm.entries[selectedIndex - 1].key)
                : undefined
            }
            onNext={
              selectedIndex < vm.entries.length - 1
                ? () => setSelectedKey(vm.entries[selectedIndex + 1].key)
                : undefined
            }
          />
        </>
      ) : null}
    </div>
  );
}

function GanttBar({
  entry,
  left,
  width,
  delay,
  selected,
  onSelect,
}: {
  entry: WorkTimelineEntryVM;
  left: string;
  width: string;
  delay: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const tone =
    entry.kind === "side"
      ? "bg-fami-blue text-fami-ivory"
      : "bg-fami-gold text-fami-night shadow-[3px_3px_0_#a20000]";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-controls="work-detail"
      title={`${entry.company} (${entry.period})`}
      className={`gantt-bar focus-visible:ring-fami-ivory absolute inset-y-2 flex min-w-0 items-center overflow-hidden rounded-md px-1.5 text-left focus:outline-none focus-visible:ring-2 sm:px-3 ${tone}`}
      style={{ left, width, ["--reveal-delay" as never]: `${delay}ms` }}
    >
      <span className="type-label truncate">{entry.company}</span>
    </button>
  );
}

function WorkDetail({
  entry,
  position,
  total,
  onPrev,
  onNext,
}: {
  entry: WorkTimelineEntryVM;
  position: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const stack = techStack(entry);
  const navBtn =
    "font-pixel type-label border-fami-gold/40 hover:border-fami-gold hover:bg-fami-gold/10 focus-visible:ring-fami-gold inline-flex h-11 w-11 items-center justify-center rounded-md border bg-black/30 transition-colors focus:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-30";

  return (
    <article
      id="work-detail"
      aria-live="polite"
      aria-label={`${entry.company} ${entry.period}`}
      className="card work-callout overflow-hidden"
      style={{ ["--accent" as never]: accentOf(entry) }}
    >
      {/* Header: who / when / how long, plus prev-next navigation */}
      <header className="border-fami-ivory/10 flex flex-wrap items-start justify-between gap-4 border-b p-5 sm:p-7">
        <div className="animate-fade-up min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="work-kind-badge font-pixel type-label rounded px-2 py-0.5">
              {entry.kind === "side" ? "SIDE" : "MAIN"}
            </span>
            <span className="font-pixel type-label text-fami-ivory/80">{entry.period}</span>
            <span className="font-body type-label text-fami-ivory/60">
              {durationLabel(entry)}
              {entry.ongoing ? " · 継続中" : ""}
            </span>
          </div>
          <h3 className="type-heading mt-3">{entry.company}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={navBtn}
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Previous company"
          >
            ◀
          </button>
          <span className="font-pixel type-label text-fami-ivory/60 min-w-16 text-center whitespace-nowrap tabular-nums">
            {position} / {total}
          </span>
          <button
            type="button"
            className={navBtn}
            onClick={onNext}
            disabled={!onNext}
            aria-label="Next company"
          >
            ▶
          </button>
        </div>
      </header>

      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
        {/* Left: what the company/role was about + the whole tech stack */}
        <div
          className="animate-fade-up flex flex-col gap-6"
          style={{ ["--stagger" as never]: "60ms" }}
        >
          <section>
            <h4 className="font-pixel type-label text-fami-ivory/50 tracking-[0.2em]">ABOUT</h4>
            <p className="font-body type-body text-fami-ivory/85 mt-2">{entry.summary}</p>
          </section>
          {stack.length > 0 ? (
            <section>
              <h4 className="font-pixel type-label text-fami-ivory/50 tracking-[0.2em]">
                TECH STACK
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
          {entry.links && entry.links.length > 0 ? (
            <div className="type-label flex flex-wrap gap-4">
              {entry.links.map((l) => (
                <a
                  key={`${l.label}:${l.href}`}
                  className="text-fami-gold underline underline-offset-4"
                  href={l.href}
                  target={isExternalHttpHref(l.href) ? "_blank" : undefined}
                  rel={isExternalHttpHref(l.href) ? "noreferrer" : undefined}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Right: numbered list of projects at this company */}
        <section>
          <h4 className="font-pixel type-label text-fami-ivory/50 tracking-[0.2em]">
            PROJECTS ({entry.projects.length})
          </h4>
          <ol className="mt-3 flex flex-col gap-3">
            {entry.projects.map((project, i) => (
              <li
                key={project.anchorId ?? project.title}
                id={project.anchorId}
                className="work-project animate-fade-up flex gap-4 rounded-lg bg-black/25 p-4 sm:p-5"
                style={{ ["--stagger" as never]: `${120 + i * 90}ms` }}
              >
                <span className="work-project__num font-pixel type-label flex h-8 w-8 shrink-0 items-center justify-center rounded">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h5 className="type-title">{project.title}</h5>
                  <p className="font-body type-body text-fami-ivory/75 mt-1">{project.summary}</p>
                  <p className="type-label text-fami-ivory/50 mt-3">
                    <span className="font-pixel">ROLE</span>{" "}
                    <span className="font-body">{project.role}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
