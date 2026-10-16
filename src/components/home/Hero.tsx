import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import { ArrowLeft, Check, ChevronDown, MessageCircleQuestion } from "lucide-react";
import { setPendingQuestion } from "@/lib/pendingQuestion";

/**
 * الواجهة الأولى على عمودَين.
 * اليمين: عنوانٌ ووصف، ثمّ حقل السؤال؛ كلّها على عرضٍ واحد.
 * اليسار: صورة رجلٍ يسأل من هاتفه، وحوله بطاقاتُ أسئلةٍ عائمة تفتح المحادثة بنقرة.
 */


const TRUST = ["إجابةٌ معزوّةٌ إلى صفحتها", "من أمّهات كتب السيرة", "بالعربيّة ولغاتٍ أخرى"];

/* تلاشي صورة الرجل: من الأعلى طويلٌ متدرّج بمنحنى ناعم (درجاتٌ متقاربة تحاكي ease-in-out)، ثمّ جسمٌ ممتلئ، ثمّ تلاشٍ طويلٌ بالمنحنى نفسه في الأسفل */
const HERO_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 4%, rgba(0,0,0,0.07) 9%, rgba(0,0,0,0.16) 14%, rgba(0,0,0,0.29) 19%, rgba(0,0,0,0.45) 24%, rgba(0,0,0,0.62) 29%, rgba(0,0,0,0.78) 34%, rgba(0,0,0,0.9) 39%, rgba(0,0,0,0.97) 44%, #000 48%, #000 58%, rgba(0,0,0,0.97) 62%, rgba(0,0,0,0.9) 66%, rgba(0,0,0,0.78) 70%, rgba(0,0,0,0.62) 74%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.29) 82%, rgba(0,0,0,0.16) 86%, rgba(0,0,0,0.07) 90%, rgba(0,0,0,0.02) 94%, rgba(0,0,0,0) 98%)";

/* بطاقات الأسئلة العائمة فوق الصورة: مواضعُ مادّيّة (left) كي تطابق التصميم في الاتّجاهين، ومدّةُ طفوٍ وتأخيرٌ مختلفان،
   ولكلّ بطاقةٍ أسئلةٌ تتبدّل عليها بالتناوب */
const FLOATING = [
  { qs: ["من أوّل من أسلم من الرجال؟", "ما قصّة بناء المسجد النبويّ؟", "من هم السابقون الأوّلون؟"], pos: "-left-[14%] top-[14%] sm:top-[28%]", dur: "6.5s", delay: "0ms" },
  { qs: ["ما دروس صلح الحديبية؟", "كيف كانت بيعة العقبة؟", "ما أسباب غزوة بدر؟"], pos: "-right-[6%] top-[42%] sm:top-[45%]", dur: "7s", delay: "900ms" },
  { qs: ["كم دامت الدعوة السرّيّة؟", "متى فُرضت الصلاة؟", "ما قصّة الإسراء والمعراج؟"], pos: "-left-[8%] top-[70%] sm:top-[62%]", dur: "6s", delay: "1600ms" },
] as const;

/* كلّ ١٫٨ ثانية تتبدّل بطاقةٌ واحدة، بالدور، فلا تتغيّر الثلاث معاً */
const SWAP_MS = 1800;

function useRotatingQuestions() {
  const [idx, setIdx] = useState<number[]>(() => FLOATING.map(() => 0));
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let turn = 0;
    const id = window.setInterval(() => {
      const card = turn % FLOATING.length;
      setIdx((cur) => cur.map((n, i) => (i === card ? (n + 1) % FLOATING[i].qs.length : n)));
      turn++;
    }, SWAP_MS);
    return () => window.clearInterval(id);
  }, []);
  return idx;
}

