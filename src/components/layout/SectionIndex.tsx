import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** أقسام الصفحة بترتيبها؛ يستعملها الفهرس الجانبيّ وقائمة الجوّال */
export const SECTIONS = [
  { label: "البداية", id: "hero" },
  { label: "المزايا", id: "features" },
  { label: "المصادر", id: "sources" },
  { label: "لمن صُنعت", id: "audiences" },
  { label: "المنهجيّة", id: "methodology" },
] as const;

/* القسم الظاهر الآن: آخر قسمٍ تجاوز رأسُه ثلثَ الشاشة؛ الواجهة الأولى في أعلى الصفحة */
export function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight / 3;
      let current: string | null = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

/**
 * فهرسٌ جانبيّ لأقسام الصفحة: خطٌّ رأسيّ عليه نقطةٌ لكلّ قسم عند الحافّة اليسرى.
 * النقطة النشطة تطول وتتلوّن ويظهر اسم قسمها، وأسماء الباقي تظهر عند المرور. يظهر على الشاشات الكبيرة فقط.
 */
export function SectionIndex() {
  const active = useActiveSection();

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav
      aria-label="فهرس أقسام الصفحة"
      className={cn(
        "fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block",
      )}
    >
      {/* dir="ltr" كي تكون النقطة عند الحافّة واسمُ القسم إلى يمينها نحو المحتوى */}
      <ol dir="ltr" className="relative flex flex-col gap-1">
        {/* الخطّ الرأسيّ الذي تنتظم عليه النقاط */}
        <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-ink/10" />
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => go(s.id)}
                aria-current={on ? "true" : undefined}
                className="group flex h-7 items-center gap-3"
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative ms-[3px] w-[9px] rounded-full transition-all duration-300",
                    on ? "h-[22px] bg-gold-600" : "h-[9px] bg-ink/25 group-hover:bg-ink/50",
                  )}
                />
                <span
                  className={cn(
                    "whitespace-nowrap rounded-full px-2.5 py-1 text-[12.5px] font-medium transition-all duration-300",
                    on
                      ? "translate-x-0 bg-white/70 text-ink opacity-100 shadow-[0_4px_12px_-4px_rgba(74,56,86,0.2)] backdrop-blur-md dark:bg-white/10"
                      : "-translate-x-1 text-ink-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                  )}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
