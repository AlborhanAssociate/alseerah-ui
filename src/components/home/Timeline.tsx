import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * قسم الخطّ الزمنيّ — مراحل السيرة الخمس على مسارٍ واحد.
 * سطح المكتب: مسارٌ أفقيّ يتدرّج من البنفسجيّ إلى البرتقاليّ، عليه عُقدٌ بتاريخ كلّ مرحلة،
 * وتحت كلّ عقدةٍ بطاقةٌ زجاجيّة خفيفة. المرور على مرحلةٍ يُبرز عقدتها وبطاقتها.
 * الجوّال: سكّةٌ عموديّة بالمحتوى نفسه.
 */

const STAGES = [
  { name: "المولد", phase: "قبل البعثة", when: "عام الفيل", desc: "النسب الشريف، الولادة، الرضاعة، رحلتا الشام." },
  { name: "البعثة", phase: "المرحلة المكّيّة", when: "١٣ قبل الهجرة", desc: "نزول الوحي، الدعوة السرّيّة والجهريّة، الابتلاءات." },
  { name: "الهجرة", phase: "التأسيس", when: "١ هـ", desc: "بناء المسجد، المؤاخاة، الصحيفة، الغزوات الكبرى." },
  { name: "الفتح", phase: "التمكين", when: "٨ هـ", desc: "صلح الحديبية، فتح مكّة، حُنين، عام الوفود." },
  { name: "الوداع", phase: "الاختتام", when: "١٠ هـ", desc: "حجّة الوداع، ثمّ مرضُه ﷺ ووفاته." },
] as const;

function Node({ on, className }: { on: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-5 place-items-center rounded-full border bg-paper transition-[border-color,transform] duration-300",
        on ? "scale-110 border-gold-600" : "border-ink/20 dark:border-white/25",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full transition-colors duration-300", on ? "bg-gold-600" : "bg-ink/30 dark:bg-white/40")} />
    </span>
  );
}

export function Timeline() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="timeline" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[1.6rem] font-bold leading-[1.35] text-ink-800 lg:text-[2rem]">مراحلُ السيرة العطرة</h2>
          <p className="mt-3 text-pretty text-[15px] leading-7 text-ink-500">تسلسلٌ دقيقٌ من المولد الشريف إلى الرفيق الأعلى.</p>
        </div>

        {/* سطح المكتب */}
        <div className="relative mt-14 hidden lg:block">
          {/* المسار: يبدأ من مركز العقدة الأولى وينتهي عند مركز الأخيرة (عُشر العرض من كلّ طرف) */}
          <span aria-hidden className="absolute inset-x-[10%] top-[2.375rem] h-px bg-gradient-to-l from-plum-500/40 via-gold-600/60 to-gold-600" />
          <ol className="grid grid-cols-5 gap-4">
            {STAGES.map((s, i) => {
              const on = hover === i;
              return (
                <li key={s.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="flex flex-col items-center text-center">
                  <span className={cn("text-[12px] font-medium tabular-nums transition-colors duration-300", on ? "text-gold-700" : "text-ink-500")}>{s.when}</span>
                  <Node on={on} className="mt-2.5" />
                  <div
                    className={cn(
                      "mt-6 w-full rounded-[14px] border px-4 pb-5 pt-4 transition-[border-color,background-color,transform] duration-300",
                      on
                        ? "-translate-y-0.5 border-gold-600/35 bg-paper-raised dark:bg-white/[0.06]"
                        : "border-ink/[0.07] bg-white/40 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]",
                    )}
                  >
                    <p className="text-[12px] font-medium text-gold-700">{s.phase}</p>
                    <h3 className="mt-1 text-[1.2rem] font-bold text-ink-800">{s.name}</h3>
                    <p className="mt-2 text-pretty text-[13.5px] leading-6 text-ink-500">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* الجوّال واللوحيّ: سكّة عموديّة */}
        <ol className="relative mx-auto mt-12 max-w-xl space-y-4 lg:hidden">
          <span aria-hidden className="absolute bottom-6 start-[9px] top-6 w-px bg-gradient-to-b from-plum-500/40 via-gold-600/60 to-gold-600" />
          {STAGES.map((s) => (
            <li key={s.name} className="relative flex gap-4">
              <Node on={false} className="mt-5 shrink-0" />
              <div className="flex-1 rounded-[14px] border border-ink/[0.07] bg-white/40 px-4 pb-4 pt-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[12px] font-medium text-gold-700">{s.phase}</p>
                  <span className="text-[12px] tabular-nums text-ink-500">{s.when}</span>
                </div>
                <h3 className="mt-1 text-[1.15rem] font-bold text-ink-800">{s.name}</h3>
                <p className="mt-1.5 text-pretty text-[13.5px] leading-6 text-ink-500">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
