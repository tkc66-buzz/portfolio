"use client";

import { useMemo, useState } from "react";

function getHost(href: string): string | null {
  try {
    return new URL(href).host;
  } catch {
    return null;
  }
}

export function TalkLinkPreview({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const host = useMemo(() => getHost(href), [href]);
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  const onToggle = () => {
    setOpen((v) => {
      const next = !v;
      if (next && !src) setSrc(href);
      return next;
    });
  };

  return (
    <div className="mt-3 rounded border border-fami-gold/20 bg-black/30 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-[0.75rem] leading-none text-fami-gold">{label}</div>
          {host ? (
            <div className="mt-1 truncate text-[0.7rem] leading-none text-fami-ivory/70">{host}</div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="nes-btn is-small btn-game" onClick={onToggle}>
            {open ? "CLOSE" : "PREVIEW"}
          </button>
          <a
            className="nes-btn is-small btn-game"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            OPEN ↗
          </a>
        </div>
      </div>

      {open ? (
        <div className="mt-3 overflow-hidden rounded border border-fami-gold/20 bg-black/20">
          {src ? (
            <iframe
              title={`${label} preview`}
              src={src}
              className="h-[260px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : null}

          <p className="px-3 py-2 text-[0.7rem] text-fami-ivory/70">
            プレビューが表示されない場合は、右の「OPEN ↗」で開いてください（サイト側の制限で埋め込み不可の場合があります）。
          </p>
        </div>
      ) : null}
    </div>
  );
}


