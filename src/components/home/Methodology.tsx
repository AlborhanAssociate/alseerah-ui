import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { CoverRail } from "./CoverRail";
import { Eye, Feather, LockKeyhole, Quote, ScanSearch, UsersRound } from "lucide-react";

/**
 * قسم المنهجيّة — المبادئ الستّة.
 * شبكةٌ تحريريّة بلا بطاقات تفصل خلاياها خطوطٌ شعريّة متساوية (gap-px). في كلّ خليّةٍ رمزٌ خطّيّ رفيع فوق العنوان، ثمّ الوصف.
 * المرور يمدّ شعيرةً برتقاليّة على حافّة الخليّة العليا ويلوّن الرمز.
 */

const PRINCIPLES = [
  { icon: Quote, title: "الأمانة في النقل", desc: "لا اختلاقَ ولا تلفيق. كلّ ما يُنقل فمِن مصدره، بلفظه وسياقه، مع بيان الإسناد." },
  { icon: ScanSearch, title: "الدقّة في التحقيق", desc: "تمييزٌ بيّنٌ بين الصحيح والضعيف، وبين ما أُجمع عليه وما اختُلف فيه." },
  { icon: Feather, title: "الأدبُ مع المقام", desc: "لغةٌ لائقةٌ بمقام النبوّة، تلتزم المصطلح الشرعيّ الصحيح." },
  { icon: Eye, title: "الشفافيّة في القصور", desc: "حين يُسأل النظام عمّا ليس في مدوّنته، يُصرّح بذلك بوضوح." },
  { icon: UsersRound, title: "الإشرافُ العلميّ", desc: "لجنةٌ علميّةٌ دائمةٌ من المختصّين تراجع النظام دوريّاً." },
  { icon: LockKeyhole, title: "الخصوصيّةُ والأمانة", desc: "محادثاتُك ملكُك، وبياناتُك أمانةٌ عندنا، لا تُشارَك مع أطرافٍ ثالثة." },
] as const;

export function Methodology() {
  return (
    <section id="methodology" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[1.6rem] font-bold leading-[1.35] text-ink-800 lg:text-[2rem]">مبادئُ لا نحيدُ عنها</h2>
          <p className="mt-3 text-pretty text-[15px] leading-7 text-ink-500">التزامٌ علميٌّ يضبط كلّ إجابةٍ تُخرجها المنصّة.</p>
        </div>

        {/* الخطوط الشعريّة بين الخلايا: لونُ الشبكة يظهر من فجواتها (gap-px) وكلّ خليّةٍ بلون الصفحة */}
        {/* الجوّال: شريطٌ دوّار */}
        <CoverRail
          label="المبادئ"
          className="mt-6 sm:hidden"
          count={PRINCIPLES.length}
          render={(i, on) => {
            const p = PRINCIPLES[i];
            return (
              <div data-rail className={cn("neu-raised focus-tile rounded-[20px] p-5", on && "in-focus")}>
                <p.icon className="size-[22px] text-ink-400 dark:text-white/45" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-4 text-[1.05rem] font-semibold text-ink-800">{p.title}</h3>
                <p className="mt-1.5 text-pretty text-[13.5px] leading-6 text-ink-500">{p.desc}</p>
              </div>
            );
          }}
        />

        <ul className="mx-auto mt-10 hidden max-w-5xl gap-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties} className="neu-raised neu-press neu-emerge focus-tile group rounded-[20px] p-5 sm:p-7">
              {/* رمزٌ خطّيّ رفيع بلا رقعة، فوق العنوان؛ يتلوّن بالبرتقاليّ عند المرور */}
              <p.icon className="size-[22px] text-ink-400 transition-colors duration-300 group-hover:text-gold-600 dark:text-white/45" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-4 text-[1.05rem] font-semibold text-ink-800">{p.title}</h3>
              <p className="mt-1.5 text-pretty text-[13.5px] leading-6 text-ink-500">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
