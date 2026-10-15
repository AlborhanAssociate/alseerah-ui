import { SiteHeader } from "@/components/layout/SiteHeader";
import { BrandFooter } from "@/components/layout/BrandFooter";
import type { CardId } from "@/components/one/content";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Sources } from "@/components/home/Sources";
import { Timeline } from "@/components/home/Timeline";
import { Audiences } from "@/components/home/Audiences";
import { Methodology } from "@/components/home/Methodology";
import { FinalCta } from "@/components/home/FinalCta";

/* روابط «استكشِف» في التذييل تمرّر إلى القسم المقابل في هذه الصفحة */
const SECTION: Record<CardId, string> = { features: "features", sources: "sources", timeline: "timeline", notdo: "methodology" };
const explore = (id: CardId) => document.getElementById(SECTION[id])?.scrollIntoView({ behavior: "smooth" });

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-paper-warm text-ink-800">
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Features />
        <Sources />
        <Timeline />
        <Audiences />
        <Methodology />
        <FinalCta />
      </main>
      <BrandFooter onExplore={explore} />
    </div>
  );
}
