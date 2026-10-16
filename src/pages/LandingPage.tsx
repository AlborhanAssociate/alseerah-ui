import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionIndex } from "@/components/layout/SectionIndex";
import { BrandFooter } from "@/components/layout/BrandFooter";
import type { CardId } from "@/components/one/content";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Sources } from "@/components/home/Sources";
import { Audiences } from "@/components/home/Audiences";
import { Methodology } from "@/components/home/Methodology";
import { useEffect } from "react";
import { FinalCta } from "@/components/home/FinalCta";
import { trackSpotlight } from "@/lib/spotlight";

/* روابط «استكشِف» في التذييل تمرّر إلى القسم المقابل في هذه الصفحة؛ والخطّ الزمنيّ إلى المزايا ما دام قسمه مخفيّاً */
const SECTION: Record<CardId, string> = { features: "features", sources: "sources", timeline: "features", notdo: "methodology" };
const explore = (id: CardId) => document.getElementById(SECTION[id])?.scrollIntoView({ behavior: "smooth" });

/* يُظهر عناصر .reveal بحركةٍ هادئة حين تدخل الشاشة، مرّةً واحدة */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(".reveal, .neu-emerge")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* على الشاشات اللمسيّة الضيّقة: تُبرَز البطاقة التي تمرّ بوسط الشاشة، فيبقى للقسم نبضٌ أثناء التمرير */
function useFocusTiles() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const tiles = [...document.querySelectorAll<HTMLElement>(".focus-tile:not([data-rail])")];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        tiles.forEach((t) => t.classList.toggle("in-focus", t === e.target));
      }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

export function LandingPage() {
  useReveal();
  useFocusTiles();
  return (
    <div className="neutral-paper neu flex min-h-svh flex-col bg-paper-warm text-ink-800">
      {/* حبيباتٌ خفيفة جدّاً فوق الصفحة كلّها تمنح البياض ملمساً */}
      <div aria-hidden className="page-grain pointer-events-none fixed inset-0 z-[70]" />
      <SiteHeader />
      <SectionIndex />
      <main id="main" className="flex-1">
        <Hero />
        <Features />
        <Sources />
        {/* قسم مراحل السيرة مخفيٌّ مؤقّتاً؛ مكوّنه باقٍ في components/home/Timeline.tsx */}
        <Audiences />
        <Methodology />
      </main>
      {/* الكتلة الأخيرة: الدعوة الختاميّة والتذييل معاً على خلفيّةٍ داكنة واحدة بأضواءٍ ناعمة */}
      <div onMouseMove={trackSpotlight} className="neu-band group/spot relative isolate overflow-hidden bg-plum-950">
        <span aria-hidden className="spotlight pointer-events-none absolute inset-0 -z-[5] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -top-28 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-gold-600/25 blur-[120px]" />
          <span className="absolute left-[4%] top-1/3 size-80 rounded-full bg-plum-500/40 blur-[110px]" />
          <span className="absolute -bottom-20 right-[6%] size-80 rounded-full bg-[#eba584]/15 blur-[110px]" />
          <span className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_50%_40%,#000_10%,transparent_65%)]" />
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent" />
        </div>
        <FinalCta />
        <BrandFooter onExplore={explore} wide dark />
      </div>
    </div>
  );
}
