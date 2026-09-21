import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/** الدعوة الختامية — لوحة داكنة قبيل الفوتر. */

export function FinalCta() {
  return (
    <section className="relative px-5 pb-10 sm:pb-12 lg:px-8 lg:pb-14">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink-800 px-6 py-14 text-center shadow-lg lg:py-16">
        {/* زخرفة خلفية: نجمتان ثمانيتان مقصوصتان */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="pointer-events-none absolute -top-20 -start-20 size-64 select-none text-sand/10"
        >
          <rect x="30" y="30" width="140" height="140" rx="6" />
          <rect x="30" y="30" width="140" height="140" rx="6" transform="rotate(45 100 100)" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="pointer-events-none absolute -bottom-24 -end-20 size-72 select-none text-sand/10"
        >
          <circle cx="100" cy="100" r="88" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="32" />
        </svg>

        <span aria-hidden className="text-3xl text-gold-400">
          ❋
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance text-[1.5rem] font-bold leading-[1.35] text-white lg:text-[1.75rem]">
          ابدأ رحلتَك في السيرة العطرة اليوم
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-8 text-ink-200">
          انضمّ إلى طلبة العلم والباحثين والمعلّمين الذين يعتمدون السيرة ai
          رفيقاً علميّاً موثوقاً.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/chat"
            className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-white ps-8 pe-6 text-base font-medium text-ink-900 shadow-md transition-all duration-300 hover:bg-sand"
          >
            جرّب المنصّة مجّاناً
            <ArrowLeft
              className="size-4.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.75}
              aria-hidden
            />
          </Link>
          <Link
            to="mailto:info@alborhan.sa"
            className="inline-flex h-13 items-center rounded-full border border-ink-500 px-7 text-base font-medium text-ink-100 transition-colors duration-300 hover:border-gold-400 hover:text-white"
          >
            تواصَل مع الفريق العلميّ
          </Link>
        </div>
      </div>
    </section>
  );
}
