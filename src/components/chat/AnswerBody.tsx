/**
 * عرض الإجابة. المصدر Markdown مبسّط يأتي من الخادم:
 * "## عنوان" قسمٌ مرقَّم، "> نصّ" روايةٌ منقولة، وما عداه فقرة.
 * الترقيم يُشتقّ من ترتيب العناوين لا من النصّ، فلا يختلّ إن حُذف قسم.
 */
export function AnswerBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);
  let heading = 0;

  return (
    <div className="text-[15px] leading-[2.05] text-ink">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          heading += 1;
          return (
            <h3 key={i} className="mb-2 mt-6 flex items-center gap-2.5 text-[16px] font-bold first:mt-0">
              <span className="tabular grid size-5 shrink-0 place-items-center rounded-md bg-ink pt-[0.7px] text-[11px] font-semibold leading-none text-paper">
                {heading}
              </span>
              {block.slice(3)}
            </h3>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="my-3.5 rounded-lg border-s-2 border-gold bg-paper-sunken/60 px-4 py-3 text-[15px] leading-[2.1] text-ink-soft"
            >
              «{block.slice(2)}»
            </blockquote>
          );
        }

        return (
          <p key={i} className="mb-3 last:mb-0">
            {block}
          </p>
        );
      })}
    </div>
  );
}
