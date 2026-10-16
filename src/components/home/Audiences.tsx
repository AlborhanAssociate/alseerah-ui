import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { CoverRail } from "./CoverRail";
import { BookOpenCheck, Landmark, Presentation, SearchCheck } from "lucide-react";

/**
 * قسم «لمن صُنعت» — تخطيطٌ مقسوم: صورةُ قارئٍ بين رفوف المكتبة في جهة، وفي الجهة الأخرى العنوان
 * ثمّ الفئات الأربع قائمةً تحريريّة (رمزٌ خطّيّ رفيع، وعنوان، ووصف) تفصلها خطوطٌ شعريّة، بلا بطاقات.
 * على سطح المكتب يخرج طرفُ الكتاب من حافّة إطار الصورة. على الجوّال: الصورة أوّلاً ثمّ القائمة.
 */

const BASE = import.meta.env.BASE_URL;
/* موضع صورة القارئ ومقاسها داخل الإطار الطوليّ؛ مشتركٌ بين الصورة ونسختها المقصوصة كي تتطابقا */
const READER_GEOMETRY = { width: "187.17%", left: "-50.56%" } as const;

const AUDIENCES = [
  { icon: BookOpenCheck, title: "طلبةُ العلم", desc: "أداةُ مراجعةٍ ومذاكرة، تربط المسائل بمصادرها وتُعين على الفهم والحفظ." },
  { icon: SearchCheck, title: "الباحثون", desc: "بحثٌ دلاليٌّ في مدوّنة السيرة، مع تخريج الروايات والمقارنة بين المصادر." },
  { icon: Presentation, title: "المعلّمون والدعاة", desc: "إعدادُ الدروس والخطب والمواد التعليميّة بأسلوبٍ منضبطٍ ومبسّط." },
  { icon: Landmark, title: "المؤسّسات الشرعيّة", desc: "تكاملٌ مع منصّات التعليم والمساجد والمراكز عبر واجهةٍ برمجيّةٍ آمنة." },
] as const;

export function Audiences() {
  return (
    <section id="audiences" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* النصّ والقائمة؛ حشوةٌ من جهة الصورة تُفسح لطرف الكتاب الخارج من إطارها */}
        <div className="min-w-0 lg:col-span-7 lg:pe-20">
          <h2 className="reveal text-balance text-center text-[1.6rem] font-bold leading-[1.35] text-ink-800 lg:text-start lg:text-[2rem]">أداةٌ لأهل العلم والبحث والتعليم</h2>
          <p style={{ "--reveal-delay": "80ms" } as CSSProperties} className="reveal mx-auto mt-3 max-w-lg text-pretty text-center lg:mx-0 lg:text-start text-[15px] leading-7 text-ink-500">صُمّمت لمن يقرأ السيرة ويُدرّسها ويبحث فيها.</p>

          {/* الجوّال: شريطٌ دوّار */}
          <CoverRail
            label="الفئات"
            className="mt-4 sm:hidden"
            count={AUDIENCES.length}
            render={(i, on) => {
              const a = AUDIENCES[i];
              return (
                <div data-rail className={cn("neu-raised focus-tile rounded-[20px] p-5", on && "in-focus")}>
                  <a.icon className="size-[22px] text-ink-400 dark:text-white/45" strokeWidth={1.4} aria-hidden />
                  <h3 className="mt-4 text-[1.02rem] font-semibold leading-7 text-ink-800">{a.title}</h3>
                  <p className="mt-1 text-pretty text-[13.5px] leading-6 text-ink-500">{a.desc}</p>
                </div>
              );
            }}
          />

          <ul className="mt-8 hidden gap-5 sm:grid sm:grid-cols-2 lg:mt-10">
            {AUDIENCES.map((a, i) => (
              <li key={a.title} style={{ "--reveal-delay": `${120 + i * 90}ms` } as CSSProperties} className="neu-raised neu-press neu-emerge focus-tile group rounded-[20px] p-5 sm:p-6">
                {/* رمزٌ خطّيّ رفيع بلا رقعة، فوق العنوان؛ يتلوّن بالبرتقاليّ عند المرور */}
                <a.icon className="size-[22px] text-ink-400 transition-colors duration-300 group-hover:text-gold-600 dark:text-white/45" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-4 text-[1.02rem] font-semibold leading-7 text-ink-800">{a.title}</h3>
                <p className="mt-1 text-pretty text-[13.5px] leading-6 text-ink-500">{a.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* الصورة */}
        <figure style={{ "--reveal-delay": "120ms" } as CSSProperties} className="reveal relative max-lg:order-first max-sm:hidden lg:col-span-5">
          {/* الشاشات الأصغر: صورةٌ عريضة عاديّة */}
          <div className="relative overflow-hidden rounded-[20px] lg:hidden">
            <img src={`${BASE}audience-reader.webp`} alt="قارئٌ يتصفّح كتاباً بين رفوف مكتبة" loading="lazy" width={1400} height={935} className="aspect-[16/10] w-full -scale-x-100 object-cover object-[62%_50%] sm:aspect-[16/9]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-plum-950/50 via-transparent to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
          </div>

          {/* سطح المكتب: الصورة في إطارٍ طوليّ، وفوقها نسخةٌ مقصوصة الخلفيّة بالموضع والمقاس نفسيهما،
              لا يظهر منها إلّا شريطُ الكتاب، فيخرج طرفُه من حافّة الإطار. المقاس محسوبٌ يدويّاً بدل object-cover
              كي تتطابق النسختان: عرض الصورة = نسبتها (١٤٠٠÷٩٣٥) × نسبة الإطار (٥÷٤) = ١٨٧٫١٧٪، وإزاحتها ٥٨٪ من الفائض.
              اللوح معكوسٌ أفقيّاً كلّه، فيتّجه الكتاب نحو النصّ ويخرج من الحافّة المقابلة له. */}
          <div className="relative hidden aspect-[4/5] -scale-x-100 lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-[20px]">
              <img src={`${BASE}audience-reader.webp`} alt="قارئٌ يتصفّح كتاباً بين رفوف مكتبة" loading="lazy" style={READER_GEOMETRY} className="absolute inset-y-0 h-full max-w-none" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-plum-950/50 via-transparent to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
            </div>
            <img
              src={`${BASE}audience-reader-cut.webp`}
              alt=""
              aria-hidden
              loading="lazy"
              style={{ ...READER_GEOMETRY, clipPath: "polygon(0 36%, 33% 36%, 33% 66%, 0 66%)" }}
              className="pointer-events-none absolute inset-y-0 h-full max-w-none"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
