import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Doodle } from "@/components/one/Doodles";

/**
 * قسم المميّزات — شبكة بينتو على نسق الصفحة الرئيسيّة: بطاقةٌ مصوّرة طويلة للإسناد، وحولها بطاقتان مصوّرتان عريضتان
 * وبطاقتان نصّيّتان زجاجيّتان بنقشٍ كنتوريّ خفيف. على ١٢ عموداً وصفَّين:
 *   الصفّ الأوّل: الإسناد (٤، صفّان) · الحوار (٥، صورة) · الخطّ الزمنيّ (٣، نصّ)
 *   الصفّ الثاني: الدروس (٣، نصّ) · المناهج (٥، صورة)
 * الزوايا ١٠ بكسل كبطاقات الرئيسيّة، وما بداخلها ٦ بكسل. الصور من Unsplash وPexels (المصادر في public/features/CREDITS.md).
 */

type Feature = {
  title: string;
  body: string;
  variant: "photo" | "text";
  img?: string;
  /** موضع بؤرة الصورة */
  focus?: string;
  span: string;
  scene?: "isnad" | "timeline";
  /** نقش البطاقة النصّيّة، من نقوش الصفحة الرئيسيّة */
  doodle?: "timeline" | "notdo";
};

const FEATURES: Feature[] = [
  {
    title: "إسنادٌ لكلّ إجابة",
    body: "كلّ معلومةٍ مرتبطةٌ بمصدرها: الكتاب والجزء والصفحة، مع تمييز الصحيح من الضعيف وفق أحكام المحدّثين.",
    variant: "photo",
    img: `${import.meta.env.BASE_URL}features/isnad.webp`,
    focus: "object-[55%_62%]",
    span: "sm:row-span-2 lg:col-span-4 lg:row-span-2",
    scene: "isnad",
  },
  {
    title: "حوارٌ عربيٌّ فصيح",
    body: "فهمٌ عميقٌ للفصحى ولغة أهل العلم، ومعالجةٌ دقيقةٌ للمصطلحات الشرعيّة والتاريخيّة.",
    variant: "photo",
    img: `${import.meta.env.BASE_URL}features/arabic.webp`,
    focus: "object-[50%_42%]",
    span: "lg:col-span-5",
  },
  {
    title: "خطٌّ زمنيٌّ تفاعليّ",
    body: "تصفَّح السيرة مرحلةً مرحلة، من المولد الشريف إلى الوفاة.",
    variant: "text",
    img: `${import.meta.env.BASE_URL}features/timeline.webp`,
    span: "lg:col-span-3",
    scene: "timeline",
  },
  {
    title: "استنباط الدروس والعِبَر",
    body: "فوائد تربويّةٌ ودعويّةٌ من مواقف السيرة، موصولةٌ بالواقع بأسلوبٍ منضبط.",
    variant: "text",
    img: `${import.meta.env.BASE_URL}features/lessons.webp`,
    focus: "object-[50%_40%]",
    span: "lg:col-span-3",
  },
  {
    title: "بناء المناهج التعليميّة",
    body: "أدواتٌ للمعلّمين والدعاة: توليد الأسئلة، وإعداد الخطط الدرسيّة، وصياغة الخطب.",
    variant: "photo",
    img: `${import.meta.env.BASE_URL}features/curricula.webp`,
    focus: "object-[62%_40%]",
    span: "lg:col-span-5",
  },
];

const STAGES = ["المولد", "البعثة", "الهجرة", "الفتح", "الوداع"];

/** مشهد الإسناد: بطاقة عزوٍ زجاجيّة فوق الصورة */
function IsnadScene() {
  return (
    <div aria-hidden className="pointer-events-none mb-auto select-none">
      <div className="rounded-[6px] border border-white/15 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 lg:p-5">
        <p className="text-[14px] font-medium leading-7 text-white sm:text-[15px] sm:leading-8">
          «إنّما الأعمالُ بالنّيّات، وإنّما لكلِّ امرئٍ ما نوى…»
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11.5px] sm:mt-4 sm:gap-2 sm:text-xs">
          <span className="rounded-full bg-cream px-3 py-1 font-medium text-plum-900">صحيح البخاري</span>
          <span className="rounded-full px-3 py-1 text-cream/85 ring-1 ring-inset ring-white/25">كتاب بدء الوحي · ح ١</span>
          <span className="rounded-full bg-gold-light/25 px-3 py-1 font-medium text-gold-light">متّفقٌ عليه</span>
        </div>
      </div>
    </div>
  );
}

