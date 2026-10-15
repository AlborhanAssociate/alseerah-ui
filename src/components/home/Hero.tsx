import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { HeroChatDemo } from "@/components/home/HeroChatDemo";
import { setPendingQuestion } from "@/lib/pendingQuestion";

/**
 * الواجهة الأولى على عمودَين.
 * اليمين: العنوان، وحقل السؤال مع زرّه، وثلاثة أسئلةٍ مقترحة تُرسَل بنقرة.
 * اليسار: تركيبٌ طبقيّ من بطاقة صورةٍ خلفيّة ونافذة محادثةٍ حقيقيّة أمامها.
 */

const TRUST = ["+٢٠ مرجعاً من أمّهات الكتب", "إجابةٌ معزوّةٌ إلى صفحتها", "٤ لغات"];
const SUGGESTED = ["ما أسباب غزوة بدر؟", "كيف كانت هجرته ﷺ إلى المدينة؟", "ما شروط صلح الحديبية؟"];

export function Hero() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");

  /* السؤال يُحفظ ثمّ يُنقل الزائر إلى المحادثة، فتُرسله هي فور فتحها */
  function go(text: string) {
    const q = text.trim();
    if (q) setPendingQuestion(q);
    navigate("/chat");
  }

  return (
    <section className="relative overflow-hidden">
      {/* توهّجٌ ذهبيّ خفيف خلف التركيب البصريّ */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -end-40 -z-10 size-[36rem] rounded-full bg-gold/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-4 pt-36 sm:pt-40 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-6 lg:pt-36">
        {/* النصّ والحقل؛ min-w-0 كي لا يوسّع شريطُ الأسئلة القابلُ للتمرير العمودَ */}
        <div className="min-w-0 lg:col-span-6">
          <h1 className="text-balance text-[1.85rem] font-bold leading-[1.2] text-ink-800 sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem]">
            السيرةُ النبويّةُ بين يديك
            <span className="mt-1 block text-gold-700">بإسنادٍ وعزوٍ إلى المصدر</span>
          </h1>

          <p className="mt-4 max-w-md text-pretty text-[14.5px] leading-7 text-ink-600 sm:text-[15px]">
            اسأل بلغتك عن أيّ مسألةٍ في السيرة، وتصلك الإجابة من أمّهات كتب السيرة والحديث، معزوّةً إلى كتابها وصفحتها.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(question);
            }}
            className="relative mt-7 max-w-lg"
          >
            <label htmlFor="hero-question" className="sr-only">
              اسأل عن السيرة النبويّة
            </label>
            <input
              id="hero-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  go(question);
                }
              }}
              placeholder="اكتب سؤالك هنا…"
              autoComplete="off"
              className="h-[3.25rem] w-full min-w-0 rounded-full bg-paper-raised pe-[3.75rem] ps-5 text-[14.5px] sm:pe-40 text-ink shadow-xs ring-1 ring-ink/[0.1] outline-none transition-shadow placeholder:text-ink-muted focus:ring-2 focus:ring-gold/45"
            />
            {/* زرّ الإرسال داخل الحقل: سهمٌ على الجوّال، ونصٌّ وسهمٌ على الشاشات الأوسع */}
            <button
              type="submit"
              aria-label="ابدأ المحادثة"
              className="absolute inset-y-1.5 end-1.5 inline-flex items-center justify-center gap-2 rounded-full bg-plum-800 px-3.5 text-[14px] font-semibold text-white shadow-sm ring-1 ring-white/10 transition-colors hover:bg-plum-900 sm:px-5"
            >
              <span className="hidden sm:inline">ابدأ المحادثة</span>
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            </button>
          </form>

          {/* أسئلةٌ مقترحة: نقرةٌ واحدة تفتح المحادثة بها */}
          <ul className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {SUGGESTED.map((s) => (
              <li key={s} className="shrink-0">
                <button
                  type="button"
                  onClick={() => go(s)}
                  className="whitespace-nowrap rounded-full bg-paper-raised px-3 py-1.5 text-[12.5px] text-ink-600 ring-1 ring-ink/[0.08] transition-colors hover:bg-sand/70 hover:text-ink-800"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>

          <ul className="mt-7 hidden flex-wrap gap-x-4 gap-y-2 text-[13px] text-ink-600 sm:flex">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-gold-700" strokeWidth={2.25} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* التركيب البصريّ: صورةٌ خلف نافذة محادثة، يُخفى على الجوّال كي تبقى الواجهة خفيفة. الصورة مؤقّتة. */}
        <div className="relative hidden sm:block lg:col-span-6">
          <div
            aria-hidden
            className="relative hidden h-[27rem] overflow-hidden rounded-2xl bg-plum-900 shadow-md ring-1 ring-ink/10 sm:block sm:ms-auto sm:w-[62%]"
          >
            <img src={`${import.meta.env.BASE_URL}tmp/dome.jpg`} alt="" className="absolute inset-0 size-full object-cover object-[50%_38%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-plum-950/20 to-transparent" />
          </div>

          {/* نافذة محادثةٍ متحرّكة تدور على أمثلةٍ قصيرة */}
          <HeroChatDemo className="relative -mt-2 sm:absolute sm:bottom-8 sm:start-0 sm:mt-0 sm:w-[70%]" />
        </div>
      </div>
    </section>
  );
}
