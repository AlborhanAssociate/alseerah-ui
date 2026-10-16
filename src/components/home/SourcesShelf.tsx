/**
 * قسم النطاق — المصادر المعتمدة، ببساطة: عنوانٌ وجملةٌ متوسّطان، ثمّ صفٌّ واحد من ستّ بطاقاتٍ صغيرة
 * لكلّ واحدةٍ صورةُ مجلّداته واسمُه فقط. البطاقات على لوحٍ زجاجيّ واحد فوق أضواءٍ ناعمة،
 * تقف على «رفٍّ» رفيع، ولها انعكاسٌ باهت على سطح الزجاج.
 * على الشاشات الضيّقة يصير الصفّ شريطاً أفقيّاً يُسحب.
 */

const BASE = import.meta.env.BASE_URL;

const SOURCES = [
  { key: "ibn-hisham", title: "سيرة ابن هشام" },
  { key: "tabaqat", title: "الطبقات الكبرى" },
  { key: "zad-almaad", title: "زاد المعاد" },
  { key: "bidaya", title: "البداية والنهاية" },
  { key: "kutub-sitta", title: "الكتب الستّة" },
  { key: "raheeq", title: "الرحيق المختوم" },
] as const;

export function SourcesShelf() {
  return (
    <section id="sources" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[1.6rem] font-bold leading-[1.35] text-ink-800 lg:text-[2rem]">
            بنيةٌ معرفيّةٌ مبنيّةٌ على أمّات الكتب
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-7 text-ink-500">
            إجاباتٌ من أمّهات كتب السيرة والحديث، لا من الشبكة العامّة.
          </p>
        </div>

        <div className="relative isolate mt-10 lg:mt-12">
          {/* أضواءٌ ناعمة خلف الزجاج كي يظهر تمويهه */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <span className="absolute -top-10 right-[12%] size-56 rounded-full bg-gold-600/[0.16] blur-3xl" />
            <span className="absolute -bottom-12 left-[10%] size-64 rounded-full bg-plum-500/[0.14] blur-3xl" />
            <span className="absolute left-1/2 top-1/3 h-32 w-80 -translate-x-1/2 rounded-full bg-[#eba584]/20 blur-3xl" />
          </div>

          {/* لوحٌ زجاجيّ واحد تقف عليه الكتب: حدٌّ أبيض شفيف، وخطُّ ضوءٍ في أعلاه، ونقطٌ دقيقة تتلاشى نحو الأطراف */}
          <div className="relative overflow-hidden rounded-[20px] border border-white/80 bg-white/40 shadow-[0_24px_60px_-30px_rgba(74,56,86,0.35),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <span aria-hidden className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-l from-transparent via-white to-transparent dark:via-white/30" />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(74,56,86,0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_70%)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <ol className="relative flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:px-5 lg:py-5">
              {SOURCES.map((s) => (
                <li
                  key={s.key}
                  className="group relative flex w-[9rem] shrink-0 snap-center flex-col items-center rounded-[12px] px-3 pb-3 pt-5 text-center transition-[background-color,box-shadow] duration-300 hover:bg-white/70 hover:shadow-[0_14px_32px_-18px_rgba(74,56,86,0.4),inset_0_1px_0_rgba(255,255,255,0.9)] lg:w-auto dark:hover:bg-white/[0.06] dark:hover:shadow-none"
                >
                  <div className="relative flex h-24 w-full items-end justify-center sm:h-28">
                    {/* الرفّ: خطٌّ رفيع عند قاعدة المجلّدات يتّصل بين البطاقات */}
                    <span aria-hidden className="absolute -inset-x-5 bottom-0 hidden h-px bg-gradient-to-l from-ink/5 via-ink/15 to-ink/5 lg:block dark:via-white/15" />
                    {/* ظلُّ تماسٍّ صغير تحت المجلّدات */}
                    <span aria-hidden className="absolute -bottom-0.5 left-1/2 h-2 w-3/5 -translate-x-1/2 rounded-[50%] bg-plum-950/25 blur-[5px] transition-[width] duration-500 group-hover:w-2/3 dark:bg-black/60" />
                    <img
                      src={`${BASE}books/${s.key}.webp`}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="relative h-full w-auto max-w-full object-contain object-bottom transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
                    />
                  </div>
                  {/* انعكاسٌ باهت للمجلّدات على سطح الزجاج */}
                  <div aria-hidden className="pointer-events-none flex h-5 w-full justify-center overflow-hidden opacity-[0.18] [mask-image:linear-gradient(to_bottom,#000,transparent)] dark:opacity-10">
                    <img src={`${BASE}books/${s.key}.webp`} alt="" loading="lazy" className="h-24 w-auto max-w-full -scale-y-100 object-contain object-top blur-[0.5px] sm:h-28" />
                  </div>
                  <h3 className="mt-1.5 text-[14px] font-semibold leading-6 text-ink-800">{s.title}</h3>
                  <span aria-hidden className="mt-1.5 h-0.5 w-0 rounded-full bg-gold-600 transition-[width] duration-300 group-hover:w-6" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
