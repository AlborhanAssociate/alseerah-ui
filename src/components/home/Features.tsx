import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * قسم المميّزات — شبكة بينتو بخلفيّات فوتوغرافيّة في صفَّين: بطاقة الإسناد عموديّة، وأربع بطاقات حولها.
 * كلّ صورة تحت طبقةٍ كحليّةٍ واحدة كي تبقى الشبكة بلون الهويّة لا بألوان الصور،
 * والنصّ في أسفل البطاقة حيث الطبقة أكثف. الصور مؤقّتة (public/tmp/CREDITS.md).
 */

type Feature = {
  title: string;
  body: string;
  img: string;
  /** موضع بؤرة الصورة */
  focus?: string;
  span?: string;
  scene?: "isnad" | "timeline";
};

const FEATURES: Feature[] = [
  {
    title: "إسنادٌ لكلّ إجابة",
    body: "كلّ معلومةٍ مرتبطةٌ بمصدرها: الكتاب والجزء والصفحة، مع تمييز الصحيح من الضعيف وفق أحكام المحدّثين.",
    img: `${import.meta.env.BASE_URL}tmp/f-isnad.jpg`,
    focus: "object-[50%_40%]",
    span: "sm:row-span-2 lg:col-span-2 lg:row-span-2 sm:min-h-[26rem] lg:min-h-0",
    scene: "isnad",
  },
  {
    title: "حوارٌ عربيٌّ فصيح",
    body: "فهمٌ عميقٌ للفصحى ولغة أهل العلم، ومعالجةٌ دقيقةٌ للمصطلحات الشرعيّة والتاريخيّة.",
    img: `${import.meta.env.BASE_URL}tmp/f-arabic.jpg`,
    span: "lg:col-span-2",
  },
  {
    title: "خطٌّ زمنيٌّ تفاعليّ",
    body: "تصفَّح السيرة مرحلةً مرحلة، من المولد الشريف إلى الوفاة، بتسلسلٍ دقيقٍ للأحداث.",
    img: `${import.meta.env.BASE_URL}tmp/f-timeline.jpg`,
    focus: "object-[50%_70%]",
    span: "lg:col-span-2",
    scene: "timeline",
  },
  {
    title: "استنباط الدروس والعِبَر",
    body: "فوائد تربويّةٌ ودعويّةٌ من مواقف السيرة، موصولةٌ بالواقع بأسلوبٍ منضبط.",
    img: `${import.meta.env.BASE_URL}tmp/f-lessons.jpg`,
    span: "lg:col-span-2",
  },
  {
    title: "بناء المناهج التعليميّة",
    body: "أدواتٌ للمعلّمين والدعاة: توليد الأسئلة، وإعداد الخطط الدرسيّة، وصياغة الخطب.",
    img: `${import.meta.env.BASE_URL}tmp/f-curricula.jpg`,
    span: "lg:col-span-2",
  },
];

const STAGES = ["المولد", "البعثة", "الهجرة", "الفتح", "الوداع"];

/** مشهد الإسناد: بطاقة عزوٍ زجاجيّة فوق الصورة */
function IsnadScene() {
  return (
    <div aria-hidden className="pointer-events-none mb-auto select-none">
      <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
        <p className="text-[15px] font-medium leading-8 text-white">
          «إنّما الأعمالُ بالنّيّات، وإنّما لكلِّ امرئٍ ما نوى…»
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-cream px-3 py-1 font-medium text-plum-900">صحيح البخاري</span>
          <span className="rounded-full px-3 py-1 text-cream/85 ring-1 ring-inset ring-white/25">كتاب بدء الوحي · ح ١</span>
          <span className="rounded-full bg-gold-light/25 px-3 py-1 font-medium text-gold-light">متّفقٌ عليه</span>
        </div>
      </div>
    </div>
  );
}

/** مشهد الخطّ الزمنيّ: محطّات فاتحة على الصورة */
function TimelineScene() {
  return (
    <div aria-hidden className="pointer-events-none relative mt-6 select-none">
      <span className="absolute inset-x-1 top-[5px] h-px bg-gradient-to-l from-white/10 via-gold-light/80 to-white/10" />
      <ol className="relative flex justify-between">
        {STAGES.map((stage, i) => (
          <li key={stage} className="flex flex-col items-center gap-2">
            <span className={cn("size-[11px] rounded-full ring-[3px] ring-plum-950/60", i === 2 ? "bg-gold-light" : "bg-white/45")} />
            <span className={cn("text-[11.5px]", i === 2 ? "font-semibold text-gold-light" : "text-cream/75")}>{stage}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FeatureCard({ f }: { f: Feature }) {
  return (
    <article
      className={cn(
        /* على الجوّال: بطاقةٌ بعرض ٨٥٪ في شريطٍ أفقيّ يُسحب، فتطلّ التالية من الحافّة */
        "group relative isolate flex h-[22rem] w-[85%] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-2xl p-5 text-cream ring-1 ring-ink/10 transition-shadow duration-500 hover:shadow-lg sm:h-auto sm:min-h-[13rem] sm:w-auto lg:p-6",
        f.span,
      )}
    >
      {/* الصورة والطبقة الموحِّدة */}
      <img
        src={f.img}
        alt=""
        aria-hidden
        loading="lazy"
        className={cn(
          "absolute inset-0 -z-20 size-full object-cover saturate-[0.65] transition-transform duration-700 ease-out group-hover:scale-[1.05]",
          f.focus,
        )}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-plum-950/35" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-plum-950 via-plum-950/70 to-plum-950/10" />

      {f.scene === "isnad" && <IsnadScene />}

      <div className={cn(f.scene === "isnad" && "mt-8")}>
        <h3 className="text-[17px] font-semibold leading-snug text-white lg:text-lg">{f.title}</h3>
        <p className="mt-1.5 text-[13.5px] leading-6 text-cream/80">{f.body}</p>
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
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-medium text-gold-700">المميّزات</p>
          <h2 className="mt-4 text-balance text-[1.5rem] font-bold leading-[1.35] text-ink-800 lg:text-[1.75rem]">
            رفيقٌ علميٌّ بين يديك
          </h2>
          <p className="mt-3 text-pretty text-[14.5px] leading-7 text-ink-500">كلّ ميزةٍ بُنيت باستشارة أهل الاختصاص</p>
        </div>

        <div
          ref={rail}
          onScroll={onScroll}
          className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-6 lg:grid-rows-2 lg:auto-rows-[minmax(11.5rem,auto)] lg:gap-5"
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
