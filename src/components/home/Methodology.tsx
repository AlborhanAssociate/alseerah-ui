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
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[1.6rem] font-bold leading-[1.35] text-ink-800 lg:text-[2rem]">مبادئُ لا نحيدُ عنها</h2>
          <p className="mt-3 text-pretty text-[15px] leading-7 text-ink-500">التزامٌ علميٌّ يضبط كلّ إجابةٍ تُخرجها المنصّة.</p>
        </div>

        {/* الخطوط الشعريّة بين الخلايا: لونُ الشبكة يظهر من فجواتها (gap-px) وكلّ خليّةٍ بلون الصفحة */}
        <ul className="mx-auto mt-10 grid max-w-5xl gap-px overflow-hidden rounded-[16px] border border-ink/[0.08] bg-ink/[0.08] sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 dark:border-white/10 dark:bg-white/10">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="group relative bg-paper p-5 transition-colors duration-300 hover:bg-paper-raised sm:p-7 dark:hover:bg-white/[0.03]">
              {/* شعيرةٌ برتقاليّة تمتدّ على الحافّة العليا عند المرور */}
              <span aria-hidden className="absolute start-0 top-0 h-px w-0 bg-gold-600 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
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