/* تأخير ظهور العناصر عند فتح الصفحة */
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const qIdx = useRotatingQuestions();
  const input = useRef<HTMLInputElement>(null);
  /* سؤال البطاقة التي يمرّ عليها المؤشّر يظهر في الحقل معاينةً */
  const [preview, setPreview] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const placeholder = preview ?? "اكتب سؤالك هنا…";

  /* نقرة بطاقة: يُكتب سؤالها في الحقل سريعاً، ثمّ تُفتح المحادثة به */
  function typeThenGo(q: string) {
    if (typing) return;
    /* الحقل مخفيٌّ على الجوّال، فتنتقل البطاقة إلى المحادثة مباشرةً */
    if (!input.current?.offsetParent) return go(q);
    setTyping(true);
    setPreview(null);
    input.current?.focus();
    let n = 0;
    const tick = () => {
      n++;
      setQuestion(q.slice(0, n));
      if (n < q.length) window.setTimeout(tick, 22);
      else window.setTimeout(() => go(q), 380);
    };
    tick();
  }

  /* السؤال يُحفظ ثمّ يُنقل الزائر إلى المحادثة، فتُرسله هي فور فتحها */
  function go(text: string) {
    const q = text.trim();
    if (q) setPendingQuestion(q);
    navigate("/chat");
  }

  return (
    <section id="hero" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-paper">
      {/* أضواءٌ خفيفة على خلفيّةٍ بيضاء مطفيّة محايدة (بلا بيج): لمسةٌ برتقاليّة باهتة خلف الصورة، وبنفسجيّة قرب النصّ، ونقاطٌ دقيقة */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-16 size-[30rem] rounded-full bg-gold-600/[0.07] blur-[120px] dark:bg-gold-600/[0.12]" />
        <div className="absolute -right-32 -top-24 size-[34rem] rounded-full bg-plum-500/[0.10] blur-[120px] dark:bg-plum-500/[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(74,56,86,0.10)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_70%)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto my-auto grid w-full max-w-6xl items-center gap-9 px-5 pb-[5.5rem] pt-[7.875rem] sm:gap-12 sm:pb-28 sm:pt-[6.375rem] lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* النصّ والحقل: العنوان وحده يحدّد عرض الكتلة (w-fit)، وكلّ ما سواه w-0 min-w-full فيأخذ عرضه بالضبط دون أن يوسّعه،
            فتتحاذى الأطراف من الجهتين */}
        <div className="min-w-0 lg:col-span-6">
          <div className="grid w-full justify-items-center text-center sm:justify-items-start sm:text-start lg:w-fit lg:max-w-full">
          <h1 style={rise(0)} className="rise text-balance text-[calc((100vw-2.5rem)*0.1085)] font-bold leading-[1.2] max-sm:whitespace-nowrap text-ink-800 sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem]">
            السيرةُ النبويّةُ بين يديك
            <span className="mt-1 block text-gold-700">بإسنادٍ وعزوٍ إلى المصدر</span>
          </h1>

          <p style={rise(90)} className="rise mt-6 w-0 min-w-full text-pretty text-[15px] leading-8 text-ink-600 sm:text-[16px]">
            اسأل بلغتك عن أيّ مسألةٍ في السيرة، وتصلك الإجابة من أمّهات كتب السيرة والحديث، معزوّةً إلى كتابها وصفحتها.
          </p>

          {/* فاصلٌ شعريّ يتلاشى نحو الطرف، يُفسح بين الوصف والحقل */}
          <span aria-hidden style={rise(140)} className="rise mt-9 hidden h-px w-0 min-w-full sm:block bg-gradient-to-l from-transparent via-ink/15 to-transparent sm:from-ink/15 sm:via-ink/[0.08] sm:to-transparent dark:via-white/20 sm:dark:from-white/20 sm:dark:via-white/10" />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(question);
            }}
            style={rise(180)}
            className="rise relative mt-9 hidden w-0 min-w-full sm:block"
          >
            <label htmlFor="hero-question" className="sr-only">
              اسأل عن السيرة النبويّة
            </label>
            <input
              id="hero-question"
              ref={input}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  go(question);
                }
              }}
              placeholder={placeholder}
              autoComplete="off"
              className="neu-inset h-14 w-full min-w-0 rounded-full pe-16 ps-6 text-[15px] text-ink outline-none transition-shadow placeholder:text-ink-muted focus:ring-2 focus:ring-gold/35"
            />
            {/* زرّ الإرسال: دائرةٌ بسهمٍ باتّجاه القراءة، كسهم الإرسال في المحادثة */}
            <button
              type="submit"
              aria-label="ابدأ المحادثة"
              className="neu-raised-sm neu-press group absolute inset-y-2 end-2 grid aspect-square place-items-center rounded-full text-plum-800 dark:text-white"
            >
              <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2} aria-hidden />
            </button>
          </form>

          {/* أزرار الدعوة: رئيسيٌّ برتقاليّ مصقول بلمعةٍ علويّة خفيفة، وثانويٌّ نصّيّ هادئ بسهمٍ نازل إلى المزايا */}
          <div style={rise(210)} className="rise mt-7 flex w-0 min-w-full flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-4 sm:justify-start">
            <Link
              to="/chat"
              className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-gold-500 to-gold-600 px-5 text-[14px] sm:px-6 sm:text-[14.5px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_6px_16px_-8px_rgba(219,110,68,0.7)] ring-1 ring-gold-700/30 transition-[filter,transform] duration-300 hover:brightness-105 active:scale-[0.98]"
            >
              ابدأ المحادثة مجّاناً
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2} aria-hidden />
            </Link>
            <a
              href="#features"
              className="neu-raised-sm neu-press group hidden h-11 items-center gap-1.5 rounded-full px-4 sm:inline-flex text-[14px] sm:px-5 sm:text-[14.5px] font-medium text-ink-700 hover:text-ink-800 dark:text-white/75 dark:hover:text-white"
            >
              اكتشف المزايا
              <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.75} aria-hidden />
            </a>
          </div>

          {/* سطرٌ هادئ تحت الأزرار: ثلاث ميزاتٍ موجزة، لكلٍّ علامةٌ صغيرة، على سطرٍ واحد */}
          <ul style={rise(240)} className="rise mt-7 hidden w-0 min-w-full flex-wrap items-center gap-x-3.5 gap-y-2 pt-1 text-[12.5px] text-ink-500 sm:flex dark:border-white/10">
            {TRUST.map((x) => (
              <li key={x} className="flex items-center gap-1.5 whitespace-nowrap">
                <Check className="size-3.5 shrink-0 text-gold-600" strokeWidth={2.25} aria-hidden />
                {x}
              </li>
            ))}
          </ul>
          </div>
        </div>

        {/* التركيب البصريّ: رجلٌ يسأل من هاتفه وحوله أسئلةٌ عائمة؛ على الجوّال صورةٌ صغيرة فوق النصّ وبطاقاتٌ أصغر */}
        <div style={rise(200)} className="rise relative lg:col-span-6">
          <div className="relative mx-auto aspect-[1300/1161] w-full max-w-[16rem] sm:max-w-[27rem]">
            {/* هالةٌ دافئة خلف الصورة */}
            <div aria-hidden className="absolute inset-[12%] -z-10 rounded-full bg-gradient-to-b from-plum-500/[0.08] via-white/70 to-transparent blur-3xl dark:via-plum-500/10" />
            <img
              src={`${import.meta.env.BASE_URL}hero-man.webp`}
              alt=""
              aria-hidden
              width={1300}
              height={1161}
              style={{ maskImage: HERO_MASK, WebkitMaskImage: HERO_MASK }}
              className="size-full object-contain mix-blend-multiply dark:mix-blend-normal dark:opacity-30 dark:brightness-90"
            />

            {FLOATING.map((f, i) => {
              const q = f.qs[qIdx[i]];
              return (
              <div
                key={f.pos}
                className={`float-y absolute ${f.pos}`}
                style={{ "--float-dur": f.dur, "--float-delay": f.delay } as CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => typeThenGo(q)}
                  onMouseEnter={() => !typing && setPreview(q)}
                  onMouseLeave={() => setPreview(null)}
                  onFocus={() => !typing && setPreview(q)}
                  onBlur={() => setPreview(null)}
                  className="neu-raised neu-press flex items-center gap-2 whitespace-nowrap rounded-[0.85rem] py-1.5 pe-3 ps-1.5 text-[11.5px] font-medium text-ink sm:gap-3 sm:rounded-[1.1rem] sm:py-2 sm:pe-4 sm:ps-2 sm:text-[13.5px] lg:pe-5 lg:text-[14px] dark:text-white"
                >
                  <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-lg sm:size-8 sm:rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 text-white shadow-[0_4px_12px_-2px_rgba(219,110,68,0.5)]">
                    <MessageCircleQuestion className="size-3.5 sm:size-4" strokeWidth={2} />
                  </span>
                  {/* المفتاح يتغيّر مع السؤال فيُعاد تشغيل حركة الظهور */}
                  <span key={q} className="swap-in">{q}</span>
                </button>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* دعوةٌ إلى النزول: فأرةٌ تتحرّك عجلتها، وتنقل إلى قسم المزايا */}
      <a
        href="#features"
        className="group absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-2 text-[12px] text-ink-muted transition-colors hover:text-ink"
      >
        <span className="relative flex h-9 w-6 justify-center rounded-full border-[1.5px] border-current">
          <span className="scroll-wheel mt-1.5 h-2 w-[3px] rounded-full bg-gold-600" />
        </span>
        اكتشف المزيد
      </a>
    </section>
  );
}
