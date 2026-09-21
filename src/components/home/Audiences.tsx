import {
  BookOpenCheck,
  SearchCheck,
  Presentation,
  Landmark,
} from "lucide-react";

/** قسم «لمن صُنعت» — الفئات الأربع المستهدفة. */

const AUDIENCES = [
  {
    icon: BookOpenCheck,
    title: "طلبةُ العلم",
    desc: "أداةُ مراجعةٍ ومذاكرة، تربط المسائل بمصادرها وتُعين على الحفظ والفهم.",
  },
  {
    icon: SearchCheck,
    title: "الباحثون",
    desc: "بحثٌ دلاليٌّ عميقٌ في مدوّنة السيرة، مع تخريج الروايات ومقارنة المصادر.",
  },
  {
    icon: Presentation,
    title: "المعلّمون والدعاة",
    desc: "إعدادُ الخطب والدروس والمواد التعليميّة بأسلوبٍ منضبطٍ ومبسّط.",
  },
  {
    icon: Landmark,
    title: "المؤسّسات الشرعيّة",
    desc: "تكاملٌ مع منصّات التعليم والمساجد والمراكز عبر واجهة برمجيّةٍ آمنة.",
  },
] as const;

export function Audiences() {
  return (
    <section id="audiences" className="relative scroll-mt-24 py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-gold-700">
            لمن صُنعت
          </p>
          <h2 className="mt-4 text-balance text-[1.5rem] font-bold leading-[1.35] text-ink-800 lg:text-[1.75rem]">
            أداةٌ لأهل العلم والبحث والتعليم
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((aud) => (
            <article
              key={aud.title}
              className="group rounded-2xl bg-paper-raised p-5 transition-transform duration-400 hover:-translate-y-1"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ink-100 text-ink-700 transition-colors duration-400 group-hover:bg-ink-800 group-hover:text-white">
                <aud.icon className="size-6" strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold text-ink-800">
                {aud.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-7 text-ink-600">
                {aud.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
