import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { trackSpotlight } from "@/lib/spotlight";

/**
 * قسم النطاق — شعار السيرة ai في الوسط، والمصادر الستّة حوله بطاقاتٌ تخرج منها صور مجلّداتها.
 * تصل كلَّ مصدرٍ بالشعار شعرةٌ ثابتة، تجري عليها إشاراتٌ متوهّجة كالسيالات العصبيّة: تنطلق عشوائيّاً
 * ومتوازية، ذاهبةً إلى الشعار وآتيةً منه. المرور على كتابٍ يُبرز مساره.
 * الخطوط تُحسب من مواضع العناصر الفعليّة عند كلّ تغيير. على الجوّال: الشعار ثمّ المصادر شبكةً، تنزل إليها الخطوط من الشعار.
 * (نموذج الرفّ الزجاجيّ محفوظ في SourcesShelf.tsx)
 */

const BASE = import.meta.env.BASE_URL;

const SOURCES = [
  { key: "ibn-hisham", title: "سيرة ابن هشام", by: "عبد الملك بن هشام" },
  { key: "tabaqat", title: "الطبقات الكبرى", by: "محمد بن سعد" },
  { key: "kutub-sitta", title: "الكتب الستّة", by: "الصحيحان والسنن الأربع" },
  { key: "bidaya", title: "البداية والنهاية", by: "ابن كثير" },
  { key: "zad-almaad", title: "زاد المعاد", by: "ابن قيّم الجوزيّة" },
  { key: "raheeq", title: "الرحيق المختوم", by: "صفيّ الرحمن المباركفوري" },
] as const;

const MAX_PULSES = 9;

type Pulse = { id: number; i: number; toCore: boolean; dur: number };

/* بطاقة الكتاب: صورة المجلّدات أطول من البطاقة فتخرج من حافّتها العليا، والاسم بجانبها (وتحتها على الجوّال).
   outer: جهة الصورة، الحافّة البعيدة عن الشعار، فتبقى الحافّة القريبة خالصةً لخطّ الصلة */
function BookNote({ i, active, onEnter, onLeave, nodeRef, outer = "start" }: {
  i: number;
  outer?: "start" | "end";
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  nodeRef?: (el: HTMLLIElement | null) => void;
}) {
  const s = SOURCES[i];
  return (
    <li
      ref={nodeRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        /* بروزٌ ناعم بلون الشريط نفسه؛ يتّقد حدُّها البرتقاليّ حين تُختار */
        "neu-raised group relative flex items-center rounded-[16px] border transition-[border-color,box-shadow] duration-300",
        "h-[4.5rem] max-md:h-auto max-md:flex-col max-md:justify-end max-md:px-2 max-md:pb-3 max-md:pt-[4.25rem] max-md:text-center",
        outer === "start" ? "pe-4 ps-[6.75rem]" : "pe-[6.75rem] ps-4 md:justify-end",
        active ? "border-gold-600/60" : "border-transparent",
      )}
    >
      {/* المجلّدات: قاعدتها داخل البطاقة ورأسها خارج حافّتها */}
      <span className={cn("absolute bottom-2.5 flex h-[5.5rem] w-[4.5rem] items-end justify-center max-md:inset-x-0 max-md:bottom-auto max-md:-top-7 max-md:mx-auto max-md:h-[4.75rem] max-md:w-[5.5rem]", outer === "start" ? "start-3" : "end-3")}>
        <img
          src={`${BASE}books/${s.key}.webp`}
          alt=""
          aria-hidden
          loading="lazy"
          className={cn(
            "relative h-full w-auto max-w-full object-contain object-bottom transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            active ? "-translate-y-1.5 scale-[1.04]" : "group-hover:-translate-y-1",
          )}
        />
      </span>
      {/* الاسم ومؤلّفه */}
      <span className="flex min-w-0 flex-col">
        <span className={cn("text-[14.5px] font-semibold leading-6 transition-colors duration-300 max-md:text-[12.5px] max-md:leading-5", active ? "text-white" : "text-white/90")}>{s.title}</span>
        <span className="truncate text-[12px] leading-5 text-white/50 max-md:hidden">{s.by}</span>
      </span>
    </li>
  );
}

