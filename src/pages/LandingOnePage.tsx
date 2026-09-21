import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/one/Card";
import { ThemeButton } from "@/components/ui/ThemeButton";
import { Logo } from "@/components/brand/Logo";
import { BrandCard } from "@/components/one/BrandCard";
import { Expanded } from "@/components/one/Expanded";
import { CARDS, type CardId } from "@/components/one/content";
import { FeaturesWindow, NotDoWindow, SourcesWindow, TimelineWindow } from "@/components/one/windows";

const WINDOWS: Record<CardId, () => React.JSX.Element | null> = {
  timeline: TimelineWindow,
  features: FeaturesWindow,
  notdo: NotDoWindow,
  sources: SourcesWindow,
};

/** مواضع البطاقات في شبكةٍ من ١٢ عموداً وصفَّين على سطح المكتب */
const AREA: Record<CardId, { cls: string; big?: boolean }> = {
  features: { cls: "col-span-2 lg:col-span-5", big: true },
  notdo: { cls: "lg:col-span-3" },
  timeline: { cls: "lg:col-span-3" },
  sources: { cls: "col-span-2 lg:col-span-5" },
};

/**
 * صفحة الهبوط بشاشةٍ واحدة على خلفيّةٍ داكنة:
 * عنوانٌ وحقل سؤال، ثمّ ستّ بطاقات كلٌّ منها تفتح نافذة قسمها.
 */
export function LandingOnePage() {
  const [open, setOpen] = useState<{ id: CardId; rect: DOMRect } | null>(null);

  useEffect(() => {
    document.title = "السيرة ai — السيرة النبويّة بإسنادٍ إلى المصدر";
  }, []);

  const openCard = useCallback((id: CardId) => (el: HTMLElement) => {
    setOpen({ id, rect: el.getBoundingClientRect() });
    history.replaceState(null, "", `#${id}`);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    history.replaceState(null, "", location.pathname);
  }, []);

  /* فتح القسم المطلوب من الرابط عند الوصول */
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const id = location.hash.slice(1) as CardId;
    if (!(id in WINDOWS)) return;
    const el = document.getElementById(id);
    if (el) setOpen({ id, rect: el.getBoundingClientRect() });
  }, []);

  const Window = open ? WINDOWS[open.id] : null;
  const meta = open ? CARDS.find((c) => c.id === open.id) : null;

  return (
    <div className="relative isolate flex min-h-svh flex-col bg-[#0e1113] text-[#ece2c8] lg:h-svh lg:overflow-hidden light:bg-paper-warm light:text-ink">
      <ThemeButton className="fixed start-5 top-5 z-40 size-10 bg-white/[0.08] text-white/85 ring-1 ring-white/15 backdrop-blur-md hover:bg-white/[0.14] light:bg-white/70 light:text-ink light:ring-ink/10 light:hover:bg-white" />
      {/* خلفيّة الشاشة: مدينةٌ قديمة بقبابٍ ونخيل، بتنعيمٍ خفيف تحت طبقةٍ داكنة شفّافة تُبقي المشهد مقروءاً خلف الزجاج */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}bg-city.jpg`}
          alt=""
          className="size-full scale-[1.06] object-cover object-[50%_45%] blur-[10px] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[#0e1113]/[0.72] light:bg-paper-warm/[0.82]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1113]/65 via-transparent to-[#0e1113]/85 light:from-paper-warm/70 light:to-paper-warm/90" />
      </div>
      <main id="main" className="flex min-h-0 flex-1 flex-col justify-center px-5 pb-6 pt-8 lg:px-8">
        {/* العبارة والوصف */}
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <h1 className="[&_[data-wordmark]_path]:fill-white light:[&_[data-wordmark]_path]:fill-ink">
            <span className="sr-only">السيرة ai</span>
            <Logo className="h-14 sm:h-16 lg:h-[4.5rem]" />
          </h1>
          <p className="mt-5 max-w-md text-pretty text-[13px] leading-6 text-white light:text-ink-600">
            منصّةٌ لطلبة العلم والباحثين والمعلّمين، تُجيب من أمّهات كتب السيرة والحديث معزوّةً إلى كتابها وصفحتها.
          </p>
        </div>

        {/* الشبكة */}
        <div className="mx-auto mt-5 grid w-full max-w-5xl grid-cols-2 gap-2 lg:mt-5 lg:grid-cols-12 lg:grid-rows-[14rem_14rem] lg:gap-2">
          <BrandCard className="col-span-2 lg:col-span-4 lg:row-span-2" />
          {CARDS.map((c, i) => (
            <Card key={c.id} meta={c} index={i + 1} className={AREA[c.id].cls} big={AREA[c.id].big} lifted={open?.id === c.id} onOpen={openCard(c.id)} />
          ))}
        </div>
      </main>

      <footer className="flex min-h-12 shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2 text-[12px] text-white/35 light:text-ink-500 lg:px-8">
        {/* شعار الجمعيّة: الأبيض على الداكن، والملوّن على الفاتح */}
        <a href="https://alborhan.sa" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-opacity hover:opacity-85">
          <img src={`${import.meta.env.BASE_URL}alborhan-white.png`} alt="" className="h-8 w-auto light:hidden" />
          <img src={`${import.meta.env.BASE_URL}alborhan.svg`} alt="" className="hidden h-8 w-auto light:block" />
          <span className="text-[12.5px] text-white/60 light:text-ink-600">إحدى مبادرات جمعية البرهان لخدمة السُنّة والقرآن</span>
        </a>
        <nav aria-label="روابط ختاميّة" className="flex items-center gap-4">
          <Link to="/terms" className="transition-colors hover:text-[#ece2c8] light:hover:text-ink">شروط الاستخدام</Link>
          <Link to="/privacy" className="transition-colors hover:text-[#ece2c8] light:hover:text-ink">سياسة الخصوصيّة</Link>
          <span>© <span className="tabular">2026</span></span>
        </nav>
      </footer>

      {open && Window && meta && (
        <Expanded id={open.id} title={meta.window} fromRect={open.rect} onClose={close}>
          <Window />
        </Expanded>
      )}
    </div>
  );
}
