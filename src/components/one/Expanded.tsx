import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  id: string;
  title: string;
  fromRect: DOMRect;
  onClose: () => void;
  children: ReactNode;
}

const DURATION = 360;

/** النافذة: تنطلق من مستطيل البطاقة إلى وسط الشاشة وتعود إليه عند الإغلاق. */
export function Expanded({ id, title, fromRect, onClose, children }: Props) {
  const [phase, setPhase] = useState<"from" | "open" | "leave">("from");
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(document.activeElement);

  useEffect(() => {
    const a = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
    return () => cancelAnimationFrame(a);
  }, []);

  useEffect(() => {
    if (phase === "open") closeRef.current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function requestClose() {
    setPhase("leave");
    window.setTimeout(() => {
      onClose();
      (opener.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    }, DURATION);
  }

  const atCard = phase !== "open";
  const style = atCard
    ? { top: fromRect.top, left: fromRect.left, width: fromRect.width, height: fromRect.height, transform: "none" }
    : { top: "50%", left: "50%", width: "min(920px, calc(100vw - 2rem))", height: "min(86svh, 760px)", transform: "translate(-50%, -50%)" };

  return (
    <div className="fixed inset-0 z-[70]" role="presentation">
      <div
        onClick={requestClose}
        aria-hidden
        className={cn("absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity light:bg-ink/40", atCard ? "opacity-0" : "opacity-100")}
        style={{ transitionDuration: `${DURATION}ms` }}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        style={{ ...style, transitionDuration: `${DURATION}ms` }}
        className="absolute flex flex-col overflow-hidden rounded-[9px] bg-[#15181a]/85 text-[#ece2c8] shadow-lg ring-1 ring-white/15 backdrop-blur-2xl light:bg-paper/90 light:text-ink light:ring-ink/10 transition-[top,left,width,height,transform] ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 light:border-ink/10">
          <h2 id={`${id}-title`} className="text-lg font-normal text-white light:text-ink">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={requestClose}
            aria-label="إغلاق"
            className="grid size-9 place-items-center rounded-[9px] text-[#ece2c8]/70 transition-colors hover:bg-white/10 hover:text-white light:text-ink-600 light:hover:bg-[#ece2c8] light:hover:text-ink"
          >
            <X className="size-[18px]" strokeWidth={1.75} aria-hidden />
          </button>
        </header>
        <div className={cn("min-h-0 flex-1 overflow-y-auto px-6 py-6 transition-opacity duration-300 lg:px-8", atCard ? "opacity-0" : "opacity-100 delay-150")}>
          {children}
        </div>
      </section>
    </div>
  );
}
