import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpenText, Check } from "lucide-react";
import { AgentPlan } from "@/components/chat/AgentPlan";
import { setPendingQuestion } from "@/lib/pendingQuestion";
import { messages } from "@/data/conversation";

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

  const sampleQ = messages.find((m) => m.role === "user");
  const sampleA = messages.find((m) => m.role === "assistant");
  const answer = sampleA?.role === "assistant" ? sampleA : undefined;
  const cite = answer?.citations[0];
  const snippet =
    answer?.body.split(/\n\s*\n/).map((b) => b.trim()).find((b) => b && !b.startsWith("#") && !b.startsWith(">")) ?? "";

  return (
    <section className="relative overflow-hidden">
      {/* توهّجٌ ذهبيّ خفيف خلف التركيب البصريّ */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -end-40 -z-10 size-[36rem] rounded-full bg-gold/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-12 pt-28 lg:min-h-[calc(100svh-1rem)] lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-14 lg:pt-24">
        {/* النصّ والحقل */}
        <div className="lg:col-span-6">
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
            className="mt-7 flex max-w-lg flex-col gap-2.5 sm:flex-row"
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
              className="h-11 min-w-0 flex-1 rounded-xl bg-paper-raised px-4 text-[14.5px] text-ink shadow-xs ring-1 ring-ink/[0.1] outline-none transition-shadow placeholder:text-ink-muted focus:ring-2 focus:ring-gold/45"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-xl bg-ink-800 px-5 text-[14.5px] font-semibold text-white shadow-md transition-colors hover:bg-ink-900"
            >
              ابدأ المحادثة
            </button>
          </form>

          {/* أسئلةٌ مقترحة: نقرةٌ واحدة تفتح المحادثة بها */}
          <ul className="mt-3 flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => go(s)}
                  className="rounded-full bg-paper-raised px-3 py-1.5 text-[12.5px] text-ink-600 ring-1 ring-ink/[0.08] transition-colors hover:bg-sand/70 hover:text-ink-800"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>

          <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-ink-600">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-gold-700" strokeWidth={2.25} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* التركيب البصريّ: صورةٌ خلف نافذة محادثة. الصورة مؤقّتة. */}
        <div className="relative lg:col-span-6">
          <div
            aria-hidden
            className="relative hidden h-[27rem] overflow-hidden rounded-2xl bg-ink-800 shadow-md ring-1 ring-ink/10 sm:block sm:ms-auto sm:w-[62%]"
          >
            <img src={`${import.meta.env.BASE_URL}tmp/dome.jpg`} alt="" className="absolute inset-0 size-full object-cover object-[50%_38%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent" />
          </div>

          {/* نافذة المحادثة: المكوّنات الحقيقيّة على محادثةٍ جرت على المنصّة */}
          <div className="relative -mt-2 overflow-hidden rounded-2xl bg-paper-raised shadow-lg ring-1 ring-ink/[0.08] sm:absolute sm:bottom-8 sm:start-0 sm:mt-0 sm:w-[70%]">
            <div className="flex items-center gap-1.5 border-b border-ink/[0.06] px-4 py-2.5">
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="ms-2 text-[11.5px] text-ink-muted">السيرة ai · محادثة</span>
            </div>
            <div className="flex flex-col gap-3 p-4">
              {sampleQ?.role === "user" && (
                <p className="self-start rounded-2xl rounded-se-md bg-sand/60 px-3.5 py-2 text-[13.5px] leading-relaxed text-ink">
                  {sampleQ.text}
                </p>
              )}
              {answer && <AgentPlan steps={answer.plan} />}
              <p className="line-clamp-3 text-[13.5px] leading-7 text-ink-700">{snippet}</p>
              {cite && (
                <p className="flex items-center gap-2 rounded-lg bg-paper px-3 py-2 text-[12.5px] text-ink-600 ring-1 ring-ink/[0.06]">
                  <BookOpenText className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                  <span className="truncate font-medium text-ink">{cite.book}</span>
                  {cite.page && <span className="tabular shrink-0 text-ink-muted">ص {cite.page}</span>}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