/** مشهد الخطّ الزمنيّ: محطّاتٌ على خطٍّ رفيع داخل البطاقة النصّيّة */
function TimelineScene() {
  return (
    <div aria-hidden className="pointer-events-none relative mt-5 select-none">
      <span className="absolute inset-x-1 top-[5px] h-px bg-gradient-to-l from-ink/10 via-gold-600/60 to-ink/10 dark:from-white/10 dark:to-white/10" />
      <ol className="relative flex justify-between">
        {STAGES.map((stage, i) => (
          <li key={stage} className="flex flex-col items-center gap-2">
            <span className={cn("size-[11px] rounded-full ring-[3px] ring-white/80 dark:ring-paper", i === 2 ? "bg-gold-600" : "bg-ink/25 dark:bg-white/35")} />
            <span className={cn("text-[11px]", i === 2 ? "font-semibold text-gold-700" : "text-ink-500")}>{stage}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FeatureCard({ f }: { f: Feature }) {
  const photo = f.variant === "photo";
  return (
    <article
      className={cn(
        /* على الجوّال: بطاقةٌ بعرض ٨٥٪ في شريطٍ أفقيّ يُسحب، فتطلّ التالية من الحافّة. ارتفاعها بقدر محتواها (٢٠rem على الأقلّ)،
           والشريط يمدّ البطاقات كلّها إلى ارتفاع أطولها فتتساوى دون قصّ */
        "neu-press group relative isolate flex min-h-[20rem] w-[85%] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[20px] p-5 sm:h-auto sm:min-h-[14rem] sm:w-auto lg:p-6",
        photo ? "neu-shadow bg-plum-950 text-cream" : "neu-raised text-ink",
        f.span,
      )}
    >
      {photo && f.img ? (
        <>
          <img
            src={f.img}
            alt=""
            aria-hidden
            loading="lazy"
            className={cn("drift absolute inset-0 -z-20 size-full object-cover brightness-[0.8] saturate-[0.75]", f.focus)}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-plum-950/95 via-plum-950/45 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
        </>
      ) : (
        <>
          {/* أضواءٌ ناعمة خلف الزجاج ونقشٌ كنتوريّ، كبطاقات الرئيسيّة النصّيّة */}
          <span aria-hidden className="pointer-events-none absolute -end-10 -top-12 -z-20 size-44 rounded-full bg-gold-600/20 blur-3xl" />
          <span aria-hidden className="pointer-events-none absolute -bottom-14 -start-10 -z-20 size-48 rounded-full bg-[#eba584]/25 blur-3xl dark:bg-plum-500/25" />
          {/* صورةٌ هادئة (ورق، ظلال) تحت غشاءٍ فاتح يُبقي النصّ الداكن مقروءاً؛ وإن لم تكن فالنقش الكنتوريّ */}
          {f.img ? (
            <>
              <img src={f.img} alt="" aria-hidden loading="lazy" className={cn("absolute inset-0 -z-30 size-full object-cover", f.focus)} />
              <span aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-t from-white/90 via-white/75 to-white/55 dark:from-plum-950/90 dark:via-plum-950/80 dark:to-plum-950/65" />
            </>
          ) : f.doodle ? (
            <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 text-ink/[0.08] dark:text-white/[0.08]">
              <Doodle id={f.doodle} />
            </span>
          ) : null}
        </>
      )}

      {f.scene === "isnad" && <IsnadScene />}

      <div className={cn(f.scene === "isnad" && "mt-8")}>
        <h3 className={cn("text-[1.15rem] leading-[1.35] lg:text-[1.3rem]", photo ? "text-white" : "text-ink")}>{f.title}</h3>
        <p className={cn("mt-2 max-w-[36ch] text-pretty text-[13.5px] leading-[1.75]", photo ? "text-cream/75" : "text-ink-600")}>{f.body}</p>
      </div>

      {f.scene === "timeline" && <TimelineScene />}
    </article>
  );
}

export function Features() {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* البطاقة الأقرب إلى منتصف الشريط هي النشطة */
  function onScroll() {
    const el = rail.current;
    if (!el) return;
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0, dist = Infinity;
    [...el.children].forEach((c, n) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < dist) { dist = d; best = n; }
    });
    setActive(best);
  }

  function goTo(n: number) {
    (rail.current?.children[n] as HTMLElement | undefined)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <section id="features" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[1.6rem] font-bold leading-[1.35] text-ink-800 lg:text-[2rem]">
            رفيقٌ علميٌّ بين يديك
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-7 text-ink-500">كلّ ميزةٍ بُنيت باستشارة أهل الاختصاص</p>
        </div>

        <div
          ref={rail}
          onScroll={onScroll}
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="reveal -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-10 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:py-0 lg:grid-cols-12 lg:grid-rows-[15rem_15rem]"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </div>

        {/* مؤشّر الشريط على الجوّال */}
        <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
          {FEATURES.map((f, n) => (
            <button
              key={f.title}
              type="button"
              aria-label={`عرض: ${f.title}`}
              aria-current={n === active}
              onClick={() => goTo(n)}
              className={cn("h-1.5 rounded-full transition-all duration-300", n === active ? "w-5 bg-gold-600" : "w-1.5 bg-line-strong")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
