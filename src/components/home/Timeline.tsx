import { cn } from "@/lib/cn";

/**
 * قسم الخطّ الزمنيّ — مراحل السيرة الخمس.
 * سطح المكتب: مسار أفقي بعُقد ذهبية. الجوّال: سكّة عمودية.
 */

const STAGES = [
  {
    name: "المولد",
    phase: "قبل البعثة",
    desc: "النسب الشريف، الولادة، الرضاعة، رحلتا الشام",
  },
  {
    name: "البعثة",
    phase: "المرحلة المكّيّة",
    desc: "نزول الوحي، الدعوة السرّيّة والجهريّة، الابتلاءات",
  },
  {
    name: "الهجرة",
    phase: "التأسيس",
    desc: "بناء المسجد، المؤاخاة، الدستور، الغزوات الكبرى",
  },
  {
    name: "الفتح",
    phase: "التمكين",
    desc: "صلح الحديبية، فتح مكّة، حنين، الوفود",
  },
  {
    name: "الوداع",
    phase: "الاختتام",
    desc: "حجّة الوداع، المرض، الوفاة، خلافة الصدّيق",
  },
] as const;

function StageNode({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex size-4 items-center justify-center rounded-full bg-gold-600 ring-4 ring-gold-200 transition-transform duration-300 group-hover:scale-125",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-white" />
    </span>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="relative scroll-mt-24 py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* رأس القسم */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-gold-700">
            الخطّ الزمنيّ
          </p>
          <h2 className="mt-4 text-balance text-[1.5rem] font-bold leading-[1.35] text-ink-800 lg:text-[1.75rem]">
            مراحلُ السيرة العطرة
          </h2>
          <p className="mt-3 text-pretty text-[14.5px] leading-7 text-ink-500">
            تسلسلٌ دقيقٌ للسيرة النبويّة من المولد الشريف إلى الرفيق الأعلى
          </p>
        </div>

        {/* سطح المكتب: مسار أفقي */}
        <ol className="mt-12 hidden lg:grid lg:grid-cols-5 lg:gap-8">
          {STAGES.map((stage) => (
            <li key={stage.name} className="group relative">
              {/* الخطّ الواصل عبر الأعمدة */}
              <span
                aria-hidden
                className="absolute start-0 end-0 top-2 h-px bg-gradient-to-l from-line-strong to-line-strong group-first:from-transparent group-last:to-transparent rtl:bg-gradient-to-r"
              />
              <div className="relative flex flex-col items-start gap-5">
                <StageNode />
                <div>
                  <p className="text-xs font-medium text-gold-700">
                    {stage.phase}
                  </p>
                  <h3 className="mt-1.5 text-xl font-bold text-ink-800">
                    {stage.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6.5 text-ink-500">
                    {stage.desc}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* الجوّال: سكّة عمودية */}
        <ol className="relative mt-14 space-y-10 lg:hidden">
          <span
            aria-hidden
            className="absolute bottom-2 top-2 start-[7px] w-px bg-line-strong"
          />
          {STAGES.map((stage) => (
            <li key={stage.name} className="group relative flex gap-5 ps-0">
              <StageNode className="mt-1 shrink-0" />
              <div className="-mt-0.5">
                <p className="text-xs font-medium text-gold-700">
                  {stage.phase}
                </p>
                <h3 className="mt-1 text-xl font-bold text-ink-800">
                  {stage.name}
                </h3>
                <p className="mt-1.5 text-sm leading-6.5 text-ink-500">
                  {stage.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
