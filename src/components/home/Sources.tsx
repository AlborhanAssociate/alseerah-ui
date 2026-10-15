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
    title: "الكتب الستّة",
    desc: "الصحيحان والسنن الأربع — أصول الأحاديث المتعلّقة بالسيرة",
  },
  {
    num: "٦",
    title: "الرحيق المختوم للمباركفوري",
    desc: "معالجةٌ معاصرةٌ منضبطةٌ لوقائع السيرة",
  },
] as const;

export function Sources() {
  return (
    <section id="sources" className="relative scroll-mt-24 overflow-hidden bg-paper-sunken py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">
          {/* التمهيد */}
          <div className="lg:col-span-2 lg:self-start">
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
              <h3 className="text-lg font-semibold text-ink-800">المصادر المعتمدة</h3>
              <span className="rounded-full bg-gold-pale px-2.5 py-0.5 text-[12px] font-medium text-gold-800">{SOURCES.length.toLocaleString("ar-EG")} مصادر</span>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-line-strong to-transparent" />
            </div>

            <ol className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2">
              {SOURCES.map((src) => (
                <li
                  key={src.num}
                  className="group flex flex-col rounded-2xl bg-paper-raised p-6 ring-1 ring-ink/[0.05] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <BookOpen
                    aria-hidden
                    className="size-6 text-gold transition-transform duration-300 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                  <h4 className="mt-4 text-[16px] font-bold leading-7 text-ink-800">{src.title}</h4>
                  <p className="mt-1.5 text-[13.5px] leading-6 text-ink-500">{src.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
