import { useState } from "react";
import clsx from "clsx";
import { Check, Copy, Flag, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";

const BASE =
  "grid size-8 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-sand/55 hover:text-ink-soft";

export function MessageActions({ onCopy }: { onCopy: () => void }) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [copied, setCopied] = useState(false);

  function copy() {
    onCopy();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="mt-3 flex items-center gap-1">
      <button
        type="button"
        aria-label="مفيد"
        aria-pressed={vote === "up"}
        onClick={() => setVote((v) => (v === "up" ? null : "up"))}
        className={clsx(BASE, vote === "up" && "bg-sand/70 text-ink-mid")}
      >
        <ThumbsUp size={14} strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="غير مفيد"
        aria-pressed={vote === "down"}
        onClick={() => setVote((v) => (v === "down" ? null : "down"))}
        className={clsx(BASE, vote === "down" && "bg-sand/70 text-sepia")}
      >
        <ThumbsDown size={14} strokeWidth={1.75} />
      </button>

      <span aria-hidden className="mx-1 h-4 w-px bg-ink/10" />

      <button type="button" aria-label={copied ? "تم النسخ" : "نسخ"} onClick={copy} className={BASE}>
        {copied ? <Check size={14} strokeWidth={2.25} className="text-ink-mid" /> : <Copy size={14} strokeWidth={1.75} />}
      </button>
      <button type="button" aria-label="إعادة التوليد" className={BASE}>
        <RefreshCw size={14} strokeWidth={1.75} />
      </button>
      <button type="button" aria-label="الإبلاغ عن مشكلة" className={BASE}>
        <Flag size={14} strokeWidth={1.75} />
      </button>

      {copied && <span className="ms-1 text-[11px] text-ink-muted">تم النسخ</span>}
    </div>
  );
}
