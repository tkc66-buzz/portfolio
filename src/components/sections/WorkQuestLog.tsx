"use client";

import type { WorkRpgEntryVM } from "@/components/sections/workRpgVm";
import { useCallback, useMemo, useState } from "react";

function isExternalHttpHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function WorkQuestLog({ entry }: { entry: WorkRpgEntryVM }) {
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(entry.initialSelectedQuestId);

  const byId = useMemo(() => new Map(entry.quests.map((q) => [q.id, q] as const)), [entry.quests]);
  const selected = (selectedQuestId && byId.get(selectedQuestId)) || entry.quests[0] || null;

  const select = useCallback((id: string) => setSelectedQuestId(id), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (entry.quests.length === 0) return;

      const currentIndex = Math.max(
        0,
        entry.quests.findIndex((q) => q.id === selected?.id),
      );

      const prev = () => entry.quests[Math.max(0, currentIndex - 1)]?.id;
      const next = () => entry.quests[Math.min(entry.quests.length - 1, currentIndex + 1)]?.id;

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft": {
          const id = prev();
          if (id) {
            e.preventDefault();
            select(id);
            document.getElementById(`work-quest-tab-${id}`)?.focus();
          }
          break;
        }
        case "ArrowDown":
        case "ArrowRight": {
          const id = next();
          if (id) {
            e.preventDefault();
            select(id);
            document.getElementById(`work-quest-tab-${id}`)?.focus();
          }
          break;
        }
      }
    },
    [entry.quests, select, selected?.id],
  );

  return (
    <div className="work-rpg__layout" onKeyDown={onKeyDown}>
      <div className="work-rpg__panel work-rpg__panel--status">
        <p className="work-rpg__label">STATUS</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="nes-badge is-primary year-badge">
            <span>{entry.header.period}</span>
          </span>
          <h3 className="min-w-0 truncate text-sm text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
            {entry.header.company}
          </h3>
        </div>

        <p className="section-body mt-3 break-words whitespace-pre-line text-fami-ivory/95">{entry.body.summary}</p>

        {entry.body.techTags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1 text-xs">
            {entry.body.techTags.map((t) => (
              <span key={t} className="nes-badge is-warning text-[0.55rem]">
                <span>{t}</span>
              </span>
            ))}
          </div>
        ) : null}

        {entry.body.links.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {entry.body.links.map((l) => (
              <a
                key={`${l.label}:${l.href}`}
                className="underline decoration-fami-gold/60 underline-offset-4"
                href={l.href}
                target={isExternalHttpHref(l.href) ? "_blank" : undefined}
                rel={isExternalHttpHref(l.href) ? "noreferrer" : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}

        <div className="work-rpg__stats mt-4">
          <div className="work-rpg__stat">
            <span className="work-rpg__statKey">QUESTS</span>
            <span className="work-rpg__statVal">{entry.stats.projectsCount}</span>
          </div>
          <div className="work-rpg__stat">
            <span className="work-rpg__statKey">TECH</span>
            <span className="work-rpg__statVal">{entry.stats.uniqueTechCount}</span>
          </div>
        </div>
      </div>

      <div className="work-rpg__panel work-rpg__panel--log">
        <p className="work-rpg__label">QUEST LOG</p>

        {entry.quests.length === 0 ? (
          <p className="section-body-muted mt-3">No quests yet</p>
        ) : (
          <div className="mt-2" role="tablist" aria-label="Quest log">
            {entry.quests.map((q) => {
              const isSelected = selected?.id === q.id;

              return (
                <div
                  key={q.id}
                  id={q.anchorId}
                  className={`work-rpg__questRow ${isSelected ? "is-selected" : ""}`}
                >
                  <button
                    id={`work-quest-tab-${q.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`work-quest-panel-${q.id}`}
                    className="work-rpg__questBtn focus:outline-none focus-visible:ring-4 focus-visible:ring-fami-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#111]"
                    onClick={() => select(q.id)}
                  >
                    <span className="work-rpg__questTitle">{q.title}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div
        className="work-rpg__panel work-rpg__panel--detail"
        role="tabpanel"
        id={`work-quest-panel-${selected?.id ?? "none"}`}
        aria-label="Quest detail"
      >
        <p className="work-rpg__label">DETAIL</p>

        {!selected ? (
          <p className="section-body-muted mt-3">No quest selected</p>
        ) : (
          <div className="mt-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm text-fami-gold" style={{ fontFamily: "var(--font-press)" }}>
                {selected.title}
              </h4>
            </div>

            <p className="mt-3 text-xs text-fami-gold">Problem / Approach</p>
            <p className="mt-2 break-words whitespace-pre-line text-sm leading-relaxed text-fami-ivory/95">
              {selected.summary}
            </p>

            <dl className="mt-3 space-y-3 text-xs">
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-fami-gold">Role</dt>
                <dd className="break-words font-medium">{selected.role}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-fami-gold">Tech</dt>
                <dd className="flex flex-wrap gap-1">
                  {selected.tech.map((t) => (
                    <span key={t} className="nes-badge is-warning text-[0.55rem]">
                      <span>{t}</span>
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}


