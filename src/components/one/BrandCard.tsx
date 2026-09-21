import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";

/** أسئلةٌ تطفو في النصف العلويّ من البطاقة: توحي بالحوار قبل أن يبدأ */
const FLOATING = [
  { q: "ما أسباب غزوة بدر؟", pos: "top-6 -start-7", dur: "6.5s", delay: "0ms" },
  { q: "كيف كانت هجرته ﷺ إلى المدينة؟", pos: "top-[14%] -end-9", dur: "7.5s", delay: "900ms" },
  { q: "ما شروط صلح الحديبية؟", pos: "top-[40%] start-8", dur: "8s", delay: "1800ms" },
] as const;

/**
 * بطاقة الهويّة: تحلّ محلّ الهيدر. عبارةٌ وزرٌّ واحد «ابدأ الآن» في الأسفل. لا تفتح نافذة.
 */
export function BrandCard({ className }: { className?: string }) {
  return (
    <section
      aria-label="السيرة ai"
      className={`rise relative z-10 flex min-h-[16rem] flex-col justify-end rounded-[9px] p-5 lg:p-6 ${className ?? ""}`}
    >
      {/* الصورة وطبقاتها مقصوصةٌ بزوايا البطاقة، أمّا الفقاعات فخارج القصّ كي تتجاوز الحافّة */}
      <div aria-hidden className="grain vignette absolute inset-0 -z-10 overflow-hidden rounded-[9px] bg-[#15181a] ring-1 ring-white/[0.14]">
        <img src={`${import.meta.env.BASE_URL}brand-library.jpg`} alt="" className="drift absolute inset-0 size-full object-cover object-[50%_28%] brightness-[0.6] saturate-[0.75]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1113]/95 via-[#0e1113]/45 to-transparent" />
      </div>
      {/* فقاعات الأسئلة العائمة */}
      <ul aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        {FLOATING.map((f) => (
          <li
            key={f.q}
            style={{ "--float-dur": f.dur, "--float-delay": f.delay } as CSSProperties}
            className={`float-y absolute ${f.pos} max-w-[82%] rounded-[14px] rounded-se-[5px] bg-white/[0.06] px-4 py-2.5 text-[14px] leading-6 text-white backdrop-blur-[10px] backdrop-brightness-110 shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] light:bg-[#133543]/[0.62] light:backdrop-brightness-100 light:shadow-[0_8px_24px_rgba(19,53,67,0.25)]`}
          >
            {f.q}
          </li>
        ))}
      </ul>


      <div>
        <p className="text-balance text-[1.15rem] leading-[1.45] text-white lg:text-[1.3rem]">
          اطرح سؤالك.
          <br />
          ودَع المصادرَ تُجيب.
        </p>
        <div className="mt-6">
          {/* زرّ حبّة: جسمٌ زجاجيّ داكن، والنصّ في جهة البداية، وقرصٌ ذهبيّ بالسهم في جهة النهاية */}
          <Link
            to="/chat"
            className="group flex h-14 w-full items-center justify-between rounded-full bg-white/[0.08] p-1.5 ps-6 text-[15.5px] text-white ring-1 ring-white/20 backdrop-blur-md transition-[background-color,box-shadow] duration-300 hover:bg-white/[0.14] hover:shadow-[0_10px_30px_rgba(214,188,128,0.25)]"
          >
            ابدأ محادثتك الآن
            {/* قرصٌ بلون لوح الشعار، وحوله حلقتان تتموّجان للفت الانتباه */}
            <span className="relative grid size-11 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:-translate-x-1">
              <span aria-hidden className="ripple absolute inset-0 rounded-full ring-2 ring-[#ece2c8]/70" />
              <span aria-hidden className="ripple absolute inset-0 rounded-full ring-2 ring-[#ece2c8]/70" style={{ "--ripple-delay": "1200ms" } as CSSProperties} />
              <span className="relative grid size-11 place-items-center rounded-full bg-[#ece2c8] text-[#133543] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_14px_rgba(0,0,0,0.25)] ring-1 ring-[#72462b]/40">
                <ArrowLeft className="size-[18px]" strokeWidth={2} aria-hidden />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
