import { useEffect, useState } from "react";
import { BookOpenText } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * نافذة محادثةٍ مصغّرة متحرّكة لواجهة الصفحة: سؤال، ثمّ مؤشّر الكتابة، ثمّ إجابةٌ تُكتب كلمةً كلمة،
 * ثمّ مصدرها؛ وتدور على ثلاثة أمثلة. زخرفيّة (aria-hidden)، وتظهر كاملةً ثابتةً مع تقليل الحركة.
 */

const SAMPLES = [
  {
    q: "ما أسباب غزوة بدر؟",
    a: "خرج النبيّ ﷺ لاعتراض عِير قريشٍ القادمة من الشام بقيادة أبي سفيان، فنجت القافلة، والتقى الجمعان عند ماء بدر.",
    src: "السيرة النبويّة لابن هشام",
  },
  {
    q: "كيف كانت هجرته ﷺ إلى المدينة؟",
    a: "خرج ﷺ مع أبي بكرٍ رضي الله عنه ليلاً، فمكثا في غار ثورٍ ثلاث ليالٍ، ثمّ سلكا طريق الساحل حتّى بلغا قُباء.",
    src: "السيرة النبويّة لابن هشام",
  },
  {
    q: "ما شروط صلح الحديبية؟",
    a: "وضعُ الحرب عشر سنين، وأن يرجع المسلمون عامَهم ويعتمروا من قابل، ومن شاء دخل في عهد أيٍّ من الفريقين.",
    src: "زاد المعاد لابن القيّم",
  },
] as const;

/* مراحل كلّ مثال */
type Phase = "ask" | "typing" | "answer" | "source" | "out";
const WORD_MS = 70;

function useReducedMotion() {
  const [reduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return reduced;
}

export function HeroChatDemo({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>(reduced ? "source" : "ask");
  const [words, setWords] = useState(0);

  const sample = SAMPLES[i];
  const all = sample.a.split(" ");

  useEffect(() => {
    if (reduced) return;
    let t: number;
    if (phase === "ask") t = window.setTimeout(() => setPhase("typing"), 700);
    else if (phase === "typing") t = window.setTimeout(() => { setWords(0); setPhase("answer"); }, 1100);
    else if (phase === "answer") {
      if (words < all.length) t = window.setTimeout(() => setWords((w) => w + 1), WORD_MS);
      else t = window.setTimeout(() => setPhase("source"), 250);
    } else if (phase === "source") t = window.setTimeout(() => setPhase("out"), 3200);
    else t = window.setTimeout(() => { setI((n) => (n + 1) % SAMPLES.length); setWords(0); setPhase("ask"); }, 450);
    return () => window.clearTimeout(t);
  }, [phase, words, all.length, reduced]);

  const shown = reduced || phase === "source" || phase === "out" ? all.length : phase === "answer" ? words : 0;

  return (
    <div aria-hidden className={cn("overflow-hidden rounded-2xl bg-paper-raised/95 shadow-lg ring-1 ring-ink/[0.08] backdrop-blur", className)}>
      {/* الرأس */}
      <div className="flex items-center justify-between px-4 pt-3.5">
        <span className="flex items-center gap-2 text-[12px] text-ink-muted">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold-600/60 motion-reduce:hidden" />
            <span className="relative size-2 rounded-full bg-gold-600" />
          </span>
          السيرة ai
        </span>
        <span className="flex gap-1">
          {SAMPLES.map((_, n) => (
            <span key={n} className={cn("h-1 rounded-full transition-all duration-500", n === i ? "w-4 bg-gold-600" : "w-1 bg-line-strong")} />
          ))}
        </span>
      </div>

      {/* المحادثة */}
      <div className={cn("flex min-h-[13.5rem] flex-col gap-3 p-4 transition-opacity duration-400", phase === "out" && "opacity-0")}>
        <p key={`q${i}`} className="demo-in self-start rounded-2xl rounded-se-md bg-sand/70 px-3.5 py-2 text-[13.5px] leading-relaxed text-ink">
          {sample.q}
        </p>

        {phase === "typing" ? (
          <span className="flex h-7 items-center gap-1 ps-1">
            {[0, 150, 300].map((d) => (
              <span key={d} className="size-1.5 animate-bounce rounded-full bg-ink-400" style={{ animationDelay: `${d}ms` }} />
            ))}
          </span>
        ) : (
          shown > 0 && (
            <p className="text-[13.5px] leading-7 text-ink-700">
              {all.slice(0, shown).join(" ")}
              {phase === "answer" && <span className="ms-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-gold-600" />}
            </p>
          )
        )}

        {(phase === "source" || phase === "out" || reduced) && (
          <p key={`s${i}`} className="demo-in mt-auto flex items-center gap-2 self-start rounded-full bg-gold-pale px-3 py-1.5 text-[12px] text-ink-700 ring-1 ring-gold/20">
            <BookOpenText className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} />
            {sample.src}
          </p>
        )}
      </div>
    </div>
  );
}
