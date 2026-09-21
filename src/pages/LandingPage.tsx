import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Sources } from "@/components/home/Sources";
import { Timeline } from "@/components/home/Timeline";
import { Demo } from "@/components/home/Demo";
import { Audiences } from "@/components/home/Audiences";
import { Methodology } from "@/components/home/Methodology";
import { FinalCta } from "@/components/home/FinalCta";

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-paper-warm text-ink-800">
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Features />
        <Sources />
        <Timeline />
        <Demo />
        <Audiences />
        <Methodology />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
