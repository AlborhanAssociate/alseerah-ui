import { BookOpen, ShieldCheck } from "lucide-react";

/**
 * قسم النطاق — المدوّنة المعرفية والمصادر المعتمدة.
 * تخطيط مقسوم: تمهيد ثابت في عمود، وقائمة المصادر الستّة في عمود أوسع.
 */

const SOURCES = [
  {
    num: "١",
    title: "السيرة النبويّة لابن هشام",
    desc: "تهذيب سيرة ابن إسحاق — أقدم كتب السيرة المتداولة",
  },
  {
    num: "٢",
    title: "الطبقات الكبرى لابن سعد",
    desc: "أوسع مصدرٍ للتراجم والطبقات في السيرة",
  },
  {
    num: "٣",
    title: "زاد المعاد لابن القيّم",
    desc: "في هدي خير العباد ﷺ — فقه السيرة واستنباطها",
  },
  {
    num: "٤",
    title: "البداية والنهاية لابن كثير",
    desc: "السيرة في سياقها التاريخيّ الشامل",
  },
  {
    num: "٥",
    title: "الكتب الستّة (البخاري، مسلم، ...)",
    desc: "أصول الأحاديث النبويّة المتعلّقة بالسيرة",
  },
  {
    num: "٦",
    title: "الرحيق المختوم للمباركفوري",
    desc: "معالجةٌ معاصرةٌ منضبطةٌ لوقائع السيرة",
  },
] as const;

export function Sources() {
  return (
    <section id="sources" className="relative scroll-mt-24 overflow-hidden bg-paper-sunken py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">
          {/* التمهيد */}
          <div className="lg:col-span-2 lg:self-start lg:pt-2">
            <p className="text-sm font-medium text-gold-700">
              النطاق
            </p>
            <h2 className="mt-4 text-balance text-[1.5rem] font-bold leading-[1.35] text-ink-800 lg:text-[1.75rem]">
              بنيةٌ معرفيّةٌ مبنيّةٌ على أمّات الكتب
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-8 text-ink-600">
              لا يستقي نظامُ السيرة ai معلوماتِه من الشبكة العنكبوتيّة
              العامّة، بل من مدوَّنةٍ مُحكَمةٍ من أمّهات كتب السيرة النبويّة
              والحديث الشريف.
            </p>
            <p className="mt-3 text-pretty text-[15px] leading-8 text-ink-600">
              يُحيل النظامُ كلَّ جوابٍ إلى مرجعه الأصليّ، مع بيان درجة
              الرواية عند أهل الاختصاص.
            </p>

            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gold-100 py-2 ps-3 pe-4 text-sm font-medium text-gold-800 ring-1 ring-inset ring-gold-200">
              <ShieldCheck className="size-4.5" strokeWidth={1.75} aria-hidden />
              مدوّنة مغلقة الحدود — لا محتوى من خارجها
            </div>
          </div>

          {/* المصادر */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <BookOpen className="size-5 text-gold-700" strokeWidth={1.75} aria-hidden />
              <h3 className="text-lg font-semibold text-ink-800">
                المصادر المعتمدة
              </h3>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-line-strong to-transparent" />
            </div>

            <ol className="mt-7 grid gap-5 sm:grid-cols-2">
              {SOURCES.map((src) => (
                <li
                  key={src.num}
                  className="group relative isolate overflow-hidden rounded-2xl bg-paper-raised p-5 pe-7 transition-transform duration-400 hover:-translate-y-1"
                >

                  {/* شعيرة ذهبية علوية تتمدّد عند المرور */}
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-0.5 w-10 rounded-full bg-gold-500/70 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-24"
                  />

                  <h4 className="relative mt-3 text-[17px] font-bold text-ink-800">
                    {src.title}
                  </h4>
                  <p className="relative mt-2 text-sm leading-6.5 text-ink-500">
                    {src.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
