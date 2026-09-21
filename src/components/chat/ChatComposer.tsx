import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Mic, SendHorizontal, Square } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  busy?: boolean;
}

export function ChatComposer({ value, onChange, onSend, busy }: Props) {
  const [recording, setRecording] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  /* ارتفاع الحقل يتبع المحتوى حتى ستّة أسطر ثم يُمرَّر */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !busy;

  return (
    <div className="sticky bottom-0 mx-auto w-full max-w-[46rem] px-5 pb-4 pt-2 sm:px-8">
      <div className="rounded-2xl bg-paper-raised p-3.5 shadow-card ring-1 ring-ink/[0.07] transition-shadow duration-200 focus-within:ring-gold/35">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (canSend) onSend();
            }
          }}
          placeholder="اكتب سؤالك عن السيرة النبويّة…"
          aria-label="سؤالك"
          className="block w-full resize-none bg-transparent text-[15px] leading-[1.9] text-ink outline-none placeholder:text-ink-muted"
        />

        <div className="mt-2.5 flex items-center justify-end gap-2">
          {recording && (
            <span className="tabular text-[12.5px] text-sepia">جارٍ التسجيل…</span>
          )}
          <button
            type="button"
            onClick={() => setRecording((v) => !v)}
            aria-label={recording ? "إيقاف التسجيل" : "تسجيل صوتيّ"}
            aria-pressed={recording}
            className={clsx(
              "grid size-9 place-items-center rounded-full transition-colors",
              recording
                ? "bg-sepia text-paper"
                : "bg-paper-sunken text-ink-soft hover:bg-sand",
            )}
          >
            {recording ? <Square size={14} strokeWidth={1.75} /> : <Mic size={16} strokeWidth={1.75} />}
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            aria-label="إرسال"
            className="grid size-9 place-items-center rounded-full bg-ink text-paper shadow-btn transition-opacity disabled:opacity-30"
          >
            <SendHorizontal size={16} strokeWidth={1.75} className="-scale-x-100" aria-hidden />
          </button>
        </div>
      </div>

    </div>
  );
}
