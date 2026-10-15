import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/** الدعوة الختامية — لوحةٌ بنفسجيّة هادئة قبيل الفوتر، بلا زخارف. */

export function FinalCta() {
  return (
    <section className="relative px-5 pb-16 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-b from-plum-800 to-plum-900 px-6 py-14 text-center shadow-lg ring-1 ring-white/[0.06] sm:py-16 lg:py-20">
        {/* شعيرةٌ برتقاليّة علويّة */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-500/70 to-transparent" />

        <p className="text-[13px] font-medium text-gold-400">ابدأ الآن</p>
        <h2 className="mt-3 max-w-2xl text-balance text-[1.6rem] font-bold leading-[1.35] text-white lg:text-[2rem]">
          ابدأ رحلتَك في السيرة العطرة اليوم
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-[15px] leading-8 text-white/70">
          انضمّ إلى طلبة العلم والباحثين والمعلّمين الذين يعتمدون السيرة ai رفيقاً علميّاً موثوقاً.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            to="/chat"
            className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-medium text-plum-900 shadow-md transition-colors duration-300 hover:bg-cream sm:w-auto"
          >
            جرّب المنصّة مجّاناً
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.75} aria-hidden />
          </Link>
          <a
            href="mailto:info@alborhan.sa"
            className="inline-flex h-12 w-full items-center justify-center rounded-full px-7 text-[15px] font-medium text-white/90 ring-1 ring-inset ring-white/25 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white hover:ring-gold-400/60 sm:w-auto"
          >
            تواصَل مع الفريق العلميّ
          </a>
        </div>
      </div>
    </section>
  );
}
