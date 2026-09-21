import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AgentPlan } from "@/components/chat/AgentPlan";
import { AnswerBody } from "@/components/chat/AnswerBody";
import { CitationCard } from "@/components/chat/CitationCard";
import { messages } from "@/data/conversation";

/**
 * قسم التجربة — ليس صورةً للمنتج بل المنتجُ نفسه:
 * مكوّنات شاشة المحادثة الفعليّة على محادثةٍ جرت على المنصّة.
 */
export function Demo() {
  const question = messages.find((m) => m.role === "user");
  const answer = messages.find((m) => m.role === "assistant");
  const [openId, setOpenId] = useState<string | null>(answer?.citations[0]?.id ?? null);

  if (!question || !answer || question.role !== "user" || answer.role !== "assistant") return null;

  /* نكتفي بالمقطع الأوّل من الإجابة كي يبقى القسم في حدود شاشة */
  const excerpt = answer.body.split(/\n(?=## )/).slice(0, 2).join("\n");

  return (
    <section id="demo" className="relative scroll-mt-24 bg-paper-sunken py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-medium text-gold-700">التجربة</p>
          <h2 className="mt-4 text-balance text-[1.5rem] font-bold leading-[1.35] text-ink-800 lg:text-[1.75rem]">
            اسأل كما تسأل شيخَك، يُجبك بإسناد أهل العلم
          </h2>
          <p className="mt-3 text-pretty text-[14.5px] leading-7 text-ink-500">
            هذه إجابةٌ حقيقيّة من المنصّة — بخطواتها، ونصّها، ومصادرها التي تُفتح على المقطع المسترجَع.
          </p>
        </div>

        {/* نافذة المحادثة */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl bg-paper shadow-lg ring-1 ring-ink/[0.07]">
          <div className="flex items-center gap-2 border-b border-ink/[0.06] px-5 py-3">
            <span aria-hidden className="size-2.5 rounded-full bg-line-strong" />
            <span aria-hidden className="size-2.5 rounded-full bg-line-strong" />
            <span aria-hidden className="size-2.5 rounded-full bg-line-strong" />
            <span className="ms-2 text-[12.5px] text-ink-muted">السيرة ai · محادثة</span>
          </div>

          <div className="flex flex-col gap-5 p-5 sm:p-7">
            <div className="flex items-start gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-[12.5px] font-semibold text-paper">
                س
              </span>
              <p className="rounded-2xl rounded-se-md bg-sand/60 px-4 py-2.5 text-[15px] leading-[1.85] text-ink">
                {question.text}
              </p>
            </div>

            <AgentPlan steps={answer.plan} />
            <AnswerBody body={excerpt} />

            <div className="flex flex-col gap-2">
              {answer.citations.slice(0, 2).map((c) => (
                <CitationCard
                  key={c.id}
                  citation={c}
                  open={openId === c.id}
                  onToggle={() => setOpenId((id) => (id === c.id ? null : c.id))}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/chat"
            className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-ink-800 ps-8 pe-6 text-base font-medium text-white shadow-md transition-all duration-300 hover:bg-ink-900 hover:shadow-gold"
          >
            جرّب بسؤالك أنت
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