/* مسارٌ متعامد من نقاطٍ متتالية بزوايا مستديرة (نصف قطرها r أو أقلّ إن ضاق المقطع) */
function elbow(pts: [number, number][], r = 10) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let k = 1; k < pts.length - 1; k++) {
    const [px, py] = pts[k - 1], [x, y] = pts[k], [nx, ny] = pts[k + 1];
    const a = Math.min(r, Math.hypot(x - px, y - py) / 2, Math.hypot(nx - x, ny - y) / 2);
    const ux = Math.sign(x - px), uy = Math.sign(y - py), vx = Math.sign(nx - x), vy = Math.sign(ny - y);
    d += ` L ${x - ux * a} ${y - uy * a} Q ${x} ${y} ${x + vx * a} ${y + vy * a}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return `${d} L ${lx} ${ly}`;
}

export function Sources() {
  const [hover, setHover] = useState<number | null>(null);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const notes = useRef<(HTMLLIElement | null)[]>([]);
  /* بطاقات الجوّال (شبكة ٣×٢ تحت الشعار) */
  const mnotes = useRef<(HTMLLIElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  /* نقاط التقاء الخطوط برؤوس الكتب على الجوّال */
  const [ends, setEnds] = useState<[number, number][]>([]);

  /* إشاراتٌ عصبيّة: تنطلق في لحظاتٍ عشوائيّة على مساراتٍ عشوائيّة، بعضها إلى الشعار وبعضها منه،
     فتجري معاً متوازيةً لا بالدور. لكلّ إشارةٍ مدّةٌ مختلفة، وتُحذف حين تبلغ طرفها. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seq = 0;
    let t: number;
    const fire = () => {
      setPulses((cur) =>
        cur.length >= MAX_PULSES
          ? cur
          : [...cur, { id: seq++, i: Math.floor(Math.random() * SOURCES.length), toCore: Math.random() < 0.6, dur: 1.1 + Math.random() * 1.6 }],
      );
      t = window.setTimeout(fire, 140 + Math.random() * 520);
    };
    t = window.setTimeout(fire, 400);
    return () => window.clearTimeout(t);
  }, []);
  const done = (p: Pulse) => setPulses((cur) => cur.filter((x) => x.id !== p.id));

  /* المسارات: على سطح المكتب منحنى من حافّة كلّ كتابٍ القريبة إلى حافّة الشعار؛
     وعلى الجوّال من أسفل الشعار إلى رأس صورة كلّ كتاب، ويمرّ مسار الصفّ الثاني في الفجوة بين الأعمدة كي لا يقطع بطاقات الصفّ الأوّل */
  const measure = useCallback(() => {
    const b = box.current?.getBoundingClientRect();
    const c = core.current?.getBoundingClientRect();
    if (!b || !c || c.width === 0) { setPaths([]); return; }
    const desktop = (notes.current[0]?.getBoundingClientRect().width ?? 0) > 0;
    if (!desktop) {
      const cards = mnotes.current.map((el) => el?.getBoundingClientRect());
      if (cards.some((x) => !x)) { setPaths([]); return; }
      const R = cards as DOMRect[];
      const tops = mnotes.current.map((el) => (el!.querySelector("img")?.getBoundingClientRect().top ?? 0) - b.top);
      const sx = c.left + c.width / 2 - b.left;
      const sy = c.bottom - b.top + 4;
      /* خطّ التوزيع الأوّل في منتصف المسافة بين الشعار ورؤوس الصفّ الأوّل، والثاني بين الصفّين */
      const bus1 = (sy + Math.min(tops[0], tops[1], tops[2])) / 2;
      const bus2 = (R[0].bottom - b.top + Math.min(tops[3], tops[4], tops[5])) / 2;
      /* فجوتا الأعمدة (الترتيب من اليمين: ٠ ثمّ ١ ثمّ ٢)؛ ينزل فيهما مسار الصفّ الثاني */
      const gapR = (R[0].left + R[1].right) / 2 - b.left;
      const gapL = (R[1].left + R[2].right) / 2 - b.left;
      const cx = (i: number) => R[i].left + R[i].width / 2 - b.left;
      setPaths(
        R.map((_, i) => {
          if (i < 3) return elbow([[sx, sy], [sx, bus1], [cx(i), bus1], [cx(i), tops[i]]]);
          const gx = i === 3 ? gapR + 2 : i === 4 ? gapR - 2 : gapL;
          return elbow([[sx, sy], [sx, bus1], [gx, bus1], [gx, bus2], [cx(i), bus2], [cx(i), tops[i]]]);
        }),
      );
      setEnds(R.map((_, i) => [cx(i), tops[i]]));
      return;
    }
    setEnds([]);
    const cy = c.top + c.height / 2 - b.top;
    setPaths(
      notes.current.map((el) => {
        const n = el?.getBoundingClientRect();
        if (!n) return "";
        const fromRight = n.left > c.left;
        const sx = (fromRight ? n.left : n.right) - b.left;
        const sy = n.top + n.height / 2 - b.top;
        const ex = (fromRight ? c.right + 10 : c.left - 10) - b.left;
        const k = (ex - sx) * 0.55;
        return `M ${sx} ${sy} C ${sx + k} ${sy}, ${ex - k} ${cy}, ${ex} ${cy}`;
      }),
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, [measure]);

  const hoverOn = (i: number) => () => setHover(i);
  const hoverOff = () => setHover(null);

  const note = (i: number) => (
    <BookNote key={SOURCES[i].key} i={i} active={hover === i} onEnter={hoverOn(i)} onLeave={hoverOff} outer={i < 3 ? "start" : "end"} nodeRef={(el) => { notes.current[i] = el; }} />
  );

  return (
    /* شريطٌ داكن ثابت اللون في النمطين يكسر بياض الصفحة؛ وخلف الشبكة أضواءٌ ناعمة تُظهر زجاج البطاقات */
    <section id="sources" onMouseMove={trackSpotlight} className="neu-band group/spot relative isolate scroll-mt-24 overflow-hidden bg-plum-950 py-16 text-white sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute left-1/2 top-[58%] size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-600/25 blur-[110px]" />
        <span className="absolute left-[8%] top-[30%] size-80 rounded-full bg-plum-500/45 blur-[100px]" />
        <span className="absolute right-[6%] top-[55%] size-80 rounded-full bg-[#eba584]/20 blur-[100px]" />
        <span className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
        {/* حافّتان رفيعتان من الضوء في أعلى الشريط وأسفله */}
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
      </div>
      {/* ضوءٌ ناعم يتبع المؤشّر فوق الشريط الداكن */}
      <span aria-hidden className="spotlight pointer-events-none absolute inset-0 -z-[5] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100" />
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[1.6rem] font-bold leading-[1.35] text-white lg:text-[2rem]">
            بنيةٌ معرفيّةٌ مبنيّةٌ على أمّات الكتب
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-7 text-white/60">
            كلّ جوابٍ يُستمدّ من هذه المصادر وحدها، ويعود إليها بالعزو.
          </p>
        </div>

        <div ref={box} className="relative mx-auto mt-10 grid max-w-5xl items-center gap-6 md:grid-cols-[minmax(0,17rem)_auto_minmax(0,17rem)] md:justify-center md:gap-16 lg:mt-14 lg:gap-24">
          {/* الصلات: مساراتٌ رفيعة ثابتة، تجري عليها إشاراتٌ متوهّجة ذهاباً وإياباً؛ ومسار الكتاب الذي تحت المؤشّر يبرز */}
          <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
            {paths.map((d, i) => d && (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                className={cn("transition-[color] duration-300", hover === i ? "text-gold-600/70" : "text-white/[0.14]")}
              />
            ))}
            {ends.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={2.5} className={cn("transition-[fill] duration-300", hover === i ? "fill-gold-600" : "fill-white/40")} />
            ))}
            <g>
              {pulses.map((p) => paths[p.i] && (
                <path
                  key={p.id}
                  d={paths[p.i]}
                  pathLength={1}
                  fill="none"
                  stroke="rgb(219 110 68)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className={cn("neural-pulse", !p.toCore && "is-in")}
                  style={{ animationDuration: `${p.dur}s` }}
                  onAnimationEnd={() => done(p)}
                />
              ))}
            </g>
          </svg>

          {/* المصادر: يمين الشعار */}
          <ol className="hidden flex-col gap-12 pt-6 md:flex">{[0, 1, 2].map(note)}</ol>

          {/* الشعار وحده في الوسط */}
          <div ref={core} className="relative mx-auto grid place-items-center">
            <Logo variant="mark" className="h-24 w-auto lg:h-28" />
          </div>

          {/* المصادر: يسار الشعار */}
          <ol className="hidden flex-col gap-12 pt-6 md:flex">{[3, 4, 5].map(note)}</ol>

          {/* الجوّال: المصادر تحت الشعار */}
          <ol className="grid grid-cols-3 gap-x-4 gap-y-14 pt-12 md:hidden">
            {SOURCES.map((s, i) => (
              <BookNote key={s.key} i={i} active={hover === i} onEnter={hoverOn(i)} onLeave={hoverOff} nodeRef={(el) => { mnotes.current[i] = el; }} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
