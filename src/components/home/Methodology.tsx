/** قسم المنهجيّة — المبادئ الستّة الحاكمة. */

const PRINCIPLES = [
  {
    ord: "أوّلاً",
    title: "الأمانة في النقل",
    desc: "لا اختلاقَ ولا تلفيق. كلّ ما يُنقل فهو من مصدره، بلفظه وسياقه، مع بيانِ الإسناد.",
  },
  {
    ord: "ثانياً",
    title: "الدقّة في التحقيق",
    desc: "تمييزٌ بيّنٌ بين الصحيح والضعيف، وبين ما أُجمع عليه وما اختُلف فيه.",
  },
  {
    ord: "ثالثاً",
    title: "الأدبُ مع المقام",
    desc: "لغةٌ لائقةٌ بمقام النبوّة، تلتزم المصطلحَ الشرعيَّ الصحيح.",
  },
  {
    ord: "رابعاً",
    title: "الشفافيّة في القصور",
    desc: "حينما يُسأل النظامُ عمّا ليس في مدوَّنته، يُصرّح بذلك بوضوح.",
  },
  {
    ord: "خامساً",
    title: "الإشرافُ العلميّ",
    desc: "لجنةٌ علميّةٌ دائمةٌ من المختصّين تراجع النظامَ دوريّاً.",
  },
  {
    ord: "سادساً",
    title: "الخصوصيّةُ والأمانة",
    desc: "محادثاتُك ملكُك، وبياناتُك أمانةٌ عندنا. لا تُشارَك مع أطرافٍ ثالثة.",
  },
] as const;

export function Methodology() {
  return (
    <section id="methodology" className="relative scroll-mt-24 py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-gold-700">
            المنهجيّة
          </p>
          <h2 className="mt-4 text-balance text-[1.5rem] font-bold leading-[1.35] text-ink-800 lg:text-[1.75rem]">
            مبادئُ لا نحيدُ عنها
          </h2>
          <p className="mt-3 text-pretty text-[14.5px] leading-7 text-ink-500">
            التزامٌ علميٌّ صارمٌ يضبطُ كلَّ إجابةٍ تُخرجها المنصّة
          </p>
        </div>

        <ol className="mx-auto mt-10 grid max-w-5xl gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <li key={p.ord} className="relative ps-5">
              {/* شعيرة ذهبية عمودية */}
              <span
                aria-hidden
                className="absolute inset-y-1 start-0 w-0.5 rounded-full bg-gradient-to-b from-gold-500 to-gold-200"
              />
              <p className="text-[13px] font-medium text-gold-700">
                {p.ord}
              </p>
              <h3 className="mt-2 text-[17px] font-semibold text-ink-800">
                {p.title}
              </h3>
              <p className="mt-2 text-[14px] leading-7 text-ink-600">
                {p.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
