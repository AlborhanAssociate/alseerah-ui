import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

/** فوتر الموقع — داكن، بشعار المشروع وشعار الجمعية جنباً إلى جنب. */

const GROUPS = [
  {
    heading: "المنصّة",
    links: [
      { label: "المميّزات", href: "#features" },
      { label: "النطاق", href: "#sources" },
      { label: "المصادر", href: "#sources" },
    ],
  },
  {
    heading: "استكشِف",
    links: [
      { label: "جرّب المساعد", href: "/chat" },
      { label: "كيف يعمل", href: "#features" },
      { label: "عرض حيّ", href: "#demo" },
      { label: "لِمَن هذه المنصّة", href: "#audiences" },
    ],
  },
  {
    heading: "القانونيّة",
    links: [
      { label: "شروط الاستخدام", href: "/terms" },
      { label: "سياسة الخصوصيّة", href: "/privacy" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-ink-800 via-ink-900 to-ink-950 text-ink-200">
      {/* شعيرة ذهبية علوية */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-500/50 to-transparent"
      />
      {/* زخرفة خلفية */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="pointer-events-none absolute -bottom-28 -start-24 size-80 select-none text-sand/6"
      >
        <rect x="30" y="30" width="140" height="140" rx="6" />
        <rect x="30" y="30" width="140" height="140" rx="6" transform="rotate(45 100 100)" />
        <circle cx="100" cy="100" r="34" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* الهوية: الشعاران */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-5">
              <Link
                to="/"
                aria-label="السيرة ai — الصفحة الرئيسية"
                className="[&_[data-wordmark]_path]:fill-paper"
              >
                <Logo className="h-14" />
              </Link>
              <span aria-hidden className="h-12 w-px bg-ink-700" />
              <img
                src={`${import.meta.env.BASE_URL}alborhan-white.png`}
                alt="جمعية البرهان لخدمة السُنّة والقرآن"
                className="h-14 w-auto opacity-90"
              />
            </div>
            <p className="mt-5 max-w-sm text-pretty text-[15px] leading-7 text-ink-300">
              منصّةُ ذكاءٍ اصطناعيّ متخصّصة في السيرة النبويّة العطرة،
              مبنيّة على أمّات كتب السيرة والحديث — إحدى مبادرات جمعية
              البرهان لخدمة السُنّة والقرآن.
            </p>
          </div>

          {/* الروابط */}
          <nav
            aria-label="روابط الفوتر"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6"
          >
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <h3 className="text-sm font-semibold text-white">
                  {group.heading}
                </h3>
                <ul className="mt-3.5 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[15px] text-ink-300 transition-colors duration-300 hover:text-gold-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* التواصل */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">
              تواصَل
            </h3>
            <a
              href="mailto:info@alborhan.sa"
              className="mt-4 inline-flex items-center gap-2 text-[15px] text-ink-300 transition-colors duration-300 hover:text-gold-400"
            >
              <Mail className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              <span className="font-latin" dir="ltr">
                info@alborhan.sa
              </span>
            </a>
          </div>
        </div>

        {/* شريط الحقوق */}
        <div className="mt-10 border-t border-white/8 pt-6 text-center">
          <span aria-hidden className="text-lg text-gold-500">
            ❋
          </span>
          <p className="mt-2 text-sm leading-7 text-ink-400">
            © جميع الحقوق محفوظة لجمعية البرهان لخدمة السنة والقرآن —{" "}
            <span className="tabular">2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
