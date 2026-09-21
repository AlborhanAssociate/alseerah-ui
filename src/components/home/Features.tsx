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
    span: "sm:row-span-2 lg:col-span-2 lg:row-span-2 min-h-[26rem] lg:min-h-0",
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
          <span className="rounded-full bg-sand px-3 py-1 font-medium text-ink">صحيح البخاري</span>
          <span className="rounded-full px-3 py-1 text-sand/85 ring-1 ring-inset ring-white/25">كتاب بدء الوحي · ح ١</span>
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
            <span className={cn("size-[11px] rounded-full ring-[3px] ring-ink/60", i === 2 ? "bg-gold-light" : "bg-white/45")} />
            <span className={cn("text-[11.5px]", i === 2 ? "font-semibold text-gold-light" : "text-sand/75")}>{stage}</span>
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
        "group relative isolate flex min-h-[13rem] flex-col justify-end overflow-hidden rounded-2xl p-5 text-sand ring-1 ring-ink/10 transition-shadow duration-500 hover:shadow-lg lg:p-6",
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
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/35" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />

      {f.scene === "isnad" && <IsnadScene />}

      <div className={cn(f.scene === "isnad" && "mt-8")}>
        <h3 className="text-[17px] font-semibold leading-snug text-white lg:text-lg">{f.title}</h3>
        <p className="mt-1.5 text-[13.5px] leading-6 text-sand/80">{f.body}</p>
      </div>

      {f.scene === "timeline" && <TimelineScene />}
    </article>
  );
}

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-medium text-gold-700">المميّزات</p>
          <h2 className="mt-4 text-balance text-[1.5rem] font-bold leading-[1.35] text-ink-800 lg:text-[1.75rem]">
            رفيقٌ علميٌّ بين يديك
          </h2>
          <p className="mt-3 text-pretty text-[14.5px] leading-7 text-ink-500">كلّ ميزةٍ بُنيت باستشارة أهل الاختصاص</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 lg:auto-rows-[minmax(11.5rem,auto)] lg:gap-5">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
