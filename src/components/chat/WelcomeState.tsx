import { AudioLines, CalendarClock, Lightbulb, Scale } from "lucide-react";
import { currentUser } from "../../data/user";

/** بطاقات البدء — أربعة مداخل إلى السيرة، لكلٍّ لونه من لوحة الشعار */
/** أربع درجاتٍ فاتحة من الرمليّ الذهبيّ نفسه، من الأفتح إلى الأدفأ، بحافّةٍ أدكن قليلاً */
const GOLD = [
  "from-[#fcf3ee] to-[#fef9f6] ring-[#e2c3b3] hover:from-[#f9eae3] text-[#b0532f] dark:from-[#2a1e18] dark:to-[#1f1815] dark:ring-[#4a3328] dark:hover:from-[#33241d] dark:text-gold-light",
  "from-[#faede6] to-[#fdf6f2] ring-[#dfbcaa] hover:from-[#f6e3d9] text-[#b0532f] dark:from-[#2d2019] dark:to-[#211a16] dark:ring-[#4d3529] dark:hover:from-[#36261e] dark:text-gold-light",
  "from-[#f8e6dd] to-[#fcf2ed] ring-[#dbb4a0] hover:from-[#f3dbcf] text-[#b0532f] dark:from-[#30211a] dark:to-[#231b17] dark:ring-[#50372a] dark:hover:from-[#39281f] dark:text-gold-light",
  "from-[#f6dfd4] to-[#fbeee8] ring-[#d7ac96] hover:from-[#f0d3c5] text-[#b0532f] dark:from-[#33231b] dark:to-[#251c18] dark:ring-[#53382b] dark:hover:from-[#3c2920] dark:text-gold-light",
];

const STARTERS = [
  {
    theme: "المولد والنشأة",
    question: "متى وُلد النبيّ ﷺ، وما الذي رواه أهل السِّيَر عن نشأته؟",
    tint: GOLD[0],
  },
  {
    theme: "الغزوات",
    question: "ما أوجه الشبه والاختلاف بين بدرٍ وأُحُدٍ تخطيطًا ونتيجة؟",
    tint: GOLD[1],
  },
  {
    theme: "أمّهات المؤمنين",
    question: "ما منزلة السيّدة خديجة رضي الله عنها في الدعوة المكّيّة؟",
    tint: GOLD[2],
  },
  {
    theme: "الصلح والمعاهدات",
    question: "لماذا عُدّ صلح الحديبية فتحًا مبينًا؟",
    tint: GOLD[3],
  },
] as const;

/** أدوات أخرى — صفّ ثانويّ عمدًا كي تتصدّر البطاقات */
const TOOLS = [
  { label: "الخطّ الزمنيّ", Icon: CalendarClock },
  { label: "نطاق المصادر", Icon: Scale },
  { label: "استنباط الدروس", Icon: Lightbulb },
  { label: "تفريغ مجلس", Icon: AudioLines },
] as const;

export function WelcomeState({ onPick }: { onPick: (q: string) => void }) {
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div className="mx-auto flex w-full max-w-[46rem] flex-1 flex-col justify-center px-5 py-10 sm:px-8">
      {/* مرشّح إزاحةٍ خفيف يمنح الحوافّ تعرّجاً غير منتظم كحجرٍ قديم. يُعرَّف مرّة ويُستعمل من CSS */}
      {/* أربعة مرشّحات ببذورٍ مختلفة كي لا تتكرّر الحافّة نفسها في كلّ بطاقة، وخامس أخشن لسماكة اللوح */}
      <svg aria-hidden className="absolute size-0">
        {[3, 7, 11, 19].map((seed, i) => (
          <filter key={seed} id={`stone-edge-${i + 1}`} x="-4%" y="-8%" width="108%" height="116%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed={seed} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
        <filter id="stone-depth" x="-4%" y="-8%" width="108%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="29" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <header className="mb-8 text-center">
        <p className="mb-2 text-[12.5px] font-semibold text-gold">أهلًا بك، {firstName}</p>
        <h2 className="text-balance text-[30px] font-bold leading-[1.35] text-ink">
          بمَ أُعينك في السيرة اليوم؟
        </h2>
      </header>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {STARTERS.map(({ theme, question, tint }, i) => (
          <button
            key={theme}
            type="button"
            onClick={() => onPick(question)}
            className={`group relative isolate flex h-full flex-col rounded-xl p-4 text-start transition-transform duration-200 hover:-translate-y-px ${tint}`}
          >
            {/* سماكة اللوح: طبقةٌ داكنة خلف الحافّة بإزاحةٍ طفيفة وتموّجٍ مختلف */}
            <span
              aria-hidden
              className="stone-depth absolute inset-0 -z-20 translate-x-[-1.5px] translate-y-[2px] rounded-lg bg-sepia/[0.26]"
            />
            {/* سطح اللوح: التدرّج ونسيج الورق، يمرّان بمرشّح الحافّة معاً فيبقى النصّ حادّاً */}
            <span
              aria-hidden
              style={{ filter: `url(#stone-edge-${(i % 4) + 1})` }}
              className={`absolute inset-0 -z-10 overflow-hidden rounded-lg bg-gradient-to-br ring-1 shadow-[inset_0_0_0_1px_rgba(160,72,44,0.28),inset_0_0_36px_rgba(160,72,44,0.10),2px_3px_8px_rgba(160,72,44,0.12)] transition-shadow duration-200 group-hover:shadow-[inset_0_0_0_1px_rgba(160,72,44,0.38),inset_0_0_36px_rgba(160,72,44,0.12),3px_5px_12px_rgba(160,72,44,0.16)] ${tint}`}
            >
              <span className="paper-grain absolute inset-0 opacity-[0.26] mix-blend-multiply" />
            </span>
            <span className="mb-2 block text-[13.5px] font-bold leading-none">{theme}</span>
            <span className="text-[12.5px] leading-[1.9] text-ink-soft/90">{question}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-1.5">
        {TOOLS.map(({ label, Icon }) => (
          <button
            key={label}
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12.5px] text-ink-muted transition-colors hover:bg-sand/50 hover:text-ink-soft"
          >
            <Icon size={14} strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
