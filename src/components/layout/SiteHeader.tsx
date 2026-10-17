import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Menu, X, Globe } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeButton } from "@/components/ui/ThemeButton";
import { SECTIONS, useActiveSection } from "@/components/layout/SectionIndex";
import { cn } from "@/lib/cn";

/**
 * الهيدر: كبسولةٌ زجاجيّة عائمة فيها الشعار والإجراءات فقط، تنكمش قليلاً ويظهر ظلّها عند التمرير.
 * أقسام الصفحة في الفهرس الجانبيّ (SectionIndex) على سطح المكتب، وفي القائمة على الجوّال.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const iconBtn = "grid size-9 place-items-center rounded-full text-ink-600 transition-colors hover:bg-ink/[0.05] hover:text-ink";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-[60] focus:rounded-md focus:bg-plum-800 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        تخطَّ إلى المحتوى
      </a>

      <header className={cn("fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-300 lg:px-5", scrolled ? "pt-2.5" : "pt-3 lg:pt-5")}>
        <div
          className={cn(
            "neu-raised mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full pe-2 ps-4 transition-[height] duration-300",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <Link to="/modern" aria-label="السيرة ai — الصفحة الرئيسيّة" className="shrink-0 transition-opacity hover:opacity-85">
            <Logo className="h-9" />
          </Link>



          <div className="flex shrink-0 items-center gap-1">
            <button type="button" aria-label="English" className={cn(iconBtn, "hidden w-auto gap-1 px-2.5 sm:inline-flex")}>
              <Globe className="size-4" strokeWidth={1.75} aria-hidden />
              <span className="text-[12px] font-medium">EN</span>
            </button>
            <ThemeButton size={17} className={cn(iconBtn, "hidden sm:grid")} />

            <span aria-hidden className="mx-1.5 hidden h-5 w-px bg-ink/10 lg:block" />

            <Link to="/login" className="hidden h-9 items-center rounded-full px-3.5 text-[14px] font-medium text-ink-700 transition-colors hover:bg-ink/[0.05] hover:text-ink lg:inline-flex">
              دخول
            </Link>

            <Link
              to="/chat"
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-plum-800 pe-2 ps-4 text-[14px] font-medium text-white shadow-[0_6px_16px_-6px_rgba(74,56,86,0.6)] ring-1 ring-white/10 transition-colors hover:bg-plum-900"
            >
              جرّب المنصّة
              <span aria-hidden className="grid size-6 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:-translate-x-0.5">
                <ArrowLeft className="size-3.5" strokeWidth={2.25} />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className={cn(iconBtn, "size-10 lg:hidden")}
            >
              <Menu className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* القائمة — الجوّال */}
      <div id="mobile-nav" hidden={!menuOpen} className="fixed inset-0 z-[55] lg:hidden">
        <div className="absolute inset-0 bg-plum-950/30 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className="rise absolute inset-x-3 top-3 rounded-[1.75rem] border border-white/80 bg-white/85 px-5 pb-5 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-paper/90">
          <div className="flex h-16 items-center justify-between">
            <Logo className="h-9" />
            <div className="flex items-center gap-1">
              <ThemeButton size={17} className={iconBtn} />
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة" className={cn(iconBtn, "size-10")}>
                <X className="size-5" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
          </div>

          <nav aria-label="التنقّل في الجوّال" className="mt-1">
            <ul className="grid gap-1">
              {SECTIONS.filter((s) => s.id !== "hero").map((item) => (
                <li key={item.id}>
                  <Link
                    to={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] font-medium transition-colors",
                      active === item.id ? "bg-ink/[0.05] text-ink" : "text-ink-700 hover:bg-ink/[0.04]",
                    )}
                  >
                    {item.label}
                    <ArrowLeft className="size-4 text-ink-muted" strokeWidth={1.75} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Link
              to="/chat"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-plum-800 text-[15px] font-medium text-white shadow-sm ring-1 ring-white/10"
            >
              جرّب المنصّة
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            </Link>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-full px-6 text-[15px] font-medium text-ink-800 ring-1 ring-ink/[0.12]"
            >
              دخول
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
