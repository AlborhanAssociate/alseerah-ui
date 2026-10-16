import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * شريطٌ دوّار للجوّال: بطاقاتٌ تُسحب أفقيّاً، تتوسّطها البطاقة النشطة بحجمها الكامل،
 * وعلى جانبيها بطاقتان أصغر مائلتان نحوها في عمقٍ ثلاثيّ الأبعاد. تحته نقاطٌ وزرّا تنقّل بارزان.
 * البطاقة النشطة تأخذ الصنف in-focus (شريطٌ برتقاليّ ورمزٌ ينبض، انظر index.css).
 */
export function CoverRail({ count, render, label, className }: { count: number; render: (i: number, on: boolean) => ReactNode; label: string; className?: string }) {
  const items = Array.from({ length: count });
  const rail = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  /* لكلّ بطاقة: بُعدها عن وسط الشريط بوحدة عرض البطاقة (-١ يسار … ١ يمين)، ومنه الميل والتصغير والخفوت */
  const paint = useCallback(() => {
    const r = rail.current?.getBoundingClientRect();
    if (!r) return;
    const mid = r.left + r.width / 2;
    let best = 0, bestD = Infinity;
    slots.current.forEach((slot, i) => {
      const card = slot?.firstElementChild as HTMLElement | null;
      if (!slot || !card) return;
      const s = slot.getBoundingClientRect();
      const off = Math.max(-1.4, Math.min(1.4, (s.left + s.width / 2 - mid) / s.width));
      const a = Math.min(1, Math.abs(off));
      card.style.transform = `perspective(900px) rotateY(${off * 22}deg) scale(${1 - a * 0.14})`;
      card.style.opacity = String(1 - a * 0.4);
      if (Math.abs(off) < bestD) { bestD = Math.abs(off); best = i; }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    paint();
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); };
    const el = rail.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { el?.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [paint]);

  const go = (i: number) => {
    const slot = slots.current[Math.max(0, Math.min(items.length - 1, i))];
    const r = rail.current;
    if (!slot || !r) return;
    /* تمريرٌ أفقيّ داخل الشريط وحده، دون تحريك الصفحة */
    r.scrollBy({ left: slot.getBoundingClientRect().left + slot.offsetWidth / 2 - (r.getBoundingClientRect().left + r.clientWidth / 2), behavior: "smooth" });
  };

  const btn = "neu-raised-sm neu-press grid size-11 place-items-center rounded-full text-ink-700 disabled:opacity-40 dark:text-white/80";

  return (
    <div className={className}>
      <div
        ref={rail}
        role="region"
        aria-label={label}
        className="-mx-5 flex snap-x snap-mandatory overflow-x-auto px-[14%] py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((_, i) => (
          <div key={i} ref={(el) => { slots.current[i] = el; }} className="flex w-[72%] shrink-0 snap-center px-1.5">
            <div className="flex w-full transition-[transform,opacity] duration-150 ease-out [&>*]:w-full">{render(i, i === active)}</div>
          </div>
        ))}
      </div>

      {/* التنقّل: في الاتّجاه العربيّ «السابق» يمنةً و«التالي» يسرة */}
      <div className="mt-2 flex items-center justify-center gap-5">
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="السابق" className={btn}>
          <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
        </button>
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button key={i} type="button" onClick={() => go(i)} aria-label={`البطاقة ${i + 1}`} className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-5 bg-gold-600" : "w-1.5 bg-ink/20 dark:bg-white/25")} />
          ))}
        </div>
        <button type="button" onClick={() => go(active + 1)} disabled={active === items.length - 1} aria-label="التالي" className={btn}>
          <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    </div>
  );
}
