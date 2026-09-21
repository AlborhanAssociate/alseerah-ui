import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "المزايا", href: "#features" },
  { label: "المصادر", href: "#sources" },
  { label: "الخطّ الزمنيّ", href: "#timeline" },
  { label: "التجربة", href: "#demo" },
  { label: "المنهجيّة", href: "#methodology" },
] as const;

/**
 * الهيدر: شريطٌ عائمٌ بلونٍ واحد في كلّ الأحوال، زجاجيّ فوق المحتوى،
 * يكتسب ظلّاً خفيفاً فقط عند التمرير بدل أن يتحوّل إلى لونٍ آخر.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-[60] focus:rounded-md focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        تخطَّ إلى المحتوى
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 lg:px-5 lg:pt-4">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 rounded-2xl bg-paper/85 px-3 ring-1 ring-ink/[0.07] backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 lg:px-4",
            scrolled && "shadow-md",
          )}
        >
          <Link to="/" aria-label="السيرة ai — الصفحة الرئيسيّة" className="shrink-0 ps-1 transition-opacity hover:opacity-85">
            <Logo className="h-9" />
          </Link>

          <nav aria-label="التنقّل الرئيسيّ" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="block rounded-lg px-3 py-2 text-[14px] font-medium text-ink-700 transition-colors hover:bg-sand/60 hover:text-ink-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 lg:gap-2">
            <button
              type="button"
              aria-label="English"
              className="hidden h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-ink-600 transition-colors hover:bg-sand/60 hover:text-ink-900 sm:inline-flex"
            >
              <Globe className="size-3.5" strokeWidth={1.75} aria-hidden />
              <span className="font-latin tracking-wide">EN</span>
            </button>

            <Link
              to="/login"
              className="hidden h-9 items-center rounded-lg px-3 text-[14px] font-medium text-ink-700 transition-colors hover:bg-sand/60 hover:text-ink-900 lg:inline-flex"
            >
              دخول
            </Link>

            <Link
              to="/chat"
              className="inline-flex h-9 items-center rounded-lg bg-ink-800 px-4 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-ink-900 lg:px-5"
            >
              جرّب المنصّة
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="inline-flex size-10 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-sand/60 lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* القائمة — الجوّال */}
      <div id="mobile-nav" hidden={!menuOpen} className="fixed inset-0 z-[55] lg:hidden">
        <div className="absolute inset-0 bg-ink-950/25 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className="absolute inset-x-3 top-3 rounded-2xl bg-paper px-5 pb-6 shadow-lg ring-1 ring-ink/[0.07]">
          <div className="flex h-16 items-center justify-between">
            <Logo className="h-9" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="إغلاق القائمة"
              className="inline-flex size-10 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-sand/60"
            >
              <X className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <nav aria-label="التنقّل في الجوّال" className="mt-1">
            <ul className="divide-y divide-line/70">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} onClick={() => setMenuOpen(false)} className="block py-3.5 text-[17px] font-medium text-ink-800">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 flex items-center gap-3">
            <Link
              to="/chat"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 flex-1 items-center justify-center rounded-xl bg-ink-800 text-[15px] font-medium text-white shadow-sm"
            >
              جرّب المنصّة
            </Link>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-xl px-5 text-[15px] font-medium text-ink-800 ring-1 ring-ink/[0.12]"
            >
              دخول
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
