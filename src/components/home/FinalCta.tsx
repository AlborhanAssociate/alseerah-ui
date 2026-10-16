import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * الدعوة الختامية — جزءٌ من الكتلة الداكنة الأخيرة التي تضمّها مع التذييل (انظر LandingPage):
 * بلا لوحةٍ ولا خلفيّةٍ خاصّة؛ الخلفيّة والأضواء من الكتلة الحاوية.
 */

export function FinalCta() {
  return (
    <section className="relative px-5 pb-20 pt-20 text-center sm:pb-28 sm:pt-24 lg:px-8 lg:pb-32 lg:pt-28">
      <div className="reveal mx-auto flex max-w-3xl flex-col items-center">
        <h2 className="max-w-2xl text-balance text-[1.6rem] font-bold leading-[1.35] text-white lg:text-[2.25rem]">
          ابدأ رحلتَك في السيرة العطرة اليوم
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-[15px] leading-8 text-white/65">
          انضمّ إلى طلبة العلم والباحثين والمعلّمين الذين يعتمدون السيرة ai رفيقاً علميّاً موثوقاً.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            to="/chat"
            className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-medium text-plum-900 transition-colors duration-300 hover:bg-cream sm:w-auto"
          >
            جرّب المنصّة مجّاناً
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.75} aria-hidden />
          </Link>
          <a
            href="mailto:info@alborhan.sa"
            className="neu-raised-sm neu-press inline-flex h-12 w-full items-center justify-center rounded-full px-7 text-[15px] font-medium text-white/90 hover:text-white sm:w-auto"
          >
            تواصَل مع الفريق العلميّ
          </a>
        </div>
      </div>
    </section>
  );
}
